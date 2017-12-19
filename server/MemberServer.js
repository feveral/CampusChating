'use strict';
var MemberManager = require('./MemberManager.js');

module.exports = class{

	constructor(router){
		this.router = router;
		this.memberManager = new MemberManager();
		this.SetAPI();
	}

	SetAPI(){
		var self = this;
		
		self.router.get('/',function(req,res){
			self.memberManager.GetAllMember(function(err,result){
				res.end(JSON.stringify({success:true , data:result}));
			}); 
		});

	}
}