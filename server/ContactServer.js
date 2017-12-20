'use strict';

const ContactManager = require('./ContactManager.js');

module.exports = class{

	constructor(router){
		this.router = router;
		this.contactManager = new ContactManager();
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
					res.end(JSON.stringify({success:true,data:result}));
				}
			});
		});

	}
}