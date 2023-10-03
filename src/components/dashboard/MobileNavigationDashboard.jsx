import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

export default function MobileNavigationDashboard() {

  const [value, setValue] = useState("dashboard");

  const handleClick = (event, newValue) => {
    setValue(newValue);
  };

  const activeStyle = {
    color: 'white',
    background: '#3A98B9'
  };

  const activeLink = ({ isActive }) => (isActive ? activeStyle : { color: '#3A98B9', background: '#EEEEEE' });


  return (
    <>
      <BottomNavigation
        showLabels
        sx={{
          width: '100%',
          paddingTop: '1rem',
          height: '100%',
          flexWrap: 'wrap',
          display: { md: 'none' }
        }}
        value={value}
        onChange={() => handleClick()}
      >
        <BottomNavigationAction
          to='profile'
          component={NavLink}
          label="Perfil"
          value="profile"
          icon={<AccountCircleIcon />}
          style={activeLink}
          sx={{
            borderRadius: '20px 0 0 20px'
          }
          }

        />
        <BottomNavigationAction
          to='editprofile'
          component={NavLink}
          sx={{ textAlign: 'center' }}
          label="Editar Perfil"
          value="editprofile"
          icon={<EditNoteRoundedIcon />}
          style={activeLink}

        />

        <BottomNavigationAction
          to='favorites'
          component={NavLink}
          label="Favoritos"
          value="favorites"
          icon={<FavoriteIcon />}
          style={activeLink}

        />
        <BottomNavigationAction
          to='createpost'
          component={NavLink}
          label="Nuevo"
          values="createpost"
          icon={<LibraryAddRoundedIcon />}
          style={activeLink}

        />
        <BottomNavigationAction
          to='classes'
          component={NavLink}
          label="Publicaciones"
          values="posts"
          icon={<LibraryBooksRoundedIcon />}
          style={activeLink}
          sx={{
            borderRadius: '0 20px 20px 0'
          }}
        />
      </BottomNavigation>
    </>
  );

}


