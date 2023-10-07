import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import MyClassListItem from "../components/myClasses/MyClassListItem";

import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { UserClassesContext } from "../Context/UserClassesProvider";

export default function MyClasses() {
  const { userClasses, getClasses } = useContext(UserClassesContext)
  const navigate = useNavigate();

  useEffect(() => {
    getClasses();
  }, []);


  const listMyClasses = userClasses.map((clase) => {
    return <MyClassListItem key={clase.id} myClassItem={clase} />;
  });

  return (
    <Container maxWidth="lg" padding="1.5rem">
      <Typography variant="h3" fontWeight="bold">
        Mis Publicaciones
      </Typography>
      <Stack gap="1.5rem" mt="1rem">
        {userClasses.length === 0 ? (
          <Container>
            <Alert variant="outlined" severity="info">
              <AlertTitle>No has realizado publicaciones.</AlertTitle>
              <Typography>
                Recuerda que puedes ofrecer tu opinión mediante la creación
                de una publicación.{" "}
                <strong>
                  ¡Te invitamos a revisar la sección Crear Publicación!
                </strong>
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/dashboard/createpost");
                }}
              >
                Ir a Sección
              </Button>
            </Alert>
          </Container>
        ) : (
          listMyClasses
        )}
      </Stack>
    </Container>
  );
}
