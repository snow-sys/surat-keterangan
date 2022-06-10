let { editSuratKontrol } = require("../../repository/suratKontrol");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  if (uid) {
    editSuratKontrol({ uid, data })
      .then((newData) => {
        res.status(201).json({
          message: "berhasil ubah data surat kontrol.",
          code: 201,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "gagal ubah data surat kontrol",
          code: 400,
          response: err,
        });
      });
  } else {
    res.status(400).json({
      message: "uid surat kontrol tidak ditemukan",
      code: 400,
      response: "-",
    });
  }
};
