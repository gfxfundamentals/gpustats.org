const trackedValues = {};

function getValueOrMakeNew(name) {
  const trackedValue = trackedValues[name] || {
    subscriptions: new Set(),
  };
  trackedValues[name] = trackedValue;
  return trackedValue;
}

export function add(name, initialValue) {
  const trackedValue = getValueOrMakeNew(name);
  if (initialValue !== undefined) {
    trackedValue.value = initialValue;
  }
  return trackedValue;
}

export function set(name, newValue) {
  const trackedValue = trackedValues[name];
  if (!trackedValue) {
    throw new Error(`no such track value: ${name}`);
  }
  trackedValue.value = newValue;
  const fns = [...trackedValue.subscriptions.keys()];
  setTimeout(() => {
    for (const fn of fns) {
      fn(newValue, name);
    }
  });
}

export function subscribe(name, fn) {
  const trackedValue = getValueOrMakeNew(name);
  trackedValue.subscriptions.add(fn);
}

export function unsubscribe(name, fn) {
  const trackedValue = getValueOrMakeNew(name);
  trackedValue.subscriptions.delete(fn);
}