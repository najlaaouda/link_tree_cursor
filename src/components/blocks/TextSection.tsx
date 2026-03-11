import type { ThemeConfig } from '../../types';

interface Props {
  heading: string;
  body: string;
  theme: ThemeConfig;
}

export default function TextSection({ heading, body, theme }: Props) {
  return (
    <div className="py-1">
      {heading && (
        <h2 className="font-bold text-base mb-1" style={{ color: theme.textColor }}>
          {heading}
        </h2>
      )}
      {body && (
        <p className="text-sm leading-relaxed" style={{ color: `${theme.textColor}90` }}>
          {body}
        </p>
      )}
    </div>
  );
}
