import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

const App = () => (
  <LanguageProvider>
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Add custom routes above the catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
