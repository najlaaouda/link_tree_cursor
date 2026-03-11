import { X } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { componentLibrary } from '../../data/templates';
import type { BlockData } from '../../types';

export default function RightSidebar() {
  const { state, dispatch } = useBuilder();
  const block = state.page.blocks.find((b) => b.id === state.selectedBlockId);

  if (!block) {
    return (
      <aside className="w-72 bg-white border-l border-surface-200 flex flex-col items-center justify-center p-6 shrink-0 text-center">
        <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-3">
          <span className="text-xl text-surface-400">🖱</span>
        </div>
        <p className="text-sm font-medium text-surface-600">Select a component</p>
        <p className="text-xs text-surface-400 mt-1">
          Click any element on the canvas to edit its properties
        </p>
      </aside>
    );
  }

  const libItem = componentLibrary.find((c) => c.type === block.type);

  function updateProp(key: string, value: unknown) {
    dispatch({ type: 'UPDATE_BLOCK', blockId: block!.id, props: { [key]: value } });
  }

  return (
    <aside className="w-72 bg-white border-l border-surface-200 flex flex-col shrink-0 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-surface-200 shrink-0">
        <div>
          <p className="text-sm font-semibold text-surface-900">{libItem?.label || block.type}</p>
          <p className="text-[10px] text-surface-400">Edit properties</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SELECT_BLOCK', blockId: null })}
          className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        <BlockSettingsForm block={block} updateProp={updateProp} />
      </div>
    </aside>
  );
}

function BlockSettingsForm({
  block,
  updateProp,
}: {
  block: BlockData;
  updateProp: (key: string, value: unknown) => void;
}) {
  const props = block.props;

  const textFields: Array<{ key: string; label: string; multiline?: boolean }> = [];
  const selectFields: Array<{ key: string; label: string; options: string[] }> = [];

  switch (block.type) {
    case 'link-button':
      textFields.push({ key: 'label', label: 'Button Text' }, { key: 'url', label: 'URL' });
      selectFields.push({ key: 'style', label: 'Style', options: ['primary', 'secondary', 'ghost'] });
      break;
    case 'course-card':
      textFields.push(
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', multiline: true },
        { key: 'price', label: 'Price' },
        { key: 'imageUrl', label: 'Image URL' },
        { key: 'url', label: 'Link URL' }
      );
      break;
    case 'product-card':
      textFields.push(
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', multiline: true },
        { key: 'price', label: 'Price' },
        { key: 'imageUrl', label: 'Image URL' },
        { key: 'url', label: 'Link URL' }
      );
      break;
    case 'video-embed':
      textFields.push({ key: 'title', label: 'Title' }, { key: 'videoUrl', label: 'Video URL' });
      break;
    case 'image-banner':
      textFields.push(
        { key: 'imageUrl', label: 'Image URL' },
        { key: 'altText', label: 'Alt Text' },
        { key: 'overlayText', label: 'Overlay Text' },
        { key: 'url', label: 'Link URL' }
      );
      break;
    case 'newsletter-signup':
      textFields.push(
        { key: 'heading', label: 'Heading' },
        { key: 'description', label: 'Description' },
        { key: 'buttonText', label: 'Button Text' },
        { key: 'placeholderText', label: 'Placeholder' }
      );
      break;
    case 'booking-link':
      textFields.push(
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'url', label: 'Booking URL' },
        { key: 'duration', label: 'Duration' }
      );
      break;
    case 'divider':
      selectFields.push({ key: 'style', label: 'Divider Style', options: ['line', 'dots', 'space'] });
      break;
    case 'text-section':
      textFields.push(
        { key: 'heading', label: 'Heading' },
        { key: 'body', label: 'Body Text', multiline: true }
      );
      break;
    case 'social-icons':
      return <SocialIconsEditor links={props.links as Array<{ platform: string; url: string }>} updateProp={updateProp} />;
    default:
      return <p className="text-sm text-surface-500">No settings available</p>;
  }

  return (
    <>
      {textFields.map((field) => (
        <div key={field.key}>
          <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          {field.multiline ? (
            <textarea
              value={(props[field.key] as string) || ''}
              onChange={(e) => updateProp(field.key, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none"
            />
          ) : (
            <input
              type="text"
              value={(props[field.key] as string) || ''}
              onChange={(e) => updateProp(field.key, e.target.value)}
              className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          )}
        </div>
      ))}
      {selectFields.map((field) => (
        <div key={field.key}>
          <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5 block">
            {field.label}
          </label>
          <select
            value={(props[field.key] as string) || field.options[0]}
            onChange={(e) => updateProp(field.key, e.target.value)}
            className="w-full px-3 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-primary-400 capitalize"
          >
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}

function SocialIconsEditor({
  links,
  updateProp,
}: {
  links: Array<{ platform: string; url: string }>;
  updateProp: (key: string, value: unknown) => void;
}) {
  const platforms = ['instagram', 'twitter', 'youtube', 'tiktok', 'linkedin', 'facebook'];

  function updateLink(index: number, field: string, value: string) {
    const updated = links.map((l, i) => (i === index ? { ...l, [field]: value } : l));
    updateProp('links', updated);
  }

  function addLink() {
    updateProp('links', [...links, { platform: 'instagram', url: '' }]);
  }

  function removeLink(index: number) {
    updateProp('links', links.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider block">
        Social Links
      </label>
      {links.map((link, i) => (
        <div key={i} className="space-y-1.5 p-3 bg-surface-50 rounded-xl">
          <div className="flex items-center gap-2">
            <select
              value={link.platform}
              onChange={(e) => updateLink(i, 'platform', e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs bg-white border border-surface-200 rounded-lg capitalize"
            >
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeLink(i)}
              className="p-1 rounded text-surface-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <input
            type="text"
            value={link.url}
            onChange={(e) => updateLink(i, 'url', e.target.value)}
            placeholder="https://..."
            className="w-full px-2 py-1.5 text-xs bg-white border border-surface-200 rounded-lg outline-none focus:border-primary-400"
          />
        </div>
      ))}
      <button
        onClick={addLink}
        className="w-full py-2 text-xs font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
      >
        + Add Social Link
      </button>
    </div>
  );
}
