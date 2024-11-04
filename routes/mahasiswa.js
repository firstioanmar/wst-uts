const express = require("express");
const router = express.Router();
const {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
} = require("../controllers/mahasiswaController");

// Endpoints
router.get("/", getAllMahasiswa);
router.post("/", createMahasiswa);
router.put("/:npm", updateMahasiswa);
router.delete("/:npm", deleteMahasiswa);

module.exports = router;
