import { Box, Button, Typography } from "@mui/material";
import HeroImage from "../../assets/img/heroImg.jpg";
import { Link } from "react-router-dom";

export default function Hero() {

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${HeroImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "600px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "60%" },
              padding: { xs: 3, sm: 2, md: 20 },
            }}
          >
            <Box
              position="relative"
              textAlign="center"
              p={2}
              bgcolor="rgba(0, 0, 0, 0.7)"
              flexDirection="column"
            >
              <Typography
                variant="h3"
                component="h1"
                align="center"
                sx={{ color: "white", mb: 2 }}
              >
                Miau & Guau Petshop
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                component="p"
                align="center"
                sx={{ color: "white", mb: 2 }}
              >
                Descubre todos los productos para hacer feliz a tu mascota
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                align="center"
                sx={{ color: "white", mb: 2 }}
              >
                "Conecta, Compra y Comparte: La tienda virtual favorita de sus mascotas y sus dueños"
              </Typography>

              <Link to={`/Gallery`} style={{ textDecoration: "none" }}>
                <Button variant="contained">Ver clases de entrenamiento</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
