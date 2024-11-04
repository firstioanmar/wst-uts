const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  // Import cors
const mahasiswaRoutes = require("./routes/mahasiswa");

const app = express();

// Menggunakan CORS untuk semua rute
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/mahasiswa", mahasiswaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
