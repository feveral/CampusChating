'use strict';

const DatabaseUtility = require('../database/DatabaseUtility.js');
const ContactManager = require('./ContactManager.js');

module.exports = class MemberManager{

	constructor(){
		this.db = DatabaseUtility.Getdb();
		this.ContactManager = new ContactManager();
	}

	AddMember(attribute,callback){
		this.db.query(
			"INSERT INTO MEMBER " +
			"VALUES ( " + 
			"'" + attribute['Id'] +  "' , " + 
			"'" + attribute['Name'] +  "' , " + 
			"'" + attribute['Email'] + "' , " +  
			"'" + attribute['Password'] + "' ); ",
			function(err,result){
				callback(err,result);
			}  
		);
	}

	GetAllMember(callback){
		this.db.query(
			"SELECT * FROM MEMBER;",
			function(err,result){
				callback(err,result);				
			}
		);
	}

	GetMemberFromId(memberId,callback){
		this.db.query(
			"SELECT * " + 
			"FROM MEMBER " +  
			"WHERE Id=" + "'" + memberId + "'" + ";",
			function(err,result){
				callback(err,result[0]);
			}
		);
	}

	IsSignInCorrect(memberId,password,callback){

		this.GetMemberFromId(memberId,function(err,result){
			var member = result;
			if(!result)
			{
				callback(err,{success:false,user:result});
			}
			else if(result.Password === password)
			{
				callback(err,{success:true,user:result})
			}
			else
			{
				callback(err,{success:false,user:result});
			}
		});
	}
}
