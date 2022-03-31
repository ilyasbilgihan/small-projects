const { get } = require('axios')
const { writeCSVFile, convertArrayToCSVString } = require('./utils/utils');


const startDate = process.argv[2] || "2022-01-26";
const endDate = process.argv[3] || "2022-01-26";
const REQUEST_URL = `https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=${endDate}&startDate=${startDate}`

get(REQUEST_URL)
  .then(res => {

    let intraDayTradeHistoryList = res.data.body.intraDayTradeHistoryList
    

    // Grouping by contract code
    let grouppedIntraDayTradeHistoryList = {}
    intraDayTradeHistoryList.reduce((prev, curr) =>{

      if(curr.conract.slice(0,2) === 'PH'){
        prev[curr.conract] = prev[curr.conract] || [];
        prev[curr.conract].push(curr);
      }

      return prev;

    }, grouppedIntraDayTradeHistoryList);


    // Calculating essential values of each contract
    let result = []
    for (const [key, contracts] of Object.entries(grouppedIntraDayTradeHistoryList)) {

      let dateArray = key.slice(2).match(/.{1,2}/g) // "PH22011805" => ["22", "01", "18", "05"]
      let date = `${dateArray[2]}.${dateArray[1]}.20${dateArray[0]} ${dateArray[3]}:00` // "18.01.2022 05:00"

      let totalQuantity = 0;
      let totalPrice = 0;

      contracts.forEach(contract => {
        totalPrice += (contract.price * contract.quantity)
        totalQuantity += contract.quantity
      });

      let contractOverview = {
        date,
        totalQuantity: Math.round(totalQuantity/10),
        totalPrice: Math.round(totalPrice/10),
      }
      contractOverview.weightedAverage = Math.round(contractOverview.totalPrice/contractOverview.totalQuantity)

      result.push(contractOverview) // pushing {date, totalQuantity, totalPrice, weightedAverage}
    }


    let csvString = convertArrayToCSVString(
      [
        "Date",
        "Total Quantity",
        "Total Price",
        "Weighted Average"
      ],
      result
    );
    writeCSVFile(__dirname + '/overview.csv', csvString)

  })
  .catch(error => {
    console.error(error)
  })