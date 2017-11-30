'use strict';

var NodeRSA = require('node-rsa');

module.exports = class{

	constructor(){
		this.GenerateKey();
	}

	GenerateKey(){
		this.key = new NodeRSA({b: 512});
	}

	Encrypt(message){
		return this.key.encrypt(text, 'base64');
	}

	Decrypt(encryptMessage){
		return this.key.decrypt(encrypted, 'utf8');
	}

	GetPublicKey(){
		return this.key.exportKey('public');
	}

	GetPrivateKey(){
  		return this.key.exportKey('private');
	}

}