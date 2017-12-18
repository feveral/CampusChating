'use strict';

class EncryptManager{

	constructor(){
		this.aesKey = this.InitialAesKey();
		this.PushAesKeyToServer();
	}

	InitialAesKey(){
		var list = []
		for (var i = 0 ; i < 16 ; i ++){
			list.push(Math.floor(Math.random() * 16));
		}
		return list;
	}

	PushAesKeyToServer(){
		var self = this;
		AjaxGet('/key/getPublicKey',function(msg){
			var publicKey = (JSON.parse(msg))['data']; 
			var crypt = new JSEncrypt();
			crypt.setPublicKey(publicKey);
			var data = 
			{
				key : crypt.encrypt(JSON.stringify(self.aesKey))
			}
			AjaxPost("/key/aesKey",data,function(msg){});
		});
	}

	AESEncrypt(text){
		var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		// 將文字轉換為位元組
		var textBytes = aesjs.utils.utf8.toBytes(text);

		// Counter 可省略，若省略則從 1 開始
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var encryptedBytes = aesCtr.encrypt(textBytes);

		// 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
		var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
		console.log(encryptedHex);

		// 將十六進位的資料轉回二進位
		var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

		// 解密時要建立另一個 Counter 實體
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);

		// 將二進位資料轉換回文字
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		console.log(decryptedText);
		return encryptedHex;
	}

	AESDecrypt(text){
		var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		var encryptedBytes = aesjs.utils.hex.toBytes(text);

		// 解密時要建立另一個 Counter 實體
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		console.log(text);
		console.log(encryptedBytes);
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);

		// // 將二進位資料轉換回文字
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		console.log(decryptedText);
		return decryptedText;
	}

}


function encrypt(text){
	var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 將文字轉換為位元組
	var textBytes = aesjs.utils.utf8.toBytes(text);

	// Counter 可省略，若省略則從 1 開始
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);

	// 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	console.log(encryptedHex);

	// 將十六進位的資料轉回二進位
	var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

	// 解密時要建立另一個 Counter 實體
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);

	// 將二進位資料轉換回文字
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	console.log(decryptedText);
	return encryptedHex;
}

function decryptMessage(text){
	var key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var encryptedBytes = aesjs.utils.hex.toBytes(text);

	// 解密時要建立另一個 Counter 實體
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	console.log(text);
	console.log(encryptedBytes);
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);

	// // 將二進位資料轉換回文字
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	console.log(decryptedText);
	return decryptedText;
}

new EncryptManager();