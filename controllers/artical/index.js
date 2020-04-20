const { findData, addData, deleData, exitData } = require("../../middleware/mysql");
const moment = require('moment')
module.exports = {
  "GET /mysql/artical/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM artical'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await findData(query).then(
        data => {
          data.forEach(element => {
            element.create_time = moment(element.create_time).format('YYYY-MM-DD HH:mm:ss')
          });
          ctx.write({ message: "OK", code: '200', data: data })
        },
        () => {
          ctx.body = { message: "数据获取失败", code: '500' }
        }
    );
  },
  "POST /mysql/artical/addData": async (ctx, next) => {
    const { articalTitle, articalType, articalTypeName, content, pic} = ctx.request.body
    const query = 'insert into artical (artical_title, artical_type, artical_type_name, content, pic, uid)values(?,?,?,?,?,?)'
    // 获取数据
    ctx.response.type = "json"
    const uid = ctx.session.userId
    return addData(query,[articalTitle, articalType, articalTypeName, content,pic, uid]).then(
      data => {
      ctx.write({ message: "OK", code: '200' })
      },
      () => {
      ctx.write({ message: "新增失败", code: '500' })
      }
    )
  },
}