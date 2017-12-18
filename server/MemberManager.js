'use strict';

const DatabaseUtility = require('../database/DatabaseUtility.js')

module.exports = class MemberManager{

	constructor(){
		this.db = DatabaseUtility.Getdb();
	}

	AddCustomer(attribute,callback){
		this.db.query(
			"INSERT INTO MEMBER " +
			"(Name,MemberType,Email,Password)" +
			"VALUES ( " + 
			"'" + attribute['Name'] +  "' , " + 
			"'" + "Customer" + "' , " +  
			"'" + attribute['Email'] + "' , " +  
			"'" + attribute['Password'] + "' ); ",
			function(err,result){
				callback(err,result);
			}  
		);
	}
}
