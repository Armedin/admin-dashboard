import { ProductProperty } from '@/interfaces/product';
import { FormContainer, useFormContext } from '@kukui/ui';
import React, { useEffect, useState } from 'react';

const ProductFormContext = React.createContext<{
  images: any[];
  setImages: (images: any[]) => void;
  appendImage: (image: any) => void;
  removeImage: (image: any) => void;
  onSubmit: (data: any) => void;
  properties: ProductProperty[];
  setProperties: (properties: ProductProperty[]) => void;
  thumbnail: string;
  setThumbnail: (value: string) => void;
} | null>(null);

interface ProductFormProviderProps {
  children?: React.ReactNode;
  onSubmit(data: any): void;
}

const defaultProduct = {
  title: '',
  description: '',
  thumbnail: '',
  price: '',
  images: [],
  category_id: null,
  properties: [],
};

export const ProductFormProvider = ({
  children,
  onSubmit,
}: ProductFormProviderProps) => {
  const [images, setImages] = useState<any[]>([]);
  const [properties, setProperties] = useState<ProductProperty[]>([]);
  const [thumbnail, setThumbnail] = useState('');

  const appendImage = (image: any | any[]) => {
    if (Array.isArray(image)) {
      setImages([...images, ...image]);
    } else {
      setImages([...images, image]);
    }
  };

  const removeImage = image => {
    const idx = images.findIndex(img => img.preview === image.preview);
    if (idx !== -1) {
      images.splice(idx, 1);
    }

    setImages([...images]);
  };

  useEffect(() => {
    if (thumbnail === '' && images.length) {
      setThumbnail(images[0].preview);
    }

    if (
      (thumbnail !== '' &&
        images.length > 0 &&
        images.findIndex(image => image.preview === thumbnail) === -1) ||
      images.length === 0
    ) {
      setThumbnail('');
    }
  }, [images, thumbnail]);

  const handleSubmit = data => {
    onSubmit({
      ...data,
      images,
      thumbnail,
      properties: properties.filter(
        property => property.name !== '' && property.value !== ''
      ),
    });
  };

  return (
    <FormContainer defaultValues={defaultProduct} onSuccess={handleSubmit}>
      <ProductFormContext.Provider
        value={{
          images,
          setImages,
          appendImage,
          removeImage,
          properties,
          setProperties,
          thumbnail,
          setThumbnail,
          onSubmit: handleSubmit,
        }}
      >
        {children}
      </ProductFormContext.Provider>
    </FormContainer>
  );
};

export const useProductForm = () => {
  const context = React.useContext(ProductFormContext);
  const form = useFormContext();
  return { ...form, ...context };
};
