export function formatOrderNumber(number) {
  let orderNumber = `${number}`;
  while (orderNumber.length < 4) orderNumber = `0${orderNumber}`;
  return `DEV${orderNumber}`;
}

export function formatWO(num) {
  let wo = `${num}`;
  while (wo.length < 5) wo = `0${wo}`;
  return `WO${wo}`;
}

export function formatMoneyfromPence(amount) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-GB', options);
  return formatter.format(amount / 100);
  // return formatter.format(amount);
}

export function formatMoneyfromWhole(amount) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-GB', options);
  return formatter.format(amount);
}

export function formatMoney(amount) {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-GB', options);
  return formatter.format(amount / 100);
  // return formatter.format(amount);
}
