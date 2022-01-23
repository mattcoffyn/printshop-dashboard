export function cleanAndCapitalise(string) {
  return string
    .trim()
    .toLowerCase()
    .replace('_', ' ')
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}
