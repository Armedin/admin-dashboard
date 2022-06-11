import {
  Box,
  Card,
  CardHeader,
  CardTitle,
  Typography,
  CardContent,
} from '@kukui/ui';
import { useProductForm } from './form/ProductFormContext';
import blankImage from '@/assets/images/placeholder/blank-image.svg';
import { useMemo } from 'react';

const ProductAside = () => {
  const { images, thumbnail } = useProductForm();

  const getThumbnail = useMemo(() => {
    if (thumbnail !== '') {
      return thumbnail;
    }

    return blankImage.src;
  }, [thumbnail, images]);

  return (
    <Box sx={{ width: '380px', marginRight: '2rem' }}>
      <Card>
        <CardHeader>
          <CardTitle>Thumbnail</CardTitle>
        </CardHeader>
        <CardContent sx={{ paddingTop: 0 }}>
          <img src={getThumbnail} />
          <Typography
            sx={{
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textAlign: 'center',
            }}
          >
            Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
            files are accepted
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductAside;
