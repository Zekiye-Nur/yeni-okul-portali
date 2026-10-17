let kuluplerData = [];
let ogrencilerData = [];
let etkinliklerData = [];

document.addEventListener("DOMContentLoaded", () => {
    veriYukle();

    document.getElementById('ogrenciFormu').addEventListener('submit', async (e) => {
        e.preventDefault();
        const kulup_id = document.getElementById('kulupSecim').value;
        const ad = document.getElementById('ogrenciAd').value;
        const sinif = document.getElementById('seviyeSecim').value + "-" + document.getElementById('subeSecim').value;

        if (!kulup_id) {
            alert("❌ Lütfen listeden bir kulüp seçin!");
            return;
        }

        const res = await fetch('/api/ogrenci-ekle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ad, sinif, kulup_id })
        });

        const result = await res.json();
        if (res.ok) {
            alert("✅ Öğrenci kulübe başarıyla kaydedildi!");
            document.getElementById('ogrenciFormu').reset();
            veriYukle();
        } else {
            alert("❌ " + result.error);
        }
    });
});

async function veriYukle() {
    try {
        const kRes = await fetch('/api/kulupler');
        kuluplerData = await kRes.json();

        const oRes = await fetch('/api/ogrenciler');
        ogrencilerData = await oRes.json();

        const eRes = await fetch('/api/etkinlikler');
        etkinliklerData = await eRes.json();

        istatistikleriGuncelle();

        const kulupSecim = document.getElementById('kulupSecim');
        const yonetimKulupSec = document.getElementById('yonetimKulupSec');

        if (kulupSecim) {
            kulupSecim.innerHTML = '<option value="">-- Kulüp Seçiniz --</option>';
            kuluplerData.forEach(k => {
                kulupSecim.innerHTML += `<option value="${k.id}">${k.ad} (Kalan: ${k.kontenjan})</option>`;
            });
        }

        if (yonetimKulupSec) {
            yonetimKulupSec.innerHTML = '';
            kuluplerData.forEach(k => {
                yonetimKulupSec.innerHTML += `<option value="${k.id}">${k.ad}</option>`;
            });
        }

        kartlariCiz();
        etkinlikleriCiz();

        if (document.getElementById('yonetimPaneli') && document.getElementById('yonetimPaneli').style.display === 'block') {
            panelGuncelle();
        }
    } catch (err) {
        console.error("Veri yükleme hatası:", err);
    }
}

function istatistikleriGuncelle() {
    const toplamOgrenci = ogrencilerData.length;
    const toplamKulup = kuluplerData.length;
    const toplamBos = kuluplerData.reduce((acc, k) => acc + k.kontenjan, 0);

    document.getElementById('statToplamOgrenci').innerText = toplamOgrenci;
    document.getElementById('statToplamKulup').innerText = toplamKulup;
    document.getElementById('statToplamBos').innerText = toplamBos;
}

function kartlariCiz() {
    const alan = document.getElementById('kulupKartlari');
    if (!alan) return;
    alan.innerHTML = '';

    kuluplerData.forEach(k => {
        alan.innerHTML += `
            <div class="kulup-card" data-ad="${k.ad.toLowerCase()}" data-bilgi="${(k.bilgi || '').toLowerCase()}" data-kategori="${(k.kategori || '').toLowerCase()}">
                <h3 style="margin:0 0 5px 0; font-size:15px;">${k.ad}</h3>
                <span style="background:#1e293b; padding:2px 6px; border-radius:4px; font-size:10px; color:#38bdf8;">${k.kategori || 'Genel'}</span>
                <p style="font-size:12px; color:#94a3b8; margin:6px 0 8px 0;">${k.bilgi}</p>
                <div style="font-size:12px; line-height: 1.5;">
                    👥 Kalan Kontenjan: <b style="color:#38bdf8;">${k.kontenjan}</b> / 40<br>
                    📌 <i>(Sınıf Başına Max 3 Öğrenci)</i><br>
                    👨‍🏫 Danışmanlar: <b>${k.ogretmen1}</b>, <b>${k.ogretmen2}</b><br>
                    👑 Başkan: <b>${k.baskan}</b> | Yrd: <b>${k.yardimci}</b>
                </div>
            </div>
        `;
    });
}

