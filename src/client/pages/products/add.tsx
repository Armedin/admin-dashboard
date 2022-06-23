import {
  Box,
  Input,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  useSnackbar,
} from '@kukui/ui';
import styled from '@emotion/styled';
import { Button } from '@/components/base';
import Images from '@/components/product/Images';
import { ProductFormProvider } from '@/components/product/form/ProductFormContext';
import { productService, uploadService } from '@/services';
import Properties from '@/components/product/Properties';
import ProductAside from '@/components/product/Aside';
import { useRouter } from 'next/router';
import Pricing from '@/components/product/Pricing';
import { useEffect } from 'react';

const ProductDetails = styled(Box)({
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const AddProductPage = () => {
  const [openSnackbar] = useSnackbar();
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    const uploadedImages = await uploadService
      .uploadFiles(formData.images.map(image => image.originalFile))
      .then((data: any) => {
        return data.uploads.map(({ url }) => url);
      });

    let thumbnail = formData.thumbnail;
    if (thumbnail !== '') {
      const imageIndex = formData.images.findIndex(
        image => thumbnail === image.preview
      );
      if (imageIndex !== -1 && uploadedImages.length - 1 >= imageIndex) {
        thumbnail = uploadedImages[imageIndex];
      }
    }

    const newData = {
      ...formData,
      thumbnail,
      images: uploadedImages,
    };

    await productService
      .createProduct(newData)
      .then(() => {
        openSnackbar('Product added successfully');
        router.push('/products');
      })
      .catch(() => openSnackbar('An unknown error has occurred'));
  };

  return (
    <ProductFormProvider onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex' }}>
        <ProductAside />

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

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}
          >
            <Button size="small" onClick={() => router.push('/products')}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Publish Product
            </Button>
          </Box>
        </ProductDetails>
      </Box>
    </ProductFormProvider>
  );
};

export default AddProductPage;
