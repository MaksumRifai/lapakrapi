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

// Fungsi Cek Pedagang Manual (Sekarang menampilkan format Tabel)
function cek() {
  let p = pedagang.find(x => x.id === kode.value);
  
  if (p) {
    info.innerHTML = `
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
        <tr>
          <th style="padding: 8px; background-color: #f2f2f2;">Detail</th>
          <th style="padding: 8px; background-color: #f2f2f2;">Informasi</th>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Kode Pedagang</td>
          <td style="padding: 8px;">${p.id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Nama Usaha</td>
          <td style="padding: 8px;">${p.nama}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Nomor Lapak</td>
          <td style="padding: 8px;">${p.lapak}</td>
        </tr>
      </table>
    `;
  } else {
    info.innerHTML = '<span style="color: red; font-weight: bold;">Tidak ditemukan</span>';
  }
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

// Fungsi Simpan Data ke LocalStorage
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

// Fungsi Menampilkan Laporan ke Tabel HTML
function renderReport() {
  let arr = JSON.parse(localStorage.getItem('lapakrapi') || '[]');
  
  tbl.innerHTML = '<tr><th>Waktu Pembayaran</th><th>Kode Pedagang</th><th>Nama Usaha</th><th>Nomor Lapak</th><th>Jenis Iuran</th></tr>';
  
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
