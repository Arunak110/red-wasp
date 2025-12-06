// lib/mongodb.js
import mongoose from "mongoose";

declare global {
  var mongoose: { conn: any | null; promise: Promise<any> | null };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

// Global cached connection to avoid multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    // Reuse existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((conn) => conn)
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
