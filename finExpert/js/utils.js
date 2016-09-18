'use strict';

var Utils = (function() {
	var loadTemplate = function(targetSelector, filename) {
		$(targetSelector).load('templates/' + filename);
	};

	var loadTemplateText = function(targetSelector, filename, params) {
		$(targetSelector).load('templates/' + filename, function() {
			$('#navtext_backlink').attr('href', params.backLink);
			$('#navtext_title').text(params.title);
			$('#navtext_searchlink').attr('href', params.searchLink);
		});
	};

	var loadTemplateIcon = function(targetSelector, filename, activePage) {
		$(targetSelector).load('templates/' + filename, function() {
			if (activePage === 'home') {
				$('#navicon_home').addClass('active-icon');
			} else if (activePage === 'portfolio') {
				$('#navicon_portfolio').addClass('active-icon');
			}
		});
	};

	var publicAPI = {
		loadTemplate: loadTemplate,
		loadTemplateText: loadTemplateText,
		loadTemplateIcon: loadTemplateIcon
	}

	return publicAPI;
})();

