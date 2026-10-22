// Data awal proyek (State)
let projects = [
    {
        id: 1,
        judul: "Sistem Manajemen Inventori Database",
        kategori: "Web App",
        anggaran: 5000000,
        selesai: true
    },
    {
        id: 2,
        judul: "Aplikasi Kasir & Perhitungan Transaksi",
        kategori: "Desktop App",
        anggaran: 3500000,
        selesai: false
    }
];

// Seleksi Elemen DOM
const projectForm = document.getElementById('projectForm');
const judulInput = document.getElementById('judulProyek');
const kategoriInput = document.getElementById('kategoriProyek');
const anggaranInput = document.getElementById('anggaranProyek');
const statusInput = document.getElementById('statusProyek');
const searchInput = document.getElementById('searchInput');
const projectListContainer = document.getElementById('projectList');

// Elemen Statistik
const totalProyekEl = document.getElementById('totalProyek');
const selesaiProyekEl = document.getElementById('selesaiProyek');
const prosesProyekEl = document.getElementById('prosesProyek');
const totalAnggaranEl = document.getElementById('totalAnggaran');

// Fungsi Render Utama
function render() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Fitur 2: Filter Pencarian Real-Time
    const filteredProjects = projects.filter(project =>
        project.judul.toLowerCase().includes(searchTerm)
    );

    // Render Tampilan Kartu Proyek
    projectListContainer.innerHTML = '';

    if (filteredProjects.length === 0) {
        projectListContainer.innerHTML = '<p style="text-align: center; color: white;">Tidak ada proyek yang ditemukan.</p>';
    } else {
        filteredProjects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card';

            const statusText = project.selesai ? 'Selesai' : 'Dalam Pengerjaan';
            const statusClass = project.selesai ? 'badge-selesai' : 'badge-proses';

            card.innerHTML = `
                <header>
                    <h3>${project.judul}</h3>
                    <p>Kategori: <strong>${project.kategori}</strong> | Anggaran: <strong>Rp ${Number(project.anggaran).toLocaleString('id-ID')}</strong></p>
                    <p>Status: <span class="badge ${statusClass}">${statusText}</span></p>
                </header>
                <div class="card-actions">
                    <button class="btn-toggle" onclick="toggleStatus(${project.id})">Ubah Status</button>
                    <button class="btn-delete" onclick="hapusProyek(${project.id})">Hapus Proyek</button>
                </div>
            `;
            projectListContainer.appendChild(card);
        });
    }

    updateStats();
}

// Fungsi Memperbarui Kartu Statistik
function updateStats() {
    const total = projects.length;
    const selesai = projects.filter(p => p.selesai).length;
    const proses = total - selesai;
    const totalAnggaran = projects.reduce((acc, curr) => acc + Number(curr.anggaran), 0);

    totalProyekEl.textContent = total;
    selesaiProyekEl.textContent = selesai;
    prosesProyekEl.textContent = proses;
    totalAnggaranEl.textContent = `Rp ${totalAnggaran.toLocaleString('id-ID')}`;
}

// Fitur 1: Submit Form & Validasi
projectForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const judul = judulInput.value.trim();
    const kategori = kategoriInput.value;
    const anggaran = parseFloat(anggaranInput.value);
    const selesai = statusInput.checked;

    // Validasi Input
    if (!judul) {
        alert('Judul proyek tidak boleh kosong!');
        return;
    }

    if (isNaN(anggaran) || anggaran <= 0) {
        alert('Estimasi anggaran harus berupa angka dan lebih besar dari 0!');
        return;
    }

    // Membuat Objek Proyek Baru
    const newProject = {
        id: Date.now(),
        judul: judul,
        kategori: kategori,
        anggaran: anggaran,
        selesai: selesai
    };

    projects = [...projects, newProject];

    // Reset Form Input & Render Ulang
    projectForm.reset();
    render();
});

// Fitur 2: Listener Event Input Real-Time
searchInput.addEventListener('input', function () {
    render();
});

// Fitur 3a: Toggle Status Proyek
function toggleStatus(id) {
    projects = projects.map(project => {
        if (project.id === id) {
            return { ...project, selesai: !project.selesai };
        }
        return project;
    });
    render();
}

// Fitur 3b: Hapus Proyek
function hapusProyek(id) {
    projects = projects.filter(project => project.id !== id);
    render();
}

render();