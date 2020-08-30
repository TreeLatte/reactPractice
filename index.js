const express = require("express"); //express 모듈을 가져옴
const app = express(); //펑션을 이용해서 익스프레스 앱을 만듬
const port = 5000; //서버 포트인데 상관 없음.
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

//application/x-www-form-urlencoded의 데이터를 분석해서 가져오게 한다.
app.use(bodyParser.urlencoded({ extended: true }));
//application/json의 데이터를 분석해서 가져오게 한다.
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//루트디렉토리로 오면은 hello world를 실행한다,
app.get("/", (req, res) => {
  res.send("Hello World! 하이 헬로우");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  //req.body에 있는 것을 넣어줌.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

//5000번포트로 접속을 하면 로그가 실행됨.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
