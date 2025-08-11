import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const ClickDetails = ({ clicks }) => {
  if (!clicks?.length) return <Typography variant="body2" color="text.secondary">No clicks yet.</Typography>;
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clicks.map((c, i) => (
            <TableRow key={i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{new Date(c.ts).toLocaleString()}</TableCell>
              <TableCell>{c.source || 'unknown'}</TableCell>
              <TableCell>{c.location ? `${c.location.lat}, ${c.location.lon}` : 'unknown'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ClickDetails;
