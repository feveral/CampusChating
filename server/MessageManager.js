'use strict';

const DatabaseUtility = require('../database/DatabaseUtility.js')

module.exports = class MessageManager{

	constructor(){
		this.db = DatabaseUtility.Getdb();
	}

	AddMessage(attribute,callback){
		this.db.query(
			"INSERT INTO MESSAGE " +
			"(SenderId,Message,ReceiverId,Time)" +
			"VALUES ( " + 
			"" + attribute['SenderId'] +  " , " + 
			"'" + attribute['Message'] +  "' , " +  
			"" + attribute['ReceiverId'] + " , " +  
			"'" + attribute['Time'] + "' ); ",
			function(err,result){
				callback(err,result);
			}  
		);
	}
}
