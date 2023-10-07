import { Box, Paper, Rating, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FavoritesContext } from "../Context/FavoritesProvider";
import { UserClassesContext } from "../Context/UserClassesProvider";
import Loader from "../components/Loader";


function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function ProfileDashboard() {

  const { userRating, loadingProfile } = useContext(AuthContext);
  const { userClasses } = useContext(UserClassesContext)
  const { favorites } = useContext(FavoritesContext);



  return (
    <>
      {loadingProfile && userClasses && favorites ? <Loader /> : <Box component={Paper} maxWidth="lg" variant="outlined" padding='1.5rem' >
        <Stack display='flex' textAlign='center' flexDirection='column' justifyContent='center'>
          <Typography fontWeight='bold' variant="h3" >Bienvenido</Typography>
          <Typography variant="h5">Resumen de tu cuenta:</Typography>
        </Stack>
        <Box
          sx={{
            marginTop: '2rem',
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(5, 1fr)' },
            gridTemplateRows: 'repeat(2, 1fr)',
            justifyContent: 'center',
            alignContent: 'center',
            gap: 1
          }}
        >
          <Item sx={{ gridColumn: { xs: '1', sm: '4/6' }, gridRow: { xs: '3', sm: '1/3' } }}>
            <Typography variant="h5">Valoración Usuario</Typography>
            <Rating value={userRating} readOnly />
            <Typography variant="h4">{userRating}</Typography></Item>
          <Item sx={{ gridColumn: { xs: '1', sm: '1/4' } }}>
            <Typography variant="h5">Publicaciones Creadas</Typography>
            <Typography variant="h4">{userClasses.length}</Typography>
          </Item>
          <Item sx={{ gridColumn: { xs: '1', sm: '1/4' } }}>
            <Typography variant="h5">Publicaciones Favoritas</Typography>
            <Typography variant="h4">{favorites.length}</Typography>
          </Item>
        </Box>
      </Box>}
    </>
  )
}