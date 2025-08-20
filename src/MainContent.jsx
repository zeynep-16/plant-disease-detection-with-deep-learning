import React from 'react';

const MainContent = () => {
  return (
    <section className="py-12 px-6">
      <div className="bg-stone-700 bg-opacity-60 text-white p-6 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-green-100 mb-10 text-center">
          Mısır Bitkisi Hakkında Genel Bilgiler
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Kart 1 */}
          <div className="bg-green-100 p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Yetiştirilme Koşulları</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mısır, sıcak iklimleri seven ve uzun gün ışığı isteyen bir bitkidir. En iyi gelişimi 18–32°C sıcaklık aralığında gösterir.
              Toprak sıcaklığı 10°C’nin altına düşmemelidir. Yetiştirileceği toprak; suyu iyi drene eden, derin ve organik madde bakımından zengin olmalıdır.
              Tınlı topraklar idealdir. pH seviyesi 6–7 arasında olan nötr topraklarda en verimli şekilde yetişir.
              Tohumlar ilkbaharda 6–8 cm derinliğe ekilmeli ve ekim nöbeti uygulanarak toprak sağlığı korunmalıdır.
              Güneşli, serin geceli bölgeler mısır için en uygun alanlardır.
            </p>
          </div>

          {/* Kart 2 */}
          <div className="bg-green-100 p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Bakım ve Gübreleme</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mısır düzenli bakım isteyen bir bitkidir. Özellikle çiçeklenme ve tane dolum dönemlerinde su ihtiyacı yüksektir.
              Kurak bölgelerde 3–5 kez sulama yapılması gerekebilir. Gübreleme mutlaka toprak analizine göre yapılmalıdır.
              Genel olarak ekimle birlikte azot ve fosfor içeren gübreler verilir.
              Bitki büyümeye başladığında üst gübreleme ile azot desteği sağlanmalıdır.
              Ayrıca yabancı otlarla mücadele edilmesi, çapalama yapılması ve zararlılara karşı takip önemlidir.
              Sağlıklı bir gelişim için mısırın toprağı temiz, nemli ve besin açısından dengeli tutulmalıdır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