function kulupFiltrele() {
    let aranan = document.getElementById('kulupArama').value.toLowerCase().trim();
    let kartlar = document.getElementsByClassName('kulup-card');
    
    for (let kart of kartlar) {
        let ad = kart.getAttribute('data-ad') || "";
        let bilgi = kart.getAttribute('data-bilgi') || "";
        let kategori = kart.getAttribute('data-kategori') || "";

        if (ad.includes(aranan) || bilgi.includes(aranan) || kategori.includes(aranan)) {
            kart.style.display = "";
        } else {
            kart.style.display = "none";
        }
    }
}

function kulupSec(id) {
    const kulupSecimElementi = document.getElementById('kulupSecim');
    if (kulupSecimElementi) {
        kulupSecimElementi.value = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        kulupSecimElementi.style.borderColor = '#16a34a';
        setTimeout(() => {
            kulupSecimElementi.style.borderColor = '#475569';
        }, 1500);
    }
}

function kulupOnerisiGetir() {
    const secilenKategori = document.getElementById('ilgiAlaniSec').value;
    const uygunKulupler = kuluplerData.filter(k => k.kategori === secilenKategori);
    const sonucAlan = document.getElementById('oneriSonucAlani');

    if (uygunKulupler.length === 0) {
        sonucAlan.innerHTML = `<span style="color:#f87171;">Bu kategoride kulüp bulunamadı.</span>`;
        return;
    }

    let html = `<div style="background:#0f172a; padding:10px; border-radius:6px; border:1px solid #334155;"><b>Sizin İçin Önerilenler:</b><div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">`;
    
    uygunKulupler.forEach(k => {
        html += `
            <div style="background:#1e293b; padding:8px; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <b style="color:#38bdf8; font-size:12px;">${k.ad}</b><br>
                    <span style="font-size:11px; color:#94a3b8;">${k.bilgi}</span>
                </div>
                <button type="button" class="btn btn-yesil" style="margin:0; width:auto; padding:5px 10px; font-size:11px;" onclick="kulupSec(${k.id})">Seç & Kaydol</button>
            </div>
        `;
    });
    
    html += `</div></div>`;
    sonucAlan.innerHTML = html;
}

async function etkinlikEkle() {
    const kulup_id = document.getElementById('yonetimKulupSec').value;
    const baslik = document.getElementById('etkinlikBaslik').value;
    const tarih = document.getElementById('etkinlikTarih').value;
    const aciklama = document.getElementById('etkinlikAciklama').value;

    if (!baslik || !tarih) {
        alert("Lütfen başlık ve tarih giriniz!");
        return;
    }

    const res = await fetch('/api/etkinlik-ekle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kulup_id, baslik, tarih, aciklama })
    });

    if (res.ok) {
        alert("✅ Etkinlik başarıyla yayınlandı!");
        document.getElementById('etkinlikBaslik').value = '';
        document.getElementById('etkinlikTarih').value = '';
        document.getElementById('etkinlikAciklama').value = '';
        await veriYukle();
    } else {
        alert("❌ Etkinlik eklenirken hata oluştu.");
    }
}

function etkinlikleriCiz() {
    const alan = document.getElementById('etkinlikListesi');
    if (!alan) return;
    alan.innerHTML = '';

    if (!etkinliklerData || etkinliklerData.length === 0) {
        alan.innerHTML = `<p style="font-size:12px; color:#64748b;">Henüz planlanmış etkinlik veya duyuru bulunmuyor.</p>`;
        return;
    }

    // Sadece öğretmen girişi yapıldığında (yönetim paneli açıkken) düzenle ve sil butonları görünür
    const ogretmenGirisYapmis = document.getElementById('yonetimPaneli') && document.getElementById('yonetimPaneli').style.display === 'block';

    etkinliklerData.forEach(e => {
        let butonlarHTML = '';
        if (ogretmenGirisYapmis) {
            butonlarHTML = `
                <div style="display:flex; gap:6px; margin-top:8px;">
                    <button class="btn btn-yesil" style="padding:4px 10px; font-size:11px; width:auto; margin:0;" onclick="etkinlikDuzenle(${e.id}, '${e.baslik}', '${e.tarih}', '${e.aciklama}')">✏️ Düzenle</button>
                    <button class="btn btn-sil" style="padding:4px 10px; font-size:11px; width:auto; margin:0;" onclick="etkinlikSil(${e.id})">🗑️ Sil</button>
                </div>
            `;
        }

        alan.innerHTML += `
            <div style="background:#0f172a; border:1px solid #334155; border-left:3px solid #0284c7; padding:12px; border-radius:8px; font-size:13px; position:relative;">
                <b style="color:#38bdf8;">${e.baslik}</b> <span style="font-size:11px; color:#94a3b8;">(${e.kulup_adi})</span><br>
                <span>📅 Tarih: ${e.tarih}</span><br>
                <p style="margin:4px 0 0 0; color:#cbd5e1;">${e.aciklama}</p>
                ${butonlarHTML}
            </div>
        `;
    });
}

