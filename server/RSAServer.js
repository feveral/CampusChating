'use strict';

var RSAManager = require('./RSAManager.js');

module.exports = class{

	constructor(router){
		this.rsaManager = new RSAManager();
		this.router = router;
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		self.router.get('/getPublicKey',function(req,res){
			var publicKey = self.rsaManager.GetPublicKey(); 
			res.end(JSON.stringify({success:true , data:publicKey}));
		});
	}
}