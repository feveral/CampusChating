'use strict';
var RSAManager = require('./RSAManager.js');
var AESManager = require('./AESManager.js');

module.exports = class{

	constructor(keyCenter,router){
		this.router = router;
		this.keyCenter = keyCenter;
		this.rsaManager = this.keyCenter.GetRsaManager();
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
			self.keyCenter.AddMemberAesManager( req.user , JSON.parse(decrypt) );
		});
	}
}