async function etkinlikSil(id) {
    if (!confirm("Bu etkinliği silmek istediğinize emin misiniz?")) return;
    const res = await fetch('/api/etkinlik-sil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    if (res.ok) {
        alert("✅ Etkinlik silindi!");
        veriYukle();
    } else {
        alert("❌ Etkinlik silinirken hata oluştu.");
    }
}

function etkinlikDuzenle(id, eskiBaslik, eskiTarih, eskiAciklama) {
    const yeniBaslik = prompt("Yeni Etkinlik Başlığı:", eskiBaslik);
    if (yeniBaslik === null) return;
    
    const yeniTarih = prompt("Yeni Tarih (YYYY-AA-GG):", eskiTarih);
    if (yeniTarih === null) return;

    const yeniAciklama = prompt("Yeni Açıklama / Detay:", eskiAciklama);
    if (yeniAciklama === null) return;

    fetch('/api/etkinlik-guncelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, baslik: yeniBaslik, tarih: yeniTarih, aciklama: yeniAciklama })
    }).then(async res => {
        if (res.ok) {
            alert("✅ Etkinlik güncellendi!");
            await veriYukle();
        } else {
            alert("❌ Güncelleme başarısız.");
        }
    });
}

async function girisYap() {
    const sifre = document.getElementById('sifreInput').value;
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sifre })
    });

    if (res.ok) {
        document.getElementById('girisAlani').style.display = 'none';
        document.getElementById('yonetimPaneli').style.display = 'block';
        panelGuncelle();
        etkinlikleriCiz(); // Öğretmen girince etkinlik butonlarının hemen görünmesini sağlar
    } else {
        alert("❌ Hatalı Şifre!");
    }
}

function panelGuncelle() {
    const kulupId = document.getElementById('yonetimKulupSec').value;
    const kulup = kuluplerData.find(k => k.id == kulupId);
    if (!kulup) return;
    
    const kulupOgrencileri = ogrencilerData.filter(o => o.kulup_id == kulupId);

    document.getElementById('ogretmen1Ad').value = kulup.ogretmen1 === 'Atanmadı' ? '' : kulup.ogretmen1;
    document.getElementById('ogretmen2Ad').value = kulup.ogretmen2 === 'Atanmadı' ? '' : kulup.ogretmen2;

    const baskanSec = document.getElementById('baskanSec');
    const yardimciSec = document.getElementById('yardimciSec');

    baskanSec.innerHTML = '<option value="Atanmadı">Seçiniz...</option>';
    yardimciSec.innerHTML = '<option value="Atanmadı">Seçiniz...</option>';

    kulupOgrencileri.forEach(o => {
        baskanSec.innerHTML += `<option value="${o.ad}" ${o.ad === kulup.baskan ? 'selected' : ''}>${o.ad} (${o.sinif})</option>`;
        yardimciSec.innerHTML += `<option value="${o.ad}" ${o.ad === kulup.yardimci ? 'selected' : ''}>${o.ad} (${o.sinif})</option>`;
    });

    ogrenciListesiniCiz(kulupOgrencileri);
}

function ogrenciListesiniCiz(liste) {
    const listeAlan = document.getElementById('ogrenciListe');
    if (!listeAlan) return;
    listeAlan.innerHTML = '';
    
    if (liste.length === 0) {
        listeAlan.innerHTML = `<p style="font-size:12px; color:#64748b; padding:8px; text-align:center;">Bu kulüpte öğrenci bulunmuyor.</p>`;
        return;
    }

    let html = '<div class="ogrenci-liste-alani">';
    liste.forEach(o => {
        html += `
            <div class="ogrenci-item">
                <span><b>${o.ad}</b> (${o.sinif})</span>
                <button class="btn btn-sil" onclick="ogrenciSil(${o.id}, ${o.kulup_id})">Sil</button>
            </div>
        `;
    });
    html += '</div>';
    listeAlan.innerHTML = html;
}

