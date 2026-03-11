import { Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import TemplateGallery from './pages/TemplateGallery';
import PageBuilder from './pages/PageBuilder';
import PreviewPage from './pages/PreviewPage';
import PublishedPage from './pages/PublishedPage';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: 40,
            fontFamily: 'monospace',
            background: '#fff',
            minHeight: '100vh',
          }}
        >
          <h1 style={{ color: 'red', fontSize: 24 }}>Something went wrong</h1>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              marginTop: 16,
              background: '#f5f5f5',
              padding: 16,
              borderRadius: 8,
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <ErrorBoundary>
      <BuilderProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<TemplateGallery />} />
            <Route path="/builder" element={<PageBuilder />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/page/:username" element={<PublishedPage />} />
          </Routes>
        </BrowserRouter>
      </BuilderProvider>
    </ErrorBoundary>
  );
}
