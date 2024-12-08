import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('decoded', decoded)
    // req.user = decoded
    // req.user = decoded
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" })
  }
}