function ogrenciFiltrele() {
    const aranan = document.getElementById('ogrenciArama').value.toLowerCase();
    const kulupId = document.getElementById('yonetimKulupSec').value;
    const kulupOgrencileri = ogrencilerData.filter(o => o.kulup_id == kulupId);
    const filtrelenmis = kulupOgrencileri.filter(o => o.ad.toLowerCase().includes(aranan) || o.sinif.toLowerCase().includes(aranan));
    ogrenciListesiniCiz(filtrelenmis);
}

async function ogrenciSil(id, kulup_id) {
    if (!confirm("Öğrenciyi kulüpten çıkarmak istediğinize emin misiniz?")) return;
    await fetch('/api/ogrenci-sil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, kulup_id })
    });
    veriYukle();
}

async function ogretmenleriKaydet() {
    const id = document.getElementById('yonetimKulupSec').value;
    const ogretmen1 = document.getElementById('ogretmen1Ad').value;
    const ogretmen2 = document.getElementById('ogretmen2Ad').value;
    const kulup = kuluplerData.find(k => k.id == id);

    const res = await fetch('/api/kulup-guncelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ogretmen1, ogretmen2, baskan: kulup.baskan, yardimci: kulup.yardimci })
    });

    const result = await res.json();
    if (res.ok) {
        alert("✅ Danışman öğretmenler güncellendi!");
        veriYukle();
    } else {
        alert("❌ " + result.error);
    }
}

async function yonetimKaydet() {
    const id = document.getElementById('yonetimKulupSec').value;
    const baskan = document.getElementById('baskanSec').value;
    const yardimci = document.getElementById('yardimciSec').value;
    const kulup = kuluplerData.find(k => k.id == id);

    const res = await fetch('/api/kulup-guncelle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ogretmen1: kulup.ogretmen1, ogretmen2: kulup.ogretmen2, baskan, yardimci })
    });

    const result = await res.json();
    if (res.ok) {
        alert("✅ Başkan ve Yardımcı güncellendi!");
        veriYukle();
    } else {
        alert("❌ " + result.error);
    }
}

function excelIndir() {
    const kulupId = document.getElementById('yonetimKulupSec').value;
    const kulup = kuluplerData.find(k => k.id == kulupId);
    const kulupOgrencileri = ogrencilerData.filter(o => o.kulup_id == kulupId);

    let csvContent = "\uFEFFSira,Ogrenci Adi Soyadi,Sinifi\n";
    kulupOgrencileri.forEach((o, i) => {
        csvContent += `${i + 1},"${o.ad}","${o.sinif}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${kulup.ad}_Uye_Listesi.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function listeyiYazdir() {
    const kulupId = document.getElementById('yonetimKulupSec').value;
    const kulup = kuluplerData.find(k => k.id == kulupId);
    const kulupOgrencileri = ogrencilerData.filter(o => o.kulup_id == kulupId);

    let pencere = window.open('', '_blank');
    pencere.document.write(`
        <html>
        <head><title>${kulup.ad} - Resmi Üye Listesi</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="text-align: center;">ATATÜRK ANADOLU LİSESİ</h2>
            <h3 style="text-align: center;">${kulup.ad} Öğrenci Kulübü Üye Listesi</h3>
            <hr>
            <p><b>1. Danışman Öğretmen:</b> ${kulup.ogretmen1}</p>
            <p><b>2. Danışman Öğretmen:</b> ${kulup.ogretmen2}</p>
            <p><b>Kulüp Başkanı:</b> ${kulup.baskan} | <b>Başkan Yardımcısı:</b> ${kulup.yardimci}</p>
            <br>
            <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse: collapse;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th>Sıra</th>
                        <th>Öğrenci Adı Soyadı</th>
                        <th>Sınıfı</th>
                    </tr>
                </thead>
                <tbody>
                    ${kulupOgrencileri.map((o, i) => `<tr><td>${i+1}</td><td>${o.ad}</td><td>${o.sinif}</td></tr>`).join('')}
                </tbody>
            </table>
            <br><br>
            <div style="float: right; text-align: center;">
                <p>Okul Müdürlüğü</p>
                <br><br>
                <p>İmza / Mühür</p>
            </div>
        </body>
        </html>
    `);
    pencere.document.close();
    pencere.print();
}