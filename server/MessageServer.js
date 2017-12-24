'use strict';
var MessageManager = require('./MessageManager.js');
const path = require('path');
const url = require('url');

module.exports = class{

	constructor(router,keyCenter){
		this.router = router;
		this.messageManager = new MessageManager();
		this.keyCenter = keyCenter;
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		
		self.router.get('/:Id',function(req,res){
			var Id = path.basename(req.url);
			self.messageManager.GetMessage(req.user,Id,function(err,result){
				if (err)
				{
					console.log(err);
				} 
				else
				{
					var resultMessage = JSON.stringify(result);
					var encryptMessage = self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage) 
					res.end(JSON.stringify(
						{
							success:true , 
							data:self.keyCenter.GetAesManagerByMemberId(req.user).Encrypt(resultMessage)
						}
					));
				}
			});
		});
	}
}