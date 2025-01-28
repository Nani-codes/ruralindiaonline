/**
 * @param  {any} fn
 * @param  {number} wait
 */
export const debounce = (fn: any, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: any[]) {
    const later = () => {
      fn(...args);
    };

    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};