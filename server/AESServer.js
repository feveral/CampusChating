'use strict';

module.exports = class{

	constructor(router){
		this.router = router;
		this.SetAPI();
	}

	SetAPI(){
		var self = this;

		self.router.post('/',function(req,res){
			console.log(req);
		})
	}
}