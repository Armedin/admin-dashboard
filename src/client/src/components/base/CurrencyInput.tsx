import { currencies } from '@/utils/currencies';
import { normalizeAmount } from '@/utils/prices';
import {
  CurrencyInput as KukuiCurrencyInput,
  CurrencyInputProps as KukuiCurrencyInputProps,
} from '@kukui/ui';
import { useEffect, useRef, useState } from 'react';

interface CurrencyInputProps extends Omit<KukuiCurrencyInputProps, 'value'> {
  amount?: number;
}

const getCurrencyInfo = (currencyCode: string) => {
  const currencyInfo = currencies[currencyCode.toUpperCase()];
  return currencyInfo;
};

const currencyInfo = getCurrencyInfo('EUR');

const CurrencyInput = (props: CurrencyInputProps) => {
  const { amount, ...other } = props;

  const [value, setValue] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currencyInfo && amount) {
      setValue(`${normalizeAmount(currencyInfo?.code, amount)}`);
    }
  }, [amount]);

  return (
    <KukuiCurrencyInput
      ref={inputRef}
      prefix={<div>{currencyInfo.symbol}</div>}
      decimalScale={currencyInfo.decimal_digits}
      value={value}
      {...other}
    />
  );
};

export default CurrencyInput;
