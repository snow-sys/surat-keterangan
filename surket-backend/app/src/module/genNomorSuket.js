let { connection } = require("./connection");

let date = new Date().toLocaleDateString("id", {
  month: "2-digit",
  year: "2-digit",
});
exports.genNomorSuket = async (jenis_surat) => {
  let partial = `ZNB/${jenis_surat}/` + date.split("/").join("") + "/";
  let nomor = "00000";

  let hasil = await connection
    .query(
      `select right( coalesce(max(no_surat),'00000') , 5) as result 
            from ${jenis_surat == "KETERANGAN" ? "suket" : "surat_kontrol"} 
            where no_surat like $1
        `,
      [`${partial}%`]
    )
    .then(({ rows }) => {
      console.log("rows", rows);
      let num = nomor + (parseInt(rows[0].result) + 1);
      return partial + num.substr(num.length - 5);
    });
  return hasil;
};
