import styled from '@emotion/styled';
import { Input, Typography, Button, Box, IconButton } from '@kukui/ui';
import { PlusSolid, TrashCan } from '@kukui/icons';
import { useEffect, useState } from 'react';

const Container = styled('div')({});
const SingleDetail = styled('div')({
  maxWidth: '580px',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginTop: '0.75rem',

  // '.KukuiFieldWrapper:first-child': {
  //   width: '240px',
  // },

  '.KukuiIconButton': {
    flexShrink: 0,
    color: 'var(--color-gray-500)',
  },
});

interface Detail {
  property?: string;
  value?: string;
}

const Details = () => {
  const [details, setDetails] = useState<Detail[]>([]);

  const handleAddDetail = () => {
    setDetails([
      ...details,
      {
        property: '',
        value: '',
      },
    ]);
  };

  const updateDetailProperty = (property: string, index: number) => {
    const newDetails = [...details];
    newDetails[index] = {
      ...newDetails[index],
      property,
    };
    setDetails(newDetails);
  };

  const updateDetailValue = (value: string, index: number) => {
    const newDetails = [...details];
    newDetails[index] = {
      ...newDetails[index],
      value,
    };
    setDetails(newDetails);
  };

  // Initial detail
  useEffect(() => {
    handleAddDetail();
  }, []);

  const handleRemoveDetail = (index: number) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  return (
    <Container>
      <Typography variant="h5">Product Details</Typography>
      <Box sx={{ marginBottom: '0.5rem' }}>
        {details.map((detail, i) => (
          <SingleDetail key={i}>
            <Input
              placeholder="Property"
              value={detail.property}
              onChange={e => updateDetailProperty(e.target.value, i)}
            />
            <Input
              placeholder="Value"
              value={detail.value}
              onChange={e => updateDetailValue(e.target.value, i)}
            />
            <IconButton size="small" onClick={() => handleRemoveDetail(i)}>
              <TrashCan fontSize="inherit" />
            </IconButton>
          </SingleDetail>
        ))}
      </Box>
      <Button variant="text" size="small" onClick={handleAddDetail}>
        <PlusSolid sx={{ fontSize: '1rem', marginRight: '6px' }} />
        Add a property
      </Button>
    </Container>
  );
};

export default Details;
