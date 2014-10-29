var ConceptNet = require('concept-net');

var cn = ConceptNet();

cn.association("/c/en/villain", { limit: 10, filter: "/c/en/donut" }, function(err, result){
     res = result;
    console.log(err);
    console.log(res);
    });
