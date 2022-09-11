// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}



// 1. Create a variable to keep track of all the filters as an object.
var filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedFilter = d3.select(this);
    
    // 4b. Save the value that was changed as a variable.
    let newValue = changedFilter.property("value");
    console.log(newValue)

    // 4c. Save the id of the filter that was changed as a variable.
    let changedId = changedFilter.attr("id")
    console.log(changedId)
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (newValue){
      filters[changedId] = newValue;
    }
  
    else{
      delete filters[changedId]
    }
    // 6. Call function to apply all filters and rebuild the table
    
    console.log(filters);
    filterTable();
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (const i in filters) {
      if(i){
        filteredData = filteredData.filter(row => row[i]===filters[i]);
        console.log(i)
    }}
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData)
  }
  
  // Build the table when the page loads
  buildTable(tableData);


  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("#datetime").on("change",updateFilters)
  d3.selectAll("#city").on("change",updateFilters)
  d3.selectAll("#country").on("change",updateFilters)
  d3.selectAll("#state").on("change",updateFilters)
  d3.selectAll("#shape").on("change",updateFilters)
  
