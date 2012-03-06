define (["XSLT", "EventMachine"],function(XSLT,EventMachine){
  var CMDLabs = function(){
    var this_ = this;

    var init_ = function(){
      XSLT(this_.data, this_.timetableTMPL, function(HTML){
        this_.container.appendChild(HTML);
      });

      document.getElementById("projectBtn").addEventListener("click",function(e){

        XSLT(this_.data, this_.timetableTMPL, function(HTML){
          this_.container.innerHTML = "";
          this_.container.appendChild(HTML);
        }, {page:'projects'});

        e.preventDefault();
      } ,false);

      document.getElementById("calendarsBtn").addEventListener("click",function(e){

        XSLT(this_.data, this_.timetableTMPL, function(HTML){
          this_.container.innerHTML = "";
          this_.container.appendChild(HTML);
        }, {page:'calendar'});

        e.preventDefault();
      } ,false);

    };
    init_();
  };

  CMDLabs.prototype = {
    data : "data/data.xml",
    timetableTMPL: "templates/timetable.xsl",
    container: document.getElementById("content")

  };
  var cmdLabs = new CMDLabs();

  return cmdLabs;
})