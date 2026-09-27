import React from 'react';
import {
  Utensils,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  PawPrint,
  Camera,
  BellOff,
  Wind,
  Fan,
  Tv,
  Refrigerator,
  Microwave,
  UtensilsCrossed,
  Flame,
  Bed,
  Shirt,
  Sun,
  ArrowUpDown,
  CheckCircle,
} from 'lucide-react';

interface AmenityIconProps {
  name: string;
  className?: string;
}

export const AmenityIcon: React.FC<AmenityIconProps> = ({ name, className = 'w-6 h-6 text-[#222222]' }) => {
  const lower = name.toLowerCase();

  if (lower.includes('kitchen') || lower.includes('cookware')) return <Utensils className={className} />;
  if (lower.includes('wifi') || lower.includes('internet')) return <Wifi className={className} />;
  if (lower.includes('workspace') || lower.includes('laptop')) return <Laptop className={className} />;
  if (lower.includes('parking') || lower.includes('car')) return <Car className={className} />;
  if (lower.includes('pool')) return <Waves className={className} />;
  if (lower.includes('hot tub') || lower.includes('jacuzzi') || lower.includes('bath')) return <Bath className={className} />;
  if (lower.includes('pet')) return <PawPrint className={className} />;
  if (lower.includes('camera') || lower.includes('security')) return <Camera className={className} />;
  if (lower.includes('alarm') || lower.includes('carbon') || lower.includes('smoke')) return <BellOff className={className} />;
  if (lower.includes('air conditioning') || lower.includes('ac')) return <Wind className={className} />;
  if (lower.includes('fan')) return <Fan className={className} />;
  if (lower.includes('tv') || lower.includes('cable')) return <Tv className={className} />;
  if (lower.includes('refrigerator') || lower.includes('fridge')) return <Refrigerator className={className} />;
  if (lower.includes('microwave') || lower.includes('stove')) return <Microwave className={className} />;
  if (lower.includes('dishes') || lower.includes('silverware')) return <UtensilsCrossed className={className} />;
  if (lower.includes('water') || lower.includes('heater')) return <Flame className={className} />;
  if (lower.includes('bed') || lower.includes('linen') || lower.includes('pillow')) return <Bed className={className} />;
  if (lower.includes('hanger') || lower.includes('iron') || lower.includes('wardrobe')) return <Shirt className={className} />;
  if (lower.includes('balcony') || lower.includes('patio')) return <Sun className={className} />;
  if (lower.includes('elevator')) return <ArrowUpDown className={className} />;

  return <CheckCircle className={className} />;
};
