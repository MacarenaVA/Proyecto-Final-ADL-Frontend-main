import { Button, Container, Rating, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

export default function NewComment({ classId }) {
  const [newCommentsDetails, setNewCommentsDetails] = useState({ rating: 0, comment: '' });
  const { token } = useContext(AuthContext);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { rating, comment } = newCommentsDetails;
    const id_classes = classId;
    try {
      const resComment = await fetch(import.meta.env.VITE_URL + `comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_classes,
          comment
        })
      });
      const resRating = await fetch(import.meta.env.VITE_URL + `ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_classes,
          rating
        })
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!token ? <Typography m='1rem' variant="h6">Necesitas estar registrado para dejar un comentario</Typography > :
        <Container sx={{ margin: '2rem auto' }} component="form" onSubmit={handleCommentSubmit}>
          <Stack gap="0.5rem" alignItems="flex-start">
            <Typography fontWeight='bold' variant="h5">Escribe tu comentario:</Typography>
            <Stack>
              <Typography>¿Cómo evaluarías el servicio?</Typography>
              <Rating
                value={newCommentsDetails.rating}
                onChange={(event, newValue) => {
                  setNewCommentsDetails({ ...setNewCommentsDetails, rating: newValue });
                }}
              // precision={0.5} 
              />
            </Stack>
            <TextField
              fullWidth
              value={newCommentsDetails.comment}
              rows={3}
              type="text"
              placeholder="Deja tu comentario, de esta forma podrás ayudar a los demás usuarios ..."
              required
              onChange={(e) => {
                setNewCommentsDetails({ ...newCommentsDetails, comment: e.target.value });
              }} />
            <Button variant="contained" sx={{ alignSelf: 'flex-end' }} type="submit" >Enviar Comentario</Button>
          </Stack>
        </Container>
      }
    </>
  );
}