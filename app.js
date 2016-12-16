(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ]);

} ());

(function () {
    'use strict';

    angular
        .module('app')
        .config(ConfigConfig)

    function ConfigConfig($routeProvider) {
        $routeProvider
            .when("/", {
                controller: 'HomeController',
                templateUrl: 'home.html',
                controllerAs: '$ctrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }

} ());

(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', ControllerCtrl)

    function ControllerCtrl($http) {
        var vm = this;
        vm.title = "";
        vm.employee = "";
        vm.employees = "";
        vm.emp = "";

        init();

        //calculating Age from dateString
        vm.calculateAge = function (dateString) {
            var birthday = +new Date(dateString);
            return ~~((Date.now() - birthday) / (31557600000));
        }

        //loading employees
        function init() {
            vm.title = "Welcome to Employee Management System";

            console.log("loading employees...");

            $http.get('/employees').then(successFun, errorFun);
            function successFun(response) {
                vm.employees = response.data;
                vm.employee = "";
            };
            function errorFun(response) { alert("Error while loading employees...") }
        }

        //editing employee details
        vm.editEmployee = function (employee) {
            console.log("editing employee details");

            vm.employee = employee;

            vm.employee.dob = new Date(employee.dob);
        }

        //updating employee details
        vm.updateEmployee = function (employee) {
            console.log("updateEmployee");

            var date = new Date(employee.dob);
            var da = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            employee.age = vm.calculateAge(employee.dob);

            $http.put('/employee/' + employee._id, employee).then(successFun, errorFun);
            function successFun(response) {
                //alert("Employee updated successfully")
                init();
            };
            function errorFun(response) { alert("Error while updating employee details...") };

        }

        //removing employee record
        vm.removeEmployee = function (id) {
            console.log("removing employee record");

            $http.delete('/employee/' + id).then(successFun, errorFun);
            function successFun(response) {
                init();
                //alert("Employee removed successfully")
            };
            function errorFun(response) { alert("Error while removing employee details...") };
        }

        //adding new employee
        vm.addEmployee = function (emp) {
            console.log("adding employee details to db");

            var date = new Date(emp.dob);
            var da = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

            var employeeData = {
                name: emp.name,
                email: emp.email,
                dob: da,
                age: vm.calculateAge(emp.dob),
                gender: emp.gender,
                department: emp.department
            }

            $http.post('/employee', employeeData).then(successFun, errorFun);
            function successFun(response) {
                init();
                //alert("Employee added successfully")
            };
            function errorFun(response) { alert("Error while adding employee details...") };
        }

    }

} ());