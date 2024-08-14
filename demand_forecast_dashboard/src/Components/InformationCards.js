import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function InformationCards({ title, value }) {
  return (
    <Card
      sx={{
        minWidth: 200,
        border: "1px solid #e0e0e0",
        boxShadow: 3,
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "h6",
          textAlign: "center",
          fontWeight: "bold",
        }}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Typography variant="h6" color="textPrimary">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
