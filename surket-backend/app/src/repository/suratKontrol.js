/** berisikan function - function yang berhubungan dengan surat keterangan */
let { connection } = require("../module/connection");
const moment = require("moment");

//function list surat kontrol
exports.listSuratKontrol = ({ uid, limit, offset, no_mr, cari }) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
    select * from surat_kontrol
    ${
      uid
        ? "where uid =  $3"
        : no_mr
        ? "where no_mr = $3"
        : cari
        ? "where nama_pasien ilike $3 "
        : ""
    } order by create_at desc
      limit $1 offset $2
    `,
      uid
        ? param.concat(uid)
        : no_mr
        ? param.concat(no_mr)
        : cari
        ? param.concat(`%${cari}%`)
        : param
    )
    .then(({ rows }) => rows);
};

// function get totaldata surat kontrol
exports.getTotalDataSuratKontrol = ({ no_mr, cari }) => {
  let param = [];

  return connection
    .query(
      `
    select count(*) as total from surat_kontrol
    ${no_mr ? "where no_mr = $1" : cari ? "where nama_pasien ilike $1 " : ""}
    `,
      no_mr ? param.concat(no_mr) : cari ? param.concat(`%${cari}%`) : ""
    )
    .then(({ rows }) => rows);
};

//function tambah surat kontrol
exports.tambahSuratKontrol = (
  data = {
    no_surat,
    no_mr,
    nama_pasien,
    diagnosis,
    terapi,
    tanggalKontrol,
    dokter,
    alasan,
    tindakLanjut,
    tanggalRujukanAwal,
    noAntrian,
    penjamin,
    nama_user,
  }
) => {
  let field = Object.keys(data).join(", ");
  let param = Object.keys(data)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  return connection
    .query(
      `
      insert into surat_kontrol(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit surat kontrol
exports.editSuratKontrol = ({ uid, data }) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update surat_kontrol set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus surat kontrol
exports.hapusSuratKontrol = ({ uid }) => {
  return connection
    .query(`delete from surat_kontrol where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};
