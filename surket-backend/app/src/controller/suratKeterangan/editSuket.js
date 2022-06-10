let { editSuket } = require("../../repository/suratKeterangan");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  if (uid) {
    editSuket({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data surat keterangan.",
          code: 201,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data surat keterangan",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(400).json({
      message: "uid surat keterangan tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
