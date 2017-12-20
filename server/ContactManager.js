'use strict';

const DatabaseUtility = require('../database/DatabaseUtility.js')

module.exports = class{

	constructor(){
		this.db = DatabaseUtility.Getdb();
	}


	AddContact(attribute,callback){
		this.db.query(
			"INSERT INTO CONTACT VALUE(" + 
			attribute['MemberId'] + "," + 
			attribute['ContactId'] + "," + 
			"'" + attribute['LastMessage'] + "'," + 
			"'" + attribute['Time'] + "');",
			function(err,result){
				callback(err,result);
			}
		);
	}

	UpdateContact(attribute,callback){
		this.db.query(
			"UPDATE CONTACT " + 
			"SET LastMessage='" + attribute['LastMessage'] + "',Time='" + attribute['Time'] + "' " + 
			"WHERE MemberId=" + attribute['MemberId'] + " AND ContactId=" + attribute['ContactId'] + ";",
			function(err,result){
				callback(err,result);
			}
		);
	}

	GetContactByMemberId(memberId,callback){
		this.db.query(
			"SELECT Name,ContactId,LastMessage,Time " + 
			"FROM CONTACT,MEMBER " + 
			"WHERE MemberId=" + memberId + " AND " + 
			"Id=ContactId " + 
			"ORDER BY Time DESC;",
			function(err,result){
				callback(err,result);
			} 
		)
	}

	IsInContact(memberId,contactId,callback){
		this.db.query(
			"SELECT * FROM CONTACT WHERE " + 
			"MemberId=" + memberId + " AND ContactId=" + contactId , 
			function(err,result){
				if(result.length === 1)
				{
					callback(err,true);
				}
				else if(result.length === 0)
				{
					callback(err,false);
				}
			}
		);
	}
}
