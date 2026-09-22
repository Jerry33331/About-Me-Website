import React from 'react';
import { Image as ImageIcon, Video, User } from 'lucide-react';

interface PlaceholderImageProps {
  label: string;
  dimensions?: string;
  type?: 'image' | 'video' | 'avatar';
  className?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label,
  dimensions = '400 × 300',
  type = 'image',
  className = ''
}) => {
  return (
    <div
      className={`relative w-full rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50/60 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-center text-emerald-600 mb-3">
        {type === 'video' ? (
          <Video className="w-6 h-6 text-red-600" />
        ) : type === 'avatar' ? (
          <User className="w-6 h-6 text-emerald-700" />
        ) : (
          <ImageIcon className="w-6 h-6 text-emerald-700" />
        )}
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
        {label}
      </span>

      <span className="text-2xs font-mono text-emerald-600/80 bg-emerald-100/60 px-2 py-0.5 rounded-sm">
        {dimensions} • Temporary Placeholder
      </span>

      <p className="text-2xs text-zinc-400 mt-2 max-w-xs">
        Replace this placeholder box with your own uploaded media file when ready.
      </p>
    </div>
  );
};
