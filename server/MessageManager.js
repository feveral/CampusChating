'use strict';

const DatabaseUtility = require('../database/DatabaseUtility.js');
const ContactManager = require('./ContactManager.js');

module.exports = class MessageManager{

	constructor(){
		this.db = DatabaseUtility.Getdb();
		this.contactManager = new ContactManager();
	}

	AddMessage(attribute,callback){
		var self = this; 
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

		// 加入聯絡人資料 沒有資料就新增 有資料就更新
		this.contactManager.IsInContact(attribute['SenderId'],attribute['ReceiverId'],function(err,result){
			if(result)
			{
				attribute['MemberId'] = attribute['SenderId'];
				attribute['ContactId'] = attribute['ReceiverId'];
				attribute['LastMessage'] = attribute['Message'];
				self.contactManager.UpdateContact(attribute,function(err,result){if(err)console.log(err)});
				attribute['MemberId'] = attribute['ReceiverId'];
				attribute['ContactId'] = attribute['SenderId'];
				self.contactManager.UpdateContact(attribute,function(err,result){if(err)console.log(err)});
			}
			else
			{
				attribute['MemberId'] = attribute['SenderId'];
				attribute['ContactId'] = attribute['ReceiverId'];
				attribute['LastMessage'] = attribute['Message'];
				self.contactManager.AddContact(attribute,function(err,result){if(err)console.log(err)});
				attribute['MemberId'] = attribute['ReceiverId'];
				attribute['ContactId'] = attribute['SenderId'];
				self.contactManager.AddContact(attribute,function(err,result){if(err)console.log(err)});
			}
		});
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
				callback(err,result);
			}  
		);
	}
}
