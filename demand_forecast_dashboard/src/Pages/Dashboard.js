import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../Components/Navbar";
import Dropdowns from "../Components/Dropdowns";
import DataTable from "../Components/table";
import Chart from "../Components/Charts";
import InformationCards from "../Components/InformationCards";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    week: "",
    product: "",
    cardData: [],
    tableData1: [],
    tableData2: [],
    chartData: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleWeekChange = (event) =>
    setDashboardData((prevState) => ({
      ...prevState,
      week: event.target.value,
    }));

  const handleProductChange = (event) =>
    setDashboardData((prevState) => ({
      ...prevState,
      product: event.target.value,
    }));

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    // Fetch metric cards data (InformationCards)
    const fetchCardData = fetch(
      "http://localhost:8086/api/v1/metric_cards_data",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          week: dashboardData.week,
          product_id: dashboardData.product,
        }),
      }
    ).then((response) => response.json());

    // Fetch table 1 data (tableData1) from eval_results
    const fetchTableData1 = fetch("http://localhost:8086/api/v1/eval_results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week: dashboardData.week,
        product_id: dashboardData.product,
      }),
    }).then((response) => response.json());

    // Fetch combined data for table 2 from all_results
    const fetchAllResults = fetch("http://localhost:8086/api/v1/all_results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week: dashboardData.week,
        product_id: dashboardData.product,
      }),
    }).then((response) => response.json());

    // Fetch chart data separately from chart_data endpoint
    const fetchChartData = fetch("http://localhost:8086/api/v1/chart_data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: dashboardData.product }), // Only product_id is needed
    }).then((response) => response.json());

    // Handle all the requests
    Promise.all([
      fetchCardData,
      fetchTableData1,
      fetchAllResults,
      fetchChartData,
    ])
      .then(([cardData, tableData1, allResults, chartData]) => {
        setDashboardData((prevState) => ({
          ...prevState,
          cardData,
          tableData1,
          tableData2: allResults,
          chartData, // Update chartData with data from the new endpoint
        }));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  let content;

  if (loading) {
    content = <Box>Loading...</Box>;
  } else if (error) {
    content = <Box sx={{ color: "red" }}>{error}</Box>;
  } else {
    content = (
      <>
        <Dropdowns
          startWeek={dashboardData.week}
          product={dashboardData.product}
          handleStartWeekChange={handleWeekChange}
          handleProductChange={handleProductChange}
          handleSubmit={handleSubmit} // Trigger data fetching on submit
        />

        <Grid container spacing={4} sx={{ marginTop: "50px", padding: "20px" }}>
          {dashboardData.cardData.map((card, index) => (
            <Grid item xs={3} key={index}>
              <InformationCards title={card.title} value={card.value} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: "50px", padding: "20px" }}>
          <Grid item xs={6}>
            <DataTable
              data={dashboardData.tableData1} // Data from eval_results
              headers={["Week", "In-Stock Probability (%)", "Fill Rate (%)"]}
            />
          </Grid>
          <Grid item xs={6}>
            <Chart data={dashboardData.chartData} />{" "}
            {/* Pass chartData to your Chart component */}
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: "20px", padding: "20px" }}>
          <Grid item xs={12}>
            <DataTable
              data={dashboardData.tableData2} // Data from all_results
              headers={[
                "Date",
                "Product Name",
                "Product Category",
                "Record Type",
                "Inventory Level",
                "Demand Level",
              ]}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navbar />
      </AppBar>
      {content}
    </Box>
  );
}
