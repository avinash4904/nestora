// import jwt from "jsonwebtoken"
// const isAuth = async (req,res,next) => {

//     try {
//         let {token} = req.cookies
//         if(!token){
//             res.status(400).json({message:"user doesn't have a token"})
//         }
//         let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
//         if(!verifyToken){
//             res.status(400).json({message:"user doesn't have a Validtoken"})
//         }
//         req.userId = verifyToken.userId
//         next()

//     } catch (error) {
//         res.status(500).json({message:`isAuth error ${error}`})
//     }
    
// }
// export default isAuth


// ...existing code...
import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
  try {
    // Safely get token from cookies
    const token = req.cookies?.token
    if (!token) {
      // return immediately after sending response to avoid double-send
      return res.status(401).json({ message: "Auth token missing" })
    }

    let verifyToken
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      // invalid token -> return immediately
      return res.status(401).json({ message: "Invalid token" })
    }

    if (!verifyToken) {
      return res.status(401).json({ message: "Invalid token" })
    }

    req.userId = verifyToken.userId
    return next()
  } catch (error) {
    // Always return after sending an error response
    return res.status(500).json({ message: `isAuth error ${error.message || error}` })
  }
}

export default isAuth
// ...existing code...