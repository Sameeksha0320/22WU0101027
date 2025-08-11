import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import UrlCard from "./UrlCard";
import ClickDetails from "./ClickDetails";

const UrlList = ({ items, onVisit }) => {
  if (!items?.length) return <Typography>No URLs yet. Create some in the Shortener tab.</Typography>;
  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} md={6} key={item.id}>
          <Stack spacing={1}>
            <UrlCard item={item} onVisit={onVisit}/>
            <ClickDetails clicks={item.clicks}/>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
export default UrlList;
