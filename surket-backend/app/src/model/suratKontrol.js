/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists surat_kontrol(
      uid uuid primary key default uuid_generate_v4(), 
      no_surat varchar(30) not null,
      no_mr varchar(10) not null,
      nama_pasien varchar(100) not null,
      diagnosis text,
      terapi text,
      tanggalKontrol DATE NULL DEFAULT NULL,
      dokter varchar(100),
      alasan text,
      tindakLanjut text,
      tanggalRujukanAwal DATE NULL DEFAULT NULL,
      noAntrian text null,
      penjamin text,
      nama_user text, 
      create_at timestamp default now(),
      update_at timestamp);
  `);
})();
