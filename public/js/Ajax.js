
var hostUrl = "http://127.0.0.1";

function AjaxGet(apiUrl,callback){
	$(document).ready(function(){ 
		$.ajax({
			type: "GET",
			url: hostUrl + apiUrl,
			success: function(msg){
				callback(msg);
			},
		   	error: function(xhr, textStatus, error){
		        console.log(xhr.statusText);
		   	}
		});
	});
}

function AjaxPost(apiUrl,postData,callback,errorCallback=DefaultErrorCallback){
	$(document).ready(function(){ 
		$.ajax({
			type: "POST",
			url: hostUrl + apiUrl,
			data: postData,
			success: function(msg){
				callback(msg);
			},
		   	error: function(xhr, textStatus, error){
		        errorCallback(xhr, textStatus, error);
		   	}
		});
	});
}

function DefaultErrorCallback(xhr, textStatus, error){
	console.log(xhr.statusText);
}

