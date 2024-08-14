import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../Components/Navbar";
import Dropdowns from "../Components/Dropdowns";
import DataTable from "../Components/table";
import Chart from "../Components/Charts";
import InformationCards from "../Components/InformationCards";

const tableData1 = [
  { week: "Week1", inStockProbability: 45, fillRate: 92 },
  { week: "Week2", inStockProbability: 68, fillRate: 98 },
  { week: "Week3", inStockProbability: 45, fillRate: 92 },
  { week: "Week4", inStockProbability: 32, fillRate: 88 },
];

const tableData2 = [
  {
    date: "2024/01/01",
    productName: "P1",
    productCategory: "C1",
    inventoryLevel: 12,
    demandLevel: 10,
    recordType: "Actual",
  },
  {
    date: "2024/01/07",
    productName: "P1",
    productCategory: "C1",
    inventoryLevel: 10,
    demandLevel: 15,
    recordType: "Forecasted",
  },
];

const cardData = [
  {
    title: "Restock Lead Time",
    value: "15 (Days)",
  },
  {
    title: "Days of Supply",
    value: "10 (Days)",
  },
  {
    title: "WoW Average Inventory",
    value: "20 (Tons)",
  },
  {
    title: "WoW Average Demand",
    value: "22 (Tons)",
  },
];

export default function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [product, setProduct] = useState("");

  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleProductChange = (event) => setProduct(event.target.value);
  const handleSubmit = () => console.log("Submit clicked");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navbar />
      </AppBar>

      <Dropdowns
        startDate={startDate}
        endDate={endDate}
        product={product}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleProductChange={handleProductChange}
        handleSubmit={handleSubmit}
      />

      <Grid container spacing={4} sx={{ marginTop: "50px", padding: "20px" }}>
        {cardData.map((card, index) => (
          <Grid item xs={3} key={index}>
            <InformationCards title={card.title} value={card.value} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "50px", padding: "20px" }}>
        <Grid item xs={6}>
          <DataTable
            // title="In-Stock Probability and Fill Rate"
            data={tableData1}
            headers={["Week", "In-Stock Probability (%)", "Fill Rate (%)"]}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "20px", padding: "20px" }}>
        <Grid item xs={12}>
          <DataTable
            // title="Data Table 2"
            data={tableData2}
            headers={[
              "Date",
              "Product Name",
              "Product Category",
              "Inventory Level",
              "Demand Level",
              "Record Type",
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
