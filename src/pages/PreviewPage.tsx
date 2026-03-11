import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Globe,
  Share2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';
import PublicPage from '../components/PublicPage';

export default function PreviewPage() {
  const { state, dispatch } = useBuilder();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [copied, setCopied] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const pageUrl = `academy.com/${state.page.username}`;

  function handleCopy() {
    navigator.clipboard.writeText(`https://${pageUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePublish() {
    if (!state.page.isPublished) {
      dispatch({ type: 'TOGGLE_PUBLISH' });
    }
    setShowPublishModal(true);
  }

  return (
    <div className="min-h-screen bg-surface-100 flex flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-surface-200 flex items-center justify-between px-6 shrink-0 z-20">
        <button
          onClick={() => navigate('/builder')}
          className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Editor</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-surface-400 hover:text-surface-600'
              }`}
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'desktop'
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
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm text-surface-600 bg-surface-100 rounded-xl hover:bg-surface-200 transition-colors"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span className="text-xs">{pageUrl}</span>
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
          >
            <Globe size={14} />
            <span>{state.page.isPublished ? 'Published' : 'Publish'}</span>
          </button>
        </div>
      </header>

      {/* Preview Area */}
      <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
        <div
          className={`transition-all duration-500 ease-out ${
            viewMode === 'mobile' ? 'w-[390px]' : 'w-[780px]'
          }`}
        >
          {viewMode === 'mobile' && (
            <>
              <div className="mx-auto w-[140px] h-[5px] bg-surface-300 rounded-full mb-2" />
              <div className="mx-auto w-[60px] h-[4px] bg-surface-200 rounded-full mb-4" />
            </>
          )}
          <div
            className={`rounded-3xl overflow-hidden ${
              viewMode === 'mobile'
                ? 'shadow-2xl shadow-surface-400/30 border border-surface-200'
                : 'shadow-xl border border-surface-200'
            }`}
          >
            <PublicPage page={state.page} />
          </div>
        </div>
      </div>

      {/* Publish Success Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPublishModal(false)}
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full animate-scale-in shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">
                Your Page is Live!
              </h2>
              <p className="text-surface-500 mb-6">
                Share your link with the world. Your page is now accessible at:
              </p>
              <div className="flex items-center gap-2 p-3 bg-surface-50 rounded-xl border border-surface-200 mb-6">
                <Globe size={16} className="text-primary-600 shrink-0" />
                <span className="text-sm font-medium text-surface-800 flex-1 text-left">
                  https://{pageUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-surface-200 transition-colors"
                >
                  {copied ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} className="text-surface-500" />
                  )}
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="flex-1 py-3 text-sm font-medium text-surface-600 bg-surface-100 rounded-xl hover:bg-surface-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => navigate(`/page/${state.page.username}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>View Page</span>
                </button>
              </div>
              <div className="flex justify-center gap-4 mt-5">
                <button className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-surface-700 transition-colors">
                  <Share2 size={12} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
