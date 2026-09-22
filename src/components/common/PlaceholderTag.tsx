import React from 'react';
import { Sparkles } from 'lucide-react';

interface PlaceholderTagProps {
  label: string;
}

export const PlaceholderTag: React.FC<PlaceholderTagProps> = ({ label }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 border border-red-200 text-red-700 text-2xs font-semibold mb-2">
      <Sparkles className="w-3 h-3 text-red-500" />
      <span>{label}</span>
    </div>
  );
};
