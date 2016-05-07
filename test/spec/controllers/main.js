'use strict';

describe('Controller: DebtListCtrl', function () {

  // load the controller's module
  beforeEach(module('homeApp'));

  var DebtListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DebtListCtrl = $controller('DebtListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have an edit function', function () {
    expect(DebtListCtrl.editDebt).toBeDefined();
  });

  it('should have an alternate edit function, for DDS', function () {
    expect(DebtListCtrl.editDebtDDS).toBeDefined();
  });

  it('should have a delete function', function () {
    expect(DebtListCtrl.deleteDebt).toBeDefined();
  });
});

describe('Controller: DebtDetailCtrl', function () {
  // load the controller's module
  beforeEach(module('homeApp'));

  var DebtDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DebtDetailCtrl = $controller('DebtDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have a create function', function () {
    expect(DebtDetailCtrl.createDebt).toBeDefined();
  });

  it('should have an alternate create function, via LS agent', function () {
    expect(DebtDetailCtrl.createDebtAgent).toBeDefined();
  });

  it('should have an update function', function () {
    expect(DebtDetailCtrl.updateDebt).toBeDefined();
  });
});
