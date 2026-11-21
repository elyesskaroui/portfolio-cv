import { useEffect } from 'react';

const SELECTOR = '.rv:not(.is-in), .rv-mask:not(.is-in)';

/**
 * One observer for the whole page: any element with `.rv` or `.rv-mask`
 * receives `.is-in` the first time it scrolls into view. Elements mounted
 * later (filters, language switch) are picked up through a MutationObserver.
 */
export const RevealObserver = () => {
  useEffect(() => {
    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            intersection.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => intersection.observe(el));
    scan();

    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
};
