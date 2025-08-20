from fastapi import FastAPI, File, UploadFile # FastAPI uygulaması ve dosya yüklemek için modüller
from fastapi.middleware.cors import CORSMiddleware # CORS sorununu önlemek için
from tensorflow.keras.models import load_model # Keras modeli yüklemek için
from PIL import Image  # Resim işlemek için
import numpy as np # Sayısal işlemler için NumPy
import io # Byte akışından veri okumak için

# FastAPI uygulaması başlatılır
app = FastAPI()

# CORS ayarları (farklı origin'lerden gelen isteklere izin verilir)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Her yerden gelen isteklere izin ver
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına (GET, POST, vs.) izin ver
    allow_headers=["*"],  # Tüm başlıklara izin ver
)

# Modeli yükle
model = load_model("backend/model/corn_disease_model23.h5")

# Sınıf etiketleri 
class_names = ['Cercospora Leaf Spot', 'Common Rust ', 'Healthy', 'Northern Leaf Blight']

# Tahmin API'si
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Yüklenen dosyanın içeriğini oku (resmi al)
    contents = await file.read()
    # Dosyayı aç, RGB’ye çevir, 224x224 boyutuna getir
    image = Image.open(io.BytesIO(contents)).convert("RGB").resize((224, 224))
    # Görseli NumPy dizisine çevir ve model için uygun forma getir
    img_array = np.expand_dims(np.array(image) / 255.0, axis=0)

    # Tahmin yap
    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)] # En yüksek skora sahip sınıf etiketi alınır

    print("Tahmin olasılıkları:", prediction)
    print("Tahmin edilen sınıf:", predicted_class)

    
    treatments = {
        "Cercospora Leaf Spot": {
            "aciklama": (
                "Cercospora cinsi mantarların neden olduğu bir bitki hastalığıdır. "
                "Birçok bitkide görülen bu hastalık verimin ve kalitenin düşmesine neden olmaktadır. "
                "Daha çok sıcak ve nemli bölgelerde görülmektedir."
            ),
            "belirtiler": [
                "Küçük dairesel lekeler",
                "Çevresi klorotik bir halo ile çevrili sarı lekeler",
                "Ağır enfekte olan yapraklar önce sarı ve kahverengi bir renge dönüşüp ardından dökülmesi",
                "Yaprakların yanıp sönmesi (yaprakların pörsümesi, ani solgunluk göstermesi)",
                "Kökler ve meyveler üzerinde koyu renkli ve çökük lezyonlar",
                "Bitkinin bodur kalması",
                "Yapraktaki nekrotik alanların merkezinde doku kaybı"
            ],
            "dogal": [
                "Sanitasyon: Enfekte yaprakların çıkarılması ve toprağa düşen yaprakların kaldırılması",
                "Mantar oluşumunu tetikleyen nemi azaltmak ve yaprakların daha hızlı kurumasını sağlamak için hava sirkülasyonu sağlamak",
                "Bu hastalığa dirençli bitkileri yetiştirmek",
                "Ürün rotasyonu yapmak",
                "Budama yapmak",
                "Drenajı iyi toprağı tercih edip organik madde ile zenginleştirmek",
                "Sabah saatlerinde tabandan sulama yöntemi kullanmak"
            ],
            "kimyasal": [
                "Tarımsal araçları dezenfekte etmek",
                "Mantar spreyleri kullanmak",
                "Sporların topraktan bitki yapraklarına erişmesini engellemek için bitki tabanına malç örtüsü uygulamak"
            ]
        },
        "Common Rust": {
            "aciklama": (
                "Mısırda yaygın olarak görülen Common Rust, yetiştirme döneminde görülen "
                "Puccinia sorghi adlı mantar tarafından oluşturulmaktadır. Ilıman ve tropikal "
                "bölgelerde kışını spor formunda geçirir. Sporlar, rüzgarla yayılmaktadır. "
                "Gelişim için yüksek nem (gece 18–21 °C civarında) ile ılıman gündüz sıcaklıkları idealdir."
            ),
            "belirtiler": [
                "Haziran ayında yaprak yüzeyinde sarımsı küçük noktalar hâlinde ortaya çıkar",
                "Bu noktalar zamanla kabuklu, tuğla-kırmızısı renkli pustüller haline dönüşür",
                "Mantar sporları, yaprağı delerek ortaya çıkar",
                "Etrafındaki dokular sararabilir veya nekroz (doku ölümü) gelişebilir",
                "Ciddi enfeksiyonlarda yaprak tamamen sararır ve ölür",
                "Pustüller olgunlaştıkça siyaha döner",
                "Sap, koçan ve pamuk (husks) gibi diğer bitki organları da etkilenebilir"
            ],
            "dogal": [
                "Genetiği dayanıklı ve sağlam ürünler tercih edilmelidir"
            ],
            "kimyasal": [
                "Yaprak koruyucu fungisit uygulamaları yapılabilir",
                "Yaygın olarak DMI triazoller (Grup 3) ve QoI strobilurinler (Grup 11) tercih edilir"
            ]
        },
        "Northern Leaf Blight": {
            "aciklama": (
                "Exserohilum turcicum, mantar patojeni tarafından kaynaklanır ve genellikle ABD ve Kanada’daki mısır ekim alanlarında görülmektedir. "
                "18–27 °C aralığında 6 saatten fazla nemli ortam, sıcaklık ise ideal gelişime ortam sağlar. "
                "En sık silking (VT) – gelişme evresi civarında başlar; ancak erken enfeksiyonlar (V10–V14) sonucu verimde ciddi kayıplar gözlemlenebilir. "
                "Mantar kışlama evresini mısır artıklarında geçirir; sporlama yağmur ve rüzgarla yayılır. "
                "Birincil enfeksiyondan 7–14 gün sonra lezyonlar belirginleşir."
            ),
            "belirtiler": [
                "İlk olarak tekne biçimli, 2,5–15 cm uzunluğunda gri-yeşil kenarlı lezyonlar görülür",
                "Hastalığın ilerlemesiyle lezyonların rengi açık kahverengine (tan) dönüşür ve merkezde koyu spor birikintileri oluşabilir",
                "Alt yapraklarda başlayarak üst yapraklara doğru ilerler",
                "Şiddetli enfekte durumlarda tüm yaprak dokusu nekrotik hale gelip ölür"
            ],
            "dogal": [
                "Ht1, Ht2, Ht3, HtN genlerini taşıyan hibritler monogenik direnç sağlar",
                "Çok genli (poligenik) dayanıklılık tüm ırklar (race’ler) genelinde koruma sunar",
                "Genotip-ırk ilişkisi dinamik olduğu için bölgesel E. turcicum ırk yapılarına göre hibrit seçimi önemlidir",
                "Artıklar temizlenmeli ya da derin toprağa gömülmeli, monokültürden kaçınılmalıdır (rotasyon önerilir)",
                "Minimum toprak işleme yerine normal veya agresif toprak işleyişi ile artıkların ayrıştırılarak inokulum azaltılmalıdır",
                "İnokulum yoğunluğu yüksek alanlarda, yüksek hava nemine sahip alanlardan kaçınılmalıdır"
            ],
            "kimyasal": [
                "Silking zamanında uygulanan foliar fungisitler (örneğin DMI’ler, QoI’ler) üst yaprakları koruyarak verim kaybını düşürür"
            ]
        },
        "Healthy": {
            "aciklama": (
                "Bitki sağlıklı durumda olduğu için herhangi bir hastalık belirtisi bulunmamaktadır. "
                "Bu nedenle doğal ya da kimyasal bir müdahaleye gerek yoktur."
            ),
            "belirtiler": [
                "Yapraklar canlı yeşil renkte ve lekesizdir",
                "Büyüme düzenlidir, bodurluk veya solma gözlemlenmez",
                "Kök ve meyve yüzeyinde leke, çöküntü ya da doku ölümü yoktur"
            ],
            "dogal": ["Herhangi bir uygulama gerekmez"],
            "kimyasal": ["Herhangi bir uygulama gerekmez"]
        }
    }

    return {
        "hastalik": predicted_class,
        "tedaviler": treatments[predicted_class]
    }