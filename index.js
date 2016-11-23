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

const publicIP = "187.189.155.225";

var privateIP = "192.168.10.100";

var request1 = {
  number: "1",
  ip: publicIP,
  type: "login",
  parameters: {
    username: "abdulachik@gmail.com",
    password: "canelitas"
  }
}

var request2 = {
  number: "2",
  ip: publicIP,
  type: "login",
  parameters: {
    username: "abdulachik@gmail.com",
    password: "marcelaplata"
  }
}

var request3 = {
  number: "3",
  ip: publicIP,
  type: "login",
  parameters: {
  }
}
var request4 = {
  number: "4",
  ip: publicIP,
  type: "login",
  parameters: {
    username: "abdulhamid@gmail.com",
    password: "marcelaplata"
  }
}
var request5 = {
  number: "5",
  ip: publicIP,
  type: null,
  parameters: null
};


var response1 = server.processRequest(request1);

var response2 = server.processRequest(request2);

var response3 = server.processRequest(request3);

var response4 = server.processRequest(request4);

var response5 = server.processRequest(request5);

var response6 = server.processRequest();

console.log("Request #", response1.number ," proccesed, the server answered this:\n", response1);

console.log("Request #", response2.number ,"  proccesed, the server answered this:\n", response2);

console.log("Request #", response3.number ,"  proccesed, the server answered this:\n", response3);

console.log("Request #", response4.number ,"  proccesed, the server answered this:\n", response4);

console.log("Request #", response5.number ,"  proccesed, the server answered this:\n", response5);

console.log("Request #", response6.number ,"  proccesed, the server answered this:\n", response6);
