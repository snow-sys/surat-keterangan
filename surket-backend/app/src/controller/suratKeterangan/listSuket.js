/** mengatur request untuk menampilkan artikel */
let {
  listSuket,
  getTotalDataSuket,
} = require("../../repository/suratKeterangan");
let { getAge } = require("../../module/getAges");
let axios = require("axios").default;
axios.defaults.withCredentials = true;

let mapData = (list, config) => {
  // console.log(list);
  let reqList = list.map((el) =>
    axios
      .get(`http://34.101.120.205:8989/v1/pasien/${el.no_mr}`, config)
      .then((data) => data.data.respon[0].alamat)
      .catch((err) => {
        console.log(err.response.data);
        err.response;
      })
  );
  // console.log(reqList);
  return Promise.all(reqList);
};

module.exports = async (req, res) => {
  //baca parameter & query yg diterima
  let { uid, limit, offset, no_mr, cari } = req.query;

  let totaldata = await getTotalDataSuket({ uid, no_mr, cari });

  // console.log(uid, limit, offset, no_mr, cari);
  //jalan function listArtikel
  listSuket({ uid, limit, offset, no_mr, cari })
    .then(async (data) => {
      // console.log(data);
      let login = await axios.request({
        method: "post",
        url: "http://34.101.120.205:8989/v1/login",
        data: {
          username: "senang",
          password: "senang",
        },
        maxRedirects: 0,
        validateStatus: function (status) {
          return status >= 200 && status < 303;
        },
      });
      // console.log(login.data);
      const config = { headers: { cookie: login.headers["set-cookie"] } };
      let value = await mapData(data, config);
      // console.log("test2", value);
      let mapValue = data.map((el, i) => {
        // console.log(el);
        el.alamat = value[i];
        el.umur = el.umur = getAge(el.tanggal_lahir);
        return el;
      });
      res.json({
        message: "berhasil menampilkan list suket",
        code: res.statusCode,
        metadata: {
          totaldata: totaldata[0].total,
        },
        response: mapValue,
      });
    })
    .catch((err) => {
      res.json({
        message: "gagal menampilkan list suket",
        code: res.statusCode,
        response: err,
      });
    });
};
