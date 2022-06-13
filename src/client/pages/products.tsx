import { Button } from '@/components/base';
import { Card, CardHeader, CardContent, Badge } from '@kukui/ui';

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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productService } from '@/services';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
  displayAmount,
  displayUnitPrice,
  formatAmountWithSymbol,
} from '@/utils/prices';

interface Data {
  title: string;
  thumbnail: string;
  sku: number;
  quantity: number;
  price: number;
  status: string;
}

const ThumbnailImage = styled(Image)({
  background: '#f5f8fa',
  objectFit: 'cover',
  borderRadius: '.475rem',
});

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
  const [products, setProducts] = useState<Data[]>([]);
  const router = useRouter();

  useEffect(() => {
    productService.getAllProducts().then(res => {
      setProducts(res);
    });
  }, []);

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
        <Button color="primary" onClick={() => router.push('/products/add')}>
          Add Product
        </Button>
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
            {products.sort(getComparator(orderDirection, orderBy)).map(row => (
              <TableRow
                key={row.sku}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbnailImage
                      src={`/upload/${row.thumbnail}`}
                      loading="lazy"
                      layout="fixed"
                      width={48}
                      height={48}
                    />

                    <Typography
                      sx={{ marginLeft: '1rem', fontSize: '0.85rem' }}
                    >
                      {row.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">----</TableCell>
                <TableCell align="right">--</TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: 600, fontSize: '0.825rem' }}>
                    {formatAmountWithSymbol({
                      amount: row.price,
                      currency: 'EUR',
                    })}
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

export default Products;
