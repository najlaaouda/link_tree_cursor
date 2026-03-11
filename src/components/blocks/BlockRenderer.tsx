import type { BlockData, ThemeConfig } from '../../types';
import LinkButton from './LinkButton';
import CourseCard from './CourseCard';
import ProductCard from './ProductCard';
import SocialIcons from './SocialIcons';
import VideoEmbed from './VideoEmbed';
import ImageBanner from './ImageBanner';
import NewsletterSignup from './NewsletterSignup';
import BookingLink from './BookingLink';
import Divider from './Divider';
import TextSection from './TextSection';

interface Props {
  block: BlockData;
  theme: ThemeConfig;
  isSelected?: boolean;
  onClick?: () => void;
  isEditing?: boolean;
}

export default function BlockRenderer({ block, theme, isSelected, onClick, isEditing }: Props) {
  const content = renderBlock(block, theme);

  if (!isEditing) return content;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`relative group cursor-pointer transition-all duration-200 rounded-xl ${
        isSelected
          ? 'ring-2 ring-primary-500 ring-offset-2'
          : 'hover:ring-2 hover:ring-primary-300 hover:ring-offset-2'
      }`}
    >
      {content}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      )}
    </div>
  );
}

function renderBlock(block: BlockData, theme: ThemeConfig) {
  const p = block.props;
  switch (block.type) {
    case 'link-button':
      return <LinkButton label={p.label as string} url={p.url as string} style={p.style as string} theme={theme} />;
    case 'course-card':
      return <CourseCard title={p.title as string} description={p.description as string} price={p.price as string} imageUrl={p.imageUrl as string} url={p.url as string} theme={theme} />;
    case 'product-card':
      return <ProductCard title={p.title as string} description={p.description as string} price={p.price as string} imageUrl={p.imageUrl as string} url={p.url as string} theme={theme} />;
    case 'social-icons':
      return <SocialIcons links={p.links as Array<{ platform: string; url: string }>} theme={theme} />;
    case 'video-embed':
      return <VideoEmbed videoUrl={p.videoUrl as string} title={p.title as string} theme={theme} />;
    case 'image-banner':
      return <ImageBanner imageUrl={p.imageUrl as string} altText={p.altText as string} overlayText={p.overlayText as string} url={p.url as string} theme={theme} />;
    case 'newsletter-signup':
      return <NewsletterSignup heading={p.heading as string} description={p.description as string} buttonText={p.buttonText as string} placeholderText={p.placeholderText as string} theme={theme} />;
    case 'booking-link':
      return <BookingLink title={p.title as string} description={p.description as string} url={p.url as string} duration={p.duration as string} theme={theme} />;
    case 'divider':
      return <Divider style={p.style as string} theme={theme} />;
    case 'text-section':
      return <TextSection heading={p.heading as string} body={p.body as string} theme={theme} />;
    default:
      return <div className="p-4 text-sm text-surface-500">Unknown block type</div>;
  }
}
