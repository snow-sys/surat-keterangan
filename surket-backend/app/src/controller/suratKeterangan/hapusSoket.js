let { hapusSuket } = require("../../repository/suratKeterangan");

module.exports = (req, res) => {
  let { uid } = req.params;

  hapusSuket({ uid })
    .then((newData) => {
      if (newData.length > 0) {
        res.json({
          message: "berhasil hapus data surat keterangan.",
          code: res.statusCode,
          response: newData,
        });
      } else {
        res.json({
          message:
            "gagal hapus data surat keterangan : uid suket tidak ditemukan",
          code: 400,
          response: newData,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "gagal hapus data surat keterangan",
        code: res.statusCode,
        response: err,
      });
    });
};
