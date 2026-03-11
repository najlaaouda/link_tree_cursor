import type { TemplateInfo, ComponentLibraryItem, PageConfig, BlockData } from '../types';

export const templates: TemplateInfo[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, distraction-free list of links. Perfect for coaches who want simplicity.',
    category: 'Simple',
    previewColors: ['#ffffff', '#f8fafc', '#1e293b'],
    icon: 'layout-list',
  },
  {
    id: 'card-grid',
    name: 'Card Grid',
    description: 'Bento-style grid layout showcasing content in visual cards.',
    category: 'Creative',
    previewColors: ['#eff3ff', '#3b5bf5', '#ffffff'],
    icon: 'layout-grid',
  },
  {
    id: 'hero-profile',
    name: 'Hero Profile',
    description: 'Bold header with cover image and prominent profile section.',
    category: 'Professional',
    previewColors: ['#1e293b', '#3b5bf5', '#ffffff'],
    icon: 'user-circle',
  },
  {
    id: 'social-first',
    name: 'Social First',
    description: 'Social media icons front and center, with links below.',
    category: 'Social',
    previewColors: ['#faf5ff', '#8b5cf6', '#1e293b'],
    icon: 'share-2',
  },
  {
    id: 'course-showcase',
    name: 'Course Showcase',
    description: 'Designed to highlight courses and digital products with rich cards.',
    category: 'Education',
    previewColors: ['#f0fdf4', '#10b981', '#1e293b'],
    icon: 'graduation-cap',
  },
  {
    id: 'timeline',
    name: 'Timeline Stack',
    description: 'Stacked timeline layout, great for storytelling and sequential content.',
    category: 'Creative',
    previewColors: ['#fff7ed', '#f59e0b', '#1e293b'],
    icon: 'clock',
  },
];

export const componentLibrary: ComponentLibraryItem[] = [
  {
    type: 'link-button',
    label: 'Link Button',
    description: 'A clickable button linking to any URL',
    icon: 'link',
    defaultProps: {
      label: 'Visit My Website',
      url: 'https://example.com',
      style: 'primary',
    },
  },
  {
    type: 'course-card',
    label: 'Course Card',
    description: 'Showcase a course with image, title and price',
    icon: 'book-open',
    defaultProps: {
      title: 'My Online Course',
      description: 'Learn the fundamentals in this comprehensive course',
      price: '$49',
      imageUrl: '',
      url: 'https://example.com/course',
    },
  },
  {
    type: 'product-card',
    label: 'Product Card',
    description: 'Display a digital product for sale',
    icon: 'package',
    defaultProps: {
      title: 'Digital Product',
      description: 'Premium digital resource for your growth',
      price: '$29',
      imageUrl: '',
      url: 'https://example.com/product',
    },
  },
  {
    type: 'social-icons',
    label: 'Social Icons',
    description: 'Row of social media profile links',
    icon: 'share-2',
    defaultProps: {
      links: [
        { platform: 'instagram', url: '' },
        { platform: 'twitter', url: '' },
        { platform: 'youtube', url: '' },
        { platform: 'tiktok', url: '' },
      ],
    },
  },
  {
    type: 'video-embed',
    label: 'Video Embed',
    description: 'Embed a YouTube or Vimeo video',
    icon: 'play-circle',
    defaultProps: {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Watch My Latest Video',
    },
  },
  {
    type: 'image-banner',
    label: 'Image Banner',
    description: 'Full-width image banner with optional text overlay',
    icon: 'image',
    defaultProps: {
      imageUrl: '',
      altText: 'Banner image',
      overlayText: '',
      url: '',
    },
  },
  {
    type: 'newsletter-signup',
    label: 'Newsletter Signup',
    description: 'Email capture form for your newsletter',
    icon: 'mail',
    defaultProps: {
      heading: 'Join My Newsletter',
      description: 'Get weekly tips and insights delivered to your inbox',
      buttonText: 'Subscribe',
      placeholderText: 'Enter your email',
    },
  },
  {
    type: 'booking-link',
    label: 'Booking Link',
    description: 'Calendar booking link for consultations',
    icon: 'calendar',
    defaultProps: {
      title: 'Book a Consultation',
      description: '30-minute free strategy call',
      url: 'https://calendly.com',
      duration: '30 min',
    },
  },
  {
    type: 'divider',
    label: 'Divider',
    description: 'Visual separator between sections',
    icon: 'minus',
    defaultProps: {
      style: 'line',
    },
  },
  {
    type: 'text-section',
    label: 'Text Section',
    description: 'Heading and paragraph text block',
    icon: 'type',
    defaultProps: {
      heading: 'About Me',
      body: 'I help coaches and creators build their online presence.',
    },
  },
];

