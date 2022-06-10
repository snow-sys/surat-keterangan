/** mengatur request yang datang ke bagian artikel */

const express = require("express");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get(
  "/:no_surat?",
  require("../controller/suratKontrol/listSuratKontrol")
);
router.post("", require("../controller/suratKontrol/tambahSuratKontrol"));
router.put("/:uid", require("../controller/suratKontrol/editSuratKontrol"));
// router.delete("/:uid", require("../controller/suratKeterangan/hapusSoket"));

module.exports = router;
