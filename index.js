const express = require("express"); //express 모듈을 가져옴
const app = express(); //펑션을 이용해서 익스프레스 앱을 만듬
const port = 5000; //서버 포트인데 상관 없음.

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jjh8623:ghktn10137@treelatte.f2wxo.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//루트디렉토리로 오면은 hello world를 실행한다,
app.get("/", (req, res) => {
  res.send("Hello World! 하이 헬로우");
});

//5000번포트로 접속을 하면 로그가 실행됨.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
