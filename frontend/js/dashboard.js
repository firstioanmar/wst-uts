const apiUrl = "http://localhost:3000/mahasiswa";  // URL API backend

// Cek jika user sudah login
if (!sessionStorage.getItem("authenticated")) {
  window.location.href = "login.html";
}

// Fungsi logout
function logout() {
  sessionStorage.removeItem("authenticated");
  window.location.href = "login.html";
}

// Ambil data mahasiswa dari API
async function fetchMahasiswa() {
  try {
    const response = await fetch(apiUrl);
    const mahasiswa = await response.json();
    const tableBody = document.getElementById("mahasiswaTableBody");
    tableBody.innerHTML = "";

    mahasiswa.forEach((mhs) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${mhs.npm}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.kelas}</td>
        <td>
          <button onclick="editMahasiswa('${mhs.npm}', '${mhs.nama}', '${mhs.kelas}')">Edit</button>
          <button onclick="deleteMahasiswa('${mhs.npm}')">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching mahasiswa:", error);
  }
}

// Tambah mahasiswa baru
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const npm = document.getElementById("npm").value;
  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ npm, nama, kelas })
    });
    fetchMahasiswa();
  } catch (error) {
    console.error("Error adding mahasiswa:", error);
  }
});

// Edit mahasiswa
function editMahasiswa(npm, nama, kelas) {
  document.getElementById("npm").value = npm;
  document.getElementById("nama").value = nama;
  document.getElementById("kelas").value = kelas;
  document.getElementById("addForm").onsubmit = async (e) => {
    e.preventDefault();

    const newNama = document.getElementById("nama").value;
    const newKelas = document.getElementById("kelas").value;

    try {
      await fetch(`${apiUrl}/${npm}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newNama, kelas: newKelas })
      });
      fetchMahasiswa();
    } catch (error) {
      console.error("Error updating mahasiswa:", error);
    }
  };
}

// Hapus mahasiswa
async function deleteMahasiswa(npm) {
  try {
    await fetch(`${apiUrl}/${npm}`, {
      method: "DELETE"
    });
    fetchMahasiswa();
  } catch (error) {
    console.error("Error deleting mahasiswa:", error);
  }
}

// Inisialisasi data mahasiswa
fetchMahasiswa();
