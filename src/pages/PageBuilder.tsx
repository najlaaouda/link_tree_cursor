import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  Smartphone,
  Monitor,
  Globe,
  Undo2,
  Redo2,
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import LeftSidebar from '../components/builder/LeftSidebar';
import Canvas from '../components/builder/Canvas';
import RightSidebar from '../components/builder/RightSidebar';

export default function PageBuilder() {
  const { state, dispatch } = useBuilder();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-surface-100 overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-surface-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Templates</span>
          </button>
          <div className="w-px h-6 bg-surface-200" />
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
              <Undo2 size={16} />
            </button>
            <button className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
              <Redo2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-100 rounded-xl p-1">
            <button
              onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', mode: 'mobile' })}
              className={`p-1.5 rounded-lg transition-all ${
                state.previewMode === 'mobile'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-surface-400 hover:text-surface-600'
              }`}
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', mode: 'desktop' })}
              className={`p-1.5 rounded-lg transition-all ${
                state.previewMode === 'desktop'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-surface-400 hover:text-surface-600'
              }`}
            >
              <Monitor size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/preview')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-surface-700 bg-surface-100 rounded-xl hover:bg-surface-200 transition-colors"
          >
            <Eye size={14} />
            <span>Preview</span>
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'TOGGLE_PUBLISH' });
              navigate('/preview');
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
          >
            <Globe size={14} />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Three-Panel Editor */}
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <Canvas />
        <RightSidebar />
      </div>
    </div>
  );
}
