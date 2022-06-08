import {
  Box,
  Input,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormContainer,
} from '@kukui/ui';
import styled from '@emotion/styled';
import blankImage from '@/assets/images/placeholder/blank-image.svg';
import { Button, CurrencyInput, ImageUpload } from '@/components/base';
import Discount from '@/components/product/Discount';
import Details from '@/components/product/Details';
import Images from '@/components/product/Images';
import { useState } from 'react';
import { UploadedImage } from '@/interfaces/file';
import { ProductFormProvider } from '@/components/product/form/ProductFormContext';
import apiAxios from '@/lib/api';
import { productService, uploadService } from '@/services';

const Aside = styled(Box)({
  width: '380px',
  marginRight: '2rem',
});

const ProductDetails = styled(Box)({
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const AddProductPage = () => {
  const handleSubmit = async (formData: any) => {
    console.log(formData);
    // const uploadedImages = await uploadService
    //   .uploadFiles(formData.images.map(image => image.originalFile))
    //   .then(data => {
    //     return data.uploads.map(({ url }) => url);
    //   });

    // const newData = {
    //   ...formData,
    //   images: uploadedImages,
    // };

    // await productService.createProduct(newData);
  };

  return (
    <ProductFormProvider onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex' }}>
        <Aside>
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent sx={{ paddingTop: 0 }}>
              <img src={blankImage.src} />
              <Typography
                sx={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                }}
              >
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </Typography>
            </CardContent>
          </Card>
        </Aside>

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
              <Details />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent sx={{ paddingTop: 0 }}>
              <Box sx={{ marginBottom: '2rem' }}>
                <CurrencyInput
                  name="price"
                  label="Product Price"
                  placeholder="Product price"
                  required
                  onValueChange={amount => {
                    console.log(amount);
                  }}
                />
              </Box>
              <Discount />
            </CardContent>
          </Card>

          <Images />

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}
          >
            <Button size="small">Cancel</Button>
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
