import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Cards({ clase }) {
  const { id, img, name, price, description } = clase;

  return (
    <>

      <Link to={`/infoClase/${id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" },
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            image={img}
            height="100%"
            width="100%"
            alt="Imagen Clase"
            sx={{ height: 200, width: "100%", objectFit: "cover" }}
          />
          <CardContent
            sx={{
              height: "100%",
              width: "100%",
              p: "10px",
            }}
          >
            <Box>
              <Typography textTransform='capitalize' variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body1">{description.charAt(0).toUpperCase() + description.slice(1)}</Typography>
            </Box>
            <Box>
              <Typography
                variant="h5"
                textAlign="center"
                sx={{ mt: 3, color: "green" }}
              >
                $ {price.toLocaleString("es-CL")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
