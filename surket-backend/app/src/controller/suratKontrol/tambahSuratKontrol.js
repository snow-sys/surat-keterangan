let { tambahSuratKontrol } = require("../../repository/suratKontrol");
let { genNomorSuket } = require("../../module/genNomorSuket");

module.exports = async (req, res) => {
  let data = req.body;
  let jenis_surat = "KONTROL";
  data.no_surat = await genNomorSuket(jenis_surat);

  tambahSuratKontrol(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data surat kontrol.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data surat kontrol",
        code: res.statusCode,
        response: err,
      });
    });
};
