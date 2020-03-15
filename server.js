const WebSocket = require("ws");
const wss = new WebSocket.Server(
  { port: 8080 },
  console.log("WebSocket Server is listening on port 8080!")
);

const listStudent = [
  {
    mssv: "17020617",
    name: "Kiều Chí Công",
    dateOfBirth: "13/06/1999",
    phone: "0795038669",
    address: "Sơn Tây, Hà Nội",
    email: "kieuchicong99@gmail.com",
    class: "QH-2017-CQ-CLC"
  },
  {
    mssv: "17021069",
    name: "Bùi Đặng Thu Trà",
    dateOfBirth: "02/10/1999",
    phone: "09998888",
    address: "Chương Mỹ, Hà Nội",
    email: "buidangthutra@gmail.com",
    class: "QH-2017-CQ-K"
  },
  {
    mssv: "17020715",
    name: "Nguyễn Đức Hải",
    dateOfBirth: "03/11/1999",
    phone: "0123456789",
    address: "Thái Bình",
    email: "nguyenduchai@gmail.com",
    class: "QH-2017-CQ-K"
  }
];

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