function makeBlock(type: BlockData['type'], overrides: Record<string, unknown> = {}): BlockData {
  const lib = componentLibrary.find((c) => c.type === type)!;
  return {
    id: `${type}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    props: { ...lib.defaultProps, ...overrides },
  };
}

export const defaultThemes: Record<string, Partial<import('../types').ThemeConfig>> = {
  minimal: {
    primaryColor: '#1e293b',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    cardStyle: 'flat',
  },
  'card-grid': {
    primaryColor: '#3b5bf5',
    backgroundColor: '#eff3ff',
    textColor: '#1e293b',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
  },
  'hero-profile': {
    primaryColor: '#3b5bf5',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    fontFamily: 'Space Grotesk',
    buttonStyle: 'pill',
    cardStyle: 'elevated',
  },
  'social-first': {
    primaryColor: '#8b5cf6',
    backgroundColor: '#faf5ff',
    textColor: '#1e293b',
    fontFamily: 'Inter',
    buttonStyle: 'pill',
    cardStyle: 'flat',
  },
  'course-showcase': {
    primaryColor: '#10b981',
    backgroundColor: '#f0fdf4',
    textColor: '#1e293b',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
  },
  timeline: {
    primaryColor: '#f59e0b',
    backgroundColor: '#fffbeb',
    textColor: '#1e293b',
    fontFamily: 'Space Grotesk',
    buttonStyle: 'square',
    cardStyle: 'outlined',
  },
};

export function getDefaultPageConfig(templateId: string): PageConfig {
  const theme = defaultThemes[templateId] || defaultThemes.minimal;

  const blockSets: Record<string, BlockData[]> = {
    minimal: [
      makeBlock('text-section', { heading: 'Hey, I\'m Sarah!', body: 'Coach & Course Creator helping you grow your online business.' }),
      makeBlock('link-button', { label: '📚 My Latest Course', url: '#', style: 'primary' }),
      makeBlock('link-button', { label: '📝 Read My Blog', url: '#', style: 'secondary' }),
      makeBlock('link-button', { label: '🎙️ Listen to My Podcast', url: '#', style: 'secondary' }),
      makeBlock('booking-link', { title: '📅 Book a Free Call', description: '30-min strategy session', url: '#', duration: '30 min' }),
      makeBlock('divider'),
      makeBlock('social-icons'),
    ],
    'card-grid': [
      makeBlock('course-card', { title: 'Business Mastery', description: 'Build a 6-figure coaching business', price: '$197', url: '#' }),
      makeBlock('course-card', { title: 'Content Creation', description: 'Create content that converts', price: '$97', url: '#' }),
      makeBlock('product-card', { title: 'Planning Template', description: 'Annual business planning kit', price: '$29', url: '#' }),
      makeBlock('product-card', { title: 'Social Media Kit', description: '100+ ready-made templates', price: '$39', url: '#' }),
      makeBlock('link-button', { label: 'Visit My Website', url: '#', style: 'primary' }),
      makeBlock('social-icons'),
    ],
    'hero-profile': [
      makeBlock('image-banner', { overlayText: 'Empowering Coaches Worldwide', altText: 'Hero banner' }),
      makeBlock('text-section', { heading: 'Transform Your Coaching Business', body: 'I\'ve helped 500+ coaches build thriving online businesses.' }),
      makeBlock('link-button', { label: 'Start Your Journey', url: '#', style: 'primary' }),
      makeBlock('link-button', { label: 'Watch Free Masterclass', url: '#', style: 'secondary' }),
      makeBlock('course-card', { title: 'Signature Program', description: 'The complete coaching toolkit', price: '$497', url: '#' }),
      makeBlock('newsletter-signup'),
      makeBlock('social-icons'),
    ],
    'social-first': [
      makeBlock('social-icons', {
        links: [
          { platform: 'instagram', url: '#' },
          { platform: 'youtube', url: '#' },
          { platform: 'tiktok', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'linkedin', url: '#' },
        ],
      }),
      makeBlock('video-embed', { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'My Latest Video' }),
      makeBlock('link-button', { label: 'Join My Community', url: '#', style: 'primary' }),
      makeBlock('link-button', { label: 'Free Resources', url: '#', style: 'secondary' }),
      makeBlock('newsletter-signup', { heading: 'Stay Connected', description: 'Weekly tips for creators' }),
    ],
    'course-showcase': [
      makeBlock('text-section', { heading: 'My Courses', body: 'Premium learning experiences designed for ambitious creators.' }),
      makeBlock('course-card', { title: 'Coaching Accelerator', description: 'Go from idea to income in 90 days', price: '$297', url: '#' }),
      makeBlock('course-card', { title: 'Launch Blueprint', description: 'Step-by-step launch system', price: '$197', url: '#' }),
      makeBlock('course-card', { title: 'Content Mastery', description: 'Create content that sells', price: '$97', url: '#' }),
      makeBlock('divider'),
      makeBlock('product-card', { title: 'Free Starter Guide', description: 'Begin your coaching journey', price: 'Free', url: '#' }),
      makeBlock('booking-link', { title: 'Need Help Choosing?', description: 'Let\'s find the right program for you', url: '#', duration: '15 min' }),
      makeBlock('social-icons'),
    ],
    timeline: [
      makeBlock('text-section', { heading: '2024 Journey', body: 'Follow along as I build in public and share everything I learn.' }),
      makeBlock('link-button', { label: '🚀 Latest Launch', url: '#', style: 'primary' }),
      makeBlock('course-card', { title: 'Q4: Scale System', description: 'My framework for scaling to $100K', price: '$197', url: '#' }),
      makeBlock('video-embed', { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Behind the Scenes' }),
      makeBlock('link-button', { label: '📖 Read the Full Story', url: '#', style: 'secondary' }),
      makeBlock('newsletter-signup', { heading: 'Follow My Journey', description: 'Monthly updates on building in public' }),
      makeBlock('social-icons'),
    ],
  };

  return {
    templateId: templateId as PageConfig['templateId'],
    profile: {
      name: 'Sarah Johnson',
      bio: 'Coach & Creator | Helping you build your dream business',
      avatarUrl: '',
      coverUrl: '',
    },
    theme: {
      primaryColor: theme.primaryColor || '#3b5bf5',
      backgroundColor: theme.backgroundColor || '#ffffff',
      textColor: theme.textColor || '#1e293b',
      fontFamily: theme.fontFamily || 'Inter',
      buttonStyle: theme.buttonStyle || 'rounded',
      cardStyle: theme.cardStyle || 'flat',
    },
    blocks: blockSets[templateId] || blockSets.minimal,
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
    username: 'sarah-johnson',
    isPublished: false,
  };
}
