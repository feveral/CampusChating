'use strict';
var RSAManager = require('./RSAManager.js');
var AESManager = require('./AESManager.js');
var KeyCenter = require('./KeyCenter.js');

module.exports = class{

	constructor(router){
		this.router = router;
		this.keyCenter = new KeyCenter();
		this.rsaManager = this.keyCenter.GetRsaManager();
		this.aesManager = new AESManager();
		this.SetAPI();
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

		this.router.get('/a',function(req,res){
			res.end("aqwrdefrewqt");
		})		
	}
}