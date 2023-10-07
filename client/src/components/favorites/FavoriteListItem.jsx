/* eslint-disable react/prop-types */
import { Avatar, Box, Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import ClearIcon from '@mui/icons-material/Clear';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useNavigate } from "react-router-dom";

import { SaleUseContext } from "../../Context/SaleContext";
import { useContext, useEffect } from "react";
import { FavoritesContext } from "../../Context/FavoritesProvider";




export default function FavoriteListItem({ favoriteItem }) {
  const { total, agregarClase } = SaleUseContext();
  const { removeFromFavorites } = useContext(FavoritesContext);

  const navigate = useNavigate();

  const handleViewProduct = (id) => {
    navigate(`/infoClase/${id}`)
  };

  const handleAddToCart = (product) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      amount: 1,
    };
    agregarClase(newProduct);
  };

  const handleDeleteFavorite = (id) => {
    removeFromFavorites(id);
  };

  useEffect(() => { }, [total]);

  return (
    <Box component={Paper} elevation={6} padding='1rem'>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        gap="0.5rem"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Avatar variant="square" sx={{ width: '150px', height: '150px', bgcolor: 'pink' }} src={favoriteItem.img} />
        <Stack alignContent='flex-start' >
          <Typography textTransform='capitalize' fontWeight='bold' color='black'>{favoriteItem.name}</Typography>
          <Typography textTransform='uppercase' mt='0.5rem'>{favoriteItem.level}</Typography>
          <Typography mt='0.5rem'>{favoriteItem.description}</Typography>

        </Stack>
        <Stack>
          <Typography variant="h4" align="center">${favoriteItem.price.toLocaleString("es-CL")}</Typography>
          <Stack direction='row' >
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button color='primary' onClick={() => { handleViewProduct(favoriteItem.id_classes) }}><PreviewIcon color="light" /></Button>
              <Button color='danger' onClick={() => { handleDeleteFavorite(favoriteItem.id_classes) }}><ClearIcon color="light" /></Button>
              <Button color='success' onClick={() => { handleAddToCart(favoriteItem) }}><AddShoppingCartIcon /></Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

