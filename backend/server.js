const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.URL;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
const cors = require("cors");

app.use(cors({
  origin: [
  
    "https://authentication-b8vecw6ud-janus-projects-1ade5e1c.vercel.app"
  
  ],
  credentials: true
}));
