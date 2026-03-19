import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('section, .ticker-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}