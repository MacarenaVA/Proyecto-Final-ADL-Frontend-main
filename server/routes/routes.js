const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
require("dotenv").config()

const {
  registeredUsers,
  obtainUser,
  verifyUser,
} = require("../consultas/consultas")
const {
  checkCredentialsExist,
  tokenVerification,
} = require("../middleware/middleware")

router.get("/", (req, res) => {
  res.send("Hello World")
})

router.post("/users", checkCredentialsExist, async (req, res) => {
  try {
    const user = req.body
    await registeredUsers(user)
    res.send("Usuario registrado con éxito")
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/users", tokenVerification, async (req, res) => {
  try {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    const { email } = jwt.decode(token)
    const user = await obtainUser(email)
    res.json(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    await verifyUser(email, password)
    const token = jwt.sign({ email }, process.env.SECRET)
    console.log("Token generado:", token)
    res.send(token)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
