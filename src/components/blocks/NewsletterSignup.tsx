import { Mail } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  heading: string;
  description: string;
  buttonText: string;
  placeholderText: string;
  theme: ThemeConfig;
}

export default function NewsletterSignup({ heading, description, buttonText, placeholderText, theme }: Props) {
  const radius = theme.buttonStyle === 'pill' ? '9999px' : theme.buttonStyle === 'square' ? '6px' : '12px';

  return (
    <div
      className="p-5"
      style={{
        borderRadius: '16px',
        backgroundColor: `${theme.primaryColor}08`,
        border: `1px solid ${theme.primaryColor}15`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Mail size={16} style={{ color: theme.primaryColor }} />
        <h3 className="font-semibold text-sm" style={{ color: theme.textColor }}>
          {heading}
        </h3>
      </div>
      <p className="text-xs mb-3" style={{ color: `${theme.textColor}70` }}>
        {description}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder={placeholderText}
          className="flex-1 px-3 py-2.5 text-xs outline-none"
          style={{
            borderRadius: radius,
            border: `1px solid ${theme.textColor}20`,
            backgroundColor: 'white',
            color: theme.textColor,
          }}
        />
        <button
          className="px-4 py-2.5 text-xs font-semibold text-white shrink-0"
          style={{ borderRadius: radius, backgroundColor: theme.primaryColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
