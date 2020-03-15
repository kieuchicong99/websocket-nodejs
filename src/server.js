const WebSocket = require("ws");
const { listStudent } = require("./students");
const wss = new WebSocket.Server(
  { port: 8080 },
  console.log("WebSocket Server is listening on port 8080!")
);

wss.on("connection", ws => {
  let result;
  ws.on("message", message => {
    console.log(`Received request => ${message}`);
    for (let i = 0; i < listStudent.length; i++) {
      if (listStudent[i].mssv === message) {
        result = listStudent[i];
        break;
      }
    }
    if (result) {
      ws.send(JSON.stringify(result));
      console.log("result:", result);
      result = null;
    } else {
      ws.send(JSON.stringify({ error: "Không tìm thấy kết quả" }));
    }
  });
});
