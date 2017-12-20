$(document).ready(function() {
	var encryptManager = new EncryptManager();
    ChangeName();

    AjaxGet('/contact',function(msg){
    	console.log(msg);
    });
});