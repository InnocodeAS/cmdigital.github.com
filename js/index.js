define (["XSLT", "EventMachine"],function(XSLT,EventMachine){
  var CMDLabs = function(){
    var this_ = this;

    var init_ = function(){
      XSLT(this_.data, this_.timetableTMPL, function(HTML){
        console.log(HTML,this_.container);
        this_.container.appendChild(HTML);
      })
    };
    init_();
  };

  CMDLabs.prototype = {
    data : "data/data.xml",
    timetableTMPL: "templates/timetable.xsl",
    container: document.getElementById("content")

  };
  return new CMDLabs();
})