export interface MedicalServiceData {
  id: string;
  title: string;
  description: string;
  department: string;
  duration: string;
  category: string;
  content: string;
}

export const medicalServices: MedicalServiceData[] = [
  {
    id: "1",
    title: "Kedokteran Umum & Konsultasi",
    description: "Layanan perawatan primer komprehensif termasuk pemeriksaan rutin, perawatan pencegahan, dan pengobatan penyakit umum.",
    department: "Penyakit Dalam",
    duration: "30-60 menit",
    category: "Perawatan Primer",
    content: `
# Kedokteran Umum & Konsultasi

Departemen Kedokteran Umum kami menyediakan layanan perawatan primer komprehensif untuk pasien dari segala usia. Kami fokus pada perawatan pencegahan, diagnosis dini, dan pengobatan yang efektif untuk berbagai kondisi medis.

## Layanan yang Ditawarkan

Layanan kedokteran umum kami meliputi:

### Pemeriksaan Kesehatan Rutin
- Pemeriksaan fisik tahunan
- Skrining dan penilaian kesehatan
- Konsultasi perawatan pencegahan
- Layanan vaksinasi

### Diagnosis dan Pengobatan
- Pengobatan penyakit dan infeksi umum
- Manajemen penyakit kronis
- Manajemen obat dan resep
- Koordinasi rujukan untuk perawatan khusus

### Perawatan Pencegahan
- Penilaian risiko kesehatan
- Konseling gaya hidup
- Strategi pencegahan penyakit
- Pendidikan dan bimbingan kesehatan

## Pendekatan Kami

Kami percaya pada pendekatan yang berpusat pada pasien yang menekankan:

- **Perawatan Komprehensif**: Menangani semua aspek kesehatan Anda
- **Fokus Pencegahan**: Deteksi dini dan pencegahan masalah kesehatan
- **Perawatan Personal**: Rencana perawatan yang disesuaikan dengan kebutuhan individu
- **Dukungan Berkelanjutan**: Pemantauan dan manajemen kesehatan jangka panjang

## Kapan Harus Berkunjung

Pertimbangkan untuk menjadwalkan janji temu untuk:
- Pemeriksaan kesehatan tahunan
- Gejala baru atau persisten
- Tinjauan obat
- Kekhawatiran atau pertanyaan kesehatan
- Kebutuhan perawatan pencegahan

## Tim Kami

Dokter penyakit dalam berpengalaman kami berdedikasi untuk memberikan perawatan berkualitas tinggi dan penuh kasih untuk membantu Anda mencapai dan mempertahankan kesehatan optimal.
    `,
  },
  {
    id: "2",
    title: "Layanan Kesehatan Mental & Psikiatri",
    description: "Layanan kesehatan mental profesional termasuk konseling, terapi, dan perawatan psikiatri untuk berbagai kondisi kesehatan mental.",
    department: "Psikiatri & Psikologi",
    duration: "45-60 menit",
    category: "Kesehatan Mental",
    content: `
# Layanan Kesehatan Mental & Psikiatri

Departemen Kesehatan Mental kami menawarkan layanan psikiatri dan psikologi komprehensif untuk mendukung kesejahteraan mental Anda. Kami menyediakan perawatan profesional untuk berbagai kondisi kesehatan mental dalam lingkungan yang mendukung dan rahasia.

## Layanan yang Ditawarkan

### Layanan Psikiatri
- Evaluasi dan penilaian kesehatan mental
- Manajemen obat
- Pengobatan gangguan mood, kecemasan, dan depresi
- Konsultasi psikiatri

### Layanan Psikologi
- Terapi dan konseling individu
- Terapi kognitif-perilaku (CBT)
- Manajemen stres dan strategi mengatasi
- Dukungan untuk trauma dan PTSD

### Program Khusus
- Pengobatan gangguan kecemasan dan panik
- Manajemen depresi
- Perawatan gangguan bipolar
- Dukungan gangguan makan
- Konseling kecanduan

## Pendekatan Perawatan Kami

Kami menggunakan perawatan berbasis bukti yang disesuaikan dengan kebutuhan unik setiap pasien:

- **Penilaian Komprehensif**: Evaluasi menyeluruh untuk memahami kondisi Anda
- **Perawatan Individual**: Rencana perawatan yang dipersonalisasi untuk hasil optimal
- **Tim Multidisiplin**: Kolaborasi antara psikiater, psikolog, dan terapis
- **Kontinuitas Perawatan**: Dukungan berkelanjutan sepanjang perjalanan perawatan Anda

## Kondisi yang Kami Tangani

- Depresi dan gangguan mood
- Gangguan kecemasan dan serangan panik
- Gangguan bipolar
- PTSD dan kondisi terkait trauma
- Gangguan obsesif-kompulsif (OCD)
- Gangguan makan
- Kecanduan dan penyalahgunaan zat
- Gangguan attention-deficit/hyperactivity (ADHD)

## Memulai

Mengambil langkah pertama menuju perawatan kesehatan mental bisa menjadi tantangan. Tim penuh kasih kami siap mendukung Anda sepanjang perjalanan. Kami menyediakan lingkungan yang aman dan tidak menghakimi di mana Anda dapat menerima perawatan yang layak Anda dapatkan.

## Kerahasiaan

Semua layanan kesehatan mental disediakan dengan tingkat kerahasiaan dan perlindungan privasi tertinggi, sesuai dengan peraturan kesehatan dan standar etika.
    `,
  },
  {
    id: "3",
    title: "Konsultasi Nutrisi & Diet",
    description: "Konseling nutrisi ahli dan perencanaan diet untuk mendukung tujuan kesehatan Anda, mengelola kondisi medis, dan meningkatkan kesejahteraan secara keseluruhan.",
    department: "Nutrisi & Diet",
    duration: "45-60 menit",
    category: "Kesejahteraan",
    content: `
# Konsultasi Nutrisi & Diet

Departemen Nutrisi dan Diet kami menyediakan panduan nutrisi ahli untuk membantu Anda mencapai tujuan kesehatan, mengelola kondisi medis, dan meningkatkan kesejahteraan secara keseluruhan melalui intervensi diet berbasis bukti.

## Layanan yang Ditawarkan

### Konseling Nutrisi
- Penilaian nutrisi komprehensif
- Perencanaan makan yang dipersonalisasi
- Program manajemen berat badan
- Terapi nutrisi medis

### Rencana Diet Khusus
- Perencanaan makan diabetes
- Diet sehat jantung
- Manajemen diet ginjal
- Nutrisi gangguan gastrointestinal
- Manajemen alergi dan intoleransi makanan

### Optimasi Kesehatan
- Nutrisi olahraga untuk atlet
- Konseling nutrisi pediatrik
- Dukungan nutrisi geriatrik
- Nutrisi prenatal dan pascanatal

## Pendekatan Kami

Ahli gizi terdaftar kami bekerja sama dengan Anda untuk membuat rencana nutrisi yang dipersonalisasi:

- **Penilaian Individual**: Memahami riwayat kesehatan, gaya hidup, dan tujuan Anda
- **Rekomendasi Berbasis Bukti**: Panduan nutrisi berbasis sains
- **Solusi Praktis**: Rencana makan yang realistis sesuai gaya hidup Anda
- **Dukungan Berkelanjutan**: Tindak lanjut rutin untuk melacak kemajuan dan menyesuaikan rencana

## Kondisi yang Kami Dukung

- Diabetes (Tipe 1, Tipe 2, dan gestasional)
- Penyakit kardiovaskular
- Penyakit ginjal
- Gangguan pencernaan (IBS, Crohn's, penyakit celiac)
- Alergi dan intoleransi makanan
- Obesitas dan manajemen berat badan
- Gangguan makan
- Tekanan darah tinggi
- Kolesterol tinggi

## Yang Dapat Diharapkan

Selama konsultasi, ahli gizi kami akan:

1. Meninjau riwayat medis dan status kesehatan saat ini
2. Menilai kebiasaan makan dan kebutuhan nutrisi
3. Membahas tujuan kesehatan dan tantangan
4. Mengembangkan rencana nutrisi yang dipersonalisasi
5. Memberikan pendidikan dan sumber daya
6. Menjadwalkan janji temu tindak lanjut sesuai kebutuhan

## Tim Kami

Tim ahli gizi terdaftar dan ahli nutrisi kami adalah profesional berlisensi dengan keahlian dalam terapi nutrisi medis, memastikan Anda menerima perawatan berkualitas tertinggi.
    `,
  },
  {
    id: "4",
    title: "Kardiologi & Perawatan Jantung",
    description: "Layanan kardiovaskular komprehensif termasuk pencegahan penyakit jantung, diagnosis, pengobatan, dan perawatan jantung berkelanjutan.",
    department: "Kardiologi",
    duration: "60-90 menit",
    category: "Perawatan Khusus",
    content: `
# Kardiologi & Perawatan Jantung

Departemen Kardiologi kami menyediakan perawatan kardiovaskular komprehensif, dari skrining pencegahan hingga perawatan lanjutan untuk kondisi jantung. Kami berkomitmen untuk membantu Anda mempertahankan jantung yang sehat dan mengelola penyakit kardiovaskular secara efektif.

## Layanan yang Ditawarkan

### Layanan Diagnostik
- Elektrokardiogram (EKG/ECG)
- Ekokardiografi (ultrasonografi jantung)
- Uji stres
- Kateterisasi jantung
- Pemantauan Holter (pemantauan irama jantung 24 jam)
- Pemantauan tekanan darah

### Layanan Perawatan
- Manajemen penyakit jantung
- Pengobatan hipertensi (tekanan darah tinggi)
- Manajemen aritmia (detak jantung tidak teratur)
- Perawatan gagal jantung
- Program rehabilitasi jantung
- Kardiologi pencegahan

### Perawatan Khusus
- Pengobatan penyakit arteri koroner
- Manajemen penyakit katup jantung
- Perawatan cacat jantung bawaan
- Pengobatan penyakit arteri perifer

## Kondisi yang Kami Tangani

- Penyakit arteri koroner
- Gagal jantung
- Aritmia (fibrilasi atrium, bradikardia, takikardia)
- Hipertensi
- Gangguan katup jantung
- Gagal jantung kongestif
- Penyakit arteri perifer
- Aneurisma aorta
- Cacat jantung bawaan

## Pendekatan Kami

Kami menyediakan perawatan kardiovaskular komprehensif melalui:

- **Diagnostik Canggih**: Peralatan mutakhir untuk diagnosis yang akurat
- **Perawatan Berbasis Bukti**: Mengikuti pedoman klinis terbaru dan praktik terbaik
- **Fokus Pencegahan**: Deteksi dini dan pencegahan penyakit jantung
- **Tim Multidisiplin**: Kolaborasi dengan spesialis lain saat diperlukan
- **Pendidikan Pasien**: Memberdayakan pasien dengan pengetahuan tentang kesehatan jantung

## Kapan Harus Mengunjungi Kardiolog

Pertimbangkan untuk menjadwalkan janji temu jika Anda mengalami:

- Nyeri atau ketidaknyamanan dada
- Sesak napas
- Detak jantung tidak teratur
- Pusing atau pingsan
- Pembengkakan di kaki atau kaki
- Riwayat keluarga penyakit jantung
- Tekanan darah tinggi
- Kolesterol tinggi
- Diabetes (peningkatan risiko penyakit jantung)

## Pencegahan dan Pemeliharaan

Kami menekankan kardiologi pencegahan melalui:

- Skrining kardiovaskular rutin
- Konseling gaya hidup (diet, olahraga, berhenti merokok)
- Manajemen faktor risiko
- Manajemen obat saat diperlukan
- Perawatan tindak lanjut rutin

## Tim Kami

Kardiolog bersertifikat dan tim perawatan jantung kami berdedikasi untuk memberikan perawatan kardiovaskular berkualitas tertinggi, menggunakan alat diagnostik dan pilihan perawatan terbaru.
    `,
  },
  {
    id: "5",
    title: "Kesehatan Wanita & Obstetri",
    description: "Layanan kesehatan wanita komprehensif termasuk ginekologi, obstetri, kesehatan reproduksi, dan perawatan khusus untuk semua tahap kehidupan.",
    department: "Obstetri & Ginekologi",
    duration: "30-60 menit",
    category: "Kesehatan Wanita",
    content: `
# Kesehatan Wanita & Obstetri

Departemen Kesehatan Wanita kami menyediakan perawatan ginekologi dan obstetri komprehensif untuk wanita di setiap tahap kehidupan. Kami menawarkan berbagai layanan dari perawatan pencegahan rutin hingga perawatan khusus dalam lingkungan yang mendukung dan rahasia.

## Layanan yang Ditawarkan

### Layanan Ginekologi
- Pemeriksaan kesehatan wanita tahunan
- Pap smear dan skrining kanker serviks
- Pemeriksaan kesehatan payudara dan rujukan mammografi
- Konseling dan manajemen kontrasepsi
- Pengobatan kondisi ginekologi
- Manajemen menopause

### Layanan Obstetri
- Perawatan dan pemantauan prenatal
- Manajemen kehamilan berisiko tinggi
- Layanan persalinan
- Perawatan pascapersalinan
- Konseling pra-konsepsi
- Evaluasi kesuburan

### Layanan Khusus
- Bedah ginekologi invasif minimal
- Pengobatan gangguan menstruasi
- Manajemen nyeri panggul
- Pengobatan inkontinensia urin
- Manajemen sindrom ovarium polikistik (PCOS)
- Perawatan endometriosis

## Kondisi yang Kami Tangani

- Gangguan menstruasi (pendarahan berat, periode tidak teratur)
- Sindrom ovarium polikistik (PCOS)
- Endometriosis
- Fibroid rahim
- Kista ovarium
- Penyakit radang panggul (PID)
- Infeksi saluran kemih
- Gejala menopause
- Kekhawatiran infertilitas
- Komplikasi kehamilan

## Pendekatan Kami

Kami menyediakan perawatan yang penuh kasih dan dipersonalisasi yang menangani:

- **Perawatan Pencegahan**: Skrining rutin dan deteksi dini
- **Berpusat pada Pasien**: Menghormati pilihan dan preferensi Anda
- **Layanan Komprehensif**: Menangani semua aspek kesehatan wanita
- **Pendidikan**: Memberdayakan Anda dengan pengetahuan tentang kesehatan
- **Kontinuitas**: Hubungan perawatan jangka panjang sepanjang tahap kehidupan

## Skrining Kesehatan Utama

Kami merekomendasikan skrining rutin berdasarkan usia dan faktor risiko Anda:

1. **Pap Smear**: Dimulai pada usia 21 untuk skrining kanker serviks
2. **Mammogram**: Dimulai pada usia 40 (atau lebih awal berdasarkan faktor risiko)
3. **Tes Kepadatan Tulang**: Untuk wanita pascamenopause
4. **Tekanan Darah dan Kolesterol**: Penilaian kardiovaskular rutin
5. **Tes STD**: Berdasarkan faktor risiko dan gejala

## Perawatan Tahap Kehidupan

### Masa Remaja
- Panduan kunjungan ginekologi pertama
- Pendidikan kesehatan menstruasi
- Konseling kontrasepsi
- Kekhawatiran jerawat dan hormonal

### Masa Reproduktif
- Perencanaan pra-konsepsi
- Perawatan prenatal
- Dukungan pascapersalinan
- Manajemen kontrasepsi

### Perimenopause & Menopause
- Pilihan terapi hormon
- Manajemen gejala
- Pemantauan kesehatan tulang
- Kesehatan kardiovaskular

## Tim Kami

Obstetri dan ginekolog berpengalaman kami, bersama dengan bidan perawat bersertifikat dan praktisi perawat kesehatan wanita, berdedikasi untuk memberikan perawatan komprehensif dan penuh kasih yang disesuaikan dengan kebutuhan individual Anda.
    `,
  },
];

