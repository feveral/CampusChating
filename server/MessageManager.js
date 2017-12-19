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

	GetMessage(SenderId,ReceiverId,callback){
		this.db.query(
			"SELECT * FROM MESSAGE " +
			"WHERE (SenderId = " +
			SenderId + 
			" AND " + 
			"ReceiverId=" +  
			ReceiverId + " ) " +  
			"OR" + 
			"(SenderId =" + 
			ReceiverId  +
			" AND " + 
			"ReceiverId=" +  
			SenderId + ");",
			function(err,result){
				console.log(result);
				callback(err,result);
			}  
		);
	}
}
