import { useState } from 'react';

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const useTable = () => {
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<undefined | keyof any>(undefined);

  const onSortableClick = (key: keyof any) => {
    const isAsc = orderBy === key && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  return {
    orderDirection,
    orderBy,
    getComparator,
    onSortableClick,
  };
};

export default useTable;
