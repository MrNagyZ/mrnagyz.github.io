var uzenet = 0;

function socketExample() {
	var socket;
	if (window.hasOwnProperty("WebSocket")) { // webkit-browser
	   socket = new WebSocket("ws://2.0.0.197:5665/");
	} else if (window.hasOwnProperty("MozWebSocket")) { // firefox
	   socket = new MozWebSocket("ws://localhost:8085/");
	} else { // browser doesnt support websocket
	   alert("Your browser doesn't support WebSocket.");
	   return;
	}
	console.log("Socket is ready.");
	socket.onopen = function() { // the socket is ready, send something
	   socket.send("Wow, HTML5-WebSocket is nice!");
	   console.log("Sent data.");
	};

	socket.onmessage = function(msg) { // the server send something
	 //   alert("The server said: " + msg.data);
		uzenet = msg.data;
		$(".uzenet").text(uzenet);
	 console.log(msg.data);
	};

	socket.onclose = function() { // the server closed the connection
	   console.log("The server closed the connection.");
	   
	   //setTimeout(socketExample, 1000);
	};
}


socketExample();


// event handler
$(".uzenet").change(function(){
	alert("The text has been changed.");
  });

// $(uzenet).val() function(){}
