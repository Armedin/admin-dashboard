import { Button } from '@/components/base';
import { Card, CardHeader, CardContent } from '@kukui/ui';

import {
  Box,
  Input,
  Table,
  TableHead,
  TableBody,
  TableSortableLabel,
  TableCell,
  TableRow,
  Typography,
} from '@kukui/ui';
import { MagnifyingGlass } from '@kukui/icons';
import { useState } from 'react';

interface Data {
  name: string;
  thumbnail: string;
  sku: number;
  quantity: number;
  price: string | number;
  status: string;
}

function createData(
  name: string,
  thumbnail: string,
  sku: number,
  quantity: number,
  price: string | number,
  status: string
) {
  return { name, thumbnail, sku, quantity, price, status };
}

const rows = [
  createData(
    'Frozen yoghurt',
    'https://preview.keenthemes.com/metronic8/demo14/assets/media/stock/ecommerce/1.gif',
    4708006,
    6,
    24,
    'active'
  ),
  createData(
    'Ice cream sandwich',
    'https://preview.keenthemes.com/metronic8/demo14/assets/media/stock/ecommerce/2.gif',
    2828008,
    9,
    37,
    'active'
  ),
  createData(
    'Eclair',
    'https://preview.keenthemes.com/metronic8/demo14/assets/media/stock/ecommerce/3.gif',
    4598005,
    16,
    24,
    'active'
  ),
  createData(
    'Cupcake',
    'https://preview.keenthemes.com/metronic8/demo14/assets/media/stock/ecommerce/4.gif',
    1775005,
    3,
    67,
    'active'
  ),
  createData(
    'Gingerbread',
    'https://preview.keenthemes.com/metronic8/demo14/assets/media/stock/ecommerce/5.gif',
    3433009,
    16,
    49,
    'active'
  ),
];

const headCells = [
  {
    id: 'name',
    label: 'Product',
    sortable: true,
  },
  {
    id: 'sku',
    label: 'Sku',
    sortable: true,
  },
  {
    id: 'quantity',
    label: 'QTY',
    sortable: true,
  },
  {
    id: 'price',
    label: 'Price',
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

const Products = () => {
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<undefined | keyof Data>(undefined);

  const onSortableClick = (key: keyof Data) => {
    const isAsc = orderBy === key && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  return (
    <Card>
      <CardHeader>
        <Box sx={{ width: '250px', padding: '1.25rem 0' }}>
          <Input
            placeholder="Search product"
            prefix={<MagnifyingGlass fontSize="sm" />}
          />
        </Box>
        <Button color="primary">Add Product</Button>
      </CardHeader>
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
                      active={cell.id === orderBy}
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
            {rows
              .slice()
              .sort(getComparator(orderDirection, orderBy))
              .map(row => (
                <TableRow
                  key={row.sku}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={row.thumbnail}
                        style={{
                          background: '#f5f8fa',
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '.475rem',
                        }}
                      />
                      <Typography
                        sx={{ marginLeft: '1rem', fontSize: '0.85rem' }}
                      >
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.sku}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Products;
