import { useState } from 'react';
import { Upload, Camera, X, Loader, AlertTriangle } from 'lucide-react';
import { IdentificationResult } from './IdentificationResult';

interface IdentificationSuggestion {
  name: string;
  scientificName: string;
  probability: number;
  edibility: string;
  description: string;
}

interface IdentificationResponse {
  suggestions: IdentificationSuggestion[];
  isEdible: boolean;
  isPoisonous: boolean;
}

export function MushroomIdentifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IdentificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResults(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyMushroom = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const base64Response = await fetch(selectedImage);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'mushroom.jpg');

      const API_KEY = 'VsVSrdA1BuvOtWi99PGi1LGVxB7loReFgmVTj2sRCHKQ0dZZRu';
      const response = await fetch('https://mushroom.kindwise.com/api/v1/identification?details=common_names,url,description,edibility,characteristic', {
        method: 'POST',
        headers: {
          'Api-Key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a few minutes before trying again. Free API keys have limited requests per day.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Full API Response (stringified):', JSON.stringify(data, null, 2));
      
      const suggestions = data.result?.classification?.suggestions || [];
      
      if (suggestions.length === 0) {
        throw new Error('No mushrooms detected in the image');
      }

      // Log first suggestion to see structure
      if (suggestions.length > 0) {
        console.log('First suggestion structure:', JSON.stringify(suggestions[0], null, 2));
      }

      const transformedResults: IdentificationResponse = {
        suggestions: suggestions.slice(0, 5).map((suggestion: any) => {
          // Try multiple paths for description
          const description = 
            suggestion.details?.description?.value ||
            suggestion.details?.description ||
            suggestion.description ||
            'This species has been identified but detailed information is not available in the API response. Please consult field guides or expert mycologists for more information.';
          
          const scientificName =
            suggestion.details?.scientific_name ||
            suggestion.scientific_name ||
            'Unknown';
            
          const edibility =
            suggestion.details?.edibility ||
            suggestion.edibility ||
            'unknown';

          console.log(`Mapping suggestion: ${suggestion.name}`, {
            description,
            scientificName,
            edibility,
            probability: suggestion.probability
          });

          return {
            name: suggestion.name || 'Unknown',
            scientificName,
            probability: Math.round((suggestion.probability || 0) * 100),
            edibility,
            description
          };
        }),
        isEdible: (data.result?.is_healthy_probability || 0) > 0.5,
        isPoisonous: (data.result?.is_healthy_probability || 0) < 0.3
      };

      console.log('Transformed results:', transformedResults);
      setResults(transformedResults);
    } catch (err) {
      console.error('Identification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to identify mushroom. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setResults(null);
    setError(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-stone-900 mb-2">AI Identification</h3>
        <p className="text-stone-500">Upload a photo for instant mushroom identification</p>
      </div>

      {!selectedImage ? (
        <div className="border-2 border-dashed border-stone-300 rounded-3xl p-16 text-center hover:border-stone-400 hover:bg-stone-50/50 transition-all duration-300 cursor-pointer">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-stone-600" />
            </div>
            <p className="text-stone-900 mb-2">Click to upload or drag and drop</p>
            <p className="text-stone-500">PNG, JPG up to 10MB</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div>
          <div className="relative mb-8 rounded-3xl overflow-hidden bg-stone-100">
            <img
              src={selectedImage}
              alt="Selected mushroom"
              className="w-full h-96 object-cover"
            />
            <button
              onClick={reset}
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all hover:scale-110"
            >
              <X className="w-5 h-5 text-stone-900" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-950">{error}</p>
                  {error.includes('Rate limit') && (
                    <p className="text-red-800 mt-3 text-sm leading-relaxed">
                      💡 Free API keys have daily limits. Browse the mushroom database below while you wait, or upgrade at mushroom.id for more requests.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!results && !isLoading && (
            <button
              onClick={identifyMushroom}
              className="w-full bg-stone-900 text-white py-4 rounded-2xl hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Camera className="w-5 h-5" />
              Identify Mushroom
            </button>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className="w-12 h-12 text-stone-900 animate-spin mb-4" />
              <p className="text-stone-600">Analyzing your mushroom...</p>
            </div>
          )}

          {results && <IdentificationResult results={results} onReset={reset} />}
        </div>
      )}
    </div>
  );
}