import styled from '@emotion/styled';
import { Input, Typography, Button, Box, IconButton } from '@kukui/ui';
import { PlusSolid, TrashCan } from '@kukui/icons';
import { useEffect, useState } from 'react';
import { ProductProperty } from '@/interfaces/product';
import { useProductForm } from './form/ProductFormContext';

const Container = styled('div')({});
const SingleProperty = styled('div')({
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

const Properties = () => {
  const { properties, setProperties } = useProductForm();

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      {
        name: '',
        value: '',
      },
    ]);
  };

  const updatePropertyName = (name: string, index: number) => {
    const newProperties = [...properties];
    newProperties[index] = {
      ...newProperties[index],
      name,
    };
    setProperties(newProperties);
  };

  const updatePropertyValue = (value: string, index: number) => {
    const newProperties = [...properties];
    newProperties[index] = {
      ...newProperties[index],
      value,
    };
    setProperties(newProperties);
  };

  // Initial detail
  useEffect(() => {
    handleAddProperty();
  }, []);

  const handleRemoveDetail = (index: number) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  return (
    <Container>
      <Typography variant="h5">Product Properties</Typography>
      <Box sx={{ marginBottom: '0.5rem' }}>
        {properties.map((property, i) => (
          <SingleProperty key={i}>
            <Input
              placeholder="Name"
              value={property.name}
              onChange={e => updatePropertyName(e.target.value, i)}
            />
            <Input
              placeholder="Value"
              value={property.value}
              onChange={e => updatePropertyValue(e.target.value, i)}
            />
            <IconButton size="small" onClick={() => handleRemoveDetail(i)}>
              <TrashCan fontSize="inherit" />
            </IconButton>
          </SingleProperty>
        ))}
      </Box>
      <Button variant="text" size="small" onClick={handleAddProperty}>
        <PlusSolid sx={{ fontSize: '1rem', marginRight: '6px' }} />
        Add a property
      </Button>
    </Container>
  );
};

export default Properties;
