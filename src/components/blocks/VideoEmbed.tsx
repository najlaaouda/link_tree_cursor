import { Play } from 'lucide-react';
import type { ThemeConfig } from '../../types';

interface Props {
  videoUrl: string;
  title: string;
  theme: ThemeConfig;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function VideoEmbed({ videoUrl, title, theme }: Props) {
  const ytId = getYouTubeId(videoUrl);

  return (
    <div className="overflow-hidden" style={{ borderRadius: '16px' }}>
      {title && (
        <p className="text-sm font-medium mb-2" style={{ color: theme.textColor }}>
          {title}
        </p>
      )}
      {ytId ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="w-full h-44 rounded-xl flex flex-col items-center justify-center gap-2"
          style={{ backgroundColor: `${theme.primaryColor}10` }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Play size={20} className="text-white ml-0.5" />
          </div>
          <span className="text-xs" style={{ color: `${theme.textColor}70` }}>
            Video preview
          </span>
        </div>
      )}
    </div>
  );
}
