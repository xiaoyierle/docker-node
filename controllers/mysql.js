// mysql:
const { findData, addData, deleData, exitData } = require("../middleware/mysql");
module.exports = {
  "GET /mysql": async (ctx, next) => {
    ctx.render("mysql.html", {
      title: "测试数据库",
      name: "11111"
    });
  },
  "GET /mysql/getTable": async (ctx, next) => {
    const query = 'SELECT * FROM user'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await findData(query).then(
        data => {
        ctx.body = data;
        },
        () => {
        ctx.body = { err: "数据获取失败" };
        }
    );
  }
};
