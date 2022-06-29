import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@/interfaces/product';
import { productService, uploadService } from '@/services';
import { ProductFormProvider } from '@/components/product/form/ProductFormContext';
import ProductAside from '@/components/product/Aside';
import ProductForm from '@/components/product/form/ProductForm';
import { Box, useSnackbar } from '@kukui/ui';
import { resolveImages } from '@/utils/images';

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setLoading(true);
    productService
      .getProductById(id as string)
      .then(res => setProduct(res))
      .finally(() => setLoading(false));
  }, [router.isReady]);

  const handleSubmit = async (formData: any) => {
    const newImages = formData.images
      .filter(image => image.url.startsWith('blob'))
      .map(image => image.originalFile);

    const newUploadedImages = await uploadService
      .uploadFiles(newImages)
      .then((data: any) => {
        return data.uploads.map(({ url }) => url);
      });

    let thumbnail = formData.thumbnail;
    if (thumbnail !== '' && thumbnail.startsWith('blob')) {
      const imageIndex = formData.images.findIndex(
        image => thumbnail === image.url
      );
      if (imageIndex !== -1) {
        // this will always be bigger than original images size
        const indexInUploaded = imageIndex - product.images.length;
        thumbnail = newUploadedImages[indexInUploaded];
      }
    }

    const newData = {
      ...formData,
      thumbnail,
      images: resolveImages(formData.images, newUploadedImages),
    };

    productService
      .updateProductById(product.id, newData)
      .then(() => {
        openSnackbar('Product updated successfully');
        router.push('/products');
      })
      .catch(() => openSnackbar('An unknown error has occurred'));
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <ProductFormProvider product={product} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex' }}>
        <ProductAside product={product} />
        <ProductForm product={product} isEdit />
      </Box>
    </ProductFormProvider>
  );
};
export default ProductPage;
