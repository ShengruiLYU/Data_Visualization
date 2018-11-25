
// **** Your JavaScript code goes here ****

// load and process data

d3.csv('./data/coffee_data.csv', function(error, data){
 
  var byRegion = d3.nest()
  .key(function(d) { return d.region; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.sales; }); })
  .entries(data);
  

  var byProduct = d3.nest()
  .key(function(d) { return d.category; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.sales; }); })
  .entries(data);
  



  // left,by region

  var Yextent = d3.extent(byRegion, function(d) {
	return d.value;
});

  

  var Yscale = d3.scaleLinear()
               .domain([0,300000])
               .range([0,400]);

  

  var svg = d3.select('svg');

  var Xscale = d3.scaleBand()
                .domain(['Central', 'East', 'South', 'West'])
                .rangeRound([100,320])
                .padding(0.5);

  svg.selectAll('rect')
	.data(byRegion)
	.enter()
	.append('rect')
	.attr('y', function(d){
		
    	return 500-Yscale(d.value);
	})
	.attr('x', function(d){
		return Xscale(d.key);
	})
	.attr('width', Xscale.bandwidth())
	.attr('height', function(d){
		
    	return Yscale(d.value);
	})
	.style('fill', '#5f3e36');

	var xAxis = d3.axisBottom(Xscale);
	svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,500)')
    .call(xAxis);

    var fakeY = d3.scaleLinear()
               .domain([300000,0])
               .range([0,400]);

    var yAxis = d3.axisLeft(fakeY).ticks(6);
    svg.append('g')
   .attr('class', 'y axis')
   .attr('transform', 'translate(100,100)')
   .call(yAxis);

   svg.append('text')
   .attr('class', 'x label')
   .attr('transform', 'translate(170,550)')
   .text('Region');

   svg.append('text')
   .attr('class', 'y label')
   .attr('transform', 'translate(40,370)rotate(270)')
   .text('Coffee Sales (USD)');

   svg.append('text')
   .attr('class', 'chart1 name')
   .attr('transform', 'translate(120,50)')
   .text('Coffee Sales by Region(USD)');



	//right, by product
	var rightYextent = d3.extent(byProduct, function(d) {
	return d.value;
});

	

  

  var rightYscale = d3.scaleLinear()
               .domain([0,300000])
               .range([0,400]);

  

  

  var rightXscale = d3.scaleBand()
                .domain(['Coffee', 'Tea', 'Espresso', 'Herbal Tea'])
                .rangeRound([440,660])
                .padding(0.5);

  var rightsvg = d3.select('svg');

  rightsvg.selectAll('rect1')
	.data(byProduct)
	.enter()
	.append('rect')
	.attr('y', function(d){
		
    	return 500-rightYscale(d.value);
	})
	.attr('x', function(d){
		return rightXscale(d.key);
	})
	.attr('width', rightXscale.bandwidth())
	.attr('height', function(d){
		
    	return rightYscale(d.value);
	})
	.style('fill', '#5f3e36');

	var rightxAxis = d3.axisBottom(rightXscale);
	svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,500)')
    .call(rightxAxis);

    

    var yAxis = d3.axisLeft(fakeY).ticks(6);
    svg.append('g')
   .attr('class', 'y axis')
   .attr('transform', 'translate(440,100)')
   .call(yAxis);

   svg.append('text')
   .attr('class', 'x label')
   .attr('transform', 'translate(520,550)')
   .text('Product');

   svg.append('text')
   .attr('class', 'y label')
   .attr('transform', 'translate(380,370)rotate(270)')
   .text('Coffee Sales (USD)');

   svg.append('text')
   .attr('class', 'chart1 name')
   .attr('transform', 'translate(470,50)')
   .text('Coffee Sales by Product(USD)');
})
