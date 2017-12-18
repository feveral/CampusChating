'use strict';

var DatabaseUtility = require('./DatabaseUtility.js');
var MemberManager = require('../server/MemberManager.js');
var memberManager = new MemberManager();

memberManager.AddMember(
	{
		Id: "104820004",
		Name:"胖虎",
		Email:"joh860829nny@gmail.com",
		Password:"AA5566",
	},
	DatabaseUtility.callback
);

memberManager.AddMember(
	{
		Id: "104820011",
		Name:"宗翰",
		Email:"feveraly@gmail.com",
		Password:"5566",
	},
	DatabaseUtility.callback
);
