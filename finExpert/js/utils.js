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
			if (params.searchLink === undefined) {
				$('#navtext_searchlink').hide();
			} else {
				$('#navtext_searchlink').attr('href', params.searchLink);
			}
		});
	};

	var loadTemplateIcon = function(targetSelector, filename, activePage) {
		$(targetSelector).load('templates/' + filename, function() {
			if (activePage === 'home') {
				$('#navicon_home').addClass('active-icon');
			} else if (activePage === 'portfolio') {
				$('#navicon_portfolio').addClass('active-icon');
			} else if (activePage === 'search') {
				$('#navicon_search').addClass('active-icon');
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

	var tableViewOnTouch = function(rowsSelector) {
		$(rowsSelector).on('touchstart', function(e) {
			$(this).addClass('row-hover');
		}).on('touchmove', function(e) {
			$(this).removeClass('row-hover');
		}).on('touchend', function(e) {
			if (this.classList.contains('row-hover')) {
				$(this).removeClass('row-hover');
				var targetLink = this.getAttribute('data-link-file');
				if (targetLink) {
					window.location = window.location.origin + '/' + targetLink;
				}
			}
		});
	}

	var publicAPI = {
		loadTemplate: loadTemplate,
		loadTemplateText: loadTemplateText,
		loadTemplateIcon: loadTemplateIcon,
		getUrlVars: getUrlVars,
		tableViewOnTouch: tableViewOnTouch
	}

	return publicAPI;
})();

