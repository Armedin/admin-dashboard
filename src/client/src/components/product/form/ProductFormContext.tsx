import { FormContainer } from '@kukui/ui';
import React from 'react';

const ProductFormContext = React.createContext<{
  images: any[];
  setImages: (images: any[]) => void;
  appendImage: (image: any) => void;
  removeImage: (image: any) => void;
  onSubmit: (data: any) => void;
} | null>(null);

interface ProductFormProviderProps {
  children?: React.ReactNode;
  onSubmit(data: any): void;
}

const defaultProduct = {
  title: '',
  description: '',
  price: '',
  images: [],
};

export const ProductFormProvider = ({
  children,
  onSubmit,
}: ProductFormProviderProps) => {
  const [images, setImages] = React.useState<any[]>([]);

  const appendImage = (image: any | any[]) => {
    if (Array.isArray(image)) {
      setImages([...images, ...image]);
    } else {
      setImages([...images, image]);
    }
  };

  const removeImage = image => {
    const idx = images.findIndex(img => img.image === image.image);
    if (idx !== -1) {
      images.splice(idx, 1);
    }
    setImages([...images]);
  };

  const handleSubmit = data => {
    onSubmit({ ...data, images });
  };

  return (
    <FormContainer defaultValues={defaultProduct} onSuccess={handleSubmit}>
      <ProductFormContext.Provider
        value={{
          images,
          setImages,
          appendImage,
          removeImage,
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
  return context;
};
