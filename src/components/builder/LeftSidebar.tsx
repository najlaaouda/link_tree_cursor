import { useState } from 'react';
import {
  Link,
  BookOpen,
  Package,
  Share2,
  PlayCircle,
  ImageIcon,
  Mail,
  Calendar,
  Minus,
  Type,
  Palette,
  User,
  Search,
  GripVertical,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { componentLibrary } from '../../data/templates';
import type { BlockType } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  link: <Link size={16} />,
  'book-open': <BookOpen size={16} />,
  package: <Package size={16} />,
  'share-2': <Share2 size={16} />,
  'play-circle': <PlayCircle size={16} />,
  image: <ImageIcon size={16} />,
  mail: <Mail size={16} />,
  calendar: <Calendar size={16} />,
  minus: <Minus size={16} />,
  type: <Type size={16} />,
};

type Tab = 'components' | 'design' | 'profile';

export default function LeftSidebar() {
  const [tab, setTab] = useState<Tab>('components');
  const [search, setSearch] = useState('');
  const { state, dispatch } = useBuilder();

  const filtered = componentLibrary.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  function addBlock(type: BlockType) {
    const lib = componentLibrary.find((c) => c.type === type)!;
    dispatch({
      type: 'ADD_BLOCK',
      block: {
        id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        props: { ...lib.defaultProps },
      },
    });
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'components', label: 'Add', icon: <Package size={14} /> },
    { id: 'design', label: 'Style', icon: <Palette size={14} /> },
    { id: 'profile', label: 'Profile', icon: <User size={14} /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-surface-200 flex flex-col shrink-0 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-surface-200 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
              tab === t.id
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {tab === 'components' && (
          <div className="p-3">
            {/* Search */}
            <div className="relative mb-3">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400"
              />
              <input
                type="text"
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-surface-400 mb-2 px-1">
              Drag or click to add
            </p>

            <div className="space-y-1.5">
              {filtered.map((comp) => (
                <button
                  key={comp.type}
                  onClick={() => addBlock(comp.type)}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 active:bg-surface-100 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                    {iconMap[comp.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-800">{comp.label}</p>
                    <p className="text-[11px] text-surface-400 leading-snug">{comp.description}</p>
                  </div>
                  <GripVertical
                    size={14}
                    className="text-surface-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'design' && (
          <div className="p-4 space-y-5">
            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.page.theme.primaryColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { primaryColor: e.target.value } })
                  }
                  className="w-10 h-10 rounded-xl border-2 border-surface-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={state.page.theme.primaryColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { primaryColor: e.target.value } })
                  }
                  className="flex-1 px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.page.theme.backgroundColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { backgroundColor: e.target.value } })
                  }
                  className="w-10 h-10 rounded-xl border-2 border-surface-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={state.page.theme.backgroundColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { backgroundColor: e.target.value } })
                  }
                  className="flex-1 px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.page.theme.textColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { textColor: e.target.value } })
                  }
                  className="w-10 h-10 rounded-xl border-2 border-surface-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={state.page.theme.textColor}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_THEME', theme: { textColor: e.target.value } })
                  }
                  className="flex-1 px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Font Family
              </label>
              <select
                value={state.page.theme.fontFamily}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_THEME', theme: { fontFamily: e.target.value } })
                }
                className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl"
              >
                <option value="Inter">Inter</option>
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="system-ui">System UI</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Button Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['rounded', 'pill', 'square'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => dispatch({ type: 'UPDATE_THEME', theme: { buttonStyle: s } })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all capitalize ${
                      state.page.theme.buttonStyle === s
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-surface-200 text-surface-600 hover:border-surface-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Card Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['flat', 'elevated', 'outlined'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => dispatch({ type: 'UPDATE_THEME', theme: { cardStyle: s } })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all capitalize ${
                      state.page.theme.cardStyle === s
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-surface-200 text-surface-600 hover:border-surface-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Quick Themes
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Ocean', primary: '#2563eb', bg: '#eff6ff', text: '#1e3a5f' },
                  { name: 'Forest', primary: '#16a34a', bg: '#f0fdf4', text: '#14532d' },
                  { name: 'Sunset', primary: '#ea580c', bg: '#fff7ed', text: '#7c2d12' },
                  { name: 'Grape', primary: '#7c3aed', bg: '#faf5ff', text: '#3b0764' },
                  { name: 'Rose', primary: '#e11d48', bg: '#fff1f2', text: '#4c0519' },
                  { name: 'Midnight', primary: '#6366f1', bg: '#0f172a', text: '#e2e8f0' },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_THEME',
                        theme: { primaryColor: t.primary, backgroundColor: t.bg, textColor: t.text },
                      })
                    }
                    className="flex items-center gap-2 p-2 rounded-lg border border-surface-200 hover:border-surface-300 transition-colors"
                  >
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: t.primary }} />
                      <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: t.bg }} />
                    </div>
                    <span className="text-xs font-medium text-surface-700">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Display Name
              </label>
              <input
                type="text"
                value={state.page.profile.name}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_PROFILE', profile: { name: e.target.value } })
                }
                className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Bio
              </label>
              <textarea
                value={state.page.profile.bio}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_PROFILE', profile: { bio: e.target.value } })
                }
                rows={3}
                className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Avatar URL
              </label>
              <input
                type="text"
                value={state.page.profile.avatarUrl}
                onChange={(e) =>
                  dispatch({ type: 'UPDATE_PROFILE', profile: { avatarUrl: e.target.value } })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 block">
                Username (URL)
              </label>
              <div className="flex items-center bg-surface-50 border border-surface-200 rounded-xl overflow-hidden">
                <span className="px-3 text-xs text-surface-400 bg-surface-100 py-2 border-r border-surface-200">
                  academy.com/
                </span>
                <input
                  type="text"
                  value={state.page.username}
                  onChange={(e) =>
                    dispatch({ type: 'SET_USERNAME', username: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
