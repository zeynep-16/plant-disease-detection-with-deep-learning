import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8 mt-16 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Sol Kısım */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-white">
            Mısır Bitkisi Hastalık Tanı Sistemi
          </h4>
          <p className="text-sm text-white mt-1">
            Yapay zekâ destekli analiz aracı ile bilinçli tarım için çözüm sunar.
          </p>
        </div>

        {/* Orta Kısım */}
        <div className="text-sm text-white">
          © {new Date().getFullYear()} Tüm Hakları Saklıdır.
        </div>

        {/* Sağ Kısım */}
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-green-800 transition">Gizlilik</a>
          <a href="#" className="hover:text-green-800 transition">Hakkında</a>
          <a href="#" className="hover:text-green-800 transition">İletişim</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
