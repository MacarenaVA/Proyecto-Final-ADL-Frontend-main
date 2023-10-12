const express = require("express")
const router = require("./routes/routes.js")
const cors = require("cors")

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use("/", router)

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`)
})
