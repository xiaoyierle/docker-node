const { findData, addData, deleData, exitData } = require("../../middleware/mysql");
module.exports = {
  "POST /mysql/user/login": async (ctx, next) => {
    const { username, password } = ctx.request.body
    const queryUser = 'SELECT * FROM user WHERE username = ? '
    await findData(queryUser,[username]).then(
      data => {
        if(data && data.length){
          console.log(data)
          let userInfo = data[0]
          console.log(userInfo)
          if (password.toString() === userInfo.password.toString()) {
            ctx.body = { message: "登录成功", code: '200' }
            ctx.session.userId=userInfo.id
            ctx.session.username=userInfo.usernamem
          } else {
            ctx.body = { message: "用户名或密码错误", code: '500' }
          }
        } else {
          ctx.body = { message: "用户名或密码错误", code: '500' }
          // const query = 'insert into user (username,password)values(?,?)'
          // // 获取数据
          // ctx.response.type = "json"
          // return addData(query,[name, password]).then(
          //   data => {
          //   ctx.body = { message: "OK", code: '200', data: {id:data.insertId, username: name} }
          //   },
          //   () => {
          //   ctx.body = { message: "新增失败", code: '500' };
          //   }
          // )
        }
      },
      () => {
      ctx.body = { message: "数据获取失败", code: '500' }
      }
    )
  }
}