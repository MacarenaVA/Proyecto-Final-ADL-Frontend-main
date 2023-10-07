import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function Gallery() {
  const [clases, setClases] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const getClases = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_URL + "classes", {
        method: "GET",
      });
      const data = await res.json();

      setClases(data.result);
      setLoadingClasses(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClases();
  }, []);

  return (
    <>
      <Container>
        {loadingClasses ?
          <Loader />
          :
          <Grid container spacing={2} mt={3}>
            {clases.map((clase) => (
              <Grid item key={clase.id} xs={12} sm={6} md={4}>
                <Cards clase={clase} />
              </Grid>
            ))}
          </Grid>}

      </Container>
      <Footer />
    </>
  );
}
