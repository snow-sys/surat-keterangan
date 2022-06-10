/** berisikan konfigurasi server dan function untuk menjalankan server */

const http = require("http");
const express = require("express");
let app = express();
const port = process.env.PORT || 7600;

// akses middleware
app = require("./middleware")(app);

//akses route
app = require("./route")(app);
app.use((req, res, next) => {
  const error = new Error("Salah Routes");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

exports.start = () =>
  http
    .createServer(app)
    .listen(port, () =>
      console.log(`server surat keterangan berjalan di port ${port}`)
    );
