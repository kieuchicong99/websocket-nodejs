const WebSocket = require("ws");
const url = "ws://localhost:8080";
const connection = new WebSocket(url);

connection.onopen = () => {
  var input = process.stdin;
  input.setEncoding("utf-8");
  console.log("Nhập mã số sinh viên:");

  input.on("data", function(data) {
    if (data === "exit\n") {
      console.log("Program exit.");
      process.exit();
    } else {
      data = data.substring(0, data.length - 1);
      connection.send(data);
      connection.onerror = error => {
        console.log(`WebSocket error: ${error}`);
      };

      connection.onmessage = e => {
        console.log("Thông tin sinh viên:\n", JSON.parse(e.data), "\n");
        console.log("Nhập mã số sinh viên:");
      };
    }
  });
};
