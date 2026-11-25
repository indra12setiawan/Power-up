import { DocumentItem } from '../types/document';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-reg-001',
    code: 'REG-HSE-2024-001',
    title: 'Kebijakan Keselamatan, Kesehatan Kerja dan Lindungan Lingkungan (K3LL)',
    type: 'REGULASI',
    department: 'K3 & Lingkungan (HSE)',
    version: 'v2.0',
    effectiveDate: '2024-01-15',
    reviewDueDate: '2025-01-15',
    status: 'AKTIF',
    pic: 'Ir. Hendra Pratama, CSP',
    approvedBy: 'Bambang Triyono (Direktur Utama)',
    summary:
      'Pedoman kebijakan tertinggi perusahaan dalam memastikan seluruh operasional kantor dan fasilitas manufaktur memenuhi kepatuhan UU No. 1 Tahun 1970 serta standar SMK3 dan ISO 45001:2018.',
    tags: ['K3LL', 'ISO 45001', 'Keselamatan Kerja', 'Kebijakan Direksi', 'HSE', 'Zero Accident'],
    distributionDepartments: [
      'Operasional & Produksi',
      'K3 & Lingkungan (HSE)',
      'HR & General Affairs',
      'Supply Chain & Logistik',
    ],
    versionHistory: [
      {
        version: 'v2.0',
        releaseDate: '2024-01-15',
        author: 'Ir. Hendra Pratama',
        approvedBy: 'Bambang Triyono (Direktur Utama)',
        changeSummary:
          'Penyesuaian klausul pengelolaan limbah B3 terpadu dan penambahan protokol penanganan iklim kerja ekstrem sesuai Permenaker No. 5/2018.',
        fileName: 'REG-HSE-2024-001_Kebijakan_K3LL_v2.0.pdf',
        fileSize: '1.8 MB',
      },
      {
        version: 'v1.0',
        releaseDate: '2022-03-01',
        author: 'Ir. Hendra Pratama',
        approvedBy: 'Bambang Triyono (Direktur Utama)',
        changeSummary: 'Penerbitan perdana sistem manajemen keselamatan dan lingkungan kerja terpadu.',
        fileName: 'REG-HSE-2022-001_Kebijakan_K3LL_v1.0.pdf',
        fileSize: '1.4 MB',
      },
    ],
    sections: [
      {
        title: 'Komitmen Pimpinan Puncak',
        content:
          'Manajemen berkomitmen menyediakan lingkungan kerja yang sehat, aman, dan tanpa kecelakaan kerja (Zero Accident) bagi seluruh karyawan, kontraktor, dan tamu.',
      },
      {
        title: 'Kewajiban Penggunaan Alat Pelindung Diri (APD)',
        content:
          'Setiap personil yang memasuki area operasional dan pabrik wajib mengenakan APD standar: Safety Helmet (SNI), Safety Shoes toe-cap baja, Rompi Reflektor tinggi, dan Ear Protection pada zona bising >85 dB.',
        steps: [
          'Melakukan inspeksi kelayakan APD sebelum memasuki workshop/pabrik.',
          'Melaporkan kerusakan APD kepada pengawas K3 dalam waktu 1x24 jam untuk penggantian.',
          'Sanksi teguran tertulis bertingkat bagi pekerja yang melanggar penggunaan APD di zona merah.',
        ],
      },
      {
        title: 'Sistem Pelaporan Bahaya (Near-Miss & Hazob)',
        content:
          'Seluruh pegawai berhak dan berkewajiban menghentikan pekerjaan (Stop Work Authority) jika ditemukan kondisi berisiko tinggi yang belum terkendali.',
      },
    ],
    file: {
      name: 'REG-HSE-2024-001_Kebijakan_K3LL_v2.0.pdf',
      sizeFormatted: '1.8 MB',
      sizeBytes: 1887436,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-01-15T09:00:00Z',
    },
    isFavorite: true,
    viewCount: 1420,
    downloadCount: 389,
    lastUpdated: '2024-01-15',
  },
  {
    id: 'doc-sop-001',
    code: 'SOP-HR-002',
    title: 'Standar Operasional Prosedur Rekrutmen dan Onboarding Karyawan',
    type: 'SOP',
    department: 'HR & General Affairs',
    version: 'v1.4',
    effectiveDate: '2024-02-10',
    reviewDueDate: '2025-02-10',
    status: 'AKTIF',
    pic: 'Siti Rahmawati, S.Psi, CHRP',
    approvedBy: 'Drs. Agus Sugianto (VP Human Capital)',
    summary:
      'Prosedur baku pengajuan Formulir Permintaan Tenaga Kerja (FPTK), pemilahan kandidat, psikotes, wawancara kompetensi terstruktur, hingga program induksi 30-60-90 hari kerja.',
    tags: ['HRD', 'Rekrutmen', 'Onboarding', 'FPTK', 'Induksi', 'Karyawan Baru'],
    distributionDepartments: ['HR & General Affairs', 'Semua Departemen'],
    versionHistory: [
      {
        version: 'v1.4',
        releaseDate: '2024-02-10',
        author: 'Siti Rahmawati',
        approvedBy: 'Drs. Agus Sugianto',
        changeSummary:
          'Digitalisasi formulir FPTK melalui portal ERP internal dan pemangkasan durasi background check dari 7 hari kerja menjadi 3 hari kerja.',
        fileName: 'SOP-HR-002_Rekrutmen_Onboarding_v1.4.pdf',
        fileSize: '1.2 MB',
      },
      {
        version: 'v1.3',
        releaseDate: '2023-01-18',
        author: 'Siti Rahmawati',
        approvedBy: 'Drs. Agus Sugianto',
        changeSummary: 'Penyelarasan bobot wawancara berbasis perilaku (Behavioral Event Interview / BEI).',
        fileName: 'SOP-HR-002_Rekrutmen_Onboarding_v1.3.pdf',
        fileSize: '1.1 MB',
      },
    ],
    sections: [
      {
        title: 'Tujuan dan Ruang Lingkup',
        content:
          'Memastikan proses pengadaan talenta baru berjalan transparan, bebas diskriminasi, memenuhi kualifikasi jabatan yang dibutuhkan, serta memfasilitasi adaptasi cepat karyawan baru.',
      },
      {
        title: 'Tahapan Pelaksanaan Rekrutmen',
        content: 'Rangkaian alur rekrutmen wajib diikuti tanpa memotong tahapan verifikasi berkas hukum.',
        steps: [
          'Pengajuan FPTK oleh User Department diverifikasi kuota headcount oleh HR & Keuangan.',
          'Pemasangan lowongan pada portal karir resmi dan media mitra profesional.',
          'Seleksi administrasi berkas dan penyaringan awal via wawancara HR.',
          'User Interview dengan penilaian matriks kompetensi teknis.',
          'Medical Check Up (MCU) pada klinik mitra terakreditasi.',
          'Offering Letter dan penandatanganan Perjanjian Kerja Waktu Tertentu (PKWT/PKWTT).',
        ],
      },
      {
        title: 'Masa Induksi dan Orientasi Departemen',
        content:
          'Karyawan baru wajib mengikuti sesi pengenalan budaya perusahaan, profil keselamatan kerja, dan penunjukan buddy mentoring selama minimal 30 hari pertama.',
      },
    ],
    file: {
      name: 'SOP-HR-002_Rekrutmen_Onboarding_v1.4.pdf',
      sizeFormatted: '1.2 MB',
      sizeBytes: 1258291,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-02-10T10:15:00Z',
    },
    isFavorite: true,
    viewCount: 980,
    downloadCount: 245,
    lastUpdated: '2024-02-10',
  },
  {
    id: 'doc-ik-001',
    code: 'IK-PROD-014',
    title: 'Instruksi Kerja Pengoperasian dan Kalibrasi Mesin CNC Milling 5-Axis',
    type: 'IK',
    department: 'Operasional & Produksi',
    version: 'v2.1',
    effectiveDate: '2024-03-01',
    reviewDueDate: '2024-12-01',
    status: 'AKTIF',
    pic: 'Rudi Hartono, ST (Machining Leader)',
    approvedBy: 'Ir. Ahmad Zulkarnain (Plant Manager)',
    summary:
      'Langkah teknis rinci mulai dari checklist pra-start mesin, pengaturan titik nol (zero point coordinate), penggantian mata pahat (tool setter), hingga pembersihan coolant filter.',
    tags: ['CNC', 'Milling', 'Produksi', 'Kalibrasi', 'Pemesinan Presisi', 'Operator'],
    distributionDepartments: ['Operasional & Produksi', 'Quality Assurance & QC'],
    versionHistory: [
      {
        version: 'v2.1',
        releaseDate: '2024-03-01',
        author: 'Rudi Hartono',
        approvedBy: 'Ir. Ahmad Zulkarnain',
        changeSummary:
          'Pembaruan parameter spindle speed untuk material titanium alloy Grade 5 dan penambahan checklist sensor getaran spindle.',
        fileName: 'IK-PROD-014_CNC_Milling_v2.1.pdf',
        fileSize: '2.4 MB',
      },
    ],
    sections: [
      {
        title: 'Pemeriksaan Awal (Pre-Operation Checklist)',
        content:
          'Operator wajib memastikan sirkulasi oli hidrolik pada level aman, tekanan kompresor angin minimal 6.5 bar, dan tidak ada gram sisa pemotongan di guideway.',
        steps: [
          'Nyalakan saklar power utama (Main Breaker) dan tunggu inisialisasi controller selesai.',
          'Lakukan prosedur Homemode sumbu X, Y, Z, A, dan C secara bertahap.',
          'Periksa level air coolant dan pastikan konsentrasi refraktometer di angka 8-10%.',
        ],
      },
      {
        title: 'Penentuan Koordinat Nol (Workpiece Zero Setting)',
        content:
          'Gunakan 3D Touch Probe untuk mendeteksi tepi bidang referensi benda kerja dengan kecepatan sumbu maksimal F200 mm/menit guna mencegah kerusakan sensor.',
        steps: [
          'Pasang probe di spindle chuck.',
          'Sentuhkan ujung probe ke sisi X+ dan X-, catat center koordinat di register G54.',
          'Ulangi pada sumbu Y dan gunakan touch setter z-axis untuk panjang pahat.',
        ],
      },
      {
        title: 'Prosedur Emergency Stop',
        content:
          'Apabila terdengar bunyi tidak wajar atau terjadi tabrakan pemotong (cutter crash), segera tekan tombol merah Emergency Stop di samping panel kendali utama.',
      },
    ],
    file: {
      name: 'IK-PROD-014_CNC_Milling_v2.1.pdf',
      sizeFormatted: '2.4 MB',
      sizeBytes: 2516582,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-03-01T08:30:00Z',
    },
    isFavorite: false,
    viewCount: 630,
    downloadCount: 178,
    lastUpdated: '2024-03-01',
  },
  {
    id: 'doc-sop-002',
    code: 'SOP-IT-011',
    title: 'Standar Operasional Penanganan & Eskalasi Insiden Keamanan Siber (CSIRP)',
    type: 'SOP',
    department: 'IT & Sistem Informasi',
    version: 'v3.0',
    effectiveDate: '2024-04-12',
    reviewDueDate: '2024-11-20',
    status: 'REVIEW_DUE',
    pic: 'Dimas Wicaksono, CEH, CISSP',
    approvedBy: 'Gunawan Prasetyo (Chief Information Officer)',
    summary:
      'Protokol tanggap darurat saat terjadi insiden kebocoran data, infeksi malware/ransomware, DDoS attack, atau serangan akun privilege tingkat tinggi pada infrastruktur cloud & on-premise.',
    tags: ['Cybersecurity', 'Insiden Siber', 'Ransomware', 'ISO 27001', 'SOC', 'CSIRP'],
    distributionDepartments: ['IT & Sistem Informasi', 'Legal & Kepatuhan', 'Semua Departemen'],
    versionHistory: [
      {
        version: 'v3.0',
        releaseDate: '2024-04-12',
        author: 'Dimas Wicaksono',
        approvedBy: 'Gunawan Prasetyo',
        changeSummary:
          'Integrasi mandat UU Pelindungan Data Pribadi (UU PDP) no. 27/2022 tentang batas waktu pelaporan 3x24 jam ke otoritas data nasional.',
        fileName: 'SOP-IT-011_Insiden_Keamanan_Siber_v3.0.pdf',
        fileSize: '1.9 MB',
      },
      {
        version: 'v2.0',
        releaseDate: '2023-05-10',
        author: 'Dimas Wicaksono',
        approvedBy: 'Gunawan Prasetyo',
        changeSummary: 'Penyusunan play-book isolasi jaringan VLAN otomatis pada cluster server.',
        fileName: 'SOP-IT-011_Insiden_Keamanan_Siber_v2.0.pdf',
        fileSize: '1.5 MB',
      },
    ],
    sections: [
      {
        title: 'Klasifikasi Tingkat Keparahan Insiden (Severity Matrix)',
        content:
          'Level 1 (Kritis): Sistem inti transaksi mati atau kebocoran data nasabah. Level 2 (Tinggi): Gangguan layanan divisi. Level 3 (Sedang): Usaha phishing terlokalisasi.',
      },
      {
        title: 'Tindakan Isolasi Cepat (Containment Protocol)',
        content: 'Langkah pengamanan awal tanpa menghapus jejak forensik digital.',
        steps: [
          'Putuskan koneksi kabel LAN dan matikan modul Wi-Fi mesin yang terinfeksi.',
          'JANGAN mematikan daya (Power Off) mesin agar memori RAM tidak hilang untuk dump forensik.',
          'Blokir traffic IP attacker pada Core Firewall dan Cloudflare WAF.',
          'Revoke active session token dan ganti kredensial administrator domain.',
        ],
      },
      {
        title: 'Komunikasi Eksternal & Notifikasi Otoritas',
        content:
          'Pemberitahuan kepada publik atau media hanya boleh dikeluarkan oleh Corporate Secretary setelah berkonsultasi dengan Divisi Legal dan CIO.',
      },
    ],
    file: {
      name: 'SOP-IT-011_Insiden_Keamanan_Siber_v3.0.pdf',
      sizeFormatted: '1.9 MB',
      sizeBytes: 1992294,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-04-12T14:20:00Z',
    },
    isFavorite: true,
    viewCount: 1105,
    downloadCount: 312,
    lastUpdated: '2024-04-12',
  },
  {
    id: 'doc-reg-002',
    code: 'REG-LEG-2024-004',
    title: 'Kebijakan Kepatuhan Perlindungan Data Pribadi (UU PDP & GDPR Compliance)',
    type: 'REGULASI',
    department: 'Legal & Kepatuhan',
    version: 'v1.1',
    effectiveDate: '2024-05-01',
    reviewDueDate: '2025-05-01',
    status: 'AKTIF',
    pic: 'Farida Annisa, SH, LLM',
    approvedBy: 'Bambang Triyono (Direktur Utama)',
    summary:
      'Peraturan mengikat seluruh unit bisnis dalam pemrosesan, penyimpanan, transfer lintas batas, serta pemenuhan hak-hak subjek data pribadi pelanggan maupun karyawan.',
    tags: ['Legal', 'UU PDP', 'GDPR', 'Privasi Data', 'Kepatuhan', 'Data Subject Rights'],
    distributionDepartments: ['Legal & Kepatuhan', 'IT & Sistem Informasi', 'HR & General Affairs'],
    versionHistory: [
      {
        version: 'v1.1',
        releaseDate: '2024-05-01',
        author: 'Farida Annisa',
        approvedBy: 'Bambang Triyono',
        changeSummary:
          'Penyempurnaan klausul klausul Data Transfer Agreement (DTA) untuk vendor cloud pihak ketiga.',
        fileName: 'REG-LEG-2024-004_Kebijakan_PDP_v1.1.pdf',
        fileSize: '1.6 MB',
      },
    ],
    sections: [
      {
        title: 'Prinsip Dasar Pemrosesan Data Pribadi',
        content:
          'Data hanya boleh dikumpulkan secara sah, transparan, dibatasi tujuan tertentu (purpose limitation), diminimalisasi sesuai kebutuhan, dan dienkripsi saat transit maupun rest.',
      },
      {
        title: 'Hak Subjek Data (Karyawan & Pelanggan)',
        content: 'Mekanisme penanganan hak penarikan persetujuan, akses salinan data, dan hak penghapusan data.',
        steps: [
          'Pengajuan permintaan hak subjek data melalui formulir DSR di situs resmi.',
          'Verifikasi identitas pemohon oleh DPO (Data Protection Officer) dalam 2x24 jam.',
          'Penyelesaian dan pemberian konfirmasi kepada pemohon maksimal 72 jam kerja.',
        ],
      },
    ],
    file: {
      name: 'REG-LEG-2024-004_Kebijakan_PDP_v1.1.pdf',
      sizeFormatted: '1.6 MB',
      sizeBytes: 1677721,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-05-01T11:00:00Z',
    },
    isFavorite: false,
    viewCount: 740,
    downloadCount: 160,
    lastUpdated: '2024-05-01',
  },
  {
    id: 'doc-sop-003',
    code: 'SOP-FIN-005',
    title: 'Standar Operasional Pengajuan Kas Kecil (Petty Cash) & Pertanggungjawaban Bon',
    type: 'SOP',
    department: 'Keuangan & Akuntansi',
    version: 'v2.0',
    effectiveDate: '2024-06-15',
    reviewDueDate: '2025-06-15',
    status: 'AKTIF',
    pic: 'Kevin Ardiansyah, SE, Ak, CA',
    approvedBy: 'Yuliana Santoso, CPA (CFO)',
    summary:
      'Tata cara pengajuan dana operasional mendesak di bawah Rp 2.500.000,-, kelengkapan faktur pajak / struk resmi, dan batas waktu penyelesaian bon gantung (maksimal 3 hari kerja).',
    tags: ['Finance', 'Petty Cash', 'Kas Kecil', 'Reimbursement', 'Akuntansi', 'Bon'],
    distributionDepartments: ['Keuangan & Akuntansi', 'Semua Departemen'],
    versionHistory: [
      {
        version: 'v2.0',
        releaseDate: '2024-06-15',
        author: 'Kevin Ardiansyah',
        approvedBy: 'Yuliana Santoso',
        changeSummary:
          'Kenaikan batas plafon petty cash per transaksi dari Rp 1.500.000 menjadi Rp 2.500.000 dan kewajiban upload e-receipt via mobile app.',
        fileName: 'SOP-FIN-005_Kas_Kecil_v2.0.pdf',
        fileSize: '950 KB',
      },
    ],
    sections: [
      {
        title: 'Batasan Penggunaan Kas Kecil',
        content:
          'Dana petty cash diperuntukkan khusus pengeluaran mendesak operasional harian (konsumsi tamu mendadak, ongkos kirim darurat, pembelian ATK mendesak). Dilarang untuk pinjaman pribadi atau pengadaan aset modal.',
      },
      {
        title: 'Alur Pengajuan dan Verifikasi Struk',
        content: 'Setiap pengajuan wajib disertai bukti fisik atau digital yang sah.',
        steps: [
          'Pengajuan voucher kas kecil diverifikasi tanda tangan Head of Department.',
          'Penyerahan uang tunai atau transfer e-wallet oleh Kasir Keuangan.',
          'Penyampaian struk asli dan nota bertanggal maksimal H+3 hari kerja.',
          'Rekonsiliasi mingguan oleh Tim Akuntansi sebelum pengisian kembali (imprest fund replenishment).',
        ],
      },
    ],
    file: {
      name: 'SOP-FIN-005_Kas_Kecil_v2.0.pdf',
      sizeFormatted: '950 KB',
      sizeBytes: 972800,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-06-15T13:45:00Z',
    },
    isFavorite: false,
    viewCount: 1530,
    downloadCount: 420,
    lastUpdated: '2024-06-15',
  },
  {
    id: 'doc-sop-004',
    code: 'SOP-QA-001',
    title: 'Standar Operasional Pengendalian Informasi Terdokumentasi (ISO 9001:2015)',
    type: 'SOP',
    department: 'Quality Assurance & QC',
    version: 'v3.2',
    effectiveDate: '2024-02-01',
    reviewDueDate: '2025-02-01',
    status: 'AKTIF',
    pic: 'Dewi Lestari, ST, Lead Auditor',
    approvedBy: 'Ir. Ahmad Zulkarnain (Management Rep.)',
    summary:
      'Pedoman pembuatan, penomoran, peninjauan berkala, persetujuan, distribusi salinan terkendali, dan pemusnahan dokumen usang dalam rangka pemenuhan Klausul 7.5 ISO 9001:2015.',
    tags: ['ISO 9001', 'Document Control', 'Sistem Mutu', 'Pengendalian Dokumen', 'Audit'],
    distributionDepartments: ['Quality Assurance & QC', 'Semua Departemen'],
    versionHistory: [
      {
        version: 'v3.2',
        releaseDate: '2024-02-01',
        author: 'Dewi Lestari',
        approvedBy: 'Ir. Ahmad Zulkarnain',
        changeSummary:
          'Migrasi penuh distribusi fisik ke portal dokumen digital POWER-Up dengan stempel tanda tangan digital teregistrasi.',
        fileName: 'SOP-QA-001_Pengendalian_Dokumen_v3.2.pdf',
        fileSize: '1.4 MB',
      },
    ],
    sections: [
      {
        title: 'Kodefikasi Dokumen',
        content:
          'Penamaan dokumen wajib menggunakan format: [TIPE]-[DEPT]-[NOMOR URUT]. Contoh: REG-HSE-001, SOP-HR-002, IK-PROD-014, FORM-LOG-005.',
      },
      {
        title: 'Siklus Tinjauan Berkala (Periodic Review)',
        content:
          'Setiap dokumen terkendali wajib dikaji ulang minimal 1 (satu) kali setiap 12 bulan oleh Pemilik Dokumen (Owner) untuk memastikan relevansi prosedur terhadap kondisi riil lapangan.',
      },
    ],
    file: {
      name: 'SOP-QA-001_Pengendalian_Dokumen_v3.2.pdf',
      sizeFormatted: '1.4 MB',
      sizeBytes: 1468006,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-02-01T09:10:00Z',
    },
    isFavorite: true,
    viewCount: 1890,
    downloadCount: 512,
    lastUpdated: '2024-02-01',
  },
  {
    id: 'doc-ik-002',
    code: 'IK-HSE-003',
    title: 'Instruksi Kerja Penggunaan APAR & Tanggap Darurat Evakuasi Kebakaran',
    type: 'IK',
    department: 'K3 & Lingkungan (HSE)',
    version: 'v1.2',
    effectiveDate: '2024-03-20',
    reviewDueDate: '2025-03-20',
    status: 'AKTIF',
    pic: 'Wahyu Nugroho (Fire Safety Officer)',
    approvedBy: 'Ir. Hendra Pratama, CSP',
    summary:
      'Teknik pengoperasian Alat Pemadam Api Ringan (APAR) dengan metode PASS (Pull, Aim, Squeeze, Sweep) dan panduan evakuasi menuju Master Point aman.',
    tags: ['APAR', 'Kebakaran', 'Evakuasi', 'Tanggap Darurat', 'Fire Safety', 'HSE'],
    distributionDepartments: ['K3 & Lingkungan (HSE)', 'Semua Departemen'],
    versionHistory: [
      {
        version: 'v1.2',
        releaseDate: '2024-03-20',
        author: 'Wahyu Nugroho',
        approvedBy: 'Ir. Hendra Pratama',
        changeSummary:
          'Penambahan denah Assembly Point baru di area Sayap Timur dan tata cara pelaporan head-count regu evakuasi.',
        fileName: 'IK-HSE-003_APAR_Evakuasi_v1.2.pdf',
        fileSize: '2.1 MB',
      },
    ],
    sections: [
      {
        title: 'Metode Penggunaan APAR (P.A.S.S)',
        content: 'Pastikan posisi berdiri membelakangi arah angin sebelum menyemprotkan media pemadam.',
        steps: [
          'PULL: Cabut pin pengaman pada tuas APAR.',
          'AIM: Arahkan nozzle ke pangkal titik api (bukan lidah api).',
          'SQUEEZE: Tekan tuas pengatup secara mantap untuk mengeluarkan serbuk/CO2.',
          'SWEEP: Sapukan nozzle dari sisi ke sisi secara merata hingga api padam.',
        ],
      },
      {
        title: 'Jalur Evakuasi dan Assembly Point',
        content:
          'Jangan gunakan lift saat sirene evakuasi berbunyi. Gunakan tangga darurat, berjalan cepat tanpa berlari, dan berkumpul di Master Point / Titik Kumpul terdekat.',
      },
    ],
    file: {
      name: 'IK-HSE-003_APAR_Evakuasi_v1.2.pdf',
      sizeFormatted: '2.1 MB',
      sizeBytes: 2202009,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-03-20T10:00:00Z',
    },
    isFavorite: false,
    viewCount: 880,
    downloadCount: 290,
    lastUpdated: '2024-03-20',
  },
  {
    id: 'doc-sop-005',
    code: 'SOP-LOG-003',
    title: 'Standar Operasional Penerimaan Barang Masuk & Verifikasi Surat Jalan',
    type: 'SOP',
    department: 'Supply Chain & Logistik',
    version: 'v1.0',
    effectiveDate: '2023-11-10',
    reviewDueDate: '2024-11-10',
    status: 'REVIEW_DUE',
    pic: 'Teguh Prasetyo, S.Log',
    approvedBy: 'Haryanto (Head of Supply Chain)',
    summary:
      'Prosedur inspeksi kuantitas dan mutu barang datang dari pemasok, pengecekan kesesuaian Purchase Order (PO), barcode tagging, serta pelaporan Berita Acara Kerusakan (BAP).',
    tags: ['Logistik', 'Gudang', 'Surat Jalan', 'Receiving', 'Purchase Order', 'Supply Chain'],
    distributionDepartments: ['Supply Chain & Logistik', 'Keuangan & Akuntansi'],
    versionHistory: [
      {
        version: 'v1.0',
        releaseDate: '2023-11-10',
        author: 'Teguh Prasetyo',
        approvedBy: 'Haryanto',
        changeSummary: 'Penerbitan dokumen baku penerimaan logistik gudang utama.',
        fileName: 'SOP-LOG-003_Penerimaan_Barang_v1.0.pdf',
        fileSize: '1.3 MB',
      },
    ],
    sections: [
      {
        title: 'Pemeriksaan Surat Jalan dan Fisik Kemasan',
        content:
          'Petugas receiving mencocokkan nomor PO dan memeriksa segel kontainer sebelum bongkar muat.',
        steps: [
          'Verifikasi nomor PO resmi pada sistem ERP perusahaan.',
          'Hitung jumlah koli / palet sesuai surat jalan pengemudi.',
          'Lakukan sampling acak 10% untuk pengecekan fisik bersama tim QA incoming.',
          'Tandatangani surat jalan dan terbitkan Good Receipt Note (GRN) digital.',
        ],
      },
    ],
    file: {
      name: 'SOP-LOG-003_Penerimaan_Barang_v1.0.pdf',
      sizeFormatted: '1.3 MB',
      sizeBytes: 1363148,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2023-11-10T16:00:00Z',
    },
    isFavorite: false,
    viewCount: 520,
    downloadCount: 142,
    lastUpdated: '2023-11-10',
  },
  {
    id: 'doc-ik-003',
    code: 'IK-IT-008',
    title: 'Instruksi Kerja Pencadangan (Backup) & Pemulihan (Restore) Database SQL',
    type: 'IK',
    department: 'IT & Sistem Informasi',
    version: 'v2.0',
    effectiveDate: '2024-05-18',
    reviewDueDate: '2025-05-18',
    status: 'AKTIF',
    pic: 'Ferry Kurniawan (Database Administrator)',
    approvedBy: 'Dimas Wicaksono, CISSP',
    summary:
      'Langkah operasional penjadwalan backup otomatis database harian, replikasi off-site cloud storage bersandi AES-256, dan uji simulasi pemulihan disaster recovery bulanan.',
    tags: ['Database', 'Backup', 'SQL', 'Disaster Recovery', 'IT Infrastructure'],
    distributionDepartments: ['IT & Sistem Informasi'],
    versionHistory: [
      {
        version: 'v2.0',
        releaseDate: '2024-05-18',
        author: 'Ferry Kurniawan',
        approvedBy: 'Dimas Wicaksono',
        changeSummary:
          'Migrasi script backup ke immutable cloud bucket dan pengujian otomatis integritas file .bak via checksum SHA-256.',
        fileName: 'IK-IT-008_Backup_Restore_v2.0.pdf',
        fileSize: '1.7 MB',
      },
    ],
    sections: [
      {
        title: 'Jadwal & Retensi Pencadangan',
        content:
          'Full Backup dilakukan setiap Minggu pukul 01.00 WIB. Differential Backup setiap hari kerja pukul 23.00 WIB. Transaction Log Backup setiap 15 menit.',
      },
      {
        title: 'Langkah Verifikasi Uji Restore',
        content: 'Simulasi pemulihan data pada staging server terisolasi.',
        steps: [
          'Unduh snapshot cadangan terbaru dari cold-storage.',
          'Hitung nilai hash SHA-256 dan bandingkan dengan catatan manifes kriptografi.',
          'Restore snapshot ke instance database sandbox.',
          'Jalankan automated sanity query test dan laporkan durasi Recovery Time Objective (RTO).',
        ],
      },
    ],
    file: {
      name: 'IK-IT-008_Backup_Restore_v2.0.pdf',
      sizeFormatted: '1.7 MB',
      sizeBytes: 1782579,
      isSamplePdf: true,
      mimeType: 'application/pdf',
      uploadedAt: '2024-05-18T15:30:00Z',
    },
    isFavorite: false,
    viewCount: 410,
    downloadCount: 95,
    lastUpdated: '2024-05-18',
  },
];
