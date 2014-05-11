(function() {
  window.ngApp.directive("d3TimeSeriesChart", function() {
    return {
      restrict: "EA",
      replace: true,
      link: function(scope, elements, attrs) {
        var area, data, height, line, paddingBottom, paddingLeft, paddingRight, paddingTop, parseDate, svg, width, xAxis, xExtent, xScale, yAxis, yExtent, yScale;
        if (attrs.data === void 0) {
          return;
        }
        data = JSON.parse(attrs.data);
        parseDate = d3.time.format("%Y/%m/%d").parse;
        data.forEach(function(d) {
          return d[0] = parseDate(d[0]);
        });
        width = attrs.width || 300;
        height = attrs.height || 200;
        paddingTop = 10;
        paddingRight = 20;
        paddingBottom = 40;
        paddingLeft = 40;
        svg = d3.select(elements[0]).append("svg").attr("width", width).attr("height", height);
        line = d3.svg.line();
        xExtent = d3.extent(data, function(d) {
          return d[0];
        });
        xScale = d3.time.scale().domain(xExtent).range([paddingLeft, width - paddingRight]);
        line.x(function(d) {
          return xScale(d[0]);
        });
        yExtent = d3.extent(data, function(d) {
          return d[1];
        });
        yScale = d3.scale.linear().domain(yExtent).range([height - paddingBottom, paddingTop]);
        line.y(function(d) {
          return yScale(d[1]);
        });
        svg.append("path").datum(data).attr("d", line);
        xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%m/%d")).tickPadding(10);
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + (height - paddingBottom) + ")").call(xAxis);
        yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(data.length / 2).innerTickSize(-width).outerTickSize(0).tickPadding(10);
        svg.append("g").attr("class", "y axis").attr("transform", "translate(" + paddingLeft + ", 0)").call(yAxis);
        area = d3.svg.area().x(function(d) {
          return xScale(d[0]);
        }).y0(height - paddingBottom).y1(function(d) {
          return yScale(d[1]);
        });
        svg.append("path").datum(data).attr("class", "area").attr("d", area);
        return svg.selectAll("circle").data(data).enter().append("circle").attr("r", 4).attr("cx", function(d) {
          return xScale(d[0]);
        }).attr("cy", function(d) {
          return yScale(d[1]);
        });
      }
    };
  });

}).call(this);
