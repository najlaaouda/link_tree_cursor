import { ImageIcon } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  imageUrl: string;
  altText: string;
  overlayText: string;
  url: string;
  theme: ThemeConfig;
}

export default function ImageBanner({ imageUrl, altText, overlayText, theme }: Props) {
  return (
    <div className="relative w-full h-40 rounded-2xl overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}30, ${theme.primaryColor}10)`,
          }}
        >
          <ImageIcon size={32} style={{ color: `${theme.primaryColor}60` }} />
        </div>
      )}
      {overlayText && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <p className="text-white font-bold text-lg text-center px-4">{overlayText}</p>
        </div>
      )}
    </div>
  );
}
