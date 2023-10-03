/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const FavoritesContext = React.createContext()

const FavoritesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      setLoadingFavorites(true)
      const res = await fetch(import.meta.env.VITE_URL + `favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const { result } = await res.json();
      setFavorites(result);
      setLoadingFavorites(false)
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async (id) => {
    try {
      const id_classes = id
      await fetch(import.meta.env.VITE_URL + `favorites/${id_classes}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      getFavorites()
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (id) => {
    try {
      const id_classes = id
      await fetch(import.meta.env.VITE_URL + `favorites`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_classes
        }
        )
      });
      getFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getFavorites();
    }
  }, []);

  return (
    <FavoritesContext.Provider value={{ removeFromFavorites, addToFavorites, setLoadingFavorites, loadingFavorites, favorites, setFavorites, getFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );

}

export default FavoritesProvider