import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// The case study is only fetched when someone opens it.
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage'));

const App = () => (
  <ThemeProvider>
  <LanguageProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projets/:slug" element={<CaseStudyPage />} />
          {/* Add custom routes above the catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    <Toaster />
  </LanguageProvider>
  </ThemeProvider>
);

export default App;
