'use strict';

var DatabaseUtility = require('./DatabaseUtility.js');
var MessageManager = require('../server/MessageManager.js');
var messageManager = new MessageManager();

messageManager.AddMessage(
	{
		SenderId: 104820004,
		Message:"joh860829nny@gmail.com",
		ReceiverId: 104820011,
		Time: "2017-12-20 15:30:20"
	},
	DatabaseUtility.callback
);
