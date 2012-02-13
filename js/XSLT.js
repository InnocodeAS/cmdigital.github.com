define (function(){
  return function (xml, xslt, callback, xsltVariables){
    var xslNamespace = 'http://www.w3.org/1999/XSL/Transform';
    var dataAsText = /^\s*</;
    var processor = new XSLTProcessor();
    var transformed = false;

    var xm = {};
    var xs = {};

    var change = function() {
      var resultDoc = null;

      if (xm.readyState == 4 && xs.readyState == 4 && !transformed) {
        if (xsltVariables){
          var variables = xs.responseXML.getElementsByTagNameNS(xslNamespace,'variable'),i;
          for (i =0; i<variables.length; i++){
            var name = variables[i].getAttribute('name');
            if (xsltVariables[name]){
              variables[i].firstChild.nodeValue = xsltVariables[name];
            }
          }
        }


        if (processor.transformDocument) {
          resultDoc = document.implementation.createDocument("", "", null);
          processor.transformDocument(xm.responseXML, xs.responseXML, resultDoc, null);
        }
        else {
          processor.importStylesheet(xs.responseXML);
          resultDoc = processor.transformToFragment(xm.responseXML, document);
        }
        resultDoc.text = new XMLSerializer().serializeToString(resultDoc)
        callback && callback(resultDoc);
        transformed = true;
      }
    };

    if (xml.documentElement) {
      xm.responseXML = xml;
      xm.readyState = 4;
      change()
    }
    else if (dataAsText.test(xml)) {
      xm.readyState = 4;
      xm.responseXML = new DOMParser().parseFromString(xml, "text/xml");
    }
    else {
      xm = new XMLHttpRequest();
      xm.open ('get',xml)
      xm.onreadystatechange = change;
      xm.send();
    }

    if (xslt.documentElement) {
      xs.responseXML = xslt;
      xs.readyState = 4;
      change()
    }
    else if (dataAsText.test(xslt)) {
      xs.readyState = 4;
      xs.responseXML = new DOMParser().parseFromString(xslt, "text/xml");
      change();
    } else {
      xs = new XMLHttpRequest();
      xs.open ('get',xslt);
      xs.onreadystatechange = change;
      xs.send();
    }
  }
});
