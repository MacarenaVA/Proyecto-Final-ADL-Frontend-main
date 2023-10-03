import { Box, CardMedia, Container, Typography } from "@mui/material";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Box maxWidth='100%' p='0'>
        <Hero />
        <Container>
          <Box p='1rem' sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
              <CardMedia
                component="img"
                image="/img/bandana1.jpg"
                height="100%"
                width="100%"
                alt="alt de imagen"
              />
            </Box>
            <Box sx={{ flexGrow: 1, flexBasis: 0, pl: 5, textAlign: "justify" }}>
              <Typography variant="tbody1">
              Bienvenido a nuestra tienda Miau & Guau, el sitio web de tienda de mascotas exclusiva de perros y gatos
               donde puedes contactarte con otros usuarios. Aquí podrás encontrar todo lo que necesitas para cuidar a 
               tu mejor amigo, desde alimentos y accesorios hasta servicios de veterinaria y adiestramiento. Además, 
               podrás compartir tus experiencias, consejos y fotos con otros amantes de los animales en nuestra comunidad online. 
               ¡Únete a Miau & Guau y descubre un mundo de diversión y amor para tu mascota! 😊 <br />
              
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />

    </>
  );
}
