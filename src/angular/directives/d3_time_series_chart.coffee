window.ngApp.directive "d3TimeSeriesChart", ->
  restrict: "EA"
  replace: true
  link: (scope, elements, attrs) ->
    return if attrs.data is undefined

    data = JSON.parse(attrs.data)
    parseDate = d3.time.format("%Y/%m/%d").parse
    data.forEach (d) -> d[0] = parseDate(d[0])

    width = attrs.width || 300
    height = attrs.height || 200
    padding = attrs.padding || 40

    svg = d3.select(elements[0]).append("svg")
      .attr("width", width)
      .attr("height", height)

    line = d3.svg.line()

    xExtent = d3.extent(data, (d) -> return d[0])
    xScale = d3.time.scale().domain(xExtent).range([padding, width - padding])
    line.x((d) -> xScale(d[0]))

    yExtent = d3.extent(data, (d) -> return d[1])
    yScale = d3.scale.linear().domain(yExtent).range([height - padding, padding])
    line.y((d) -> yScale(d[1]))

    svg.append("path")
      .datum(data)
      .attr("d", line)

    xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(data.length)
      .tickFormat(d3.time.format("%m/%d"))
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, #{height - padding})")
      .call(xAxis)

    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(data.length)
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(#{padding}, 0)")
      .call(yAxis)

