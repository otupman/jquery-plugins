imageselect - jquery.imageselect.js
=============
I found I needed a way of allowing a user to select from a list of images. 
The majority of the solutions I could find involved a drop-down box or a
lighbox-esque gallery selection.

The entire thing works on a simple MVC principle - you provide data, the
control does some rendering and provides you with events, you do stuff
with the events. The intention is to allow you to hook into each stage
to do custom stuff (i.e. rendering) if you want.

I'm a little dubious that this will work entirely well as it's my first 
jQuery plugin :)

Features
=============
* Multiple data formats
	- Simple: just an image URL - it will display the image and the filename
	- Specific object: must contain label (the lable to display) and src
	  (the URL of the image). Other properties are permitted but not used
	- Anything: override the createDataRow() function to provide custom data
	  objects and rendering them any which way (no guarantee this works atm)
* Automatic longest-length resizing - specify a max width and/or height (default
is 100px for either dimension) and it will auto-resize (via the browser)

Usage
=============

The HTML
-------------
	<style>
		@import "css/jquery.imageselect.css";
	</style>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.imageselect.js"></script>
	<div id="imageSelect" class="imageselect"></div>

The JavaScript
-------------
	$("#imageSelect").imageselect({
		rows: [/* Array of data */]
		, createRow: function(options, rowData) {
			// return a jQuery constructed representation of your data row
		}
		, maxImageWidth: 1000 // max image width of 1000px
		, maxImageHeight: 100 // max image height of 100px
	});