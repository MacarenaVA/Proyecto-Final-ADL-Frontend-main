const pool = require("../db/conexion")
const bcrypt = require("bcryptjs")

const registeredUsers = async (user) => {
  let { username, email, password } = user
  const passwordEncoded = bcrypt.hashSync(password)
  const values = [username, email, passwordEncoded]
  const consult = "INSERT INTO users VALUES (DEFAULT, $1, $2, $3)"
  await pool.query(consult, values)
}

module.exports = {
  registeredUsers,
}
