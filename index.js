var performance = require('performance-now'),
timeStart = performance(),
timeEnd = null,
server = {
  ip: "10.60.50.100",
  status: "Available",
  processRequest: function processRequest (request) {

    console.log("Request #", request.number, "\n Server status: " ,server.status);
    var that = this
    , responseTime = parseInt((Math.random() * (( server.status == "Busy" ? 5 : 1) - 0) + 0) * 10000)
    , response = new Promise (function (resolve, reject) {
      setTimeout(function () {
        var server = that;

        server.status = "Busy";

        console.log("Server status:\n", server.status, "\n");

        if (request) {

          console.log("Request #", request.number , " received today: \n", request);

          var response = {
            number: request.number,
            computerIP: request.ip,
            serverIP: server.ip,
            type: request.type,
            status: "Request processed"
          };

          // processing the request with code
          if (request.type == "login") {

            server.status = "Processing";

            console.log("Server status:\n", server.status, "\n");

            var parameters = request.parameters,
                username = parameters.username,
                password = parameters.password;

            // validation process step 1: validate that username and password exist in the request
            if (username && password) {
              server.status = "Valudating starting";

              console.log("Server status:\n", server.status, "\n");

              // validation process step 2: validate that the username is valid
              if (username == "abdulachik@gmail.com") {
                // validation process step 3: validate that the password is valid
                if (password == "canelitas") {

                  server.status = "Valudating ended";

                  console.log("Server status:\n", server.status, "\n");

                  response.body = "Succesful login";

                } else {
                  // validation process error handling
                  server.status = "Valudating ended";

                  console.log("Server status:\n", server.status, "\n");

                  response.body = "Error: Incorrect password";
                  reject(response);
;
                }

              } else {
                // validation process error handling
                server.status = "Valudating ended";

                console.log("Server status:\n", server.status, "\n");

                response.body = "Error: Username doesn't exists";
                reject(response);
              }
            } else {
              server.status = "Valudating ended";

              console.log("Server status:\n", server.status, "\n");

              response.body = "Error: You need an user and a password to login into this server";
              reject(response);
            }
          } else {
            server.status = "Error handling";

            console.log("Server status:\n", server.status, "\n");

            response.body = "Error: Server couldn't process the request because it doesn't understand it";
            reject(response);
          }

          // return the response created by the server

          server.status = "Available";

          resolve(response);

      } else {

        server.status = "Available";
        return "Error in the server, it doesn't know how to respond";

      }

      }, responseTime);
    });

    console.log("Aproximated server response time: ", responseTime/1000);

    return response;
  }
};

var publicIP = "187.189.155.225";

var privateIP = "192.168.10.100";

var requestList = [
  {
    ip: publicIP,
    type: "login",
    parameters: {
      username: "abdulachik@gmail.com",
      password: "canelitas"
    }
  },
  {
    ip: publicIP,
    type: "login",
    parameters: {
      username: "abdulachik@gmail.com",
      password: "marcelaplata"
    }
  },
  {
    ip: publicIP,
    type: "login",
    parameters: {}
  },
  {
    ip: publicIP,
    type: "login",
    parameters: {
      username: "abdulhamid@gmail.com",
      password: "marcelaplata"
    }
  },
  {
    ip: publicIP,
    type: null,
    parameters: null
  }
];


// Denial of Service
function sendDOS () {
  var counter = 1;

  while (true) {
    for (requestListIndex in requestList) {

      publicIP_part1 = parseInt(Math.random() * ((Math.random() * (254 - 1)) - 1) + 1);
      publicIP_part2 = parseInt(Math.random() * ((Math.random() * (254 - 1)) - 1) + 1);
      publicIP_part3 = parseInt(Math.random() * ((Math.random() * (254 - 1)) - 1) + 1);
      publicIP_part4 = parseInt(Math.random() * ((Math.random() * (254 - 1)) - 1) + 1);

      publicIP = publicIP_part1 + "." + publicIP_part2 + "." + publicIP_part3 + "." + publicIP_part4;
      // for loop iteration
      var request = requestList[requestListIndex];

      request.number = counter;
      request.ip = publicIP;

      var response = server.processRequest(request);

      response.then(function (responseData) {
        console.log("Request #", counter ," proccesed, the server answered this:\n", responseData);
      });

      response.catch(function (responseErrorData) {
        console.log("Server Error: server responded\n", responseErrorData)
      });
    }

    counter++;

  }

};
//
// Distributed Denial of Service
function sendDDOS () {
  while (true) {
    sendDOS();
  }
}

// Start DDOS
sendDDOS();
// var request = requestList[0];
//
// request.number = 1;
// request.ip = publicIP;
//
// var response = server.processRequest(request);
//
// response.then(function (responseData) {
//   responseTime = (timeStart - timeEnd);
//   timeEnd = performance();
//   console.log("Request proccesed, the server answered this:\n", responseData, "\nResponse Time: ", responseTime.toFixed(2), "milliseconds");
// });
//
// response.catch(function (responseErrorData) {
//   responseTime = (timeStart - timeEnd);
//   console.log("Server Error: server responded\n", responseErrorData, "\n Response Time: ", responseTime.toFixed(2));
// });
