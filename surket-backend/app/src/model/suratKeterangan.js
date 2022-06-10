/** function untuk membuat tabel artikel */
let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists suket(
      uid uuid primary key default uuid_generate_v4(), 
      no_surat varchar(30) not null,
      no_mr varchar(10) not null,
      nama_pasien text not null,
      tanggal_lahir timestamp not null,
      pekerjaan text not null,
      diagnosa text not null,
      tanggal_rawat timestamp[] default '{}',
      nama_dokter text,
      nama_user text, 
      create_at timestamp default now(),
      update_at timestamp);
  `);
})();
