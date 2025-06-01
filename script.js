document.getElementById('diabetesForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const umur = parseInt(document.getElementById('umur').value);
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value) / 100; // cm ke meter
    const riwayat = document.getElementById('riwayat').value;
    const gula = parseFloat(document.getElementById('gula').value);

    const bmi = berat / (tinggi * tinggi);
    let risiko = 0;

    // Logika prediksi sederhana
    if (umur > 45) risiko++;
    if (bmi > 25) risiko++;
    if (riwayat === 'ya') risiko++;
    if (gula > 140) risiko++;

    let hasil = '';
    if (risiko >= 3) {
        hasil = "Risiko Tinggi Diabetes. Segera konsultasikan ke dokter.";
    } else if (risiko === 2) {
        hasil = "Risiko Sedang. Perlu menjaga pola makan dan olahraga.";
    } else {
        hasil = "Risiko Rendah. Tetap jaga gaya hidup sehat.";
    }

    document.getElementById('hasil').textContent = hasil;
});