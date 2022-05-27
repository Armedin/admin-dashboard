import { useState } from "react";
import { Box, Typography } from "@kukui/ui";
import { PercentSolid, TagsSolid } from "@kukui/icons";
import styled from "@emotion/styled";

type DiscountType = "none" | "percentage" | "fixed";

const DiscountOption = styled("div")(
  ({ selected }: { selected?: boolean }) => ({
    padding: "1.25rem",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    border: "1px dashed var(--color-gray-300)",
    ...(selected && {
      borderColor: "var(--color-violet-500)",
      backgroundColor: "var(--color-violet-50)",
    }),
  })
);

const options: { name: string; value: DiscountType; icon?: React.ReactNode }[] =
  [
    { name: "No Discount", value: "none" },
    {
      name: "Percentage",
      value: "percentage",
      icon: <PercentSolid sx={{ marginRight: "0.85rem" }} />,
    },
    {
      name: "Fixed Price",
      value: "fixed",
      icon: <TagsSolid sx={{ marginRight: "0.85rem" }} />,
    },
  ];

const Discount = () => {
  const [selected, setSelected] = useState<DiscountType>("none");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 32,
      }}
    >
      {options.map((option) => (
        <DiscountOption
          key={option.value}
          selected={selected === option.value}
          onClick={() => setSelected(option.value)}
        >
          {option.icon}
          <Typography sx={{ fontWeight: 600, fontSize: ".9rem" }}>
            {option.name}
          </Typography>
        </DiscountOption>
      ))}
    </Box>
  );
};

export default Discount;
