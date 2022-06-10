const fs = require("fs");
module.exports = (req, res, error_message) => {
  const getActualRequestDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };
  // formatted time to YYYY-MM-DD hh:mm:ss
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();

  //get incoming method
  let method = req.method;

  //get url
  let url = req.url;

  //get payload
  let body = JSON.stringify(req.body);

  //get user IP
  let userIP = req.ip;

  //get time for request to be done
  const start = process.hrtime();
  const durationInMilliSeconds = getActualRequestDurationInMilliseconds(start);

  //checking logs directory
  let directory = __dirname + `/../../logs`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  //define logs directory
  let logsDirectory =
    __dirname +
    `/../../logs/${
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear()
    }`;

  //if there is a error message, log the error first
  if (error_message) {
    let error_log = `[${formatted_date}] error [${method}] request in url [${url}] from user IP [${userIP}] with status [${error_message.error}] and message [${error_message.message}]. `;
    // console.log(error_log)
    fs.appendFile(
      `${logsDirectory}_error_logs.txt`,
      error_log + "\n",
      (err) => {
        if (err) {
          console.log("error on error_logs", err);
        }
      }
    );
  } else {
    let log = `[${formatted_date}] : From user IP [${userIP}] incoming [${method}] request in url [${url}] with payload [${body}] for ${
      durationInMilliSeconds.toLocaleString() + "ms"
    }`;
    console.log(log);
    fs.appendFile(`${logsDirectory}_request_logs.txt`, log + "\n", (err) => {
      if (err) {
        console.log("error on request_logs", err);
      }
    });
  }
};
