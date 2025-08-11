import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const Navigation = ({ value }) => (
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels value={value}>
      <BottomNavigationAction label="Shorten" icon={<LinkIcon/>} component={RouterLink} to="/"/>
      <BottomNavigationAction label="Statistics" icon={<QueryStatsIcon/>} component={RouterLink} to="/stats"/>
    </BottomNavigation>
  </Paper>
);
export default Navigation;