var fs = require('fs');
fs.readFile('/etc/passwd',{encoding: "utf-8"}, function (err, data) {
  if (err) throw err;
  console.log(data);
});
