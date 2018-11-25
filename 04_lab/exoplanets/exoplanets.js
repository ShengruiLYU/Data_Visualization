
// **** Your JavaScript code goes here ****


// Activity 0.1: Load the dataset
d3.csv('./exoplanets.csv', function(error, dataset) {
    planets = dataset;


// Activity 0.3: Create your scales
    var radiusMax = d3.max(planets, function(d){
        return +d['radius'];
    });

    var rScale = d3.scaleSqrt()
        .domain([0, radiusMax])
        .range([0,20]);

    var massExtent = d3.extent(planets, function(d){
        return +d['mass'];
    });

    var yScale = d3.scaleLog()
        .domain(massExtent)
        .range([60,660]);

    var hzdExtent = d3.extent(planets, function(d){
        return +d['habital_zone_distance'];
    });

    var xScale = d3.scaleLinear()
        .domain(hzdExtent)
        .range([100,500]);

    var colorScale = d3.scaleQuantize()
        .domain(hzdExtent)
        .range(['#d64d3f', '#96ac3d', '#208d8d']);

// Activity 0.2: Append circle for each Exoplanet and add attribute class 'planet'
// Activity 0.4: Set attributes of circles: cx, cy, and r. Fill the circle
    var svg = d3.select('svg');
    svg.selectAll('.planet')
        .data(planets) // Data-bind the planets array to the d3-selection
        .enter() // Enter - selects incoming data-bound elements
        .append('circle') // Append - append a circle for each planet
        .attr('class', 'planet') // Add the classname that we selected on
        .attr('r', function(d){
            // Set the radius attribute based on the planet's radius
            return rScale(d['radius']);
        })
        .attr('cx', function(d){
            // Set the x-position based on the hzd value
            return xScale(d['habital_zone_distance']);
        })
        .attr('cy', function(d){
            // Set the y-position based on the mass value
            return yScale(d['mass']);
        })
        .style('fill', function(d){
            // Set the fill color based on the hzd value
            return colorScale(d['habital_zone_distance']);
        });

// Activity 1.1 & 1.2: Create x and y axes, then append and call your axes
    svg.append('g') // Append a g element for the scale
       .attr('class', 'x axis') // Use a class to css style the axes together
       .attr('transform', 'translate(0,40)') // Position the axis
       .call(d3.axisTop(xScale)); // Call the axis function

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,680)')
        .call(d3.axisBottom(xScale));

    svg.append('g')
       .attr('class', 'y axis')
       .attr('transform', 'translate(70,0)')
       .call(d3.axisLeft(yScale));

    svg.append('g')
       .attr('class', 'x axis')
       .attr('transform', 'translate(530,0)')
       .call(d3.axisRight(yScale));

// Activity 1.3: Append labels to x and y axis
    svg.append('text')
       .attr('class', 'x label')
       .attr('transform','translate(300,10)')
       .attr('dy','0.3em')
       .text('Habital Zone Distance');

    svg.append('text')
       .attr('class', 'x label')
       .attr('transform','translate(300,720)')
       .attr('dy','0.3em')
       .text('Habital Zone Distance');

    svg.append('text')
       .attr('class', 'y label')
       .attr('transform','translate(20,370)rotate(270)')
       .text('Planet Mass (relative to Earth)');

    svg.append('text')
       .attr('class', 'y label')
       .attr('transform','translate(580,370)rotate(270)')
       .text('Planet Mass (relative to Earth)');

// Challenge 1: Add text label for following nodes: Earth, Mars, Mercury, Venus
// Create an additional data array with pointers to only the labeled planetes
    planetLabels = planets.filter(function(d){
        return d['name'] == 'Earth' || d['name'] == 'Mars'
               || d['name'] == 'Venus' || d['name'] == 'Mercury';
    });

// Create a new d3-selection. And append a new text element for the data array.
    svg.selectAll('.planet-label')
        .data(planetLabels)
        .enter()
        .append('text')
        .attr('class', 'planet-label')
        .attr('x', function(d){
            return xScale(d['habital_zone_distance']) + 10;
        })
        .attr('y', function(d){
            return yScale(d['mass']) + rScale(d['radius']);
        })
        .text(function(d){
            return d['name'];
        });
});
