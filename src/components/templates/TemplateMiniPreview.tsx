import type { TemplateId } from '../../types';

interface Props {
  templateId: TemplateId;
}

export default function TemplateMiniPreview({ templateId }: Props) {
  switch (templateId) {
    case 'minimal':
      return <MinimalPreview />;
    case 'card-grid':
      return <CardGridPreview />;
    case 'hero-profile':
      return <HeroProfilePreview />;
    case 'social-first':
      return <SocialFirstPreview />;
    case 'course-showcase':
      return <CourseShowcasePreview />;
    case 'timeline':
      return <TimelinePreview />;
    default:
      return <MinimalPreview />;
  }
}

function MinimalPreview() {
  return (
    <div className="h-full bg-white flex flex-col items-center pt-10 px-8">
      <div className="w-16 h-16 rounded-full bg-surface-200 mb-3" />
      <div className="w-28 h-3 bg-surface-200 rounded mb-2" />
      <div className="w-40 h-2 bg-surface-100 rounded mb-6" />
      <div className="w-full space-y-2.5">
        {['bg-surface-800', 'bg-surface-200', 'bg-surface-200', 'bg-surface-200'].map((c, i) => (
          <div key={i} className={`w-full h-10 ${c} rounded-lg`} />
        ))}
      </div>
      <div className="flex gap-3 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-7 h-7 rounded-full bg-surface-100" />
        ))}
      </div>
    </div>
  );
}

function CardGridPreview() {
  return (
    <div className="h-full bg-[#eff3ff] flex flex-col items-center pt-8 px-6">
      <div className="w-14 h-14 rounded-full bg-primary-200 mb-2" />
      <div className="w-24 h-3 bg-primary-200 rounded mb-1" />
      <div className="w-32 h-2 bg-primary-100 rounded mb-5" />
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
            <div className="w-full h-12 bg-primary-100 rounded-lg mb-2" />
            <div className="w-16 h-2 bg-surface-200 rounded mb-1" />
            <div className="w-10 h-2 bg-primary-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroProfilePreview() {
  return (
    <div className="h-full bg-[#0f172a] flex flex-col">
      <div className="h-24 bg-gradient-to-br from-primary-600 to-primary-800 relative">
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-surface-300 border-4 border-[#0f172a]" />
      </div>
      <div className="flex flex-col items-center mt-8 px-6">
        <div className="w-28 h-3 bg-surface-600 rounded mb-2" />
        <div className="w-36 h-2 bg-surface-700 rounded mb-5" />
        <div className="w-full h-10 bg-primary-600 rounded-full mb-2.5" />
        <div className="w-full h-10 bg-surface-700 rounded-full mb-4" />
        <div className="w-full bg-surface-800 rounded-xl p-3">
          <div className="w-full h-14 bg-surface-700 rounded-lg mb-2" />
          <div className="w-20 h-2 bg-surface-600 rounded mb-1" />
          <div className="w-14 h-2 bg-primary-400 rounded" />
        </div>
      </div>
    </div>
  );
}

function SocialFirstPreview() {
  return (
    <div className="h-full bg-[#faf5ff] flex flex-col items-center pt-10 px-8">
      <div className="w-16 h-16 rounded-full bg-violet-200 mb-3" />
      <div className="w-28 h-3 bg-violet-300 rounded mb-4" />
      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-violet-200" />
        ))}
      </div>
      <div className="w-full h-28 bg-white rounded-xl shadow-sm mb-3 p-3">
        <div className="w-full h-16 bg-violet-100 rounded-lg mb-2" />
        <div className="w-20 h-2 bg-surface-200 rounded" />
      </div>
      <div className="w-full space-y-2">
        <div className="w-full h-9 bg-violet-500 rounded-full" />
        <div className="w-full h-9 bg-violet-200 rounded-full" />
      </div>
    </div>
  );
}

function CourseShowcasePreview() {
  return (
    <div className="h-full bg-[#f0fdf4] flex flex-col items-center pt-8 px-6">
      <div className="w-14 h-14 rounded-full bg-emerald-200 mb-2" />
      <div className="w-24 h-3 bg-emerald-300 rounded mb-1" />
      <div className="w-32 h-2 bg-emerald-100 rounded mb-4" />
      <div className="w-full text-left mb-2">
        <div className="w-16 h-2 bg-emerald-400 rounded" />
      </div>
      <div className="w-full space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-3 flex gap-3 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg shrink-0" />
            <div className="flex-1">
              <div className="w-20 h-2.5 bg-surface-200 rounded mb-1.5" />
              <div className="w-28 h-2 bg-surface-100 rounded mb-2" />
              <div className="w-10 h-2.5 bg-emerald-500 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelinePreview() {
  return (
    <div className="h-full bg-[#fffbeb] flex flex-col items-center pt-8 px-6">
      <div className="w-14 h-14 rounded-full bg-amber-200 mb-2" />
      <div className="w-24 h-3 bg-amber-300 rounded mb-5" />
      <div className="w-full relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-amber-300" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative mb-3">
            <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#fffbeb]" />
            <div className="bg-white rounded-lg p-2.5 shadow-sm">
              <div className="w-16 h-2 bg-amber-200 rounded mb-1.5" />
              <div className="w-full h-2 bg-surface-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
