const initialRadius = 25;
const finalRadius = 250;
const duration = 2000;
const width= 600;
const height= 400;
const noClipCX= 100;
const noClipCY= 100;
const yesClipCX= 300;
const yesClipCY= 100;

window.onload = () => {
  const svg = d3.select('svg');

  svg
      .attr('height', height + 'px')
      .attr('width', width + 'px');

  svg.select('svg defs')
    .append('clipPath')
      .attr('id', 'clip-1');

  const circleYesClip = svg.select('clipPath#clip-1')
    .append('circle')
      .attr('id', 'yes-clip')
      .attr('cx', yesClipCX)
      .attr('cy', yesClipCY)
      .attr('r', initialRadius);

  const circleNoClip = svg
    .append('circle')
      .attr('id', 'no-clip')
      .attr('cx', noClipCX)
      .attr('cy', noClipCY)
      .attr('r', initialRadius)
      .attr('fill', 'red');

  svg
    .append('text')
      .attr('x', noClipCX)
      .attr('y', noClipCY + 50)
      .html('circle element; no clip');

  svg
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'blue')
      .attr('clip-path', 'url(#clip-1)');

  svg
    .append('text')
      .attr('x', yesClipCX)
      .attr('y', yesClipCY + 50)
      .html('rect element; clipped by circle');


  d3.select('button').on('click', function() {
    circleNoClip.transition()
        .duration(duration)
        .ease(d3.easeBounce)
        .attr('r', finalRadius);

    circleYesClip.transition()
        .duration(duration)
        .ease(d3.easeBounce)
        .attr('r', finalRadius);
  })
};
