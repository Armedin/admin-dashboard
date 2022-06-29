import { Product } from '@/interfaces/product';
import { PenToSquare, TrashCan } from '@kukui/icons';
import { useRouter } from 'next/router';
import { ActionType } from '../../table/Actions';

const useProductActions = (product: Product) => {
  const router = useRouter();

  const getActions = (): ActionType[] => [
    {
      label: 'Edit',
      icon: <PenToSquare />,
      onClick: () => router.push(`/products/${product.id}`),
    },
    {
      label: 'Delete',
      icon: <TrashCan />,
      onClick: () => {},
    },
  ];

  return {
    getActions,
  };
};

export default useProductActions;
