/** mengatur request untuk menampilkan artikel */
let {
  listSuratKontrol,
  getTotalDataSuratKontrol,
} = require("../../repository/suratKontrol");

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid, limit, offset, no_mr, cari } = req.query;

  let totaldata = await getTotalDataSuratKontrol({ no_mr, cari });

  //jalan function listArtikel
  listSuratKontrol({ uid, limit, offset, no_mr, cari })
    .then(async (data) => {
      res.json({
        message: "berhasil menampilkan list surat kontrol",
        code: res.statusCode,
        metadata: {
          totaldata: totaldata[0].total,
        },
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list surat kontrol",
        code: res.statusCode,
        response: err,
      });
    });
};
