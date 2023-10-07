import { Stack } from "@mui/material";
import { PacmanLoader } from "react-spinners";


export default function Loader() {
  return (
    <Stack
      justifyContent="center"
      height="60vh"
      alignItems="center"
      gap="3rem"
      sx={{ margin: "5rem auto" }}
    >
      <PacmanLoader color="#3A98B9" size={52} />
    </Stack>
  );
}
