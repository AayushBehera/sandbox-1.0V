import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
}

export const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    animation = 'fade-in-up'
}: ScrollRevealProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add(`animate-${animation}`);
                            entry.target.classList.remove('opacity-0');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [animation, delay]);

    return (
        <div ref={ref} className={`opacity-0 ${className}`}>
            {children}
        </div>
    );
};
