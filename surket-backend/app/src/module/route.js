/** setting route server which define where request go */

const suketRoute = require("../api/suratKeterangan");
const suratKontrolRoute = require("../api/suratKontrol");
let logging = require("./logs");

//function for using route
module.exports = (app) => {
  app.use("/api/v1/suket", suketRoute);
  app.use("/api/v1/surat-kontrol", suratKontrolRoute);

  app.use((req, res, next) => {
    const error = new Error("Route tidak ditemukan! Periksa Kembali");
    error.status = 400;
    next(error);
  });

  app.use((error, req, res, next) => {
    let error_message = {
      error: error.status,
      message: error.message,
    };
    logging(req, res, error_message);
    res.status(error.status || 500);
    res.json(error_message);
  });
  return app;
};
