import express from "express";//use of es6
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
// import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoute.js";
import cors from "cors";
// import path from "path";


// import { fileURLToPath } from 'url';


//configure env
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

//esmodule 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//databse config
connectDB();

//rest object
const app = express();

// const corsOptions = {
//   origin: 'https://euphonious-sunflower-bb1030.netlify.app', 
//   credentials: true,
// };
app.use(cors({origin:'https://heartfelt-otter-ec342d.netlify.app',credentials:true}))


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://heartfelt-otter-ec342d.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//middelwares

app.use(express.json());
app.use(morgan("dev"));
// app.use(cors({origin:'https://euphonious-sunflower-bb1030.netlify.app',credentials:true}))
//app.use(express.static(path.join(__dirname, '../frontend/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes)

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});
// app.use('*',function(req,res){
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// })

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});