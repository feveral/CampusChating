'use strict';

var NodeRSA = require('node-rsa');

module.exports = class{

	constructor(){
		this.GenerateKey();
	}

	GenerateKey(){
		this.key = new NodeRSA({b: 512});
		this.key.setOptions({encryptionScheme: 'pkcs1'});
	}

	Encrypt(message){
		return this.key.encrypt(message, 'base64');
	}

	Decrypt(encryptMessage){
		return this.key.decrypt(encryptMessage, 'utf8');
	}

	GetPublicKey(){
		return this.key.exportKey('public');
	}

	GetPrivateKey(){
  		return this.key.exportKey('private');
	}
}