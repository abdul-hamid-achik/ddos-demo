var server = {
  ip: "10.60.50.100",
  processRequest: function processRequest (request) {
    var server = this;

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
        var parameters = request.parameters,
            username = parameters.username,
            password = parameters.password;

        // validation process step 1: validate that username and password exist in the request
        if (username && password) {

          // validation process step 2: validate that the username is valid
          if (username == "abdulachik@gmail.com") {
            // validation process step 3: validate that the password is valid
            if (password == "canelitas") {
              response.body = "Succesful login";
            } else {
              // validation process error handling
              response.body = "Error: Incorrect password";
            }
          } else {
            // validation process error handling
            response.body = "Error: Username doesn't exists";
          }
        } else {
          response.body = "Error: You need an user and a password to login into this server";
        }
      } else {
        response.body = "Error: Server couldn't process the request because it doesn't understand it"
      }

      // return the response created by the server
      return response;

    } else {

      return "Error in the server, it doesn't know how to respond";

    }
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

function sendDDOS () {
  var counter = 1;
  while (counter <= requestList.length) {
    for (requestListIndex in requestList) {
      // for loop iteration
      var request = requestList[requestListIndex];
      request.number = counter;
      var response = server.processRequest(request);
      console.log("Request #", counter ," proccesed, the server answered this:\n", response);
    }

    counter++;
  }
};

// INVOKE FUNCTION DOG
sendDDOS();
