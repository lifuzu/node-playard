fs = require 'fs'
fs.readFile '/etc/passwd', {encoding: "utf-8"}, (err, data) ->
  throw err if err
  console.log data
