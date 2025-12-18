import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Mushroom } from '../data/mushrooms';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MushroomCardProps {
  mushroom: Mushroom;
  onClick: () => void;
}

export function MushroomCard({ mushroom, onClick }: MushroomCardProps) {
  const edibilityConfig = {
    edible: {
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      label: 'Edible'
    },
    poisonous: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'Poisonous'
    },
    inedible: {
      icon: AlertCircle,
      color: 'text-stone-600',
      bg: 'bg-stone-50',
      border: 'border-stone-200',
      label: 'Inedible'
    }
  };

  const config = edibilityConfig[mushroom.edibility];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-stone-100">
        <ImageWithFallback
          src={mushroom.image}
          alt={mushroom.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className={`absolute top-4 right-4 ${config.bg} ${config.border} border backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
          <span className={`text-xs ${config.color}`}>{config.label}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-stone-900 group-hover:text-stone-600 transition-colors">{mushroom.name}</h3>
        <p className="text-stone-500 italic">{mushroom.scientificName}</p>
      </div>
    </div>
  );
}
