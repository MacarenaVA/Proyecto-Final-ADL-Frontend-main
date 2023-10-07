import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import MobileNavigationDashboard from "../components/dashboard/MobileNavigationDashboard";

import SideBarNavigationDashboard from "../components/dashboard/SideBarNavigationDashboard";


export default function Dashboard() {
  return (
    <>
      <MobileNavigationDashboard />
      <Box marginTop='1rem' sx={{ display: 'flex' }}>
        <SideBarNavigationDashboard />
        <Container maxWidth="lg" >
          <Box sx={{ margin: "2rem" }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
}