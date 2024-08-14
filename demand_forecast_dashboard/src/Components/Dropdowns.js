import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Dropdowns({
  startWeek,
  product,
  handleStartWeekChange,
  handleProductChange,
  handleSubmit,
  weeks = [],
  products = [],
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
        gap: 2,
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 200 }} variant="outlined">
        <InputLabel id="start-week-label">Week</InputLabel>
        <Select
          labelId="start-week-label"
          value={startWeek}
          onChange={handleStartWeekChange}
          label="Week"
        >
          {weeks.length > 0 ? (
            weeks.map((week, index) => (
              <MenuItem key={index} value={week}>
                {week}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No weeks available</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 200 }} variant="outlined">
        <InputLabel id="product-label">Product</InputLabel>
        <Select
          labelId="product-label"
          value={product}
          onChange={handleProductChange}
          label="Product"
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <MenuItem key={index} value={product}>
                {product}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No products available</MenuItem>
          )}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ height: "fit-content", m: 1, minWidth: 200 }}
      >
        Submit
      </Button>
    </Box>
  );
}
