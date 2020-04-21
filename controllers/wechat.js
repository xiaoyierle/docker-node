const { findData, addData, deleData, exitData } = require("../middleware/mysql")
module.exports = {
  "GET /mysql/setting/student/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM student'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json"
    //   let statements = res.statements
    await findData(query).then(
        data => {
        ctx.body = { message: "OK", code: '200', data: data }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    )
  },
  "GET /": async (ctx, next) => {
    const query = 'SELECT * FROM student'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json"
    console.log(ctx.request.query)
    //   let statements = res.statements
    await findData(query).then(
        data => {
        ctx.body = { message: "OK", code: '200', data: data }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    )
  },
}
