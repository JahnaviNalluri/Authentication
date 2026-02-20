const mongoose = require("mongoose");

const connectDb = async () => {
  const url = process.env.URL;

  if (!url) {
    throw new Error("MongoDB URL missing in .env");
  }

  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDb;
