import styled from '@emotion/styled';
import {
  Box,
  Input,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@kukui/ui';
import { Product } from '@/interfaces/product';
import Properties from '../Properties';
import Pricing from '../Pricing';
import Images from '../Images';
import { Button } from '@/components/base';
import { useRouter } from 'next/router';

const ProductDetails = styled(Box)({
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const ProductForm = ({
  product,
  isEdit,
}: {
  product?: Product;
  isEdit?: boolean;
}) => {
  const router = useRouter();

  return (
    <ProductDetails>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent sx={{ paddingTop: 0 }}>
          <Box sx={{ marginBottom: '2rem' }}>
            <Input
              label="Product Title"
              placeholder="Product title"
              name="title"
              helperText="A product title is required and recommended to be unique."
              required
            />
          </Box>
          <Box sx={{ marginBottom: '2rem' }}>
            <Input
              label="Product Description"
              placeholder="Product description"
              name="description"
              minRows={8}
              textarea
              required
            />
          </Box>
          <Properties />
        </CardContent>
      </Card>

      <Pricing />

      <Images />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <Button size="small" onClick={() => router.push('/products')}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          {isEdit ? 'Update Product' : 'Publish Product'}
        </Button>
      </Box>
    </ProductDetails>
  );
};

export default ProductForm;
