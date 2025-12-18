import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

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

interface IdentificationResultProps {
  results: IdentificationResponse;
  onReset: () => void;
}

export function IdentificationResult({ results, onReset }: IdentificationResultProps) {
  const getEdibilityColor = (edibility: string) => {
    if (edibility.includes('edible') && !edibility.includes('not')) {
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800'
      };
    }
    if (edibility.includes('poisonous') || edibility.includes('toxic')) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800'
      };
    }
    return {
      bg: 'bg-stone-50',
      border: 'border-stone-200',
      text: 'text-stone-800'
    };
  };

  return (
    <div className="mt-8">
      {/* Warning Banner */}
      <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded-r-2xl">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-950 leading-relaxed">
              <strong className="font-semibold">Critical Warning:</strong> AI identification is NOT 100% accurate. 
              Never consume any mushroom based solely on AI identification. Always consult with 
              an expert mycologist before consuming wild mushrooms.
            </p>
          </div>
        </div>
      </div>

      {/* Identification Results */}
      <h3 className="text-stone-900 mb-6">Identification Results</h3>
      
      <div className="space-y-4 mb-8">
        {results.suggestions.map((suggestion, index) => {
          const colors = getEdibilityColor(suggestion.edibility);
          return (
            <div
              key={index}
              className="border-2 border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-all duration-300 bg-white"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-stone-900">{suggestion.name}</h4>
                    {index === 0 && (
                      <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full border border-stone-200">
                        Best Match
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 italic">{suggestion.scientificName}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-stone-900">{suggestion.probability}%</div>
                  <div className="text-stone-500">confidence</div>
                </div>
              </div>

              <div className={`${colors.bg} border-2 ${colors.border} rounded-xl px-4 py-2 inline-block mb-4`}>
                <span className={`${colors.text} capitalize`}>
                  {suggestion.edibility}
                </span>
              </div>

              <p className="text-stone-700 leading-relaxed mb-4">{suggestion.description}</p>

              {/* Probability Bar */}
              <div className="bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-700"
                  style={{ width: `${suggestion.probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={onReset}
          className="flex-1 bg-white border-2 border-stone-300 text-stone-900 py-4 rounded-2xl hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Another Photo
        </button>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h4 className="text-blue-950 mb-4">Next Steps for Safe Identification</h4>
        <ul className="text-blue-900 space-y-3 leading-relaxed">
          <li className="flex gap-3">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Cross-reference with field guides and multiple sources</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Take photos from multiple angles (top, gills, stem, base)</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Note the habitat, season, and associated trees</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Consult with local mycological societies</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>When in doubt, don't eat it!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
