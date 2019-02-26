const initialRadius = 25;
const finalRadius = 250;
const duration = 2000;
const width= 600;
const height= 400;
const circle1CX= 100;
const circle1CY= 100;
const circle2CX= 300;
const circle2CY= 100;

window.onload = () => {
  const svg = d3.select('svg');

  svg
      .attr('height', height + 'px')
      .attr('width', width + 'px');

  const circle1 = svg
    .append('circle')
      .attr('id', 'circle1')
      .attr('cx', circle2CX)
      .attr('cy', circle2CY)
      .attr('r', initialRadius)
      .attr('fill', 'blue');

  const circle2 = svg
    .append('circle')
      .attr('id', 'circle2')
      .attr('cx', circle1CX)
      .attr('cy', circle1CY)
      .attr('r', initialRadius)
      .attr('fill', 'red');

  svg
    .append('text')
      .attr('x', circle1CX)
      .attr('y', circle1CY + 50)
      .html('circle1');

  svg
    .append('text')
      .attr('x', circle2CX)
      .attr('y', circle2CY + 50)
      .html('circle2');


  d3.select('button').on('click', function() {
    circle1.transition()
        .duration(duration)
        .ease(d3.easeBounce)
        .attr('r', finalRadius);

    circle2.transition()
        .duration(duration)
        .ease(d3.easeBounce)
        .attr('r', finalRadius);
  });

};
