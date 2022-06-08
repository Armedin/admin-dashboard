import { UploadedImage } from '@/interfaces/file';
import { GripDotsVerticalSolid } from '@kukui/icons';
import {
  Table,
  TableHead,
  TableBody,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableSortableLabel,
  TableCell,
  TableRow,
  Box,
  Typography,
} from '@kukui/ui';
import { ImageUpload } from '../base';
import { useProductForm } from './form/ProductFormContext';

const columns = [
  { label: '' },
  {
    label: 'Image',
  },
  {
    label: 'File name',
  },
  {
    label: 'Thumbnail',
  },
];

const Images = () => {
  const { images, appendImage } = useProductForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent sx={{ paddingTop: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((cell, index) => (
                <TableCell key={index}>{cell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map(image => (
              <TableRow
                key={image.preview}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <GripDotsVerticalSolid
                    fontSize="sm"
                    sx={{ color: 'var(--color-gray-500)' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={image.preview}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '.475rem',
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{image.name}</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      marginTop: '4px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {typeof image.size === 'number'
                      ? `${(image.size / 1024).toFixed(2)} KB`
                      : image.size}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ImageUpload
          onFileChosen={files => {
            appendImage(
              files.map(file => {
                const preview = URL.createObjectURL(file);
                return {
                  preview,
                  name: file.name,
                  size: file.size,
                  originalFile: file,
                };
              })
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Images;
