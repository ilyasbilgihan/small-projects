const fs = require('fs')

function writeCSVFile(path, csvString) {
  fs.writeFile(path, csvString, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`CSV file has been saved successfully.`)
    console.log(path + "\n")
  })
}


function convertArrayToCSVString(headerRow, dataRows) {
  return csvString = [
    headerRow,
    ...dataRows.map(item => Object.values(item))
  ].map(e => e.join(",")).join("\n");
}

module.exports = {writeCSVFile, convertArrayToCSVString}