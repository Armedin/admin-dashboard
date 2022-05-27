import {
  Box,
  Input,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@kukui/ui';
import styled from '@emotion/styled';
import blankImage from '@/assets/images/placeholder/blank-image.svg';
import { ImageUpload } from '@/components/base';
import Discount from '@/components/product/Discount';
import Details from '@/components/product/Details';

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
  return (
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
              <Input label="Product Name" placeholder="Product name" />
              <Typography
                sx={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  marginTop: '6px',
                }}
              >
                A product name is required and recommended to be unique.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '2rem' }}>
              <Input
                label="Product Description"
                placeholder="Product description"
                minRows={8}
                textarea
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
              <Input label="Base Price" placeholder="Product price" />
              <Typography
                sx={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  marginTop: 8,
                }}
              >
                Set the product price.
              </Typography>
            </Box>
            <Discount />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent sx={{ paddingTop: 0 }}>
            <ImageUpload onUpload={files => console.log(files)} />
          </CardContent>
        </Card>
      </ProductDetails>
    </Box>
  );
};

export default AddProductPage;
