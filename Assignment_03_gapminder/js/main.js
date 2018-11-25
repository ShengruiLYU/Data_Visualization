// Creates a bootstrap-slider element
$("#yearSlider").slider({
    tooltip: 'always',
    tooltip_position:'bottom'
});
// Listens to the on "change" event for the slider
$("#yearSlider").on('change', function(event){
    // Update the chart on the new value
    updateChart(event.value.newValue);
});

// Color mapping based on continents
var contintentColors = {Asia: '#fc5a74', Europe: '#fee633',
    Africa: '#24d5e8', Americas: '#82e92d', Oceania: '#fc5a74'};

d3.csv('./data/gapminder.csv',
    function(d){
        // This callback formats each row of the data
        return {
            country: d.country,
            year: +d.year,
            population: +d.population,
            continent: d.continent,
            lifeExp: +d.lifeExp,
            gdpPercap: +d.gdpPercap
        }
    },
    function(error, dataset){
        if(error) {
            console.error('Error while loading ./gapminder.csv dataset.');
            console.error(error);
            return;
        }

        // **** Set up your global variables and initialize the chart here ****
        nestedByYear = d3.nest()
        .key(function(d) {
            return d.year; // Nest by year
        })
        .entries(dataset);

        console.log(nestedByYear);

        xScale = d3.scaleLog()
        .domain([241,114000]) // Scale time requires domain is Date objects
        .range([70,970]);

        yScale = d3.scaleLinear()
        .domain([20,83]) // Scale time requires domain is Date objects
        .range([650, 50]);

        rScale = d3.scaleSqrt()
        .domain([0,1318683096]) // Scale time requires domain is Date objects
        .range([0, 40]);

         svg = d3.select('svg');

         svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,650)')
        .call(d3.axisBottom(xScale));


        svg.append('g')
       .attr('class', 'y axis')
       .attr('transform', 'translate(70,0)')
       .call(d3.axisLeft(yScale));
       
        svg.append('text')
       .attr('class', 'x label')
       .attr('transform','translate(200,680)')
       .attr('dy','0.3em')
       .text('Income per person, GDO/capita in $/year adjusted for inflation');
        
        svg.append('text')
       .attr('class', 'y label')
       .attr('transform','translate(20,370)rotate(270)')
       .text('Life expentancy, years');

       svg.append('text')
       .attr('class', 'y title')
       .attr('transform','translate(800,20)')
       .attr('font-size','20')
       .text('GapMinder Countries');

        svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + 650 + ")")
      .call(d3.axisBottom(xScale)
        
          .tickSize(-600)
          .tickFormat("")
      )
        
        svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(" + 70 + ",0)")
      .call(d3.axisLeft(yScale)
        
          .tickSize(-900)
          .tickFormat("")
      )

        updateChart(1952);
        

    });



function updateChart(year) {
    // **** Update the chart based on the year here ****
    

    for(i=0;i< nestedByYear.length; i++){
    	
    	if (nestedByYear[i].key == year){
    		var countries = nestedByYear[i].values;
    	}
    }
   


   

        var country = svg.selectAll('.country')
        .data(countries);

        
        var countryEnter = country.enter()
        .append('g')
        .attr('class', 'country');

        

       countryEnter.merge(country).select('circle')
       .attr('r', function(d){
            
            return rScale(d.population);
        })
        .attr('cx', function(d){
            return xScale(d.gdpPercap);
        })
        .attr('cy', function(d){
            return yScale(d.lifeExp);
        })
        .attr('fill', function(d){
            return contintentColors[d.continent];
        });
        
        countryEnter.append('circle')
		.attr('r', function(d){
        	
        	return rScale(d.population);
        })
        .attr('cx', function(d){
        	return xScale(d.gdpPercap);
        })
        .attr('cy', function(d){
        	return yScale(d.lifeExp);
        })
        .attr('fill', function(d){
        	return contintentColors[d.continent];
        });


        country.exit().remove();
}
