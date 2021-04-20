export function getPlatforms(data) {
  const platforms = new Set();
  for (const {platform} of data.categories) {
    platforms.add(platform);
  }
  return [...platforms.keys()];
}

export function getBrowsers(data) {
  const browsers = new Set();
  for (const {browser} of data.categories) {
    browsers.add(browser);
  }
  return [...browsers.keys()];
}
