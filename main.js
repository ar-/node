var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var sys = require('util');
var exec = require('child_process').exec;

var counter=0;

function puts(error, stdout, stderr) { sys.puts(stdout) }


if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);

// long shell process
exec("sleep 3; ls ", puts);

counter++;
    res.end(counter+" hello world\n");
console.log("response sent");
  }).listen(8000);
}

