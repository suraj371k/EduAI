import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the JWT payload type for better type safety
interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        userId: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized access - No token provided" 
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // ✅ Standardize the user object - map userId to both id and userId
    req.user = {
      id: decoded.userId,      // Standard property name
      userId: decoded.userId,  // Keep for backward compatibility
    };

    console.log("✅ Auth middleware - User authenticated:", req.user.id);

    next();
  } catch (error: any) {
    console.log("❌ Error in auth middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};