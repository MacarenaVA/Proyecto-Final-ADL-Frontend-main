import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';


export default function SideBarNavigationDashboard() {
  const activeStyle = {
    fontWeight: 'bold',
    color: '#3A98B9'
  };

  const activeLink = ({ isActive }) => (isActive ? activeStyle : { color: 'black' });

  const sidebarList = [
    { text: 'Perfil', path: 'profile', icon: <AccountCircleIcon /> },
    { text: 'Editar Perfil', path: 'editprofile', icon: <EditNoteRoundedIcon /> },
    { text: 'Mis Favoritos', path: 'favorites', icon: <FavoriteIcon /> },
    { text: 'Crear Publicación', path: 'createpost', icon: <LibraryAddRoundedIcon /> },
    { text: 'Mis Publicaciones', path: 'classes', icon: <LibraryBooksRoundedIcon /> }
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 200,
          display: { xs: 'none', md: 'flex' },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Box>
          <List sx={{
            paddingTop: '2rem',
            fontSize: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}>
            {sidebarList.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ height: 'auto' }} >
                <ListItemButton component={NavLink} to={item.path} style={activeLink}>
                  <ListItemIcon >
                    {item.icon}
                  </ListItemIcon>
                  {item.text}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
