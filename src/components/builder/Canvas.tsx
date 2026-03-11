import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, User } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import BlockRenderer from '../blocks/BlockRenderer';
import type { BlockData } from '../../types';

export default function Canvas() {
  const { state, dispatch } = useBuilder();
  const { page, selectedBlockId, previewMode } = state;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = page.blocks.findIndex((b) => b.id === active.id);
    const newIndex = page.blocks.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(page.blocks, oldIndex, newIndex);
    dispatch({ type: 'REORDER_BLOCKS', blocks: reordered });
  }

  const isMobile = previewMode === 'mobile';
  const frameWidth = isMobile ? 'max-w-[390px]' : 'max-w-[780px]';

  return (
    <main
      className="flex-1 flex items-start justify-center overflow-y-auto p-6"
      onClick={() => dispatch({ type: 'SELECT_BLOCK', blockId: null })}
    >
      <div className={`w-full ${frameWidth} transition-all duration-500 ease-out`}>
        {/* Phone frame (mobile mode) */}
        {isMobile && (
          <div className="mx-auto w-[140px] h-[5px] bg-surface-300 rounded-full mb-2" />
        )}

        <div
          className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
            isMobile
              ? 'shadow-2xl shadow-surface-300/50 border border-surface-200'
              : 'shadow-lg border border-surface-200'
          }`}
          style={{ backgroundColor: page.theme.backgroundColor }}
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center pt-10 pb-4 px-6">
            {page.profile.avatarUrl ? (
              <img
                src={page.profile.avatarUrl}
                alt={page.profile.name}
                className="w-20 h-20 rounded-full object-cover border-4 mb-3"
                style={{ borderColor: `${page.theme.primaryColor}30` }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${page.theme.primaryColor}15` }}
              >
                <User size={32} style={{ color: `${page.theme.primaryColor}60` }} />
              </div>
            )}
            <h1
              className="text-xl font-bold text-center"
              style={{ color: page.theme.textColor, fontFamily: page.theme.fontFamily }}
            >
              {page.profile.name}
            </h1>
            <p
              className="text-sm text-center mt-1 max-w-[280px]"
              style={{ color: `${page.theme.textColor}80` }}
            >
              {page.profile.bio}
            </p>
          </div>

          {/* Blocks */}
          <div className="px-5 pb-8 space-y-3">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={page.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                {page.blocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => dispatch({ type: 'SELECT_BLOCK', blockId: block.id })}
                    onDelete={() => dispatch({ type: 'REMOVE_BLOCK', blockId: block.id })}
                    theme={page.theme}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {page.blocks.length === 0 && (
              <div className="py-16 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
                <p className="text-sm font-medium" style={{ color: `${page.theme.textColor}60` }}>
                  Add components from the left panel
                </p>
              </div>
            )}
          </div>

          {/* Footer watermark */}
          <div className="py-4 text-center">
            <span
              className="text-[10px] font-medium"
              style={{ color: `${page.theme.textColor}30` }}
            >
              Powered by Academyat
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

function SortableBlock({
  block,
  isSelected,
  onSelect,
  onDelete,
  theme,
}: {
  block: BlockData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  theme: import('../../types').ThemeConfig;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle + delete */}
      <div
        className={`absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 transition-opacity z-10 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <button
          {...attributes}
          {...listeners}
          className="p-1 rounded bg-white shadow-md border border-surface-200 cursor-grab active:cursor-grabbing hover:bg-surface-50"
        >
          <GripVertical size={12} className="text-surface-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded bg-white shadow-md border border-surface-200 hover:bg-red-50 hover:border-red-200 transition-colors"
        >
          <Trash2 size={12} className="text-surface-400 hover:text-red-500" />
        </button>
      </div>

      <BlockRenderer
        block={block}
        theme={theme}
        isSelected={isSelected}
        onClick={onSelect}
        isEditing
      />
    </div>
  );
}
