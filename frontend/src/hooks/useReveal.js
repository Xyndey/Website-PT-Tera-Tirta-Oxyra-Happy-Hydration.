import { useEffect } from 'react';

/**
 * Observes every element carrying the `.rv` class and adds `.vis` once it
 * scrolls into view, mirroring the original page's fade/slide-up reveal
 * animation. Re-runs whenever `deps` change (e.g. after async content for
 * a section has loaded and new `.rv` nodes appear in the DOM).
 *
 * @param {React.DependencyList} [deps]
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.rv:not(.vis)');

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('vis'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useReveal;
