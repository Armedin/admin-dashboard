import { currencies } from '@/utils/currencies';
import { getDecimalDigits, normalizeAmount } from '@/utils/prices';
import {
  CurrencyInput as KukuiCurrencyInput,
  CurrencyInputProps as KukuiCurrencyInputProps,
} from '@kukui/ui';
import { useEffect, useRef, useState } from 'react';

interface CurrencyInputProps
  extends Omit<KukuiCurrencyInputProps, 'value' | 'onChange'> {
  amount?: number;
  onChange?: (amount: number) => void;
}

const getCurrencyInfo = (currencyCode: string) => {
  const currencyInfo = currencies[currencyCode.toUpperCase()];
  return currencyInfo;
};

const currencyInfo = getCurrencyInfo('EUR');

const CurrencyInput = (props: CurrencyInputProps) => {
  const { amount, onChange, ...other } = props;

  const [value, setValue] = useState<string | undefined>('0.00');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currencyInfo && amount) {
      setValue(`${normalizeAmount(currencyInfo?.code, amount)}`);
    } else {
    }
  }, [amount]);

  const handleValueChange = value => {
    let persistedAmount: number | undefined = undefined;

    if (!value) {
      value = 0;
    }

    const amount = parseFloat(value);
    const multiplier = getDecimalDigits(currencyInfo.code);
    persistedAmount = multiplier * amount;

    setValue(`${value}`);

    if (onChange) onChange(persistedAmount);
  };

  return (
    <KukuiCurrencyInput
      ref={inputRef}
      prefix={<div>{currencyInfo.symbol}</div>}
      decimalScale={currencyInfo.decimal_digits}
      value={value}
      onValueChange={handleValueChange}
      {...other}
    />
  );
};

export default CurrencyInput;
