import React, { useState, useEffect } from "react";
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
}) {
  const [weeks, setWeeks] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Flask API
    fetch("http://localhost:8086/api/v1/drop_down_data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with the fetched data
        setWeeks(data.weeks || []);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
        setError("Failed to load dropdown data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <p>Loading...</p>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <p>{error}</p>
      </Box>
    );
  }

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
          {weeks.map((week, index) => (
            <MenuItem key={index} value={week}>
              {week}
            </MenuItem>
          ))}
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
          {products.map((product, index) => (
            <MenuItem key={index} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
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
