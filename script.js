// global variable
var tableData;

fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // tableData as global variable
    this.tableData = data;

    //One function can be called from many methods with different parameters i.e. filteredData: renderData(dynamic data as parameter)
    this.renderData(this.tableData);
  });

// Status Filter
function getStatusValue() {
  console.log("Inside getStatus");
  var e = document.getElementById("ddlViewBy");
  var value = e.value;
  var text = e.options[e.selectedIndex].text;
  console.log("e value text", e, value, text);
  console.log(
    this.tableData.filter((item) => item.status.toString().includes(value))
  );
  filteredData = this.tableData.filter((item) =>
    item.status.toString().includes(value)
  );

  // Calling renderData with Filtered data by status value
  this.renderData(filteredData);
}

// Client-Type
function getClientType() {
  console.log("Inside getClientType");
  var e = document.getElementById("ddlViewBy1");
  var value = e.value;
  var text = e.options[e.selectedIndex].text;
  console.log("e value text", e, value, text);
  console.log(
    this.tableData.filter((item) => item.client_type.toString().includes(value))
  );
  filteredData = this.tableData.filter((item) =>
    item.client_type.toString().includes(value)
  );

  // Calling renderData with Filtered data by status value
  this.renderData(filteredData);
}

// Main function of renderData - Fetching data from JSON file

function renderData(data) {
  let row = document.querySelector("#data-output");
  let out = "";
  for (let d of data) {
    out += `
         <tr>
            <td class="th-new blue">${d.invoice}</td>
            <td class="th-new blue">${d.client_name}</td>
            <td class="th-new blue">${d.client_type}</td>
            <td class="th-new" id="date1">${d.date}</td>
            <td class="th-new" id="date2">${d.due_date}</td>
            <td class="th-new red">${d.total}</td>
            <td class="th-new red">${d.balance}</td>
            <td class="th-new"><button type="button" class="btn status-btn" id="status">${d.status}</button></td>
         </tr>
      `;
  }
  row.innerHTML = out;

  const collection = document.getElementsByClassName("status-btn");
  for (let i = 0; i < collection.length; i++) {
    const element = collection[i].innerHTML;
    if (element == "Draft") {
      document.getElementsByClassName("status-btn")[i].style.backgroundColor =
        "#f48993";
    } else if (element == "Paid") {
      document.getElementsByClassName("status-btn")[i].style.backgroundColor =
        "#6f8efa";
    } else if (element == "Partial Payment") {
      document.getElementsByClassName("status-btn")[i].style.backgroundColor =
        "#4f00c1";
    }
  }
}
