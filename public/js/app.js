// Başlangıç Kulüpleri Verisi
const baslangicKulupleri = [
    { id: 1, ad: "💻 Siber Güvenlik & Yazılım", bilgi: "Ağ güvenliği, yazılım ve temel kodlama becerileri kazandırır.", kategori: "Yazılım & Teknoloji", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 2, ad: "🚀 İHA / SİHA & TEKNOFEST", bilgi: "Model uçak, drone tasarımı ve teknoloji yarışmalarına hazırlar.", kategori: "Yazılım & Teknoloji", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 3, ad: "🤖 Robotik & Yapay Zeka", bilgi: "Arduino, sensör projeleri ve yapay zeka temellerini öğretir.", kategori: "Yazılım & Teknoloji", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 4, ad: "♟️ Satranç & Akıl Oyunları", bilgi: "Stratejik düşünme, öngörü ve zeka oyunları becerisi geliştirir.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 5, ad: "🗣️ Münazara & Hitabet", bilgi: "Topluluk önünde özgüvenle konuşma ve kendini ifade etme yeteneği kazandırır.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 6, ad: "📐 Matematik & Olimpiyat", bilgi: "Matematiksel bulmacalar, olimpiyat hazırlık ve analitik düşünce sağlar.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 7, ad: "📚 Edebiyat & Kütüphanecilik", bilgi: "Kitap okuma alışkanlığı kazandırır, yazar söyleşileri düzenler.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 8, ad: "🌐 Yabancı Diller & İngilizce", bilgi: "Pratik İngilizce konuşma kulübü ve yabancı kültür etkinlikleri yapar.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 9, ad: "🎭 Tiyatro & Drama", bilgi: "Sahne sanatları, diksiyon ve özgüven geliştirme çalışmaları yapar.", kategori: "Oyun & Sanat", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 10, ad: "🎸 Müzik & Okul Orkestrası", bilgi: "Enstrüman çalma becerisi, okul korosu ve konser etkinlikleri düzenler.", kategori: "Oyun & Sanat", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 11, ad: "🎨 Resim & Görsel Sanatlar", bilgi: "Tuval çalışmaları, perspektif ve el becerisi atölyeleri kurar.", kategori: "Oyun & Sanat", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 12, ad: "📷 Sinema & Fotoğrafçılık", bilgi: "Kısa film çekimi, kare kompozisyonu ve görsel hikaye anlatımı sağlar.", kategori: "Oyun & Sanat", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 13, ad: "⚽ Futbol & Basketbol", bilgi: "Takım çalışması, futbol ve basketbol turnuvaları organize eder.", kategori: "Spor", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 14, ad: "🏐 Voleybol & Masa Tenisi", bilgi: "Voleybol ve masa tenisi ligleriyle aktif spor alışkanlığı kazandırır.", kategori: "Spor", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 15, ad: "🚴 Doğa Sporları & Bisiklet", bilgi: "Sağlıklı yaşam bilinci, doğa yürüyüşleri ve bisiklet turları düzenler.", kategori: "Spor", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 16, ad: "❤️ Kızılay & Kan Bağışı", bilgi: "Toplumsal yardımlaşma bilinci ve ilk yardım farkındalığı oluşturur.", kategori: "Sosyal Sorumluluk", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 17, ad: "🟢 Yeşilay Kulübü", bilgi: "Bağımlılıkla mücadele, irade eğitimi ve sağlıklı yaşam seminerleri verir.", kategori: "Sosyal Sorumluluk", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 18, ad: "🌱 Çevre & Sıfır Atık", bilgi: "Geri dönüşüm projeleri, fidan dikimi ve doğayı koruma bilinci aşılar.", kategori: "Sosyal Sorumluluk", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 19, ad: "🤝 Sosyal Sorumluluk & Gönüllülük", bilgi: "Huzurevi ziyaretleri ve toplumsal gönüllülük projeleri yürütür.", kategori: "Sosyal Sorumluluk", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 20, ad: "💡 Girişimcilik & İnovasyon", bilgi: "Genç fikirler üretme, proje yönetimi ve iş geliştirme atölyeleri yapar.", kategori: "Yazılım & Teknoloji", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 21, ad: "🔭 Astronomi & Uzay Bilimleri", bilgi: "Gök cisimlerini inceleme, teleskop gözlemleri ve evren bilinci kazandırır.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 22, ad: "🌍 Coğrafya & Gezi", bilgi: "Ülkemizin tarihi ve coğrafi zenginliklerini tanıtan geziler planlar.", kategori: "Sosyal Sorumluluk", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 23, ad: "📜 Tarih & Kültür Mirası", bilgi: "Müze gezileri, yerel tarih araştırmaları ve kültürel bilinç kazandırır.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 24, ad: "📰 Okul Gazetesi & Basın", bilgi: "Röportaj yapma, yazarlık ve dönemlik okul bülteni çıkarma becerisi verir.", kategori: "Oyun & Sanat", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" },
    { id: 25, ad: "🏛️ Model Birleşmiş Milletler (MUN)", bilgi: "Küresel meseleleri tartışma, diplomasi ve İngilizce münazara becerisi kazandırır.", kategori: "Akademik & Bilim", kontenjan: 40, ogretmen1: "Atanmadı", ogretmen2: "Atanmadı", baskan: "Atanmadı", yardimci: "Atanmadı" }
];

// Verileri localStorage'dan yükle veya başlat
if (!localStorage.getItem('kulupler')) {
    localStorage.setItem('kulupler', JSON.stringify(baslangicKulupleri));
}
if (!localStorage.getItem('ogrenciler')) {
    localStorage.setItem('ogrenciler', JSON.stringify([]));
}
if (!localStorage.getItem('etkinlikler')) {
    localStorage.setItem('etkinlikler', JSON.stringify([]));
}

