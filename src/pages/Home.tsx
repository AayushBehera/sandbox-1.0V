import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { FloatingCard } from '../components/3d/FloatingCard';
import { ParticleBackground } from '../components/3d/ParticleBackground';

const careerChips = [
  'Software Engineer',
  'Clinical Psychologist',
  'Corporate Lawyer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Financial Analyst',
  'Medical Doctor',
];

const howItWorksSteps = [
  {
    number: 1,
    title: 'Background',
    description: 'Share your academic trajectory, core competencies, and professional aspirations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Competency',
    description: 'Calibrate your proficiency across diverse technical and behavioral domains.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Priorities',
    description: 'Strategize your requirements for work-life balance, compensation, and impact.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Precision',
    description: 'Receive calculated career alignments paired with comprehensive growth roadmaps.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div className="min-h-screen bg-primary-50 overflow-x-hidden">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden brand-arch-bg subtle-noise">
        <div className="absolute inset-0 mesh-gradient opacity-70" />
        <div className="absolute inset-0 brand-arches" />
        <ParticleBackground />

        <Container className="relative z-10 pt-20">
          <motion.div style={{ opacity }} className="text-center max-w-5xl mx-auto">
            <ScrollReveal animation="fade-in-down">
              <div className="inline-block mb-8">
                <span className="px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/60 backdrop-blur-md border border-primary-200 text-primary-900 shadow-soft">
                  Artificial Intelligence • Strategic Growth
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-display-2xl md:text-display-xl font-bold mb-8 text-primary-950 tracking-tighter leading-[0.9] text-balance">
                <span className="gradient-text-3d">Architect your</span>
                <br />
                Professional Destiny.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg md:text-2xl text-primary-900/80 mb-12 max-w-2xl mx-auto font-medium text-balance">
                The world's most advanced career engineering platform for the modern scholar.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                <Link to="/assessment">
                  <AnimatedButton className="group relative px-10 py-5 bg-primary-900 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-[1.02] hover:shadow-soft-xl border-none">
                    <span className="relative z-10">Start Assessment</span>
                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />
                  </AnimatedButton>
                </Link>
                <Link to="/results">
                  <button className="px-10 py-5 glass text-primary-900 rounded-full font-bold border border-primary-100 hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-soft">
                    Explore Careers
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {careerChips.slice(0, 4).map((role, i) => (
                <ScrollReveal key={role} delay={400 + i * 80} animation="scale-in">
                  <FloatingCard>
                    <div className="glass p-8 rounded-[2rem] text-center card-3d shadow-soft-lg group cursor-pointer hover:bg-white transition-colors duration-500">
                      <div className="w-10 h-1 bg-primary-300 rounded-full mx-auto mb-6 group-hover:bg-primary-600 transition-colors" />
                      <p className="font-bold text-primary-900 tracking-tight">{role}</p>
                    </div>
                  </FloatingCard>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-40 bg-white relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal animation="slide-in-right">
              <div className="relative group p-4">
                <div className="relative rounded-[3.5rem] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-100 shadow-soft-xl p-8">
                  <div className="grid gap-6">
                    {[
                      ['Career Direction', 'Data-driven path confidence'],
                      ['Skill Focus', 'Pinpoint high-impact competencies'],
                      ['Opportunity Fit', 'Match priorities to outcomes'],
                    ].map(([title, subtitle], index) => (
                      <FloatingCard key={title} intensity={8}>
                        <div className="rounded-3xl border border-primary-100/80 bg-white/90 backdrop-blur-lg px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                          <p className="text-xs uppercase tracking-[0.2em] text-primary-600 font-bold mb-2">0{index + 1}</p>
                          <h3 className="text-2xl font-bold text-primary-950 mb-1">{title}</h3>
                          <p className="text-sm text-neutral-500 font-medium">{subtitle}</p>
                        </div>
                      </FloatingCard>
                    ))}
                  </div>
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-primary-200/60 blur-2xl rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-primary-500/10 blur-3xl rounded-full" />
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-10">
              <ScrollReveal delay={200}>
                <h2 className="text-display-md font-bold tracking-tighter text-neutral-950 leading-none">
                  Behavioral Science meets
                  <br />
                  <span className="text-primary-700">Professional Intelligence.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-xl text-neutral-500 font-medium leading-relaxed opacity-80">
                  Our core engine analyzes thousands of professional trajectories to provide deterministic career alignments with mathematical precision.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-40 bg-primary-50">
        <Container>
          <div className="text-center mb-24">
            <ScrollReveal>
              <h2 className="text-display-md font-bold text-neutral-950 mb-8 tracking-tighter">Strategic Methodology</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, idx) => (
              <ScrollReveal key={step.number} delay={idx * 100} animation="scale-in">
                <FloatingCard className="h-full">
                  <div className="group h-full p-10 rounded-[2.5rem] glass hover:bg-white transition-all duration-500 border border-primary-100/70 shadow-soft-lg hover:shadow-soft-xl card-3d">
                    <div className="w-14 h-14 rounded-2xl bg-primary-900 flex items-center justify-center text-white mb-8 group-hover:scale-105 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 uppercase tracking-widest mb-6 inline-block">
                      Phase 0{step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                    <p className="text-neutral-500 leading-relaxed font-medium opacity-80 text-sm">
                      {step.description}
                    </p>
                  </div>
                </FloatingCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-40 bg-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-950 to-primary-800 opacity-90" />
        <Container className="relative z-10">
          <div className="text-center mb-24">
            <ScrollReveal>
              <h2 className="text-display-md font-bold mb-8 tracking-tighter">Access Excellence</h2>
              <p className="text-primary-200/80 text-xl font-medium">Strategic investment in your professional trajectory.</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {['Basic', 'Strategic', 'Executive'].map((plan, i) => (
              <ScrollReveal key={plan} delay={i * 100} animation="fade-in-up">
                <div
                  className={`relative p-12 rounded-[3.5rem] transition-all duration-500 border overflow-hidden ${i === 1 ? 'bg-white text-neutral-950 shadow-glow-lg border-white' : 'bg-white/5 border-white/10'
                    }`}
                >
                  {i === 1 && (
                    <div className="absolute top-0 right-0 p-6">
                      <span className="px-4 py-1.5 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan}</h3>
                  <div className="text-5xl font-bold mb-10 tracking-tighter">
                    {i === 1 ? '$29' : i === 0 ? '$0' : 'Custom'}
                    <span className="text-sm font-medium opacity-40 ml-2 tracking-normal">/ lifetime</span>
                  </div>
                  <ul className="space-y-6 mb-12">
                    {['Full Assessment', 'Career Roadmap', 'Export Support'].map((feature) => (
                      <li key={feature} className="flex gap-4 items-center">
                        <span className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-primary-600' : 'bg-white/40'}`} />
                        <span className="text-xs font-bold tracking-widest uppercase opacity-70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-5 rounded-2xl font-bold tracking-widest text-[10px] uppercase transition-all duration-300 hover:scale-[1.01] ${i === 1 ? 'bg-primary-900 text-white hover:bg-primary-800' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    Initialize {plan}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-primary-100 pt-20">
            <p className="text-neutral-400 font-bold tracking-[0.3em] uppercase text-[10px]">
              © Sandbox Scholars • Professional Excellence
            </p>
            <div className="flex gap-10">
              <Link to="/assessment" className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-900 hover:text-primary-600 transition-colors">Assessment</Link>
              <Link to="/results" className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-900 hover:text-primary-600 transition-colors">Careers</Link>
              <Link to="/saved" className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-900 hover:text-primary-600 transition-colors">Saved</Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
