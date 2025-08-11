import React from "react";
import { Container } from "@mui/material";
import Header from "../../components/common/Header";
import Navigation from "../../components/common/Navigation";
import UrlList from "../../components/Statistics/UrlList";
import { useUrlManagement } from "../../hooks/useUrlManagement";

const StatisticsPage = () => {
  const { urls, registerClick } = useUrlManagement();
  const onVisit = (code, source) => {
    registerClick(code, source);
    window.location.assign(`/${code}`);
  };
  return (
    <>
      <Header/>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <UrlList items={urls} onVisit={onVisit}/>
      </Container>
      <Navigation value={1}/>
    </>
  );
};
export default StatisticsPage;
