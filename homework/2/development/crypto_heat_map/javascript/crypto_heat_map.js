

async function basics_of_graph () {
    // Set the dimensions of the graph
    const margin = {top: 80, right: 25, bottom: 30, left: 40},
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // Append the dimensions to the div
    const svg = d3.select('#heat_map')
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Call the api to get data  
}

function start_application () {
    basics_of_graph();
}

function main () {
    start_application();
}
main();