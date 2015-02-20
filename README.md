# jquery.ellipsis

jquery.ellipsis - a simple jquery plugin for multi-line text

## Demo

http://jsfiddle.net/scarnett/o9ezn6oa/

## Installation

Load the stylesheet
```html
<head>
	...
	<link href="ellipsis.css" rel="stylesheet" type="text/css" />
	...
</head>
```

Load the javascript
```html
<body>
	...
	<script type="text/javascript" src="jquery.ellipsis.js"></script>
</body>
```

Create a DOM element and put some text in the ellipsis wrapper
```html
<div class="ellipsisWrapper">Some text</div>
```

## Usage:

```javascript
$('.ellipsesWrapper').ellipses();
```

## Options:

Here is list of available options

| Option | Default | Type | Description
|--------|---------|------|------------
| `container` | `body` | string | The ellipsis overlay container
| `timeout` | `600` | int | The time in milliseconds to delay before showing the full text

## Changelog

`1.0.1` / `02.19.2015`

- Made the container configurable
- Bug fixes

`1.0.0` / `01.29.2015`

- Plugin release

## License:
Copyright (c) 2015 Scott Carnett  
Licensed under the [The MIT License](http://opensource.org/licenses/MIT)