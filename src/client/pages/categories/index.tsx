import { Button } from '@/components/base';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableSortableLabel,
  TableCell,
  TableRow,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Badge,
} from '@kukui/ui';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productService } from '@/services';
import { ProductCategory } from '@/interfaces/product-category';

const headCells = [
  {
    id: 'name',
    label: 'Category',
    sortable: true,
  },
  { id: 'status', label: 'Status' },
];

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

function getComparator<Key extends keyof ProductCategory>(
  order: Order,
  orderBy: Key
): (a: ProductCategory, b: ProductCategory) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const CategoriesPage = () => {
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<undefined | keyof ProductCategory>(
    undefined
  );
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getAllCategories().then(res => {
      setCategories(res);
    });
  }, []);

  const onSortableClick = (key: keyof ProductCategory) => {
    const isAsc = orderBy === key && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((cell, index) => (
                <TableCell
                  key={cell.id}
                  align={index !== 0 ? 'right' : 'inherit'}
                >
                  {cell.sortable ? (
                    <TableSortableLabel
                      onClick={() => onSortableClick(cell.id as any)}
                      direction={orderBy === cell.id ? orderDirection : 'asc'}
                    >
                      {cell.label}
                    </TableSortableLabel>
                  ) : (
                    cell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .sort(getComparator(orderDirection, orderBy))
              .map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography sx={{ fontSize: '0.85rem' }}>
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Badge color="success" content="Published" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoriesPage;
