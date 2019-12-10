// mysql:
const { findData, addData, deleData, exitData } = require("../middleware/mysql");
module.exports = {
  "GET /mysql": async (ctx, next) => {
    ctx.render("mysql.html", {
      title: "测试数据库",
      name: "11111"
    })
  },
  "GET /mysql/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM user'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await findData(query).then(
        data => {
        ctx.body = { message: "OK", code: '200', data: data }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    );
  },
  "POST /mysql/addUserInfo": async (ctx, next) => {
    const { name, password } = ctx.request.body
    const queryUser = 'SELECT * FROM user WHERE username = ? '
    await findData(queryUser,[name]).then(
      data => {
        if(data && data.length){
          ctx.body = { message: "该用户已注册", code: '500' }
        } else {
          const query = 'insert into user (username,password)values(?,?)'
          // 获取数据
          ctx.response.type = "json"
          return addData(query,[name, password]).then(
            data => {
            ctx.body = { message: "OK", code: '200', data: {id:data.insertId, username: name} }
            },
            () => {
            ctx.body = { message: "新增失败", code: '500' };
            }
          )
        }
      },
      () => {
      ctx.body = { message: "数据获取失败", code: '500' }
      }
    )
  },
  "DELETE /mysql/delUserInfo": async (ctx, next) => {
    const { id } = ctx.request.query
    const query = 'DELETE FROM user WHERE ??=?'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await deleData(query,['id',id]).then(
        data => {
        ctx.body = { message: "OK", code: '200' }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    );
  },
  "PUT /mysql/updateUserInfo": async (ctx, next) => {
    const { id, password } = ctx.request.body
    const query = 'UPDATE user SET ??=? WHERE ??=?'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await exitData(query,['password',password,'id',id]).then(
        data => {
        ctx.body = { message: "OK", code: '200' }
        },
        () => {
        ctx.body = { message: "修改失败", code: '500' }
        }
    );
  },
};
