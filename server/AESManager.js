'use strict';

var aesjs = require('aes-js');

module.exports = class{

	constructor(){
		this.key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	}

	GetKey(){
		return this.key;
	}

	SetKey(key){
		this.key = key;
	}

	Encrypt(message){
		var textBytes = aesjs.utils.utf8.toBytes(message);
		var aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
		var encryptedBytes = aesCtr.encrypt(textBytes);
		var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
		return encryptedHex;
	}

	Decrypt(message){
		var encryptedBytes = aesjs.utils.hex.toBytes(message);
		var aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		return decryptedText;
	}
}
