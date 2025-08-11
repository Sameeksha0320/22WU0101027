import React from "react";
import { Card, CardContent, CardHeader, Chip, Link, Stack, Typography } from "@mui/material";

const UrlCard = ({ item, onVisit }) => (
  <Card variant="outlined">
    <CardHeader title={`${window.location.origin}/${item.shortcode}`} subheader={`Created: ${item.meta.created} · Expires: ${item.meta.expires}`}/>
    <CardContent>
      <Stack spacing={1}>
        <Typography variant="body2">Long URL: <Chip size="small" label={item.longUrl} sx={{ ml: 1 }}/></Typography>
        <Typography variant="body2">Total Clicks: <Chip size="small" label={item.clicks?.length || 0} sx={{ ml: 1 }}/></Typography>
        <Link href={`/${item.shortcode}`} onClick={(e)=>{ e.preventDefault(); onVisit(item.shortcode, 'stats'); }}>Open / Track</Link>
      </Stack>
    </CardContent>
  </Card>
);
export default UrlCard;