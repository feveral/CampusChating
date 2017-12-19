'use strict';
var MessageManager = require('./MessageManager.js');
const path = require('path');
const url = require('url');

module.exports = class{

	constructor(router){
		this.router = router;
		this.messageManager = new MessageManager();
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		
		self.router.get('/:Id',function(req,res){
			console.log("QJOIWDH");
			console.log(req.user);
			var Id = path.basename(req.url);
			console.log(Id);
			self.messageManager.GetMessage(104820011,104820004,function(err,result){
				if (err)
				{
					console.log(err);
				} 
				else
				{
					console.log("success");
					res.end(JSON.stringify({success:true , data:result}));
				}
			});
		});
	}
}