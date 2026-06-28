// Data Pedagang
const pedagang = [
  { id: 'GOR001', nama: 'Gorengan Aneka Rasa', lapak: 'A12' },
  { id: 'POT001', nama: 'Es Potong Rasa Memori', lapak: 'A10' }
];

let started = false;

// Fungsi Navigasi Halaman
function show(id) {
  document.querySelectorAll('.page').forEach(x => x.style.display = 'none');
  home.style.display = 'none';
  document.getElementById(id).style.display = 'block';
  
  if (id === 'scan') {
    start();
  }
}

function back() {
  document.querySelectorAll('.page').forEach(x => x.style.display = 'none');
  home.style.display = 'block';
}

// Fungsi Cek Pedagang Manual berdasarkan Input
function cek() {
  let p = pedagang.find(x => x.id === kode.value);
  info.textContent = p ? JSON.stringify(p, null, 2) : 'Tidak ditemukan';
}

// Fungsi Inisialisasi Scanner QR
function start() {
  if (started) return;
  started = true;
  new Html5QrcodeScanner('reader', { fps: 10, qrbox: 220 }).render(ok, () => {});
}

// Callback ketika QR Code sukses terbaca
function ok(txt) {
  let p = pedagang.find(x => x.id === txt);
  if (!p) {
    hasil.innerHTML = 'QR tidak dikenal';
    return;
  }
  
  // Mengirimkan p.id, p.nama, dan p.lapak ke fungsi simpan
  hasil.innerHTML = `
    <h3>${p.nama} (${p.lapak})</h3>
    <select id="j">
      <option>Kebersihan</option>
      <option>Keamanan</option>
      <option>Sumbangan / Kas Paguyuban</option>
    </select>
    <br>
    <button onclick="simpan('${p.id}', '${p.nama}', '${p.lapak}')">Simpan</button>
  `;
}

// Fungsi Simpan Data ke LocalStorage (ditambahkan parameter id dan lapak)
function simpan(id, nama, lapak) {
  let arr = JSON.parse(localStorage.getItem('lapakrapi') || '[]');
  
  arr.push({
    waktu: new Date().toLocaleString(),
    id: id,
    nama: nama,
    lapak: lapak,
    jenis: document.getElementById('j').value
  });
  
  localStorage.setItem('lapakrapi', JSON.stringify(arr));
  alert('Tersimpan');
  back();
}

// Fungsi Menampilkan Laporan ke Tabel HTML (ditambahkan kolom ID dan Lapak)
function renderReport() {
  let arr = JSON.parse(localStorage.getItem('lapakrapi') || '[]');
  
  // Memperbarui Header Tabel
  tbl.innerHTML = '<tr><th>Waktu Pembayaran</th><th>Kode Pedagang</th><th>Nama Usaha</th><th>Nomor Lapak</th><th>Jenis Iuran</th></tr>';
  
  // Memperbarui Baris Data Tabel
  arr.forEach(r => {
    tbl.innerHTML += `
      <tr>
        <td>${r.waktu}</td>
        <td>${r.id || '-'}</td>
        <td>${r.nama}</td>
        <td>${r.lapak || '-'}</td>
        <td>${r.jenis}</td>
      </tr>
    `;
  });
}
