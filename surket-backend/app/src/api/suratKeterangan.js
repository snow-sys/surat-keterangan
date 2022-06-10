/** mengatur request yang datang ke bagian artikel */

const express = require("express");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("", require("../controller/suratKeterangan/listSuket"));
router.post("", require("../controller/suratKeterangan/tambahSuket"));
router.put("/:uid", require("../controller/suratKeterangan/editSuket"));
router.delete("/:uid", require("../controller/suratKeterangan/hapusSoket"));

module.exports = router;
