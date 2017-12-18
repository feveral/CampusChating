var aesjs = require('aes-js');
exports.decryptMessage = function (key, message){
	key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 將十六進位的資料轉回二進位
	var encryptedBytes = aesjs.utils.hex.toBytes(message);

	// 解密時要建立另一個 Counter 實體
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);

	// 將二進位資料轉換回文字
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	return decryptedText;
}

exports.encryptMessage = function (key, message){
	key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	// 將文字轉換為位元組
	var textBytes = aesjs.utils.utf8.toBytes(message);

	// Counter 可省略，若省略則從 1 開始
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);

	// 加密過後的資料是二進位資料，若要輸出可轉為十六進位格式
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	return encryptedHex;
}