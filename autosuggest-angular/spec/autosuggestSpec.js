describe('autoSuggestApp', function() {

	beforeEach(module('autoSuggestApp'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('autoSuggestApp::selectedRicsCtrl', function() {
		
		var $scope, controller;

		beforeEach(function() {
			$scope = {};
			controller = $controller('selectedRicsCtrl', { $scope: $scope });
		});
		// critical
		it('should have selectedRicsCtrl', function(){
			expect(controller).toBeDefined();
		});
	    it('ensures that there are 5 predefined RICs at the beginning', function() {
	    	expect($scope.predefinedRics.list.length).toEqual(6);
	    });
	    it('ensures that a RICs will be removed if user click X', function() {});

	    // nice-to-haves
	    it('ensure client-side helper shown for empty fields', function() { });
	    it('ensure hitting enter on password field submits form', function() { });
	});
});