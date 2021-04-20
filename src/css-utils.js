export function classNames(...args) {
  const names = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      names.push(arg);
    } else {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          names.push(key);
        }
      }
    }
  }
  return names.join(' ');
}