import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
