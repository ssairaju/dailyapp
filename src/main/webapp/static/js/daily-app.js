'use strict';

var dailyApp = angular.module('dailyApp',['ngRoute']);

dailyApp.config(function($routeProvider,$httpProvider,$locationProvider){
	$routeProvider.when("/login",{
		templateUrl:"view/login.html",
		controller:"dailyappctrl"
	}).when("/home",{
		templateUrl:"view/home.html",
		controller:"dailyappctrl"
	}).when("/reminder",{
		templateUrl:"view/reminders.html",
		controller:"dailyappctrl"
	}).when("/todo",{
		templateUrl:"view/todo.html",
		controller:"dailyappctrl"
	}).when("/signup",{
		templateUrl:"view/signup.html",
		controller:"dailyappctrl"
	}).when("/main",{
		templateUrl:"view/main.html",
		controller:"dailyappctrl"
	}).when("/profile",{
		templateUrl:"view/profile.html",
		controller:"dailyappctrl"
	}).when("/settings",{
		templateUrl:"view/settings.html",
		controller:"dailyappctrl"
	}).otherwise({
		redirectTo : "/login"
	});

});