import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'How it Works', path: '/#how-it-works' },
        { label: 'Features', path: '/#features' },
        { label: 'Pricing', path: '/#pricing' },
        { label: 'Assessment', path: '/assessment' },
      ],
    },
    {
      title: 'For Students',
      links: [
        { label: 'Career Discovery', path: '/#careers' },
        { label: 'Skill Assessment', path: '/assessment' },
        { label: 'Roadmaps', path: '/#roadmaps' },
        { label: 'Resources', path: '/#resources' },
      ],
    },
    {
      title: 'For Professionals',
      links: [
        { label: 'Career Switch', path: '/assessment' },
        { label: 'Skill Development', path: '/#skills' },
        { label: 'Role Comparison', path: '/compare' },
        { label: 'Progress Tracking', path: '/saved' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '#' },
        { label: 'Career Guides', path: '#' },
        { label: 'Success Stories', path: '/#testimonials' },
        { label: 'Help Center', path: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '#' },
        { label: 'Contact', path: '#' },
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-primary-950 text-primary-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/sandbox-scholars-logo.svg"
                alt="Sandbox Scholars"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-primary-100/80 mb-4">
              Discover your perfect career path across every field—from tech to arts, business to healthcare.
            </p>
            <p className="text-xs text-primary-200/60">
              © {currentYear} Sandbox Scholars. All rights reserved.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-primary-100/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
