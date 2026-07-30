import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'خدماتنا', id: 'services' },
    { label: 'قبل وبعد', id: 'before-after' },
    { label: 'تواصل معنا', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0D1B2A]/95 backdrop-blur-lg shadow-lg border-b border-[#415A77]/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl lg:text-3xl font-bold text-[var(--color-light)] hover:opacity-80 transition-opacity"
            data-testid="button-logo"
          >
            لمسه ابداع
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#E0E1DD] hover:text-[#415A77] transition-colors text-lg"
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors"
              data-testid="button-whatsapp-header"
            >
              <SiWhatsapp className="w-5 h-5" />
              <span className="hidden lg:inline">واتساب</span>
            </a>
            <a
              href={`tel:+${whatsappNumber}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#415A77] text-[#E0E1DD] rounded-lg hover:bg-[#415A77]/90 transition-all"
              data-testid="button-call-header"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden lg:inline">اتصل</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--color-light)]"
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-20 bg-[var(--color-navy)]/98 backdrop-blur-xl"
            data-testid="menu-mobile"
          >
            <nav className="flex flex-col items-center gap-8 pt-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[var(--color-light)] text-2xl hover:text-[var(--color-accent-blue)] transition-colors"
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-4 mt-8">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] text-white rounded-lg text-lg"
                  data-testid="button-whatsapp-mobile"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  واتساب
                </a>
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-accent-blue)] text-[var(--color-light)] rounded-lg text-lg"
                  data-testid="button-call-mobile"
                >
                  <Phone className="w-6 h-6" />
                  اتصل الآن
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
