import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutList,
  LayoutGrid,
  UserCircle,
  Share2,
  GraduationCap,
  Clock,
  ArrowRight,
  Sparkles,
  Eye,
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import { templates } from '../data/templates';
import type { TemplateId } from '../types';
import TemplateMiniPreview from '../components/templates/TemplateMiniPreview';

const iconMap: Record<string, React.ReactNode> = {
  'layout-list': <LayoutList size={22} />,
  'layout-grid': <LayoutGrid size={22} />,
  'user-circle': <UserCircle size={22} />,
  'share-2': <Share2 size={22} />,
  'graduation-cap': <GraduationCap size={22} />,
  clock: <Clock size={22} />,
};

const categories = ['All', 'Simple', 'Creative', 'Professional', 'Social', 'Education'];

export default function TemplateGallery() {
  const { dispatch } = useBuilder();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  function handleSelect(id: TemplateId) {
    dispatch({ type: 'SELECT_TEMPLATE', templateId: id });
    navigate('/builder');
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900 font-[family-name:var(--font-display)]">
                Academyat
              </h1>
              <p className="text-xs text-surface-500">Link in Bio Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-surface-500">Choose your starting point</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={14} />
            <span>6 professionally designed templates</span>
          </div>
          <h2 className="text-4xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-3">
            Pick a Template to Start
          </h2>
          <p className="text-lg text-surface-500">
            Each template is fully customizable. Choose the layout that fits your brand and edit everything in the builder.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex justify-center">
          <div className="flex gap-2 p-1 bg-white rounded-2xl shadow-sm border border-surface-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                    : 'text-surface-600 hover:bg-surface-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template, i) => (
            <div
              key={template.id}
              className="animate-fade-in group"
              style={{ animationDelay: `${i * 80}ms` }}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  hoveredId === template.id
                    ? 'border-primary-400 shadow-xl shadow-primary-100 -translate-y-1'
                    : 'border-surface-200 shadow-sm'
                }`}
              >
                {/* Template Preview */}
                <div className="relative h-80 overflow-hidden bg-surface-100">
                  <TemplateMiniPreview templateId={template.id} />
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-surface-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                      hoveredId === template.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <button
                      onClick={() => handleSelect(template.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-surface-900 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors shadow-lg"
                    >
                      <span>Use This Template</span>
                      <ArrowRight size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white text-sm transition-colors">
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                        {iconMap[template.icon]}
                      </div>
                      <h3 className="font-semibold text-surface-900">{template.name}</h3>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 bg-surface-100 text-surface-600 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    {template.previewColors.map((color, j) => (
                      <div
                        key={j}
                        className="w-5 h-5 rounded-full border border-surface-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
