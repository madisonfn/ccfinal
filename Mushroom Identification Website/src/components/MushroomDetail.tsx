import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, AlertTriangle, CheckCircle, XCircle, AlertCircle, ChefHat, Leaf } from 'lucide-react';
import { Mushroom } from '../data/mushrooms';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { extractColorsFromImage, ColorPalette } from '../utils/colorExtractor';

interface MushroomDetailProps {
  mushroom: Mushroom;
  onClose: () => void;
}

export function MushroomDetail({ mushroom, onClose }: MushroomDetailProps) {
  const [colorPalette, setColorPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    extractColorsFromImage(mushroom.image)
      .then(palette => {
        setColorPalette(palette);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [mushroom.image]);

  const edibilityConfig = {
    edible: {
      icon: CheckCircle,
      label: 'Edible'
    },
    poisonous: {
      icon: XCircle,
      label: 'Poisonous - Do Not Consume'
    },
    inedible: {
      icon: AlertCircle,
      label: 'Inedible'
    }
  };

  const config = edibilityConfig[mushroom.edibility];
  const Icon = config.icon;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        <div 
          className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: colorPalette?.background || 'white',
            transition: 'background-color 0.5s ease'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <X className="w-5 h-5" style={{ color: colorPalette?.text || '#1c1917' }} />
          </button>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-auto">
              <ImageWithFallback
                src={mushroom.image}
                alt={mushroom.name}
                className="w-full h-full object-cover"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-stone-100 animate-pulse" />
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 overflow-y-auto max-h-[600px] lg:max-h-none">
              {/* Title */}
              <div className="mb-8">
                <h2 
                  className="mb-2 leading-tight"
                  style={{ color: colorPalette?.text || '#1c1917', transition: 'color 0.5s ease' }}
                >
                  {mushroom.name}
                </h2>
                <p 
                  className="italic text-lg"
                  style={{ color: colorPalette?.primary || '#78716c', transition: 'color 0.5s ease' }}
                >
                  {mushroom.scientificName}
                </p>
              </div>

              {/* Edibility Badge */}
              <div 
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-8 border-2"
                style={{
                  backgroundColor: colorPalette ? `${colorPalette.primary}15` : '#f5f5f4',
                  borderColor: colorPalette?.primary || '#d6d3d1',
                  transition: 'all 0.5s ease'
                }}
              >
                <Icon 
                  className="w-6 h-6" 
                  style={{ color: colorPalette?.primary || '#78716c' }}
                />
                <span 
                  style={{ color: colorPalette?.text || '#1c1917' }}
                >
                  {config.label}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p 
                  className="leading-relaxed"
                  style={{ color: colorPalette?.text || '#44403c', transition: 'color 0.5s ease' }}
                >
                  {mushroom.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin 
                      className="w-5 h-5" 
                      style={{ color: colorPalette?.primary || '#78716c' }}
                    />
                    <h4 style={{ color: colorPalette?.text || '#1c1917' }}>Habitat</h4>
                  </div>
                  <p 
                    className="leading-relaxed pl-7"
                    style={{ color: colorPalette?.text || '#44403c', opacity: 0.8 }}
                  >
                    {mushroom.habitat}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar 
                      className="w-5 h-5" 
                      style={{ color: colorPalette?.primary || '#78716c' }}
                    />
                    <h4 style={{ color: colorPalette?.text || '#1c1917' }}>Season</h4>
                  </div>
                  <p 
                    className="leading-relaxed pl-7"
                    style={{ color: colorPalette?.text || '#44403c', opacity: 0.8 }}
                  >
                    {mushroom.season}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf 
                      className="w-5 h-5" 
                      style={{ color: colorPalette?.primary || '#78716c' }}
                    />
                    <h4 style={{ color: colorPalette?.text || '#1c1917' }}>Key Features</h4>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {mushroom.identification.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 leading-relaxed"
                        style={{ color: colorPalette?.text || '#44403c', opacity: 0.8 }}
                      >
                        <span style={{ color: colorPalette?.primary || '#78716c' }}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Look-alikes Warning */}
              {mushroom.lookAlikes && (
                <div 
                  className="p-5 rounded-2xl mb-6 border-2"
                  style={{
                    backgroundColor: '#fef3c7',
                    borderColor: '#fbbf24',
                    transition: 'all 0.5s ease'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-amber-900 mb-1">Look-alikes Warning</h5>
                      <p className="text-amber-800 leading-relaxed">{mushroom.lookAlikes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Culinary Use */}
              {mushroom.culinaryUse && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <ChefHat 
                      className="w-5 h-5" 
                      style={{ color: colorPalette?.primary || '#78716c' }}
                    />
                    <h4 style={{ color: colorPalette?.text || '#1c1917' }}>Culinary Use</h4>
                  </div>
                  <p 
                    className="leading-relaxed pl-7"
                    style={{ color: colorPalette?.text || '#44403c', opacity: 0.8 }}
                  >
                    {mushroom.culinaryUse}
                  </p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl transition-all hover:opacity-90"
                style={{
                  backgroundColor: colorPalette?.primary || '#1c1917',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
