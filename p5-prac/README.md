# Getting Started

This README applies specifically to the `p5-prac` node project.

Clone the repo.

```
git clone https://github.com/nduckwiler/prac.git
```

You must have an internet connection to interact with the sketches in this repo.

# How to use p5-prac
```
p5-prac/
|-- empty-example/
    |-- index.html
    |-- sketch.js
|-- borders/
    |-- index.html
    |-- sketch.js
|-- ...
```

Each subdirectory contains an `index.html` and a `sketch.js`. Open `index.html` in a browser to interact with each sketch. You can do this by double-clicking the file in your file explorer or using the command-line commands `cd` and `open`. To interact with the `borders` sketch use:
```
cd borders
open index.html
```

# How to work offline

Download the [complete p5 library](https://p5js.org/download/).

Add the `p5.min.js` file and `addons` directory to `p5-prac`. Your directory will look like this (give or take a few files):
```
p5-prac/
|-- p5.min.js
|-- addons/
    |-- p5.dom.min.js
    |-- p5.sound.min.js
|-- empty-example/
    |-- index.html
    |-- sketch.js
|-- borders/
    |-- index.html
    |-- sketch.js
|-- ...
```

For the sketches you are working on, delete these tags in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.js"></script>
```

And replace them with these:
```html
<script src="../p5.min.js"></script>
<script src="../addons/p5.dom.js"></script>
<script src="../addons/p5.sound.js"></script>
```

# Sources

- The [p5 website](https://p5js.org)
- Dan Shiffman's [p5.js tutorials](http://wykhuh.github.io/shiffman-p5-tutorials/)
- [SVG colors](http://www.december.com/html/spec/colorsvg.html): the color names defined by the SVG specification
