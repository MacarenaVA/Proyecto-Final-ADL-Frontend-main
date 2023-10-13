const pool = require("../db/conexion")
const bcrypt = require("bcryptjs")

const registeredUsers = async (user) => {
  let { username, email, password } = user
  const passwordEncoded = bcrypt.hashSync(password)
  const values = [username, email, passwordEncoded]
  const consult = "INSERT INTO users VALUES (DEFAULT, $1, $2, $3)"
  await pool.query(consult, values)
}

const obtainUser = async (email) => {
  const values = [email]
  const consult = `SELECT * FROM users WHERE email = $2`

  const {
    rows: [user],
    rowCount,
  } = await pool.query(consult, values)

  if (!rowCount) {
    throw {
      code: 404,
      message: "Usuario no encontrado",
    }
  }
  delete user.password
  return user
}

const verifyUser = async (email, password) => {
  const values = [email]
  const consult = "SELECT * FROM users WHERE email = $1"

  const { rows, rowCount } = await pool.query(consult, values)

  if (rowCount === 0) {
    throw { code: 401, message: "Email no encontrado" }
  }

  const user = rows[0]
  const { password: passwordEncoded } = user

  const correctPassword = bcrypt.compareSync(password, passwordEncoded)

  if (!correctPassword) {
    throw { code: 401, message: "Contraseña incorrecta" }
  }
}

module.exports = {
  registeredUsers,
  obtainUser,
  verifyUser,
}
