'use strict';

var Utils = (function() {
	var loadTemplate = function(targetSelector, filename) {
		$(targetSelector).load('templates/' + filename);
	};

	var loadTemplateText = function(targetSelector, filename, params) {
		$(targetSelector).load('templates/' + filename, function() {
			if (params.backLink === 'jsback') {
				$('#navtext_backicon').on('click', function(e) {
					e.preventDefault();
					window.history.back();
				});
			} else if (params.backLink === undefined) {
				$('#navtext_backicon').hide();
			}

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

	var getUrlVars = function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	var publicAPI = {
		loadTemplate: loadTemplate,
		loadTemplateText: loadTemplateText,
		loadTemplateIcon: loadTemplateIcon,
		getUrlVars: getUrlVars
	}

	return publicAPI;
})();

