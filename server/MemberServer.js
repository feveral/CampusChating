'use strict';
var MemberManager = require('./MemberManager.js');
const path = require('path');
const url = require('url');

module.exports = class{

	constructor(router,keyCenter){
		this.router = router;
		this.memberManager = new MemberManager();
		this.keyCenter = keyCenter;
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		
		self.router.get('/',function(req,res){
			self.memberManager.GetAllMember(function(err,result){
				var resultMessage = JSON.stringify(result);
				var encryptMessage = self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage); 
				res.end(JSON.stringify({success:true , data:self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage)}));
			}); 
		});

		self.router.get('/:Id',function(req,res){
			var Id = path.basename(req.url);
			self.memberManager.GetMemberFromId(Id,function(err,result){
				res.end(JSON.stringify({success:true , data:result}));
			}); 
		});
	}
}