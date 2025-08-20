import React from 'react';

const diseases = [
  {
    name: "Cercospora Leaf Spot",
    image: "/diseases/Cercospora-Leaf-Spot.png",
    description:
      "Yapraklarda kahverengi, oval lekeler görülür. Genellikle alt yapraklardan başlar ve yukarı doğru yayılır. Aşırı nemli havalar hastalığın yayılmasını hızlandırır. İleri seviyede yapraklar kuruyabilir ve verimi düşürebilir.",
  },
  {
    name: "Common Rust",
    image: "/diseases/Common-Rust.png",
    description:
      "Yaprakların iki yüzeyinde kırmızımsı kahverengi püstüller oluşur. Rüzgarla yayılır ve nemli havalarda daha hızlı gelişir. Bitkinin fotosentez kapasitesini azaltarak verimde düşüşe neden olabilir.",
  },
  {
    name: "Northern Leaf Blight",
    image: "/diseases/Northern-Leaf-Blight.png",
    description:
      "Yapraklarda gri-yeşil uzun lezyonlar görülür. Özellikle serin ve nemli koşullarda yaygındır. Hastalık, yaprakların erken kurumasına ve koçan gelişiminin yavaşlamasına yol açabilir.",
  },
];

function DiseaseCards() {
  return (
    <div className="relative z-10 px-6 py-14 backdrop-blur-sm rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Mısırda Yaygın Hastalıklar
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {diseases.map((disease, idx) => (
          <div
            key={idx}
            className="bg-stone-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full h-56 object-cover rounded-md mb-5"
              loading="lazy"
            />
            <h3 className="text-2xl font-bold text-green-900 mb-3">
              {disease.name}
            </h3>
            <div className="bg-amber-500 text-white text-lg rounded-md p-4 leading-relaxed">
              {disease.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiseaseCards;
