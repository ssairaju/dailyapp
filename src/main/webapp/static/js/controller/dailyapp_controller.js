'use strict';

var dailyApp = angular.module('dailyApp');

dailyApp.controller('dailyappctrl',["$scope","httpService","$location","$window","Auth",
                             function($scope,httpService,$location,$window,Auth){

	/*To Validate the User*/
	$scope.validateuser=function(){
		var uname=$scope.username;
		var pass=$scope.password;
		var formdata={
				userName:uname,
				password:pass
		};
		var details={
				getUrl:"app/isvalid",
				getFormData:formdata
		};
		Auth.setUser(uname);
		httpService.validateUser(details).then(onSuccessRetrival, onError);
	};

	var onSuccessRetrival = function(data) {
		$window.localStorage.setItem("uname",data.userName);
		$location.path('/home');
	};

	var onError = function(reason) {
		$scope.errorLogin="Invalid Login";
	};

	/*To display Logged in User*/
	$scope.$watch(Auth.isLoggedIn,function(newValue,oldValue){
		$scope.logged=$window.localStorage.getItem("uname");
		console.log($scope.logged+"**");

		/*if(!newValue && !oldValue) {
			$location.path('/login');
		}*/
	}, true);

	/*To Register the User*/
	$scope.register=function(){
		var fname=$scope.firstName;
		var lname=$scope.lastName;
		var email=$scope.email;
		var pass=$scope.password;
		var userregistrationdata={
				firstName:fname,
				lastName:lname,
				email:email,
				password:pass
		};
		var userdetails={
				getUrl:"app/registerUser",
				getUserSignUpData:userregistrationdata
		};

		httpService.getUserRegistrationData(userdetails).then(
				onSuccessRegistration, onRegistrationError);
	};

	var onSuccessRegistration = function(data) {
		$scope.success="TDA Account Created Successfully." ;
		$location.path('/signup');
	};

	var onRegistrationError = function(reason) {
		$scope.errorReg="User name Already Exist.";
	};

	/*To create remainder*/

	$scope.createReminder=function(){
		var reminderformdata={
				"title":$scope.title,
				"text":$scope.text,
				"userName":$scope.logged
		};
		var details={
				getUrl:"app/createReminder",
				getReminderFormData:reminderformdata
		};

		httpService.createReminder(details).then(onSuccessReminder, onErrorReminder);
	};
	var onErrorReminder = function(reason) {
		alert("Reminder is not added..");

	};

	var onSuccessReminder = function(data) {
		alert("Reminder Added");
		$location.path('/home');
	};

	//To Fetch Daily Activity List		 

	$scope.getReminders = function(){
		console.log("getAllReminders**");
		var details={
				getUrl:"app/getReminders",
				userName:$scope.logged

		};
		httpService.getDashboardData(details).then(remindersuccess, reminderfailure);
	};

	var remindersuccess = function successCallback(data) {
		$scope.success="Successfully." ;
		$scope.ReminderList=data;
	};

	var reminderfailure = function errorCallback(reason) {
		alert('Not Able to Fetch Reminder');
	};

	/* Drop down values - master data*/
	$scope.getCategories = function(){
		console.log("getCategories**");
		var details={
				getUrl:"app/getCategories"
		};
		httpService.getCategories(details).then(catsuccess, catfailure);
	};

	var catsuccess=function successCallback(data) {
		$scope.catsuccessmsg="Successfully retrived categories." ;
		$scope.categoryList=data;
	};

	var catfailure=function errorCallback(reason) {
		alert('Not Able to Fetch categories');
	};

	$scope.getCategories();
	/*To show reminder details*/
	$scope.reminderClick=function(item){
		$scope.content=item.text;

	};

	$scope.getTodoList = function(){
		console.log("getTodoList**");
		var details={
				getUrl:"app/getTodo",
				userName:$scope.logged
		};
		httpService.getTodo(details).then(todosuccess, todofailure);
	};

	var todosuccess=function successCallback(data) {
		$scope.todosuccmsg="Successfully retrived todo list.**";
		$scope.userTodoList=data;
		console.log("After Successfully retrived todo list.**"+ $scope.userTodoList.length);
	};

	var todofailure=function errorCallback(reason) {
		alert('Not Able to Fetch user todo list');
	};

	/* todo Page */
	$scope.addTask = function() {
		var todoformdata={
				name : $scope.mtask,
				category : $scope.category,
				userName:$scope.logged
		};
		var tododetails={
				getUrl:"app/addTodo",
				getTodoFormData:todoformdata
		};
		httpService.addTodo(tododetails).then(todoaddsuccess, todoaddfailure);
	};

	var todoaddsuccess=function successCallback(data) {
		$scope.todoaddsuccessmsg="Successfully addedd todo task." ;
		$scope.taskForm.mtask.$setPristine(true); // Reset input value
		$scope.taskForm.category.$setPristine(true); // Reset input value
		$scope.mtask = '';
		$scope.category = '';
	};

	var todoaddfailure=function errorCallback(reason) {
		alert('Not Able to add todo task');
	};

	$scope.removeTask = function(index) {
		$scope.todoDetails.splice(index, 1)
	};

	$scope.markDone = function(index) {
		$scope.todoDetails[index] = {
				task : $scope.todoDetails[index].task,
				category : $scope.todoDetails[index].category,
				done : true,
				status : true
		};
	};

	$scope.isActive = function (selectedTab) { 
		return selectedTab === $location.path();
	};

	$scope.navbar = './view/main.html';
	$scope.home=function(){
		$location.path('/home');
	};
	$scope.reminder=function(){
		$location.path('/reminder');
	};
	$scope.todo=function(){
		$location.path('/todo');
	};
}
]);

(function() {
	angular.module('dailyApp')
	.controller('passwordCtlr', function($scope) {})
	.filter('passwordCount', [function() {
		return function(value, peak) {
			value = angular.isString(value) ? value : '';
			peak = isFinite(peak) ? peak : 7;
			return value && (value.length > peak ? peak + '+' : value.length);
		};
	}])

	.factory('myPwd', [function() {
		return {
			score: function() {
				var compute = datpwd.apply(null, arguments);
				return compute && compute.score;
			}
		};
	}])

	.directive('okPassword', ['myPwd', function(password) {
		return {
			// restrict to only attribute and class
			restrict: 'AC',
			// use the NgModelController
			require: 'ngModel',
			// add the NgModelController as a dependency to your link function
			link: function($scope, $element, $attrs, ngModelCtrl) {
				$element.on('blur change keydown', function(evt) {
					$scope.$evalAsync(function($scope) {
						// update the $scope.password with the element's value
						var pwd = $scope.password = $element.val();
						// resolve password strength score using datpwd service
						$scope.passwordStrength = pwd ? (pwd.length > 7 && password.score(pwd) || 0) : null;
						// define the validity criterion for okPassword constraint
						ngModelCtrl.$setValidity('okPassword', $scope.passwordStrength >= 2);
					});
				});
			}
		};
	}]);

})();