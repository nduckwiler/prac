// TODO: why does the "both" circle not move horizontally in
// linear time? must have something to do with the interpolator
const initialRadius = 25;
const finalRadius = 250;
const duration = 2000;

// state object
const s = {
  width: 900,
  height: 600,
};

window.onload = () => {

  d3.select('svg')
      .attr('height', s.height + 'px')
      .attr('width', s.width + 'px');

  d3.select('svg')
    .append('circle')
      .attr('id', 'left-right-only')
      .attr('cx', 100)
      .attr('cy', 50)
      .attr('r', initialRadius)
      .attr('fill', 'red');

  d3.select('svg')
    .append('circle')
      .attr('id', 'small-big-only')
      .attr('cx', 100)
      .attr('cy', 150)
      .attr('r', initialRadius)
      .attr('fill', 'red');

  d3.select('svg')
    .append('circle')
      .attr('id', 'left-right-small-big')
      .attr('cx', 100)
      .attr('cy', 250)
      .attr('r', initialRadius)
      .attr('fill', 'red');

  d3.selectAll('svg circle')
      .attr('fill-opacity', 0.75)
      .attr('stroke', 'grey');

  d3.select('circle#left-right-only').on('click', leftRight);
  d3.select('circle#small-big-only').on('click', smallBig);
  d3.select('circle#left-right-small-big').on('click', leftRightSmallBig);
  d3.select('button#run-all-btn').on('click', function(d,i,nodes) {
    leftRight.call(d3.select('circle#left-right-only').node())
    smallBig.call(d3.select('circle#small-big-only').node())
    leftRightSmallBig.call(d3.select('circle#left-right-small-big').node())
  });

  function leftRight(d, i, nodes) {
    const clicked = d3.select(this);

    clicked
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr('cx', s.width);
  }

  function smallBig(d, i, nodes) {
    const clicked = d3.select(this);

    clicked
        .transition()
        .duration(duration)
        .ease(d3.easeBounce)
        .attr('r', finalRadius);
  }

  function leftRightSmallBig(d, i, nodes) {
    const clicked = d3.select(this);

    const twizzleLock = {};
    const plonkLock = {};

    function twizzle(elem) {
      d3.select(twizzleLock).transition()
          .duration(duration)
          .tween('r', function() {
            const interpolator = d3.interpolateNumber(initialRadius, finalRadius);
            return function(t) { elem.attr('r', interpolator(d3.easeBounce(t))); };
          });
    }

    function plonk(elem) {
      d3.select(plonkLock).transition()
          .duration(duration)
          .tween('cx', function() {
            const interpolator = d3.interpolateNumber(elem.attr('cx'), s.width);
            return function(t) { elem.attr('cx', interpolator(d3.easeLinear(t))); };
          });
    }

    clicked
        .call(twizzle)
        .call(plonk);

  };

};
