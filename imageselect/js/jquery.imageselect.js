/*!
 * jQuery Image Selector Plugin
 * version: 0.7.1 (11-APR-2012)
 * @requires jQuery v1.7 or later
 *
 * Dual licensed under the MIT and GPL licenses:
 *    
 *    
 */
(function($) {
	var methods = {
		init: function(options) {
			var defaults = {
				rows: []
				, createRow : createRow
				, maxImageWidth: 100
				, maxImageHeight: 75 // maxImageWidth * (3/4)				
			};
			var options = $.extend(defaults, options);
			return this.each(function() {
				var o = options;
				o.precomputedImageStyle = " style='max-width: " + options.maxImageWidth + ";";
				o.precomputedImageStyle+= "max-height: " + options.maxImageHeight + ";' ";
				$.data(this, "options", o);
				createDataRows(this, o.rows);
			});
		}
		, setRows: function(data) {
			var obj = (this.length) ? this[0] : this;
			
			clearRows(obj);
			createDataRows(obj, data);
		}
		, clearRows: function() {
			clearRows(this);
		}, getSelected: function() {
			var selectedRow = getSelectedRow($(this));
			if(selectedRow) {
				return selectedRow.data("rowData");
			}
			else {
				return null;
			}
		}
	};
	
	function isSelectable(rowData) {
		return true;
	}
	
	function createRow(options, rowData) {
		var name = rowData.label ? rowData.label : rowData;
		var imageSrc = rowData.src ? rowData.src : rowData;
		var image = "<img src='" + imageSrc + "' class='is-image'";
		if(rowData.width && rowData.height) {
			var width = rowData.width;
			var height = rowData.height;
			var ratio = width / height;
			var isWidthLonger = width > height;
			debug(rowData);
			if(isWidthLonger && width > options.maxImageWidth) {
				width = options.maxImageWidth;
				height = width * (1/ratio);
			}
			else if(height > options.maxImageHeight) {
				height = options.maxImageHeight;
				width = height * ratio;
			}
			debug({width: width, height: height, ratio: ratio, widthLonger: isWidthLonger});
			image+= " width='" + width + "' ";
			image+= " height='" + height + "' ";
		}
		else {
			image+= options.precomputedImageStyle;
		}
		image+= "/>";
		var row = $("<div><span>" + image + "</span><p>" + name + "</p></div>");
		
		return row;
	}
	
	function clearRows($obj) {
		$($obj).children().remove();
	}
	
	function createDataRows($obj, data) {
		debug($obj);
		
		var element = $($obj);
		var elementOptions = $.data($obj).options;
		$.each(data, function(index, value) {
			var newRow = elementOptions.createRow(elementOptions, value);
			$.data(newRow[0], "rowData", value);
			newRow.click(row_onClick);
			element.append(newRow);
		});
	}
	
	function getSelectedRow($obj) {
		var currentlySelected = $obj.children();
		var selectedItem = null;
		$.each(currentlySelected, function(index, value){
			var currentRow = $(value);
			if(currentRow.hasClass("is-selected")) {
				selectedItem = currentRow;
			}
		});
		return selectedItem;
	}
	
	function selectRow(row, rowData) {
		var rowElement = $(row);
		var isSelectedItem = rowElement.hasClass("is-selected");
		if(isSelectedItem) {
			rowElement.removeClass("is-selected");
			return null;
		}
		var parent = rowElement.parent();
		
		var currentlySelected = parent.children();
		$.each(currentlySelected, function(index, value){
			var currentRow = $(value);
			if(currentRow.hasClass("is-selected")) {
				currentRow.removeClass("is-selected");
			}
		});
		rowElement.addClass("is-selected");
		return rowData;
	}
	
	function fireOnSelected(row, rowData) {
		var parentOptions = $(row).parent().data().options;
		$(row).parent().trigger("selected", [row, rowData]);
	}
	
	function row_onClick(e) {
		var rowData = $.data(e.currentTarget).rowData;
		if(isSelectable(rowData)) {
			var selectData = selectRow(e.currentTarget, rowData);
			var isUnselect = selectData == null;
			fireOnSelected(e.currentTarget, selectData);
		}
		else {
			// Do nothing, row is not selectable
		}
		e.preventDefault();
	}
	
	function debug(message) {
	    if (window.console && window.console.log)
	      window.console.log(message);
	  };
	
	$.fn.imageselect = function(method) {
		if ( methods[method] ) {
		    return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		    return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.imageselect' );
		}  
	};
})(jQuery);