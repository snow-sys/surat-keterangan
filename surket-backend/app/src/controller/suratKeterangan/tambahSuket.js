let { tambahSuket } = require("../../repository/suratKeterangan");
let { genNomorSuket } = require("../../module/genNomorSuket");

module.exports = async (req, res) => {
  let data = req.body;
  let jenis_surat = "KETERANGAN";
  data.no_surat = await genNomorSuket(jenis_surat);

  tambahSuket(data)
    .then((newData) => {
      res.json({
        message: "berhasil tambah data surat keterangan.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal tambah data surat keterangan",
        code: res.statusCode,
        response: err,
      });
    });
};
