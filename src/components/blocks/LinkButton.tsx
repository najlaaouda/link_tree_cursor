import { ExternalLink } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  label: string;
  url: string;
  style: string;
  theme: ThemeConfig;
}

const radiusMap = { rounded: '12px', pill: '9999px', square: '6px' };

export default function LinkButton({ label, style, theme }: Props) {
  const isPrimary = style === 'primary';
  const radius = radiusMap[theme.buttonStyle] || '12px';

  return (
    <button
      className="w-full flex items-center justify-between px-5 py-3.5 font-medium text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
      style={{
        borderRadius: radius,
        backgroundColor: isPrimary ? theme.primaryColor : 'transparent',
        color: isPrimary ? '#ffffff' : theme.textColor,
        border: isPrimary ? 'none' : `1.5px solid ${theme.textColor}20`,
      }}
    >
      <span>{label}</span>
      <ExternalLink size={14} style={{ opacity: 0.6 }} />
    </button>
  );
}
