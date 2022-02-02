export function createCurrentDate() {
  const date = new Date().toISOString();
  return date;
}

export function dateToISOString(date) {
  const isoDate = new Date(date).toISOString();
  return isoDate;
}

export function dateToLocaleDateString(date) {
  const localeDate = new Date(date).toLocaleDateString();
  return localeDate;
}

export function dateToLocaleTimeString(date) {
  const localeTime = new Date(date).toLocaleTimeString('en-GB');
  return localeTime;
}

export function dateToLocaleString(date) {
  const localeString =
    new Date(date).toLocaleTimeString('en-GB') +
    ' ' +
    new Date(date).toLocaleDateString();
  return localeString;
}