// Sayfa Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener("DOMContentLoaded", () => {
    veriGuncelle();
});

function veriGuncelle() {
    const kulupler = JSON.parse(localStorage.getItem('kulupler'));
    const ogrenciler = JSON.parse(localStorage.getItem('ogrenciler'));
    const etkinlikler = JSON.parse(localStorage.getItem('etkinlikler'));

    // İstatistikleri Güncelle
    document.getElementById('statToplamOgrenci').innerText = ogrenciler.length;
    document.getElementById('statToplamKulup').innerText = kulupler.length;
    let toplamBos = kulupler.reduce((acc, k) => acc + k.kontenjan, 0);
    document.getElementById('statToplamBos').innerText = toplamBos;

    // Kulüp Seçim Dropdown'larını Doldur
    const kulupSecim = document.getElementById('kulupSecim');
    const yonetimKulupSec = document.getElementById('yonetimKulupSec');
    
    kulupSecim.innerHTML = '<option value="">-- Kulüp Seçiniz --</option>';
    yonetimKulupSec.innerHTML = '';

    kulupler.forEach(k => {
        kulupSecim.innerHTML += `<option value="${k.id}">${k.ad} (Boş: ${k.kontenjan})</option>`;
        yonetimKulupSec.innerHTML += `<option value="${k.id}">${k.ad}</option>`;
    });

    // Kulüp Kartlarını Listele
    const kulupKartlari = document.getElementById('kulupKartlari');
    kulupKartlari.innerHTML = '';
    kulupler.forEach(k => {
        kulupKartlari.innerHTML += `
            <div class="kulup-card">
                <h3>${k.ad}</h3>
                <span style="font-size: 0.75rem; color: var(--accent-blue);">${k.kategori}</span>
                <p style="font-size: 0.85rem; margin: 8px 0; color: var(--text-secondary);">${k.bilgi}</p>
                <div style="font-size: 0.8rem; border-top: 1px solid var(--border-color); padding-top: 6px;">
                    <div>👥 Kalan Kontenjan: <b>${k.kontenjan} / 40</b></div>
                    <div>📌 Danışman: ${k.ogretmen1}, ${k.ogretmen2}</div>
                    <div>👑 Başkan: ${k.baskan}</div>
                </div>
            </div>
        `;
    });

    // Etkinlikleri Listele
    const etkinlikListesi = document.getElementById('etkinlikListesi');
    etkinlikListesi.innerHTML = '';
    if (etkinlikler.length === 0) {
        etkinlikListesi.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.85rem;">Henüz planlanmış etkinlik veya duyuru bulunmuyor.</p>';
    } else {
        etkinlikler.forEach(e => {
            etkinlikListesi.innerHTML += `
                <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="color: var(--accent-blue); font-size: 0.9rem;">${e.baslik} (${e.tarih})</h4>
                    <p style="font-size: 0.8rem; color: var(--text-secondary);">${e.aciklama}</p>
                </div>
            `;
        });
    }
}

// Öğrenci Kayıt Formu İşlemi
document.getElementById('ogrenciFormu').addEventListener('submit', function(e) {
    e.preventDefault();
    const kulupId = document.getElementById('kulupSecim').value;
    const ad = document.getElementById('ogrenciAd').value.trim();
    const sinif = document.getElementById('seviyeSecim').value;

    let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler'));
    let kulupler = JSON.parse(localStorage.getItem('kulupler'));

    if (ogrenciler.some(o => o.ad.toLowerCase() === ad.toLowerCase())) {
        alert("Bu öğrenci zaten kayıtlı!");
        return;
    }

    let kulup = kulupler.find(k => k.id == kulupId);
    if (kulup.kontenjan <= 0) {
        alert("Seçilen kulübün kontenjanı dolu!");
        return;
    }

    // Sınıf başı max 3 öğrenci kontrolü
    let sinifSayisi = ogrenciler.filter(o => o.kulup_id == kulupId && o.sinif == sinif).length;
    if (sinifSayisi >= 3) {
        alert(`Bu kulübe ${sinif} sınıfından maksimum 3 öğrenci girebilir!`);
        return;
    }

    ogrenciler.push({ id: Date.now(), ad, sinif, kulup_id: kulupId });
    kulup.kontenjan -= 1;

    localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
    localStorage.setItem('kulupler', JSON.stringify(kulupler));

    alert("Öğrenci başarıyla kaydedildi!");
    document.getElementById('ogrenciFormu').reset();
    veriGuncelle();
});

// Öğretmen Giriş
function girisYap() {
    const sifre = document.getElementById('sifreInput').value;
    if (sifre === "ogretmen123") {
        document.getElementById('girisAlani').style.display = 'none';
        document.getElementById('yonetimPaneli').style.display = 'block';
        alert("Giriş başarılı!");
    } else {
        alert("Hatalı şifre!");
    }
}

// Akıllı Öneri Sihirbazı
function kulupOnerisiGetir() {
    const ilgi = document.getElementById('ilgiAlaniSec').value;
    const kulupler = JSON.parse(localStorage.getItem('kulupler'));
    const uygunlar = kulupler.filter(k => k.kategori === ilgi);
    
    let alan = document.getElementById('oneriSonucAlani');
    alan.innerHTML = '<b style="font-size:0.85rem; color:var(--accent-blue);">Önerilen Kulüpler:</b>';
    uygunlar.forEach(k => {
        alan.innerHTML += `<div style="font-size:0.8rem; background:#0f172a; padding:6px; margin-top:4px; border-radius:6px;">👉 ${k.ad}</div>`;
    });
}