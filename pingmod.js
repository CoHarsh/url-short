
// TODO : https://stackoverflow.com/questions/3922989/how-to-check-if-page-exists-using-javascript

var exec = require('child_process').exec;
exec("ping -n 3 www.npmjs.com", function (err, stdout, stderr) {
    if(err){
        console.log(err);
    }
    else if(stderr){
        console.log(stderr);
    }
    else{
        console.log(stdout);
        if(stdout.indexOf("Received = 0") > -1){
            console.log("DOWN");
        }
        else if(stdout.indexOf("Received = 3") > -1){
            console.log("UP");
        }
        else{
            console.log("DOWN");
        }
    }
});
//kill the process
