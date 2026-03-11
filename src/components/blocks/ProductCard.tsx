import { Package, ShoppingBag } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  url: string;
  theme: ThemeConfig;
}

export default function ProductCard({ title, description, price, imageUrl, theme }: Props) {
  const isElevated = theme.cardStyle === 'elevated';
  const isOutlined = theme.cardStyle === 'outlined';

  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderRadius: '16px',
        backgroundColor: `${theme.primaryColor}05`,
        boxShadow: isElevated ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
        border: isOutlined ? `1.5px solid ${theme.primaryColor}25` : isElevated ? 'none' : `1px solid ${theme.textColor}10`,
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-28 object-cover" />
      ) : (
        <div
          className="w-full h-28 flex items-center justify-center"
          style={{ backgroundColor: `${theme.primaryColor}10` }}
        >
          <Package size={28} style={{ color: theme.primaryColor, opacity: 0.4 }} />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1" style={{ color: theme.textColor }}>
          {title}
        </h3>
        <p className="text-xs mb-3" style={{ color: `${theme.textColor}80` }}>
          {description}
        </p>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors"
          style={{
            backgroundColor: theme.primaryColor,
            color: '#ffffff',
          }}
        >
          <ShoppingBag size={13} />
          <span>Get for {price}</span>
        </button>
      </div>
    </div>
  );
}
