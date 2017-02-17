var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav']);

app.controller('DashBoardController', ['$scope', '$http', '$q', '$interval', function ($scope, $http, $q, $interval) {
    $scope.gridOptions = { enableColumnMenus: false };
    $scope.gridOptions.columnDefs = [
      { field: 'name', editableCellTemplate: false, displayName: 'Student Name', width: 200 },
      { field: 'score', editableCellTemplate: false, displayName: 'Marks Secured', type: 'number', width: 200 },
      {
          field: 'grade', editableCellTemplate: true, displayName: 'Grade',
          cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
              if (grid.getCellValue(row, col).toLowerCase() === 'min') {
                  return 'red';
              }
          }
      },
      , {
          name: 'Delete', editableCellTemplate: true,
          cellTemplate: '<button  ng-click="grid.appScope.delete(row)">Delete</button>'
      }
    ];
    $scope.studentdata = [
          {
              name: 'Anshu',
              score: 80,
              grade: 'Max'
          }
    ]
    
    $scope.setlocalstorage = function () {
        if (localStorage.getItem('studentdetails') == null) {
            localStorage.setItem('studentdetails', JSON.stringify($scope.studentdata));
            $scope.gridOptions.data = $scope.studentdata;
        }
        else {
            $scope.gridOptions.data = JSON.parse(localStorage.getItem('studentdetails'));
            $scope.studentdata = JSON.parse(localStorage.getItem('studentdetails'));
        }

    };

    $scope.student = {};

    $scope.save = function () {
        var student = angular.copy($scope.student);
        var grade = '';
        if (student.score >= 75)
            grade = 'Max';
        else if (student.score > 65 && student.score < 75)
            grade = 'Average';
        else
            grade = 'Min';
        student.grade = grade;
        $scope.studentdata.push(student);
        $scope.gridOptions.data = $scope.studentdata;
        localStorage.setItem('studentdetails', JSON.stringify($scope.studentdata));
        $scope.student = {};
    };
    $scope.delete = function (row) {
        var index = $scope.gridOptions.data.indexOf(row.entity);
        $scope.studentdata.splice(index, 1);
        localStorage.setItem('studentdetails', JSON.stringify($scope.studentdata));
    };

    $scope.saveRow = function (rowEntity) {
        var index = $scope.gridOptions.data.indexOf(rowEntity);
        $scope.studentdata.splice(index, 1);
        $scope.studentdata.push(rowEntity)
        localStorage.setItem('studentdetails', JSON.stringify($scope.studentdata));
        var promise = $q.defer();
        $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };



}]);
