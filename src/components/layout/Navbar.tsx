import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/assessment', label: 'Assessment' },
    { path: '/saved', label: 'Saved' },
    { path: '/results', label: 'Careers' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex justify-between items-center px-8 py-4 rounded-[2rem] transition-all duration-500 ${scrolled ? 'bg-primary-950/85 backdrop-blur-xl border border-primary-300/15 shadow-soft-lg' : 'bg-transparent'
            }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105">
              <img src="/sandbox-scholars-logo.svg" alt="Sandbox Scholars" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tighter leading-none transition-colors ${scrolled ? 'text-white' : 'text-primary-950'}`}>
                Sandbox
              </span>
              <span className={`text-[8px] font-bold tracking-[0.3em] uppercase leading-none mt-1 transition-colors ${scrolled ? 'text-primary-200' : 'text-primary-600'}`}>
                Scholars
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive(link.path)
                  ? 'text-primary-300'
                  : scrolled
                    ? 'text-primary-100/80 hover:text-white'
                    : 'text-neutral-500 hover:text-primary-900'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/assessment">
              <button className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-bold tracking-widest text-[10px] uppercase hover:bg-primary-500 transition-all hover:scale-[1.02] hover:shadow-soft-lg shadow-soft">
                Initialize
              </button>
            </Link>
          </div>

          <button
            className={`md:hidden p-2 ${scrolled ? 'text-white' : 'text-primary-950'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current transform transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-full h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-current transform transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden mt-4"
            >
              <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] space-y-4 shadow-soft-xl border border-primary-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${isActive(link.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-500 hover:bg-primary-50 hover:text-primary-800'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link to="/assessment" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-4 bg-primary-700 text-white rounded-2xl font-bold tracking-widest text-[10px] uppercase hover:bg-primary-600 transition-colors">
                      Start Assessment
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
