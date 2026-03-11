import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { PageConfig, BlockData, ThemeConfig, ProfileData, TemplateId } from '../types';
import { getDefaultPageConfig } from '../data/templates';

type Action =
  | { type: 'SELECT_TEMPLATE'; templateId: TemplateId }
  | { type: 'SET_PAGE'; page: PageConfig }
  | { type: 'UPDATE_PROFILE'; profile: Partial<ProfileData> }
  | { type: 'UPDATE_THEME'; theme: Partial<ThemeConfig> }
  | { type: 'ADD_BLOCK'; block: BlockData; index?: number }
  | { type: 'REMOVE_BLOCK'; blockId: string }
  | { type: 'UPDATE_BLOCK'; blockId: string; props: Record<string, unknown> }
  | { type: 'REORDER_BLOCKS'; blocks: BlockData[] }
  | { type: 'SELECT_BLOCK'; blockId: string | null }
  | { type: 'SET_USERNAME'; username: string }
  | { type: 'TOGGLE_PUBLISH' }
  | { type: 'SET_PREVIEW_MODE'; mode: 'mobile' | 'desktop' };

interface BuilderState {
  page: PageConfig;
  selectedBlockId: string | null;
  previewMode: 'mobile' | 'desktop';
  step: 'gallery' | 'builder' | 'preview' | 'published';
}

const initialState: BuilderState = {
  page: getDefaultPageConfig('minimal'),
  selectedBlockId: null,
  previewMode: 'mobile',
  step: 'gallery',
};

function reducer(state: BuilderState, action: Action): BuilderState {
  switch (action.type) {
    case 'SELECT_TEMPLATE':
      return {
        ...state,
        page: getDefaultPageConfig(action.templateId),
        selectedBlockId: null,
        step: 'builder',
      };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        page: { ...state.page, profile: { ...state.page.profile, ...action.profile } },
      };
    case 'UPDATE_THEME':
      return {
        ...state,
        page: { ...state.page, theme: { ...state.page.theme, ...action.theme } },
      };
    case 'ADD_BLOCK': {
      const blocks = [...state.page.blocks];
      const idx = action.index ?? blocks.length;
      blocks.splice(idx, 0, action.block);
      return { ...state, page: { ...state.page, blocks }, selectedBlockId: action.block.id };
    }
    case 'REMOVE_BLOCK':
      return {
        ...state,
        page: { ...state.page, blocks: state.page.blocks.filter((b) => b.id !== action.blockId) },
        selectedBlockId: state.selectedBlockId === action.blockId ? null : state.selectedBlockId,
      };
    case 'UPDATE_BLOCK':
      return {
        ...state,
        page: {
          ...state.page,
          blocks: state.page.blocks.map((b) =>
            b.id === action.blockId ? { ...b, props: { ...b.props, ...action.props } } : b
          ),
        },
      };
    case 'REORDER_BLOCKS':
      return { ...state, page: { ...state.page, blocks: action.blocks } };
    case 'SELECT_BLOCK':
      return { ...state, selectedBlockId: action.blockId };
    case 'SET_USERNAME':
      return { ...state, page: { ...state.page, username: action.username } };
    case 'TOGGLE_PUBLISH':
      return { ...state, page: { ...state.page, isPublished: !state.page.isPublished } };
    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.mode };
    default:
      return state;
  }
}

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error('useBuilder must be used within BuilderProvider');
  return ctx;
}
