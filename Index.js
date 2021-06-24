const apiUrl =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

async function apiResponse(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of
  var data = await response.json();
  let transaction = data.transactions;
  // for sorting date
  const sortedData = getSortedTransactions(data);
  const groupedData = getGroupedTransactions(sortedData);
  displayBox(groupedData);
}

apiResponse(apiUrl);

// return array of sorted transactions
function getSortedTransactions(data) {
  const sortedTransactions = data.transactions.sort((a, b) => {
    let dateA = new Date(a.startDate),
      dateB = new Date(b.startDate);
    return dateA - dateB;
  });

  return sortedTransactions;
}

// return object of grouped transactions on the basis of key(Date)
function getGroupedTransactions(sortedTransactions = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortedTransactions.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}

// insert HTML and CSS into Web Page
function displayBox(groupedData) {

  for (let dataKey in groupedData) {
    document.getElementById(
      "displayBox"
    ).innerHTML += `<div class="lineWrap"><div class="card-date-transaction">
            <div class="dateLapping">
                <p >${new Date(dataKey).toDateString()}</p>
                </div
            </div></div>`;
    ``;
    for (let i = 0; i < groupedData[dataKey].length; i++) {
      let type = groupedData[dataKey][i].type;
      let direction = groupedData[dataKey][i].direction;

      if (type === 1 && direction === 1) {
        document.getElementById(
          "displayBox"
        ).innerHTML += `<div class="alignment-right"><div class="displayCard">
                     <p class="amount">
                      &#8377; ${groupedData[dataKey][i].amount}
                    </p>
                    <p class="transactionMessage"> You paid</p>
                    <div class="transaction-id">
                    <p>Transaction ID</p>
                     <p>${groupedData[dataKey][i].id}</p>
                    </div>
                    </div>
                    </div>
                    <div class="date-time-right">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
     else if (type === 1 && direction === 2) {
        document.getElementById(
          "displayBox"
        ).innerHTML += `<div class="alignment-left"><div class="displayCard">
              <p class="amount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <p class="transactionMessage"> You received</p>
             <div class="transaction-id">
             <p>Transaction ID</p>
              <p>${groupedData[dataKey][i].id}</p>
             </div>
             </div>
             </div>
              <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
     else if (type === 2 && direction === 2) {
        //    Pay and Decline Button and Align BOX Left
        document.getElementById(
          "displayBox"
        ).innerHTML += `<div class="alignment-left"><div class="displayCard">
              <p class="amount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <p class="received"> Request received</p>
              <button>Pay</button>
              <button>Decline</button>
             </div>
             </div>
             <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
     else if (type === 2 && direction === 1) {
        document.getElementById(
          "displayBox"
        ).innerHTML += `<div class="alignment-right"><div class="displayCard">
              <p class="amount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <p class="transactionMessage"> You requested</p>
             <div class="transaction-id">
              <button>Cancel</button>
             </div>
             </div>
             </div>
             <div class="date-time-right">
             <p>${new Date(
               groupedData[dataKey][i].startDate
             ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
           </div>`;
      }
    }
  }
}
