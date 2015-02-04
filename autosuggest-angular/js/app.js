(function(){
	var selectedResult = {
		"list": [
			{
				"ric": "005930.KS",
				"title": "Samsung Electronics Co Ltd"
			},
			{
				"ric": "601857.SS",
				"title": "PetroChina Co Ltd"
			},
			{
				"ric": "7203.T",
				"title": "Toyota Motor Corp"
			},
			{
				"ric": "BHP.AX",
				"title": "BHP Billiton Ltd"
			},
			{
				"ric": "SIEGn.DE",
				"title": "Siemens AG"
			},
			{
				"ric": "TRI.TO",
				"title": "Thomson Reuters Corp"
			}
		]
	};

	var dataSource = {
		"rics": [
			{
				"ric": "IBM.N",
				"subtitle": "Ordinary Share - New York Stock Exchange - IBM",
				"title": "International Business Machines Corp",
				"type": "EQ"
			},
			{
				"ric": "A",
				"subtitle": "Ordinary Share - NYSE Consolidated - A",
				"title": "Agilent Technologies Inc",
				"type": "EQ"
			},
			{
				"ric": "GOOGL.O",
				"subtitle": "Ordinary Share - NASDAQ Global Select Consolidated - GOOGL",
				"title": "Google Inc",
				"type": "EQ"
			},
			{
				"ric": "AAPL.O",
				"subtitle": "Ordinary Share - NASDAQ Global Select Consolidated - AAPL",
				"title": "Apple Inc",
				"type": "EQ"
			},
			{
				"ric": "0#CL:",
				"subtitle": "Crude Oil - Commodity Future - New York Mercantile Exchange (NYMEX)",
				"title": "NYMEX Light Sweet Crude Oil (WTI) Composite Energy Future Chain Contracts",
				"type": "COM"
			},
			{
				"ric": "0#WTI:",
				"subtitle": "Commodity Future - ROSARIO FUTURES EXCHANGE",
				"title": "ROFEX WTI Light Sweet Crude Oil Energy Future Chain Contract",
				"type": "COM"
			},
			{
				"ric": "THB=",
				"subtitle": "THOMSON REUTERS",
				"title": "US Dollar/Thai Baht FX Spot Rate",
				"type": "FX"
			},
			{
				"ric": "AUD=",
				"subtitle": "THOMSON REUTERS",
				"title": "Australian Dollar/US Dollar FX Spot Rate",
				"type": "FX"
			},
			{
				"ric": ".SPX",
				"subtitle": "US - Equity Index - MXP",
				"title": "S&P 500 Index",
				"type": "INDX"
			},
			{
				"ric": "0#USBMK=",
				"subtitle": "US BMK YC - THOMSON REUTERS",
				"title": "United States Government Benchmark Yield Curve",
				"type": "BMK"
			}
		]
	};

	var app = angular.module("autoSuggestApp",[]);

	app.factory('autoSuggestFactory', function(){
		var displayedRics = selectedResult;
		var currentPage = 0;
		var pageSize = 5;

		var addRic = function(ric){
			displayedRics.list.unshift(ric);
			return displayedRics;
		}
		var removeRic = function(i){
			displayedRics.list.splice(i, 1);
			return displayedRics;
		}
		var removeAllRics = function(){
			displayedRics = {"list":[]};
			return displayedRics;
		}
		var getDisplayedRics = function(){
			return displayedRics;
		}
		var isRicDup = function(ricnumber){
			var isDup = false,
				i = 0, 
				l = displayedRics.list.length;
			for (i=0; i<l;i++){
				if (displayedRics.list[i].ric === ricnumber){
					isDup = true;
					break;
				}
			}

			return {result: isDup, index: i};
		}
		var setPage = function(n){
			currentPage = n;
			return currentPage;
		}

		var getCurrentPage = function(){
			return currentPage;
		}

		var totalPages = function(){
			return Math.ceil(displayedRics.list.length/pageSize);
		}

		return {
			addRic: addRic,
			removeRic: removeRic,
			removeAllRics: removeAllRics,
			getDisplayedRics: getDisplayedRics,
			isRicDup: isRicDup,
			setPage: setPage,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			getCurrentPage: getCurrentPage
		}
	});

	app.controller('autoSugesstCtrl', ['$scope', 'autoSuggestFactory', function($scope, autoSuggestFactory){
		$scope.searchRic = function(){
			$scope.duplicateRicAlert = false;
			$scope.suggests = [];
			var stext = $scope.searchText.toLowerCase();
			//console.log(stext)
			for(var i=0,l=dataSource.rics.length;i<l;i++){
				if ((dataSource.rics[i].ric.toLowerCase().indexOf(stext) !== -1 || dataSource.rics[i].subtitle.toLowerCase().indexOf(stext) !== -1 || dataSource.rics[i].title.toLowerCase().indexOf(stext) !== -1 || dataSource.rics[i].type.toLowerCase().indexOf(stext) !== -1) && $scope.searchText.length > 0){
					$scope.suggests.push(dataSource.rics[i]);
				}
			}
			if($scope.suggests.length > 0){
				$scope.displaySearchBox = true;
				$scope.searchTextBox = "form-group";
			}else if ($scope.suggests.length === 0 && $scope.searchText.length === 0){
				$scope.displaySearchBox = false;
				$scope.searchTextBox = "form-group";
			}else{
				$scope.displaySearchBox = false;
				$scope.searchTextBox = "form-group has-error";
			}
		};

		$scope.addRic = function(ric, title){
			
			$scope.displaySearchBox = false;

			//check if ric dup
			var isDup = autoSuggestFactory.isRicDup(ric);
			if (isDup.result){
				//duplicate
				$scope.duplicateRicAlert = true;
				$scope.duplicateRic = ric;
			}else{
				//not duplicate
				autoSuggestFactory.addRic({"ric":ric, "title": title});
				autoSuggestFactory.setPage(0);
			}
		};

	}]);

	app.controller('selectedRicsCtrl', ['$scope', 'autoSuggestFactory', function($scope, autoSuggestFactory){
		$scope.displayedRics = autoSuggestFactory.getDisplayedRics();
		$scope.pageSize = autoSuggestFactory.pageSize;		

		$scope.currentPage = function(){
			return autoSuggestFactory.getCurrentPage();	
		}

		$scope.totalPages = function(){
			return autoSuggestFactory.totalPages();
		};

		$scope.setPage = function(){
			autoSuggestFactory.setPage(this.n);
		};

		$scope.nextPage = function(){
			var currentPage = $scope.currentPage();
			var totalPages = $scope.totalPages()-1;
			if (currentPage < totalPages)
				autoSuggestFactory.setPage(currentPage+1);
		};

		$scope.prevPage = function(){
			var currentPage = $scope.currentPage();
			if (currentPage > 0)
				autoSuggestFactory.setPage(currentPage-1);
		};

		$scope.removeRic = function(ric){
			var currentPage = $scope.currentPage();
			var isDup = autoSuggestFactory.isRicDup(ric);
			if (isDup.result){
				$scope.displayedRics = autoSuggestFactory.removeRic(isDup.index);
				if (currentPage >= $scope.totalPages())
					$scope.prevPage();
			}
		};

		$scope.isPrevShown = function(){
			return $scope.currentPage() == 0 ? "disabled" : "enabled";
		};

		$scope.isNextShown = function(){
			return $scope.currentPage() == $scope.totalPages()-1 ? "disabled" : "enabled";
		};

		$scope.hasRicToShow = function(){
			return $scope.displayedRics.list.length > 0
		};

		$scope.hasMoreThanOnePage = function(){
			return $scope.totalPages()>=1;
		};

		$scope.removeAllRics = function(ricnumber){
			$scope.displayedRics = autoSuggestFactory.removeAllRics();
		};

		$scope.range = function(end){
			var ret = [];
			for (var i=0;i<end;i++){
				ret.push(i);
			}
			return ret;
		};
	}]);


	app.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		}
	});

	app.filter('highlight', ['$sce', function($sce){
		return function(text, phrase){
			if (phrase) 
				text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>')

			return $sce.trustAsHtml(text)
		}
	}]);

})();
