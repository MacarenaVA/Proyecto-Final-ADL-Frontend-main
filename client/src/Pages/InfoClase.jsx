import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import Loader from "../components/Loader";

export default function InfoClase() {
  const { id } = useParams();
  const [clases, setClases] = useState(null);
  const [loading, setLoading] = useState(true);

  const getClase = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_URL + "classes/" + id, {
        method: "GET",
      });
      const data = await res.json();

      setClases(data.result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClase();
  }, []);

  return (
    <>
      {loading ?
        <Loader /> :
        <Container sx={{ my: 4 }}>
          <CardInfo clases={clases} />
        </Container>}

    </>
  );
}
