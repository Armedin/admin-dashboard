import { Box, useSnackbar } from '@kukui/ui';
import { ProductFormProvider } from '@/components/product/form/ProductFormContext';
import { productService, uploadService } from '@/services';
import ProductAside from '@/components/product/Aside';
import { useRouter } from 'next/router';
import ProductForm from '@/components/product/form/ProductForm';

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
        image => thumbnail === image.url
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
        <ProductForm />
      </Box>
    </ProductFormProvider>
  );
};

export default AddProductPage;
