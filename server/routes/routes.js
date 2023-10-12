const express = require("express")

const router = express.Router()

const { registeredUsers } = require("../consultas/consultas")
const { checkCredentialsExist } = require("../middleware/middleware")

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

module.exports = router
