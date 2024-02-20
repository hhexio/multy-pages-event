const throttle = (fn, ms) => {
  let timeout;
  return function (...args) {
    if (!timeout) {
      const self = this;
      timeout = setTimeout(() => {
        fn.call(self, ...args);
        timeout = null;
      }, ms);
    }
  };
};

export { throttle };
