import type { ThemeConfig } from '../../types';

interface Props {
  style: string;
  theme: ThemeConfig;
}

export default function Divider({ style: dividerStyle, theme }: Props) {
  if (dividerStyle === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `${theme.textColor}30` }}
          />
        ))}
      </div>
    );
  }

  if (dividerStyle === 'space') {
    return <div className="py-4" />;
  }

  return (
    <div className="py-4">
      <div className="w-full h-px" style={{ backgroundColor: `${theme.textColor}15` }} />
    </div>
  );
}
