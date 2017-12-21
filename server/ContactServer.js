'use strict';

const ContactManager = require('./ContactManager.js');

module.exports = class{

	constructor(router,keyCenter){
		this.router = router;
		this.contactManager = new ContactManager();
		this.keyCenter = keyCenter;
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		self.router.get('/',function(req,res){
			if(req.user === undefined)
			{
				res.end(JSON.stringify({success:false,reason:"user id is undefined"}));
			}
			self.contactManager.GetContactByMemberId(req.user,function(err,result){
				if(err)
				{
					//console.log(err);
				}
				else
				{
					var resultMessage = JSON.stringify(result);
					var encryptMessage = self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage); 
					res.end(JSON.stringify({success:true , data:self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage)}));
				}
			});
		});

	}
}