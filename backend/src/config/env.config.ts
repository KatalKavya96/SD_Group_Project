import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

// Load environment variables
dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || "8000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // CORS
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // JWT
  jwt: {
      secret: process.env.JWT_SECRET as string,
      accessTokenExpiry: (process.env.ACCESS_TOKEN_EXPIRY || "15m" ) as SignOptions['expiresIn'],
      refreshTokenExpiry: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as SignOptions['expiresIn'],
  }
};

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = [
  "DATABASE_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "JWT_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_EXPIRY",
];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}
validateEnv();
