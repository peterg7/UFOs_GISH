// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

// Define function to build table from data
function buildTable(data) {
  // Clear existing table to get clean working slate
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

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value");
  // Grab the city value from the filter
  let city = d3.select("#city").property("value");
  // Store state value from filter
  let state = d3.select("#state").property("value");
  // Store country value from filter
  let country = d3.select("#country").property("value");
  // Store shape from filter
  let shape = d3.select("#shape").property("value");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if(date){
    filters.date = {
      id: 'datetime',
      value: date
    };
  } else {
    delete filters.date;
  }
  if(city){
    filters.city = {
      id: 'city',
      value: city
    };
  } else {
    delete filters.city
  }
  if(state){
    filters.state = {
      id: 'state',
      value: state
    };
  } else {
    delete filters.state
  }
  if(country){
    filters.country = {
      id: 'country',
      value: country
    };
  } else {
    delete filters.country
  }
  if(shape){
    filters.shape = {
      id: 'shape',
      value: shape
    };
  } else {
    delete filters.shape
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {
  
  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values
  const values = Object.values(filters)
  for(const filter of values){
      filteredData = filteredData.filter(row => row[filter.id] === filter.value);
  }


  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
