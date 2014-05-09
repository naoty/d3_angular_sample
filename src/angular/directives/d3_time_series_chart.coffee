window.ngApp.directive "d3TimeSeriesChart", ->
  restrict: "EA"
  replace: true
  link: (scope, elements, attrs) ->
    data = attrs.data || {}
    svg = d3.select(elements[0]).append("svg")

