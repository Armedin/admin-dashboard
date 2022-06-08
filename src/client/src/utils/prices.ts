import { currencies } from './currencies';

export function normalizeAmount(currency: string, amount: number) {
  const divisor = getDecimalDigits(currency);
  return Math.floor(amount) / divisor;
}

export function displayAmount(currency: string, amount: number) {
  const normalizedAmount = normalizeAmount(currency, amount);
  return normalizedAmount.toFixed(
    currencies[currency.toUpperCase()].decimal_digits
  );
}

export const extractUnitPrice = (item, region, withTax = true) => {
  let itemPrice = item.unit_price;

  if (itemPrice === undefined) {
    const regionPrice = item.prices.find(
      p => p.currency_code === region.currency_code
    );

    itemPrice = regionPrice.amount;
  }

  if (itemPrice) {
    if (withTax) {
      return itemPrice * (1 + region.tax_rate / 100);
    } else {
      return itemPrice;
    }
  }

  return 0;
};

export const displayUnitPrice = (item, region) => {
  const currCode = region.currency_code.toUpperCase();

  const price = extractUnitPrice(item, region);
  return `${displayAmount(currCode, price)} ${currCode}`;
};

export const extractOptionPrice = (price, region) => {
  let amount = price;
  amount = (amount * (1 + region.tax_rate / 100)) / 100;
  return `${amount} ${region.currency_code.toUpperCase()}`;
};

export function getDecimalDigits(currency: string) {
  const divisionDigits = currencies[currency.toUpperCase()].decimal_digits;
  return Math.pow(10, divisionDigits);
}

export function persistedPrice(currency: string, amount: number): number {
  const multiplier = getDecimalDigits(currency);
  return amount * multiplier;
}

export const stringDisplayPrice = ({ amount, currencyCode }) => {
  if (!amount || !currencyCode) {
    return `N/A`;
  }

  const display = displayAmount(currencyCode, amount);
  return `${display} ${currencyCode.toUpperCase()}`;
};

export const getNativeSymbol = (currencyCode: string) => {
  return currencies[currencyCode.toUpperCase()].symbol_native;
};

type FormatMoneyProps = {
  amount: number;
  currency: string;
  digits?: number;
  tax?: number;
};

export function formatAmountWithSymbol({
  amount,
  currency,
  digits,
  tax = 0,
}: FormatMoneyProps) {
  let locale = 'en-US';

  // We need this to display 'Kr' instead of 'DKK'
  if (currency.toLowerCase() === 'dkk') {
    locale = 'da-DK';
  }

  digits = digits ?? currencies[currency.toUpperCase()].decimal_digits;

  const normalizedAmount = normalizeAmount(currency, amount);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
  }).format(normalizedAmount * (1 + tax / 100));
}