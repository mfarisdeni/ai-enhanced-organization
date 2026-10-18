/* ============================================================
   AI-Enhanced Organization — Workflow content data
   Structured configuration: stages can be updated here without
   touching the visualization components.
   Categories: human | ai | auto | approval
   ============================================================ */

const WORKFLOW_CATEGORIES = {
  human: {
    label: "HUMAN-LED",
    desc: "Keputusan dan penilaian oleh manusia."
  },
  ai: {
    label: "AI-ASSISTED",
    desc: "AI membantu riset, analisis, dan draf — manusia memutuskan."
  },
  auto: {
    label: "AUTOMATED SYSTEM",
    desc: "Sistem menjalankan hasil yang telah disetujui."
  },
  approval: {
    label: "HUMAN APPROVAL REQUIRED",
    desc: "Persetujuan manusia wajib sebelum alur berlanjut."
  }
};

const WORKFLOWS = [
  {
    id: "a",
    tabLabel: "A · Masalah → Solusi AI",
    title: "Dari Masalah Bisnis ke Solusi AI",
    desc: "Bagaimana CTO menerjemahkan masalah operasional yang berulang menjadi solusi teknologi yang berguna dan terawat.",
    layout: "horizontal",
    stages: [
      {
        n: 1, short: "Kendala Operasional", title: "Identifikasi Kendala Operasional",
        icon: "target", cat: "human",
        purpose: "Menemukan pekerjaan yang benar-benar menghambat operasional sebelum membicarakan teknologi apa pun.",
        happens: "Tim dan pimpinan memetakan pekerjaan yang lambat, berulang, atau sulit ditangani saat volume naik — dari observasi langsung dan data operasional.",
        owner: "Manusia — pimpinan operasional & tim pelaksana",
        input: "Keluhan tim, data volume pekerjaan, waktu penyelesaian saat ini.",
        output: "Daftar kendala operasional yang terdokumentasi.",
        next: "Kendala dianalisis polanya untuk melihat peluang otomatisasi.",
        control: "Tidak perlu persetujuan formal; daftar divalidasi oleh pemilik proses."
      },
      {
        n: 2, short: "Peluang Otomatisasi", title: "Analisis Peluang Otomatisasi",
        icon: "chart", cat: "ai",
        purpose: "Menilai secara objektif apakah suatu kendala layak diotomatisasi atau tidak.",
        happens: "AI membantu menganalisis pola dari data operasional — frekuensi, durasi, variasi kasus — untuk menjawab: apakah polanya jelas, berulang, dan memakan waktu?",
        owner: "AI Agent (analisis) + manusia (interpretasi)",
        input: "Daftar kendala + data operasional terkait.",
        output: "Penilaian kelayakan otomatisasi untuk tiap kendala.",
        next: "Kendala yang layak diprioritaskan berdasarkan dampak dan risiko.",
        control: "Manusia memverifikasi kesimpulan analisis sebelum alur berlanjut."
      },
      {
        n: 3, short: "Dampak & Risiko", title: "Prioritaskan Dampak dan Risiko",
        icon: "flag", cat: "human",
        purpose: "Memastikan sumber daya dipakai untuk masalah dengan manfaat bisnis terbesar dan risiko yang terkendali.",
        happens: "Pimpinan menilai tiap peluang dari dampak bisnis, frekuensi pekerjaan, waktu yang dapat dihemat, biaya, dan risiko — lalu menetapkan urutan pengerjaan.",
        owner: "Manusia — pimpinan / penanggung jawab",
        input: "Penilaian kelayakan otomatisasi.",
        output: "Daftar prioritas yang disepakati.",
        next: "Prioritas teratas dirancang alur kerjanya.",
        control: "Keputusan prioritas adalah keputusan manusia, bukan AI."
      },
      {
        n: 4, short: "Rancang Alur Kerja", title: "Rancang Alur Kerja",
        icon: "route", cat: "human",
        purpose: "Membuat peta kerja yang jelas sebelum ada pembangunan apa pun.",
        happens: "Setiap langkah dipetakan: aplikasi yang dipakai, peran manusia, di mana AI membantu, dan di titik mana persetujuan manusia diperlukan.",
        owner: "Manusia — CTO / perancang proses bersama pemilik proses",
        input: "Prioritas teratas + pemahaman proses saat ini.",
        output: "Dokumen rancangan alur kerja, termasuk titik kendali.",
        next: "Rancangan diwujudkan menjadi solusi nyata.",
        control: "Rancangan ditinjau pemilik proses sebelum dibangun."
      },
      {
        n: 5, short: "Bangun Solusi", title: "Bangun atau Integrasikan Solusi",
        icon: "wrench", cat: "human",
        purpose: "Mewujudkan rancangan dengan cara paling efisien — memakai yang sudah ada terlebih dahulu.",
        happens: "Tools yang sudah ada dihubungkan; AI agent atau otomatisasi baru dibangun hanya bila diperlukan. Prinsipnya: tidak setiap masalah membutuhkan aplikasi baru — terkadang menghubungkan tools yang tersedia adalah pilihan terbaik.",
        owner: "Manusia — tim teknis (CTO / developer / freelancer sesuai kebutuhan proyek)",
        input: "Rancangan alur kerja.",
        output: "Solusi yang dapat diuji (integrasi / AI agent / otomatisasi workflow).",
        next: "Solusi diuji bersama pengguna yang memakainya.",
        control: "Tinjauan teknis sebelum masuk uji pengguna."
      },
      {
        n: 6, short: "Uji Pengguna", title: "Uji Bersama Pengguna",
        icon: "users", cat: "human",
        purpose: "Memastikan solusi benar-benar akurat, mudah, dan aman dipakai sehari-hari.",
        happens: "Tim yang memakainya ikut menilai: apakah hasilnya akurat, mudah digunakan, dan aman. Masukan dicatat sebagai dasar perbaikan.",
        owner: "Manusia — pengguna / tim operasional",
        input: "Solusi yang dapat diuji.",
        output: "Hasil uji + daftar perbaikan.",
        next: "Setelah lolos uji, solusi diajukan untuk persetujuan implementasi.",
        control: "Kriteria kelulusan uji ditetapkan di awal, bukan di akhir."
      },
      {
        n: 7, short: "Approval & Implementasi", title: "Persetujuan dan Implementasi",
        icon: "badge", cat: "approval",
        purpose: "Memastikan tidak ada solusi yang berjalan tanpa restu penanggung jawab.",
        happens: "Penanggung jawab meninjau hasil uji dan risiko, memberikan persetujuan formal, lalu solusi diterapkan ke operasional sehari-hari.",
        owner: "Manusia — penanggung jawab (persetujuan); sistem (penerapan)",
        input: "Hasil uji + rekomendasi.",
        output: "Persetujuan formal + solusi live.",
        next: "Solusi yang live dipantau dan dikembangkan secara berkala.",
        control: "PERSETUJUAN MANUSIA WAJIB — tidak ada implementasi tanpa approval."
      },
      {
        n: 8, short: "Monitoring", title: "Monitoring dan Pengembangan",
        icon: "gauge", cat: "auto",
        purpose: "Menjaga solusi tetap bermanfaat seiring perubahan kebutuhan.",
        happens: "Sistem memantau pemakaian dan hasil secara otomatis; evaluasi berkala oleh manusia menentukan penyempurnaan berikutnya.",
        owner: "Sistem otomatis (pemantauan) + manusia (evaluasi)",
        input: "Data pemakaian solusi yang live.",
        output: "Laporan performa + rencana pengembangan.",
        next: "Siklus kembali ke tahap 1 untuk kendala berikutnya.",
        control: "Evaluasi berkala oleh penanggung jawab; temuan ditindaklanjuti."
      }
    ]
  },
  {
    id: "b",
    tabLabel: "B · Produksi Konten",
    title: "Otomatisasi Produksi Konten",
    desc: "Dari satu brief menjadi proses produksi konten yang terstruktur — kendali tetap pada manusia.",
    layout: "vertical",
    stages: [
      {
        n: 1, short: "Brief & Tujuan", title: "Brief dan Tujuan Konten",
        icon: "brief", cat: "human",
        purpose: "Menetapkan arah yang jelas sebelum produksi dimulai.",
        happens: "Tujuan, audiens, platform, dan identitas brand ditetapkan dalam satu brief. Satu brief yang disetujui menjadi fondasi seluruh proses.",
        owner: "Manusia — tim konten / pemilik brand",
        input: "Kebutuhan komunikasi / kampanye.",
        output: "Brief konten yang disetujui.",
        next: "Brief menjadi dasar riset dan brainstorming.",
        control: "Brief disetujui pemilik brand/akun sebelum dipakai."
      },
      {
        n: 2, short: "Riset AI", title: "Riset & Brainstorming dengan AI",
        icon: "sparkle", cat: "ai",
        purpose: "Mempercepat pencarian referensi dan pengembangan ide.",
        happens: "AI membantu mencari referensi, mengembangkan ide, dan menyusun konsep awal berdasarkan brief.",
        owner: "AI Agent (riset) + manusia (kurasi)",
        input: "Brief konten.",
        output: "Kumpulan referensi dan konsep awal.",
        next: "Tim memfinalisasi konsep.",
        control: "Manusia memilih ide mana yang diteruskan; sisanya dibuang."
      },
      {
        n: 3, short: "Finalisasi Konsep", title: "Finalisasi Konsep",
        icon: "users", cat: "human",
        purpose: "Menetapkan konsep, arah komunikasi, pesan, dan standar desain.",
        happens: "Tim menetapkan konsep final — arah kreatif diputuskan manusia, bukan AI.",
        owner: "Manusia — tim kreatif",
        input: "Konsep awal hasil riset AI.",
        output: "Konsep final yang disepakati tim.",
        next: "AI menghasilkan alternatif desain dari konsep final.",
        control: "Keputusan konsep 100% wewenang manusia."
      },
      {
        n: 4, short: "Alternatif Desain AI", title: "AI Menghasilkan 1–10 Alternatif Desain",
        icon: "layers", cat: "ai",
        purpose: "Satu brief menghasilkan banyak opsi visual untuk dipilih — bukan satu hasil tunggal.",
        happens: "AI menghasilkan 1–10 alternatif desain sesuai brief dan kebutuhan konten, dalam batas konsep yang sudah difinalisasi.",
        owner: "AI Agent (generasi) — dalam batas brief",
        input: "Konsep final + brief visual.",
        output: "1–10 alternatif desain.",
        next: "Desainer meninjau dan menyempurnakan.",
        control: "Semua alternatif wajib melewati tinjauan manusia; tidak ada yang langsung terbit."
      },
      {
        n: 5, short: "Edit Desainer", title: "Desainer Mengedit dan Menyesuaikan Brand",
        icon: "pencil", cat: "human",
        purpose: "Menjaga kualitas visual dan identitas brand di setiap akun.",
        happens: "Desainer mengedit dan menyempurnakan hasil AI — memastikan logo, warna, tipografi, dan branding sesuai untuk setiap akun.",
        owner: "Manusia — desainer",
        input: "Alternatif desain AI.",
        output: "Desain final siap QA.",
        next: "Manager/QA memeriksa sebelum terbit.",
        control: "Standar brand per akun ditegakkan oleh desainer."
      },
      {
        n: 6, short: "QA Approval", title: "Manager / QA Approval",
        icon: "badge", cat: "approval",
        purpose: "Pemeriksaan akhir sebelum konten boleh terbit.",
        happens: "Manager/QA memeriksa desain, teks, dan materi publikasi. Tanpa persetujuan di tahap ini, tidak ada publikasi.",
        owner: "Manusia — manager / QA",
        input: "Desain final.",
        output: "Keputusan: disetujui / revisi / ditolak.",
        next: "Konten yang disetujui dijadwalkan untuk publikasi otomatis.",
        control: "PERSETUJUAN MANUSIA WAJIB sebelum terbit — ini gerbang menuju otomatisasi."
      },
      {
        n: 7, short: "Publikasi Otomatis", title: "Publikasi Otomatis Terjadwal",
        icon: "calendar", cat: "auto",
        purpose: "Mendistribusikan konten yang sudah disetujui secara terjadwal, tanpa kerja manual.",
        happens: "Setelah disetujui, AI dan sistem penjadwalan mendistribusikan konten ke kanal media sosial yang terhubung. Tahap ini hanya memproses konten berstatus “disetujui”.",
        owner: "Sistem otomatis — hanya untuk konten yang disetujui",
        input: "Konten yang disetujui + jadwal.",
        output: "Konten terbit sesuai jadwal.",
        next: "Performa konten dipantau dan dievaluasi.",
        control: "Otomatisasi berjalan SETELAH approval tahap 6. Target workflow — integrasi tiap platform perlu diverifikasi, bukan diasumsikan."
      },
      {
        n: 8, short: "Evaluasi", title: "Evaluasi Performa",
        icon: "gauge", cat: "ai",
        purpose: "Menjadikan data performa sebagai dasar perbaikan berikutnya.",
        happens: "AI membantu merangkum performa konten; tim menilai topik dan format mana yang perlu diperbaiki.",
        owner: "AI Agent (analisis) + manusia (keputusan)",
        input: "Data performa publikasi.",
        output: "Insight + rekomendasi perbaikan.",
        next: "Insight menjadi masukan untuk brief berikutnya.",
        control: "Keputusan tindak lanjut tetap di tangan manusia."
      }
    ]
  },
  {
    id: "c",
    tabLabel: "C · Kliping Video Sosial",
    title: "Kliping & Distribusi Video Sosial",
    desc: "Satu sumber materi berizin menjadi banyak aset konten di banyak akun.",
    layout: "horizontal",
    stages: [
      {
        n: 1, short: "Riset Topik", title: "Riset Topik",
        icon: "search", cat: "ai",
        purpose: "Menemukan topik, tren, atau pembahasan yang relevan dengan audiens.",
        happens: "AI membantu menemukan topik dan tren dari data sosial; manusia memilih yang sesuai strategi konten.",
        owner: "AI Agent (riset) + manusia (pemilihan)",
        input: "Strategi konten / kalender editorial.",
        output: "Daftar topik prioritas.",
        next: "Cari sumber materi untuk topik terpilih.",
        control: "Manusia memilih topik final."
      },
      {
        n: 2, short: "Sumber Materi", title: "Cari Sumber Materi",
        icon: "globe", cat: "human",
        purpose: "Mendapatkan materi sumber yang sah untuk digunakan.",
        happens: "Materi dicari dari YouTube atau sumber media sosial lain. Materi hanya digunakan bila memiliki izin atau dasar penggunaan yang sah.",
        owner: "Manusia — tim konten",
        input: "Topik prioritas.",
        output: "Materi sumber berizin.",
        next: "Pilih bagian yang paling relevan.",
        control: "Verifikasi izin / hak penggunaan sebelum materi dipakai."
      },
      {
        n: 3, short: "Pilih Segmen", title: "Pilih Bagian yang Relevan",
        icon: "scissors", cat: "human",
        purpose: "Memilih momen terbaik untuk dijadikan klip.",
        happens: "Manusia memilih bagian materi yang paling relevan dengan topik dan audiens, dengan konteks yang terjaga.",
        owner: "Manusia — editor / tim konten",
        input: "Materi sumber berizin.",
        output: "Segmen terpilih dengan konteks terjaga.",
        next: "Segmen dipotong menjadi klip.",
        control: "Konteks tidak boleh berubah hingga menyesatkan."
      },
      {
        n: 4, short: "Video Clipper", title: "Potong dengan Internal Video Clipper",
        icon: "film", cat: "auto",
        purpose: "Memotong segmen terpilih menjadi klip siap olah secara sistematis.",
        happens: "Internal video clipper memotong video menjadi beberapa klip sesuai segmen yang sudah dipilih manusia.",
        owner: "Sistem otomatis (internal tool)",
        input: "Segmen terpilih.",
        output: "Klip mentah per segmen.",
        next: "AI membantu subtitle, hook, dan caption.",
        control: "Parameter potongan ditetapkan manusia; tool hanya mengeksekusi."
      },
      {
        n: 5, short: "Subtitle & Caption AI", title: "AI Membantu Subtitle, Hook, dan Caption",
        icon: "captions", cat: "ai",
        purpose: "Mempercepat penyusunan elemen pendukung klip.",
        happens: "AI membantu proses subtitle, hook pembuka, judul, dan caption — manusia memeriksa akurasi dan kesesuaiannya.",
        owner: "AI Agent (draf) + manusia (verifikasi)",
        input: "Klip mentah.",
        output: "Klip + subtitle, hook, caption (draf).",
        next: "Pemeriksaan kualitas dan hak penggunaan.",
        control: "Manusia memverifikasi akurasi & konteks sebelum lanjut."
      },
      {
        n: 6, short: "QC & Hak", title: "Pemeriksaan Kualitas dan Hak Penggunaan",
        icon: "shield", cat: "human",
        purpose: "Menjaga mutu dan memastikan penggunaan materi tetap sah.",
        happens: "Diperiksa kualitas video, konteks, akurasi, dan izin penggunaan materi. Setiap konten diperiksa agar konteksnya tidak berubah secara menyesatkan.",
        owner: "Manusia — QA / tim konten",
        input: "Klip + elemen pendukung.",
        output: "Klip lolos QC / daftar koreksi.",
        next: "Persetujuan manusia sebelum dijadwalkan.",
        control: "Standar kualitas & kepatuhan hak ditegakkan di sini."
      },
      {
        n: 7, short: "Persetujuan", title: "Persetujuan Manusia",
        icon: "badge", cat: "approval",
        purpose: "Materi final diperiksa sebelum dijadwalkan ke banyak akun.",
        happens: "Penanggung jawab memberikan persetujuan final. Tanpa persetujuan ini, tidak ada penjadwalan distribusi.",
        owner: "Manusia — penanggung jawab",
        input: "Klip lolos QC.",
        output: "Keputusan: disetujui / revisi / ditolak.",
        next: "Klip yang disetujui dijadwalkan ke multi-akun.",
        control: "PERSETUJUAN MANUSIA WAJIB sebelum distribusi."
      },
      {
        n: 8, short: "Multi-Akun", title: "Penjadwalan Multi-Akun",
        icon: "calendar", cat: "auto",
        purpose: "Satu proses produksi menghasilkan banyak aset di banyak akun.",
        happens: "Klip yang disetujui dipublikasikan ke banyak akun dan platform sesuai jadwal. Format (vertikal 9:16, persegi 1:1, horizontal 16:9) dan jadwal disesuaikan untuk setiap akun.",
        owner: "Sistem otomatis — hanya konten yang disetujui",
        input: "Klip yang disetujui + jadwal per akun.",
        output: "Klip terbit terjadwal di multi-akun.",
        next: "Analisis performa.",
        control: "Distribusi bergantung pada konektivitas platform & izin yang terkonfigurasi — tidak semua platform otomatis tanpa verifikasi API."
      },
      {
        n: 9, short: "Analisis", title: "Analisis Performa",
        icon: "chart", cat: "ai",
        purpose: "Evaluasi performa untuk menentukan topik dan format berikutnya.",
        happens: "AI membantu merangkum performa klip di banyak akun; manusia memutuskan tindak lanjut.",
        owner: "AI Agent (analisis) + manusia (keputusan)",
        input: "Data performa multi-akun.",
        output: "Insight performa + rekomendasi.",
        next: "Kembali ke riset topik untuk siklus berikutnya.",
        control: "Keputusan tindak lanjut tetap di tangan manusia."
      }
    ]
  }
];
