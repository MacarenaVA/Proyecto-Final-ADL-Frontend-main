import {
  Alert,
  AlertTitle,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import { useState } from "react"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CartItemDrawer from "./CartItemDrawer"
import { KeyboardArrowRight } from "@mui/icons-material"
import { NavLink } from "react-router-dom"
import { SaleUseContext } from "../../Context/SaleContext"

export default function MenuCart() {
  const [openMenuCart, setopenMenuCart] = useState(false)
  const { total } = SaleUseContext()
  const token = localStorage.getItem("token")

  const data = JSON.parse(localStorage.getItem("product"))
  let totalAmount = 0

  if (data) {
    for (const product of data.products) {
      if (product.amount && typeof product.amount === "number") {
        totalAmount += product.amount
      }
    }
  }

  const handleOpenDrawerCart = () => {
    setopenMenuCart(true)
  }

  const handleCloseDrawerCart = () => {
    setopenMenuCart(false)
  }

  const listCartItems = data?.products.map((product) => {
    return (
      <Box key={product.name}>
        <CartItemDrawer product={product} />
      </Box>
    )
  })

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label=""
        onClick={() => {
          openMenuCart ? handleCloseDrawerCart() : handleOpenDrawerCart()
        }}
      >
        <Badge badgeContent={totalAmount} color="warning">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        open={openMenuCart}
        anchor="right"
        onMouseLeave={handleCloseDrawerCart}
        onClose={handleCloseDrawerCart}
        sx={{
          width: "auto",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "auto",
            boxSizing: "border-box",
            pt: "1rem",
          },
        }}
      >
        <Toolbar />
        <Container>
          <Typography mt="1.5rem" variant="h5" sx={{ mb: 3 }}>
            Carro de Compra
          </Typography>
          {total > 0 ? (
            listCartItems
          ) : (
            <Container maxWidth="xs">
              <Alert variant="outlined" severity="info">
                <AlertTitle>Carro Vacío</AlertTitle>
                <Typography>
                  Actualmente tu carro no contiene productos.{" "}
                  <strong>¡Te invitamos a revisar nuestra galería!</strong>
                </Typography>
              </Alert>
            </Container>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Total
            </Typography>
            <Typography variant="h5" sx={{ mt: 3 }}>
              $ {total.toLocaleString("es-CL")}
            </Typography>
          </Box>
          {/* DISABLED BUTTON FOR THE MOMENT, WORK IN PROGRESS  */}
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            color="success"
            disabled={!token}
            component={NavLink}
            to="/dashboard/sale"
            onClick={handleCloseDrawerCart}
            sx={{ width: "100%", mt: 3 }}
          >
            Pagar
          </Button>
        </Container>
      </Drawer>
    </div>
  )
}
