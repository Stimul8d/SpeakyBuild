var voice = require("say");
var request = require("request");

var pathToJenkins ="http://192.168.99.100:32769/job/build1/lastBuild/api/json";

request(pathToJenkins, function(error,res,body){
   if(!error && res.statusCode == 200){
       var result = JSON.parse(body);
       
       var text = result.fullDisplayName + " is "
        + ((result.building) ? "" : "not ")
        + "building";
        
       console.log(text);
        
       voice.speak(text);
   } 
});

