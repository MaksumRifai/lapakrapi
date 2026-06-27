const pedagang=[{id:'GOR001',nama:'Gorengan Aneka Rasa',lapak:'A12'}];
function show(id){document.querySelectorAll('.page').forEach(x=>x.style.display='none');home.style.display='none';document.getElementById(id).style.display='block';if(id==='scan')start();}
function back(){document.querySelectorAll('.page').forEach(x=>x.style.display='none');home.style.display='block';}
function cek(){let p=pedagang.find(x=>x.id===kode.value);info.textContent=p?JSON.stringify(p,null,2):'Tidak ditemukan';}
let started=false;
function start(){if(started)return;started=true;new Html5QrcodeScanner('reader',{fps:10,qrbox:220}).render(ok,()=>{});}
function ok(txt){let p=pedagang.find(x=>x.id===txt);if(!p){hasil.innerHTML='QR tidak dikenal';return;}
hasil.innerHTML=`<h3>${p.nama}</h3><select id=j><option>Kebersihan</option><option>Keamanan</option><option>Sumbangan / Kas Paguyuban</option></select><br><button onclick="simpan('${p.id}','${p.nama}')">Simpan</button>`;}
function simpan(id,nama){let arr=JSON.parse(localStorage.getItem('lapakrapi')||'[]');arr.push({waktu:new Date().toLocaleString(),nama,jenis:document.getElementById('j').value});localStorage.setItem('lapakrapi',JSON.stringify(arr));alert('Tersimpan');back();}
function renderReport(){let arr=JSON.parse(localStorage.getItem('lapakrapi')||'[]');tbl.innerHTML='<tr><th>Waktu</th><th>Pedagang</th><th>Jenis</th></tr>';arr.forEach(r=>tbl.innerHTML+=`<tr><td>${r.waktu}</td><td>${r.nama}</td><td>${r.jenis}</td></tr>`);}
