// mysql:
const { findData, addData, deleData, exitData } = require("../middleware/mysql");
module.exports = {
  "GET /mysql/setting/class/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM class'
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
  "GET /mysql/setting/class/getClassInfo": async (ctx, next) => {
    const { id } = ctx.request.query
    const query = 'SELECT * FROM class WHERE id = ? '
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await findData(query, [id]).then(
        data => {
        ctx.body = { message: "OK", code: '200', data: data }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    );
  },
  "POST /mysql/setting/class/addClassInfo": async (ctx, next) => {
    const { className } = ctx.request.body
    const query = 'SELECT * FROM class WHERE classname = ? '
    await findData(query,[className]).then(
      data => {
        if(data && data.length){
          ctx.body = { message: "该班级已添加", code: '500' }
        } else {
          const query = 'insert into class (className)values(?)'
          // 获取数据
          ctx.response.type = "json"
          return addData(query,[className]).then(
            data => {
            ctx.body = { message: "OK", code: '200', data: {id:data.insertId, classname: className} }
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
  "DELETE /mysql/setting/class/delClassInfo": async (ctx, next) => {
    const { id } = ctx.request.query
    const query = 'DELETE FROM class WHERE ??=?'
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
  "PUT /mysql/setting/class/updateClassInfo": async (ctx, next) => {
    const { id, classname } = ctx.request.body
    const query = 'UPDATE class SET ??=? WHERE ??=?'
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await exitData(query,['classname',classname,'id',id]).then(
        data => {
        ctx.body = { message: "OK", code: '200' }
        },
        () => {
        ctx.body = { message: "修改失败", code: '500' }
        }
    );
  },
};
