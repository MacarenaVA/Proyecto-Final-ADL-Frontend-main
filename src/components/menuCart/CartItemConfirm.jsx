import { Avatar, Box, Typography, Paper } from "@mui/material";

export default function CartItemDrawer({ product }) {
  return (
    <Box component={Paper} padding="1rem" sx={{ marginBottom: "1rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Avatar
          variant="square"
          sx={{ padding: "0.5rem", width: "150px", height: "150px" }}
          src={product.img}
        />
        <Box alignItems="left">
          <Typography textTransform='capitalize' fontWeight="bold">{product.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "2rem",
          }}
        >
          <Box>
            <Typography variant="h6">Cantidad</Typography>
            <Typography>{product.amount}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Total</Typography>
            <Typography>
              $ {(product.price * product.amount).toLocaleString("es-CL")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
