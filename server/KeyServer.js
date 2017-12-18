'use strict';
var RSAManager = require('./RSAManager.js');
var AESManager = require('./AESManager.js');

module.exports = class{

	constructor(router){
		this.router = router;
		this.rsaManager = new RSAManager();
		this.aesManager = new AESManager();
		this.SetAPI();
	}

	GetAesManager(){
		return this.aesManager();
	}

	SetAPI(){
		var self = this;
		
		self.router.get('/getPublicKey',function(req,res){
			var publicKey = self.rsaManager.GetPublicKey(); 
			res.end(JSON.stringify({success:true , data:publicKey}));
		});

		self.router.post('/aesKey',function(req,res){
			var decrypt = self.rsaManager.Decrypt(req.body.key);
			var aesKey = JSON.parse(decrypt);
		});
	}
}