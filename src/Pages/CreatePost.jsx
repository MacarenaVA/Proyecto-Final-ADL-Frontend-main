import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreatePost() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newPostDetails, setNewPostDetails] = useState({
    name: "",
    description: "",
    subject: "",
    price: "",
    level: "",
    schedule: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, name, price, level, description, schedule, img } =
      newPostDetails;

    try {
      const res = await fetch(import.meta.env.VITE_URL + "classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          name,
          price,
          level,
          description,
          schedule,
          img,
        }),
      });
      const data = await res.json();

      data
        ? Swal.fire({
          icon: "success",
          title: "Clase Registrada con Exito",
          confirmButtonText: "Aceptar",
          didClose: () => {
            navigate("/dashboard/classes");
          },
        })
        : null;

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="md"
      component="form"
      padding="1.5rem"
      onSubmit={handleSubmit}
    >
      <Stack gap="1.5rem" mt="1rem">
        <Typography variant="h3" fontWeight="bold">
          CREAR PUBLICACIÓN
        </Typography>
        <Stack gap="1rem" direction="row">
          <TextField
            fullWidth
            value={newPostDetails?.subject || ""}
            label="producto"
            type="text"
            placeholder="producto..."
            required
            onChange={(e) => {
              setNewPostDetails({ ...newPostDetails, subject: e.target.value });
            }}
          />
          <TextField
            value={newPostDetails?.name || ""}
            fullWidth
            label="Nombre"
            type="text"
            placeholder="Nombre de la publicación..."
            required
            onChange={(e) => {
              setNewPostDetails({ ...newPostDetails, name: e.target.value });
            }}
          />
        </Stack>
        <Stack gap="1rem" direction="row">
          <TextField
            fullWidth
            value={newPostDetails?.price || ""}
            label="Precio"
            type="number"
            placeholder="Precio..."
            required
            onChange={(e) => {
              setNewPostDetails({ ...newPostDetails, price: e.target.value });
            }}
          />
          <TextField
            fullWidth
            value={newPostDetails?.level || ""}
            label="mascota"
            type="text"
            placeholder="mascota..."
            required
            onChange={(e) => {
              setNewPostDetails({ ...newPostDetails, level: e.target.value });
            }}
          />
        </Stack>
        <TextField
          value={newPostDetails?.description || ""}
          multiline
          maxRows={5}
          inputProps={{ maxLength: 149 }}
          label="Descripcion"
          type="text"
          placeholder="Descripcion de la publicación..."
          required
          onChange={(e) => {
            setNewPostDetails({
              ...newPostDetails,
              description: e.target.value,
            });
          }}
        />
        <TextField
          value={newPostDetails?.schedule || ""}
          label="Horario"
          type="text"
          placeholder="Días de clase..."
          required
          onChange={(e) => {
            setNewPostDetails({ ...newPostDetails, schedule: e.target.value });
          }}
        />
        <TextField
          value={newPostDetails?.img || ""}
          label="Link Imagen"
          type="text"
          placeholder="Enlace a la imagen de la publicación..."
          required
          onChange={(e) => {
            setNewPostDetails({ ...newPostDetails, img: e.target.value });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "100%" }}
        >
          Crear Publicación
        </Button>
      </Stack>
    </Container>
  );
}
