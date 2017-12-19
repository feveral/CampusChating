'use strict';

var RSAManager = require('./RSAManager.js');
var AESManager = require('./AESManager.js');

module.exports = class{

	constructor(){
		this.rsaManager = new RSAManager();
		this.allAesManager = {};
	}

	AddMemberAesManager(memberId,key){
		this.allAesManager[memberId] = new AESManager();
		this.allAesManager[memberId].SetKey(key);
	}

	GetAesManagerByMemberId(memberId){
		if(this.allAesManager[memberId] === undefined){
			return new AESManager();
		}
		return this.allAesManager[memberId];
	}

	GetRsaManager(){
		return this.rsaManager;
	}
}
