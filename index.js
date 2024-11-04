const express = require("express");
const bodyParser = require("body-parser");
const mahasiswaRoutes = require("./routes/mahasiswa");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/mahasiswa", mahasiswaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
