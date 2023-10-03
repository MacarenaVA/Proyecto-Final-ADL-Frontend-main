import { Box, Container, Typography } from "@mui/material";
import NotFoundImg from "../assets/img/not-found.jpg";
import Footer from "../components/Footer";


export default function NotFound() {
  return (
    <>
      <Box marginTop='1rem' sx={{ display: 'flex' }}>
        <Container maxWidth="lg" >
          <Box sx={{ margin: "2rem", textAlign: 'center' }}>
            <Typography fontWeight='bold' variant='h2'>¡UPS!</Typography>
            <Typography variant='h6'>La sección que buscas no se encuentra disponible, o no existe en estos momentos.</Typography>
            <Box
              component="img"
              sx={{ width: '34.4%', height: '20%' }}
              src={NotFoundImg}
              alt="Live from space album cover"
            />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
