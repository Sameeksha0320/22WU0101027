import React from "react";
import { Container } from "@mui/material";
import Header from "../../components/common/Header";
import Navigation from "../../components/common/Navigation";
import UrlForm from "../../components/UrlShortener/UrlForm";

const UrlShortenerPage = () => {
  return (
    <>
      <Header/>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <UrlForm/>
      </Container>
      <Navigation value={0}/>
    </>
  );
};
export default UrlShortenerPage;