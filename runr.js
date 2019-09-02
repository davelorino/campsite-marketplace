var R = require("r-script");

exports.runrr = (req, res) => {
   // console.log(req.body);
  var out = R("RHelloWorld.R")
      .data("hello world", 20)
      .callSync();
      
      console.log(out);
  };
  