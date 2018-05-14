//解压缩word文件
var admZip = require('adm-zip');
var fs = require('fs');
var path = require('path');
//参数是word文件名,第二个参数是回调表示解析完成
var parser = function parseWordDocument(absoluteWordPath,callback){
	//返回内容的数组
	var resultList = [];
	//如果文件存在
	fs.exists(absoluteWordPath, function(exists){
		if(exists){
			//解压缩
			const zip = new admZip(absoluteWordPath);
			//将document.xml(解压缩后得到的文件)读取为text内容
			var contentXml = zip.readAsText("word/document.xml");
			//正则匹配出对应的<w:p>里面的内容,方法是先匹配<w:p>,再匹配里面的<w:t>,将匹配到的加起来即可
			//注意？表示非贪婪模式(尽可能少匹配字符)，否则只能匹配到一个<w:p></w:p>
			var matchedWP = contentXml.match(/<w:p.*?>.*?<\/w:p>/gi);
			//继续匹配每个<w:p></w:p>里面的<w:t>,这里必须判断matchedWP存在否则报错
			if(matchedWP){
				matchedWP.forEach(function(wpItem){
					//注意这里<w:t>的匹配，有可能是<w:t xml:space="preserve">这种格式，需要特殊处理
					var matchedWT = wpItem.match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
					var textContent = '';
					if(matchedWT){
						matchedWT.forEach(function(wtItem){
							//如果不是<w:t xml:space="preserve">格式
							if(wtItem.indexOf('xml:space')===-1){
								textContent+=wtItem.slice(5,-6);
							}else{
								textContent+=wtItem.slice(26,-6);
							}
						});
						resultList.push(textContent)
					}
				});
				//解析完成
				callback(resultList)
			}
		}else{
			callback(resultList)
		}
	});
};
module.exports = parser;
