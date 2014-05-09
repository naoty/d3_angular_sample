(function() {
  window.ngApp.directive("d3TimeSeriesChart", function() {
    return {
      restrict: "EA",
      replace: true,
      link: function(scope, elements, attrs) {
        var data, svg;
        data = attrs.data || {};
        return svg = d3.select(elements[0]).append("svg");
      }
    };
  });

}).call(this);
