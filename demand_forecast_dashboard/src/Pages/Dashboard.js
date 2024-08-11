import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Navbar from '../Components/Navbar';

// Data for the first table (as shown in the image)
const tableData1 = [
  { week: 'Week1', inStockProbability: 45, fillRate: 92 },
  { week: 'Week2', inStockProbability: 68, fillRate: 98 },
  { week: 'Week3', inStockProbability: 45, fillRate: 92 },
  { week: 'Week4', inStockProbability: 32, fillRate: 88 },
];

// Sample data for the second table (different data)
const tableData2 = [
  { date: '2024/01/01', productName: 'P1', productCategory: 'C1', inventoryLevel: 12, demandLevel: 10, recordType: 'Actual' },
  { date: '2024/01/07', productName: 'P1', productCategory: 'C1', inventoryLevel: 10, demandLevel: 15, recordType: 'Forecasted' },
];

export default function Dashboard() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [product, setProduct] = React.useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submit clicked');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navbar />
      </AppBar>

      {/* Centered Dropdowns with Submit Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <Select
            value={startDate}
            onChange={handleStartDateChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Start Date' }}
          >
            <MenuItem value="">
              <em>Start Date</em>
            </MenuItem>
            <MenuItem value={10}>Date 1</MenuItem>
            <MenuItem value={20}>Date 2</MenuItem>
            <MenuItem value={30}>Date 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <Select
            value={endDate}
            onChange={handleEndDateChange}
            displayEmpty
            inputProps={{ 'aria-label': 'End Date' }}
          >
            <MenuItem value="">
              <em>End Date</em>
            </MenuItem>
            <MenuItem value={10}>Date 1</MenuItem>
            <MenuItem value={20}>Date 2</MenuItem>
            <MenuItem value={30}>Date 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <Select
            value={product}
            onChange={handleProductChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Product' }}
          >
            <MenuItem value="">
              <em>Product</em>
            </MenuItem>
            <MenuItem value={10}>Product 1</MenuItem>
            <MenuItem value={20}>Product 2</MenuItem>
            <MenuItem value={30}>Product 3</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ height: 'fit-content', mt: 2 }}>
          Submit
        </Button>
      </Box>

      {/* Grid for First Table */}
      <Grid container spacing={3} sx={{ marginTop: '50px', padding: '20px' }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              In-Stock Probability and Fill Rate
            </Typography>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Week</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>In-Stock Probability (%)</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Fill Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {tableData1.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.week}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.inStockProbability}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.fillRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Grid>

      {/* Grid for Second Table */}
      <Grid container spacing={3} sx={{ marginTop: '20px', padding: '20px' }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              Data Table 2
            </Typography>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Date</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Product Name</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Product Category</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Inventory Level</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Demand Level</th>
                  <th style={{ padding: '8px', backgroundColor: '#ddd' }}>Record Type</th>
                </tr>
              </thead>
              <tbody>
                {tableData2.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.date}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.productName}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.productCategory}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.inventoryLevel}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.demandLevel}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.recordType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
