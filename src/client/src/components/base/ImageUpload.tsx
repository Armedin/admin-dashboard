import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpSolid } from "@kukui/icons";
import { Typography } from "@kukui/ui";
import { FC } from "react";

interface ImageUploadProps {
  onUpload(files: any[]): void;
}

const Container = styled("div")({
  padding: "1.5rem 1.75rem",
  border: "2px dashed var(--color-gray-300)",
  backgroundColor: "var(--color-gray-50)",
  borderRadius: 8,
  textAlign: "center",
  cursor: "pointer",

  "&:hover": {
    borderColor: "var(--color-violet-500)",
  },
});

const ImageUpload: FC<ImageUploadProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      onUpload(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <Container {...getRootProps()}>
      <input
        {...getInputProps({
          multiple: true,
        })}
      />

      <CloudArrowUpSolid
        sx={{
          fontSize: "64px",
          marginBottom: "10px",
          color: "var(--color-gray-400)",
        }}
      />
      <Typography variant="h3">
        Drop your images here, or click to upload
      </Typography>
      <Typography sx={{ color: "var(--color-gray-500)" }}>
        1200 x 1600 recommended, up to 10MB each
      </Typography>
    </Container>
  );
};

export default ImageUpload;
