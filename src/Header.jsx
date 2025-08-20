import React, { useState } from 'react'; // React kütüphanesi
import cornBg from './assets/corn-header.png'; // Arka plan resmi

// Header bileşeni (üst kısım)
const Header = () => {
  //Kullanıcının seçtiği resmi tutan state (dosya seçilince bu güncellenir)
  const [selectedFile, setSelectedFile] = useState(null);
  //Modelden gelen tahmin sonucunu tutar (hastalık adı, açıklama, tedavi vb.)
  const [result, setResult] = useState(null); // tahmin sonucu

  //Kullanıcı bir resim seçtiğinde çalışır
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Seçilen resmi state'e ata
  };

  //Analiz Et" butonuna tıklanınca çağrılır
  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin.'); // Dosya seçilmemişse uyar
      return;
    }

    const formData = new FormData(); // Form verisi oluştur
    formData.append('file', selectedFile); // Seçilen resmi ekle

    try {
      // Backend API'ye resmi gönder (POST isteği)
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST', //sunucuya yeni veri gönderme işlemleri için kullanılır.
        body: formData, // Gönderilen veri formData (resim içeren)
      });
      const data = await response.json(); // JSON formatındaki cevabı al
      setResult(data); // Tahmin sonucunu state'e kaydet -> sayfa yeniden çizilir
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };

  return (
    <header className="relative w-full flex flex-col items-center justify-center text-center text-green-900 shadow-md py-28 px-6 min-h-[50vh]" style={{ backgroundColor: '#A8E6A1', overflow: 'hidden' }}>
      <img src={cornBg} alt="Mısır Arka Plan" className="absolute top-0 left-0 w-full h-full object-cover opacity-20" />

      <h1 className="z-10 text-4xl md:text-5xl font-extrabold drop-shadow-sm mb-6 text-gray-700">
        Mısır Bitkisi Hastalık Tanı Sistemi
      </h1>
      <p className="z-10 text-xl md:text-2xl mb-8 text-green-900 font-medium max-w-3xl">
        Bu sistem, mısır yapraklarını analiz ederek hastalıkları tespit eder ve bilinçli tarım için bilgi sunar.
      </p>

      <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-4">
        <input type="file" accept="image/*" onChange={handleFileChange} className="bg-amber-500 text-white text-base px-5 py-2.5 rounded shadow-md cursor-pointer hover:bg-amber-400 transition" />
        <button onClick={handleAnalyze} className="bg-gray-700 text-white text-base font-semibold px-6 py-2.5 rounded shadow-md hover:bg-gray-500 transition">
          Analiz Et
        </button>
      </div>

      {/*  Tahmin Sonucunu Göster */}
      {result && (
  <div className="z-10 mt-6 bg-white text-green-900 p-6 rounded-xl shadow-lg max-w-3xl w-full space-y-6">

    <div>
      <h2 className="text-2xl font-bold mb-2 text-center">Analiz Sonucu</h2>
      <p className="text-lg"><strong>Hastalık:</strong> {result.hastalik}</p>
    </div>

    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-2">Açıklama</h3>
      <p className="text-sm leading-relaxed">{result.tedaviler.aciklama}</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 p-4 rounded-md border border-green-200">
        <h4 className="font-semibold mb-2">Belirtiler</h4>
        <ul className="list-disc list-inside text-sm">
          {result.tedaviler.belirtiler.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 p-4 rounded-md border border-red-200">
        <h4 className="font-semibold mb-2">Kimyasal Tedavi</h4>
        <ul className="list-disc list-inside text-sm">
          {result.tedaviler.kimyasal.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 md:col-span-2">
        <h4 className="font-semibold mb-2">Doğal Tedavi</h4>
        <ul className="list-disc list-inside text-sm">
          {result.tedaviler.dogal.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>

  </div>
)}


    </header>
  );
};

export default Header;
