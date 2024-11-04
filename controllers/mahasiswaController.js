const { db } = require("../firebaseConfig");

// Ambil semua data mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswaRef = db.collection("mahasiswa");
    const snapshot = await mahasiswaRef.get();
    const mahasiswaList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(mahasiswaList);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data mahasiswa", error: error.message });
  }
};

// Tambah mahasiswa baru
const createMahasiswa = async (req, res) => {
  const { npm, nama, kelas } = req.body;
  if (!npm || !nama || !kelas) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  try {
    await db.collection("mahasiswa").doc(npm).set({ nama, kelas });
    res.status(201).json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah mahasiswa", error: error.message });
  }
};

// Update data mahasiswa
const updateMahasiswa = async (req, res) => {
  const { npm } = req.params;
  const { nama, kelas } = req.body;

  if (!npm || !nama || !kelas) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  try {
    const mahasiswaRef = db.collection("mahasiswa").doc(npm);
    const mahasiswaDoc = await mahasiswaRef.get();
    if (!mahasiswaDoc.exists) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    await mahasiswaRef.update({ nama, kelas });
    res.status(200).json({ message: "Data mahasiswa berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate data mahasiswa", error: error.message });
  }
};

// Hapus data mahasiswa
const deleteMahasiswa = async (req, res) => {
  const { npm } = req.params;

  try {
    const mahasiswaRef = db.collection("mahasiswa").doc(npm);
    const mahasiswaDoc = await mahasiswaRef.get();
    if (!mahasiswaDoc.exists) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    await mahasiswaRef.delete();
    res.status(200).json({ message: "Data mahasiswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data mahasiswa", error: error.message });
  }
};

module.exports = { getAllMahasiswa, createMahasiswa, updateMahasiswa, deleteMahasiswa };
