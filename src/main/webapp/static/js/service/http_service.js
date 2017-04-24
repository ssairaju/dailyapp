'use strict';

var dailyApp = angular.module('dailyApp');

dailyApp.factory("httpService",['$http','Constants',function($http, Constants){
	var urlBase = Constants.URI;
	var validateUser = function(details) {
		return $http.post(urlBase+details.getUrl, details.getFormData).then(
				function(response) {
					return response.data;
				});
	}

	var getUserRegistrationData = function(details) {
		return $http.post(urlBase+details.getUrl, details.getUserSignUpData).then(
				function(response) {
					return response.data;
				});
	}

	var createReminder = function(details) {
		return $http.post(urlBase+details.getUrl, details.getReminderFormData).then(
				function(response) {
					return response.data;
				});
	}

	var getDashboardData = function(details) {
		return $http.get(urlBase+details.getUrl+'/'+details.userName).then(
				function(response) {
					return response.data;
				});
	}
	
	var getCategories = function(details) {
		return $http.get(urlBase+details.getUrl).then(
				function(response) {
					return response.data;
				});
	}

	var getTodo = function(details) {
		return $http.get(urlBase+details.getUrl+'/'+details.userName).then(
				function(response) {
					return response.data;
				});
	}
	
	var addTodo = function(details) {
		return $http.post(urlBase+details.getUrl, details.getTodoFormData).then(
				function(response) {
					return response.data;
				});
	}
	
	return {
		validateUser : validateUser,
		getUserRegistrationData : getUserRegistrationData,
		createReminder : createReminder,
		getDashboardData : getDashboardData,
		getCategories : getCategories,
		getTodo : getTodo,
		addTodo : addTodo,
	};
}]);

dailyApp.factory('Auth', function(){
	var user;
	return{
		setUser : function(aUser){
			user = aUser;
		},
		isLoggedIn : function(){
			return(user)? user : false;
		}
	}
})