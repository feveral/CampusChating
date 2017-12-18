'use strict';
var RSAManager = require('./RSAManager.js');

module.exports = class{

	constructor(router){
		this.router = router;
		this.rsaManager = new RSAManager();
		this.SetAPI();
	}

	SetAPI(){
		var self = this;

		self.router.post('/',function(req,res){
			var enc = (self.rsaManager.Encrypt("123"));
			console.log(self.rsaManager.Encrypt("123"));
			console.log(self.rsaManager.Decrypt(enc));
			console.log(self.rsaManager.Decrypt(req.body.key));
		});
	}
}