'use strict';

var RSAManager = require('./RSAManager.js');

module.exports = class{

	constructor(){
		this.rsaManager = new RSAManager();
		this.allAesKey = {};
	}

	AddMember(memberId,key){
		this.allAesKey[memberId] = key;
	}

	GetRsaManager(){
		return this.rsaManager;
	}
}
