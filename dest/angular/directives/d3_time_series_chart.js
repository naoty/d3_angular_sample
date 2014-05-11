(function() {
  window.ngApp.directive("d3TimeSeriesChart", function() {
    return {
      restrict: "EA",
      replace: true,
      link: function(scope, elements, attrs) {
        var data, height, line, padding, parseDate, svg, width, xAxis, xExtent, xScale, yAxis, yExtent, yScale;
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
        padding = attrs.padding || 40;
        svg = d3.select(elements[0]).append("svg").attr("width", width).attr("height", height);
        line = d3.svg.line();
        xExtent = d3.extent(data, function(d) {
          return d[0];
        });
        xScale = d3.time.scale().domain(xExtent).range([padding, width - padding]);
        line.x(function(d) {
          return xScale(d[0]);
        });
        yExtent = d3.extent(data, function(d) {
          return d[1];
        });
        yScale = d3.scale.linear().domain(yExtent).range([height - padding, padding]);
        line.y(function(d) {
          return yScale(d[1]);
        });
        svg.append("path").datum(data).attr("d", line);
        xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%m/%d"));
        svg.append("g").attr("class", "axis").attr("transform", "translate(0, " + (height - padding) + ")").call(xAxis);
        yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(data.length);
        return svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ", 0)").call(yAxis);
      }
    };
  });

}).call(this);
