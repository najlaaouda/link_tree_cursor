import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  title: string;
  description: string;
  url: string;
  duration: string;
  theme: ThemeConfig;
}

export default function BookingLink({ title, description, duration, theme }: Props) {
  return (
    <div
      className="flex items-center gap-4 p-4 transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderRadius: '16px',
        backgroundColor: `${theme.primaryColor}08`,
        border: `1px solid ${theme.primaryColor}15`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${theme.primaryColor}15` }}
      >
        <Calendar size={20} style={{ color: theme.primaryColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm" style={{ color: theme.textColor }}>
          {title}
        </h3>
        <p className="text-xs" style={{ color: `${theme.textColor}70` }}>
          {description}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Clock size={10} style={{ color: `${theme.textColor}50` }} />
          <span className="text-[10px]" style={{ color: `${theme.textColor}50` }}>
            {duration}
          </span>
        </div>
      </div>
      <ArrowRight size={16} style={{ color: theme.primaryColor }} />
    </div>
  );
}
