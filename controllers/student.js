// mysql:
const { findData, addData, deleData, exitData } = require("../middleware/mysql");
module.exports = {
  "GET /mysql/setting/student/getTableData": async (ctx, next) => {
    const query = 'SELECT * FROM student'
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
  "GET /mysql/setting/student/getStudentInfo": async (ctx, next) => {
    const { id } = ctx.request.query
    const queryUser = 'SELECT * FROM student WHERE id = ? '
    // 获取数据
    // let res = ctx.query; // 返回的数据格式为json
    ctx.response.type = "json";
    //   let statements = res.statements;
    await findData(queryUser, [id]).then(
        data => {
        ctx.body = { message: "OK", code: '200', data: data }
        },
        () => {
        ctx.body = { message: "数据获取失败", code: '500' }
        }
    );
  },
  "POST /mysql/setting/student/addStudentInfo": async (ctx, next) => {
    const { name, no, classId, age, sex } = ctx.request.body
    const queryStudent = 'SELECT * FROM student WHERE no = ? '
    await findData(queryStudent,[no]).then(
      data => {
        if(data && data.length){
          ctx.body = { message: "该学生已存在", code: '500' }
        } else {
          const query = 'insert into student (name,no,c_id,age,sex)values(?,?,?,?,?)'
          // 获取数据
          ctx.response.type = "json"
          return addData(query,[name,no,classId,age,sex]).then(
            data => {
            ctx.body = { message: "OK", code: '200' }
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
  "DELETE /mysql/setting/student/delStudentInfo": async (ctx, next) => {
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
  "PUT /mysql/setting/student/updateStudentInfo": async (ctx, next) => {
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
