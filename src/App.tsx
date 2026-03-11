import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import TemplateGallery from './pages/TemplateGallery';
import PageBuilder from './pages/PageBuilder';
import PreviewPage from './pages/PreviewPage';
import PublishedPage from './pages/PublishedPage';

export default function App() {
  return (
    <BuilderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TemplateGallery />} />
          <Route path="/builder" element={<PageBuilder />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/page/:username" element={<PublishedPage />} />
        </Routes>
      </BrowserRouter>
    </BuilderProvider>
  );
}
