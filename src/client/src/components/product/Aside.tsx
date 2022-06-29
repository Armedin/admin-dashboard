import {
  Box,
  Card,
  CardHeader,
  CardTitle,
  Typography,
  CardContent,
  Select,
} from '@kukui/ui';
import { useProductForm } from './form/ProductFormContext';
import blankImage from '@/assets/images/placeholder/blank-image.svg';
import { useEffect, useMemo, useState } from 'react';
import { productService } from '@/services';
import { ProductCategory } from '@/interfaces/product-category';
import { Product } from '@/interfaces/product';
import { getUploadDir } from '@/utils';

const mapCategoryToOption = (category: ProductCategory) => ({
  value: category.id,
  label: category.title,
});

const ProductAside = ({ product }: { product?: Product }) => {
  const { images, thumbnail, getValues, setValue } = useProductForm();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const categoryId = getValues('category_id');

  const getThumbnail = useMemo(() => {
    if (thumbnail !== '') {
      return thumbnail.startsWith('blob')
        ? thumbnail
        : getUploadDir() + thumbnail;
    }

    return blankImage.src;
  }, [thumbnail, images]);

  useEffect(() => {
    productService.getAllCategories().then(res => setCategories(res));
  }, []);

  const createNewCategory = (title: string) => {
    productService.createCategory({ title }).then(res => {
      setCategories(prev => [...prev, res]);
      setNewCategory(res.id);
    });
  };

  const setNewCategory = (value: string) => {
    setValue('category_id', value);
  };

  const options = useMemo(() => {
    return categories.map(option => mapCategoryToOption(option));
  }, [categories]);

  return (
    <Box
      sx={{
        width: '380px',
        marginRight: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
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
      <Card>
        <CardHeader>
          <CardTitle>Extra Details</CardTitle>
        </CardHeader>
        <CardContent sx={{ paddingTop: 0 }}>
          <Select
            value={options.find(option => option.value === categoryId)}
            label="Category"
            helperText="Add product to a category"
            options={options}
            onChange={(event, value) => setNewCategory(value)}
            onCreateOption={createNewCategory}
            isCreatable
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductAside;
