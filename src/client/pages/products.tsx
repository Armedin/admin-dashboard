import { Button } from '@/components/base';
import { Box, Input, Card, CardHeader, CardContent } from '@kukui/ui';
import { MagnifyingGlass } from '@kukui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productService } from '@/services';
import { Product } from '@/interfaces/product';
import ProductTable from '@/components/product/table/ProductTable';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  useEffect(() => {
    productService.getAllProducts().then(res => {
      setProducts(res);
    });
  }, []);

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
        <ProductTable products={products} />
      </CardContent>
    </Card>
  );
};

export default Products;
