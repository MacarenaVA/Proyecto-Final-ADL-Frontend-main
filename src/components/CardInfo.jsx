import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { SaleUseContext } from "../Context/SaleContext";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../Context/FavoritesProvider";
import { AuthContext } from "../Context/AuthProvider";
import CommentsSection from "./comments/CommentsSection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CardInfo({ clases }) {
  const {
    id,
    img,
    name,
    price,
    id_usu,
    description,
    subject,
    level,
    schedule,
  } = clases;
  const { agregarClase } = SaleUseContext();
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)
  const { token } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(null)

  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault();
    const newProduct = {
      id: clases.id,
      name: clases.name,
      price: clases.price,
      amount: 1,
      img: clases.img,
    };
    agregarClase(newProduct);
  };

  const handleAddToFavorites = (id) => {
    if (token) {
      const isAlreadyInFavorites = favorites.some((item) => item.id_classes === id);
      if (isAlreadyInFavorites) {
        return; // Abort the function if the item is already in favorites
      }
      addToFavorites(id);
      setIsFavorited(true)
    } else {
      Swal.fire({
        title: '¡Necesitas estar Registrado!',
        text: "Para agregar un producto a favorites, necesitas iniar sesión.",
        icon: 'warning',
        showDenyButton: true,
        denyButtonColor: '#3A98B9',
        denyButtonText: 'Registrarse',
        confirmButtonColor: '#3A98B9',
        confirmButtonText: 'Iniciar Sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        } else if (result.isDenied) {
          navigate("/register")
        }
      })
    }
  }

  const handleRemoveFromFavorites = (id) => {
    removeFromFavorites(id)
    setIsFavorited(false)
  }

  useEffect(() => {
    if (!token) {
      setIsFavorited(false)
    }
  }, [])

  return (
    <>
      <Paper elevation={15}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: "50%" }, height: "500px" }}
            src={img}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography textTransform='capitalize' fontWeight="bold" component="div" variant="h4">
                {name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                textTransform='capitalize'
              >
                {subject}
              </Typography>
              <Typography textTransform='capitalize'>
                {" "}
                Nivel: <strong>{level}</strong>{" "}
              </Typography>

              <Typography textTransform='capitalize' fontWeight="bold"> Horarios: {schedule} </Typography>

              <Typography fontWeight="bold" sx={{ mt: 3 }}>
                Descripcion:{" "}
              </Typography>
              <Typography
                textAlign="justify"
                sx={{ mr: 3, mb: 3, gridColumn: "1 / span 2" }}
              >
                {description}
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="secondary"
                sx={{ mb: 2, gridColumn: "1 / span 2" }}
              >
                Precio: ${price.toLocaleString("es-CL")}.
              </Typography>
              <Box display="flex" justifyContent="space-between" gap="1rem">
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleAddToCart}
                >
                  <AddShoppingCartIcon fontWeight="bold" />
                  Carro
                </Button>

                {isFavorited ?
                  <Button fullWidth variant="outlined" color="primary" onClick={() => handleRemoveFromFavorites(id)}>
                    <FavoriteIcon fontWeight="bold" />
                    Eliminar Favorito
                  </Button> :
                  <Button fullWidth variant="contained" color="primary" onClick={() => handleAddToFavorites(id)}>
                    <FavoriteBorderIcon fontWeight="bold" />
                    Favoritos
                  </Button>
                }
              </Box>
            </CardContent>
          </Box>
        </Card>
        <CommentsSection classId={id} />
      </Paper>
    </>
  );
}
