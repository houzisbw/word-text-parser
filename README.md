# word-text-parser
A parser to extract Microsoft Word document's text in **Nodejs**, which will extract the text content in Word document, return a *array* of string contains the content in each **Paragraph(explaination later)** in Word document<br><br>

## **Install**
```
npm install word-text-parser --save
```
**or**
```
yarn add word-text-parser
```
## **Usage**<br>
In express or koa:
```
var path = require('path');
var parser = require('word-text-parser');
//Word document's absolute path
var absPath = path.join(__dirname,'example.docx');
parser(absPath,function(resultList){
  console.log(resultList)
})
```
the *resultList* contains the text in the same order as they are in Word, if the document is empty or contains no Paragraph, the *resultList* is empty

## **Explaination**
A *Paragraph* in Microsoft Word document is the segment mode in Word, the following image shows the paragraph distribution in Word. There are 7 Paragraphs in the image!<br><br>
![](https://github.com/houzisbw/word-text-parser/blob/master/img/1.jpg)