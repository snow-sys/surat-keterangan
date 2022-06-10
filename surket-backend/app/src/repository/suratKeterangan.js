/** berisikan function - function yang berhubungan dengan surat keterangan */
let { connection } = require("../module/connection");
const moment = require("moment");

//function list surat keterangan
exports.listSuket = ({ uid, limit, offset, no_mr, cari }) => {
  let param = [limit ? limit : 50, offset ? offset : 0];

  return connection
    .query(
      `
    select * from suket
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

// function get totaldata surat keterangan
exports.getTotalDataSuket = ({ uid, no_mr, cari }) => {
  let param = [];

  return connection
    .query(
      `
    select count(*) as total from suket
    ${
      uid
        ? "where uid = $1"
        : no_mr
        ? "where no_mr = $1"
        : cari
        ? "where nama_pasien ilike $1 "
        : ""
    }
    `,
      uid
        ? param.concat(uid)
        : no_mr
        ? param.concat(no_mr)
        : cari
        ? param.concat(`%${cari}%`)
        : ""
    )
    .then(({ rows }) => rows);
};

//function tambah surat keterangan
exports.tambahSuket = (
  data = {
    no_surat,
    no_mr,
    nama_pasien,
    tanggal_lahir,
    pekerjaan,
    diagnosa,
    tanggal_rawat,
    nama_dokter,
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
    insert into suket(${field}) values(${param}) returning *`,
      [...Object.keys(data).map((el) => data[el])]
    )
    .then(({ rows }) => rows);
};

//function edit surat keterangan
exports.editSuket = ({
  uid,
  data = {
    pekerjaan,
    diagnosa,
    tanggal_rawat,
    nama_dokter,
    nama_user,
  },
}) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);
  return connection
    .query(`update suket set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus barang
exports.hapusSuket = ({ uid }) => {
  return connection
    .query(`delete from suket where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};
