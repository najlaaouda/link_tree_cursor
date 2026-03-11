import { BookOpen, ArrowRight } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  url: string;
  theme: ThemeConfig;
}

export default function CourseCard({ title, description, price, imageUrl, theme }: Props) {
  const isElevated = theme.cardStyle === 'elevated';
  const isOutlined = theme.cardStyle === 'outlined';

  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderRadius: '16px',
        backgroundColor: `${theme.primaryColor}08`,
        boxShadow: isElevated ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        border: isOutlined ? `1.5px solid ${theme.primaryColor}25` : isElevated ? 'none' : `1px solid ${theme.textColor}10`,
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
      ) : (
        <div
          className="w-full h-32 flex items-center justify-center"
          style={{ backgroundColor: `${theme.primaryColor}15` }}
        >
          <BookOpen size={32} style={{ color: theme.primaryColor, opacity: 0.5 }} />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1" style={{ color: theme.textColor }}>
          {title}
        </h3>
        <p className="text-xs mb-3" style={{ color: `${theme.textColor}90` }}>
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: theme.primaryColor }}>
            {price}
          </span>
          <div
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: theme.primaryColor }}
          >
            <span>Enroll</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
