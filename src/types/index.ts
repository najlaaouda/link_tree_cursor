export type TemplateId = 'minimal' | 'card-grid' | 'hero-profile' | 'social-first' | 'course-showcase' | 'timeline';

export type BlockType =
  | 'link-button'
  | 'course-card'
  | 'product-card'
  | 'social-icons'
  | 'video-embed'
  | 'image-banner'
  | 'newsletter-signup'
  | 'booking-link'
  | 'divider'
  | 'text-section';

export interface BlockData {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
}

export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'pill' | 'square';
  cardStyle: 'flat' | 'elevated' | 'outlined';
}

export interface PageConfig {
  templateId: TemplateId;
  profile: ProfileData;
  theme: ThemeConfig;
  blocks: BlockData[];
  socialLinks: SocialLink[];
  username: string;
  isPublished: boolean;
}

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  previewColors: string[];
  icon: string;
}

export interface ComponentLibraryItem {
  type: BlockType;
  label: string;
  description: string;
  icon: string;
  defaultProps: Record<string, unknown>;
}
