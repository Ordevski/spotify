import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./src/config/mongodb.js";
import songRouter from "./src/routes/songRoutes.js";
import albumRouter from "./src/routes/albumRoutes.js";
import connectCloudinary from "./src/config/cloudinary.js";

const app = express();
const port = process.env.PORT || 9999;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/songs', songRouter);
app.use('/api/albums', albumRouter);

app.get('/', (req, res) => {
    res.send("API Working!");
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})