import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export const checkPermission = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      res.status(401).json({ message: "No token provided" })
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string, roles: string[] }
      if (requiredRoles.some(role => decoded.roles.includes(role))) {
        next()
      } else {
        res.status(403).json({ message: "Insufficient permissions" })
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" })
    }

  }
}
