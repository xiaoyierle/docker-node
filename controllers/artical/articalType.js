const { findData, addData, deleData, exitData } = require("../../middleware/mysql");
const moment = require('moment')
module.exports = {
  "GET /mysql/articalType/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM artical_type WHERE uid = ? '
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    const uid = ctx.session.userId
    await findData(query, [uid]).then(
        data => {
        // ctx.body = { message: "OK", code: '200', data: data }
        data.forEach(element => {
          element.create_time = moment(element.create_time).format('YYYY-MM-DD HH:mm:ss')
        });
        ctx.write({ message: "OK", code: '200', data: data })
        },
        () => {
        // ctx.body = { message: "数据获取失败", code: '500' }
        ctx.write({ message: "数据获取失败", code: '500' })
        }
    );
  },
  "POST /mysql/articalType/addData": async (ctx, next) => {
    const { articalType, articalTypeName } = ctx.request.body
    const queryUser = 'SELECT * FROM artical_type WHERE artical_type = ? and uid = ?'
    const uid = ctx.session.userId
    await findData(queryUser,[articalType, uid]).then(
      data => {
        if(data && data.length){
          ctx.body = { message: "该类型已存在", code: '500' }
        } else {
          const query = 'insert into artical_type (artical_type_name,artical_type, uid)values(?,?, ?)'
          // 获取数据
          ctx.response.type = "json"
          const uid = ctx.session.userId
          return addData(query,[articalTypeName, articalType, uid]).then(
            data => {
            ctx.write({ message: "OK", code: '200' })
            },
            () => {
            ctx.write({ message: "新增失败", code: '500' })
            }
          )
        }
      },
      () => {
      ctx.body = { message: "数据获取失败", code: '500' }
      }
    )
  },
  "DELETE /mysql/articalType/deleteData": async (ctx, next) => {
    const { id } = ctx.request.query
    const query = 'DELETE FROM artical_type WHERE ??=?'
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
}