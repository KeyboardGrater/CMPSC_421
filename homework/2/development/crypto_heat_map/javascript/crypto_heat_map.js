function create_heat_map(json_formated) {
    let margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 445 - margin.left - margin.right,
    height = 445 - margin.top - margin.bottom;

    // append the svg object to the div

    const my_div = document.getElementById("heat_map");


    let svg = d3.select("#heat_map")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
    

    let root = d3.hierarchy(json_formated).sum(d => d.value);

    d3.treemap().size([width, height]).padding(2)(root);

    svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
            .attr('x', function(d) {return d.x0;})
            .attr('y', function(d) {return d.y0;})
            .attr('width', function(d) {return d.x1 - d.x0;})
            .attr('height', function(d) {return d.y1 - d.y0;})
            .style("fill", d=> d.data.percentage_change >= 0 ? "green" : "red");    // Decides, if the square should be green or red, based off if it has positive or negative change
            
            
        
        // Add symbol label
        svg.selectAll("Symbol")
            .data(root.leaves())
            .enter()
            .append("text")
                .attr("x", function(d){return d.x0+5})
                .attr("y", function(d){return d.y0+20})
                .text(function(d) {return d.data.name})
                .attr("font-size", "15px")
                .attr("fill", "white")
        
        // Add a second text section (the percentage change)
        svg.selectAll("Percentage_Change")
            .data(root.leaves())
            .enter()
            .append("text")
                .attr("x", function(d){return d.x0+5})
                .attr("y", function(d){return d.y0+35})         // So that it is further down the block
                .text(
                    function(d) {
                        const percentage_change = d.data.percentage_change;
                        const pe_string = percentage_change >= 0 ? "+" + percentage_change : percentage_change;
                        return pe_string + "%";
                     }
                 )
                .attr("font-size", "10px")
                .attr("fill", "white")

}

async function start_program() {
    let needed_format;

    // Call the api, and get the data
    const data_object = await call_crypto_api();

    // Deal with the data 
    needed_format = handel_json(data_object);

    console.log(needed_format);

    create_heat_map(needed_format);
}

function main () {
    start_program();
}
main();