
function show_country_information(world_wide_info, country_abbreviation) {
    let country_info_section = document.getElementById("country-information-section");
    // const country_info_sect_parent = country_info_section.parentElement.nodeName;
    let index = 0;
    let country_found = false;
    let country = world_wide_info[0];                   // Define it here, this will very likely change
    let currency_key;

    // Flush the country info section of any previous country info
    country_info_section.remove();

    // Create a new child, modify it, and then link it to the parent
    country_info_section = document.createElement("div");
    country_info_section.id = "country-information-section";
    country_info_section.classList.add("center");
    document.body.appendChild(country_info_section);

    // Create the other information parts
    const common_name = document.createElement("h1");
    const official_name = document.createElement("h2");
    const currency = document.createElement("p");
    const capital = document.createElement("p");
    const flag = document.createElement("img");


    // Find the country based off either the CCA2, or CCA3 code
    for (index = 0; index < world_wide_info.length && !country_found; ++index) {
        if (world_wide_info[index].cca3 === country_abbreviation) {
            country_found = true;
        } 
    }
    
    // If the country wasn't found according to CCA3 standards, then search the CCA2 standards
    // Also checks if country was found, because otherwise, if I did index = 0, it would set it before checking that it can't even loop
    for (index = country_found ? index : 0 ; index < world_wide_info.length && !country_found; ++index) {
        if (world_wide_info[index].cca2 === country_abbreviation) {
            country_found = true;
        }
    }

    // Account for it indexing before it checks the exit conditions of either loop
    index--;

    // Checks if the country wasn't found
    if (!country_found) {
        console.log("Somehow the country wasn't found. I know it isn't New Zealand, because it isn't on this map");
        return;
    }

    // Grab the data, based off the index that the loop exited at
    country = world_wide_info[index];

    common_name.innerHTML = country.name.common;
    official_name.innerHTML = country.name.official;
    currency_key = Object.keys(country.currencies)[0];
    currency.innerHTML = country.currencies[currency_key].name + " " + "(" + country.currencies[currency_key].symbol + ")";
    capital.innerHTML = country.capital[0];
    flag.src = country.flags.png;
    
    // And the stack class to the data, and then append them to the country info section
    country_info_section.append(common_name, official_name, currency, capital, flag);
    
    console.log("show_country_information console log");

}

function create_map(world_wide_info) {
    // Svg
    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    
    // Map and projection
    const path = d3.geoPath();
    const projection = d3.geoMercator()
        .scale(70)
        .center([0,20])
        .translate([width / 2, height / 2]);
    
    // Data and color
    const data = new Map();
    const colorScale = d3.scaleThreshold()
        .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
        .range(d3.schemeBlues[7]);
    
    // Load the external data, and then load
    Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) {
            data.set(d.code, +d.pop)})])
            .then(function(loadData) {
                let topo = loadData[0]

                let mouseOver = function(d) {      
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .5)
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", "black")
                    // // To show the country information
                    // console.log(data_point);
                }
                let mouseLeave = function (d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .8)
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("stroke", "transparent")     
                }
                // When the mouse clicks on a country, display the information
                let mouseClick = function (event, data_point) {       // I need the second point in order to get the id
                    // Call the function to display information, given the country ID
                    const country_id = data_point.id;
                    show_country_information(world_wide_info, country_id);
                }


                // Draw the map
                svg.append("g")
                    .selectAll("path")
                    .data(topo.features)
                    .enter()
                    .append("path")
                        // Draw each country
                        .attr("d", d3.geoPath()
                            .projection(projection)
                        )
                        // Set the color of each country
                        .attr("fill", function(d) {
                            d.total = data.get(d.id) || 0;
                            return colorScale(d.total);
                        })
                        .style("stroke", "transparent")
                        .attr("class", function(d) {return "Country"})
                        .style("opacity", .8)
                        .on("mouseover", mouseOver)
                        .on("mouseleave", mouseLeave)
                        .on("click", mouseClick)                        // Added a mouse click event, so we don't have a thousand country info popping up
        })
}