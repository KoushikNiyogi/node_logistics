const jwt = require("jsonwebtoken")
const adminauth =  (req, res, next) => {
   const token = req.headers.authorization
   if (token) {
      const decoded = jwt.verify(token,"node-logistics-admin")
      console.log(decoded)
      if (decoded) {
         next()
      }
      else {
         res.send("Login First")
      }
   }
   else {
      res.send("Login First")
   }
}

module.exports = { adminauth }