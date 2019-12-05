'use strict';
const mysql = require( 'mysql' );
var pool = mysql.createPool( {
  connectionLimit : 50,
  // host      : '172.17.0.3',
  host      : '127.0.0.1',
  user      : 'root',
  password  : '123456',
  database   : 'people_management',
  multipleStatements : true //是否允许执行多条sql语句
} );
// 通过connection的query方法统一执行增删改查的操作。

// connecQuery为增删改查方法的函数名

// statements进行增删改查操作的条件，查询条件都由前端访问时将条件传入

// parameter 进行添加或修改的数据
function poolFn(connecQuery, statements, parameter) {
  　　// getConnection 创建连接池
  　　return new Promise((resolve, reject) => {
  　　　　pool.getConnection((err, connection) => {
  　　　　　　if(err) {
  　　　　　　　　throw err;
  　　　　　　　　reject('建立连接池失败');
  　　　　　　　　return;
  　　　　　　}
  　　　　　　connecQuery(connection, statements, parameter).then(data => {
  　　　　　　　　connection.release(); // 到这步说明已经完成操作，释放连接
  　　　　　　　　resolve(data);
  　　　　　　});
  　　　　});
  　　// console.log(pool._allConnections.length); // 连接池里的连接数
  　　});
  }
  /*
  * connection 连接句柄
  * statements 查询语句
  
  * */
  
  // 基于promise方法实现
  
  // 查询数据
  function connecQueryFind(connection, statements) {
  　　return new Promise((resolve, reject) => {
  　　　　connection.query(statements, (err, result) => {
  　　　　　　if(err) {
  　　　　　　　　throw err;
  　　　　　　　　reject('查询失败');
  　　　　　　}
  　　　　　　resolve(result);
  　　　　});
  　　})
  }
  
  // 添加数据
  function connecQueryAdd(connection, statements, parameter) {
  　　return new Promise((resolve, reject) => {
  　　　　connection.query(statements, parameter, (err, result) => {
  　　　　　　if(err) {
  　　　　　　　　throw err;
  　　　　　　　　reject('添加失败');
  　　　　　　}
  　　　　　　resolve(result);
  　　　　});
  　　})
  }
  
  // 删除数据
  function connecQueryDele(connection, statements) {
  　　　return new Promise((resolve, reject) => {
  　　　　connection.query(statements, (err, result) => {
  　　　　　　if(err) {
  　　　　　　　　throw err;
  　　　　　　　　reject('删除失败');
  　　　　　　}
  　　　　　　resolve(result);
  　　　　});
  　　})
  }
  
  // 修改数据
  function connecQueryExit(connection, statements, parameter) {
  　　return new Promise((resolve, reject) => {
  　　　　connection.query(statements, parameter, (err, result) => {
  　　　　　　if(err) {
  　　　　　　　　throw err;
  　　　　　　　　reject('修改失败');
  　　　　　　}
  　　　　　　resolve(result);
  　　　　});
  　　})
  }
  // 将方法封装统一导出

function queryFn(connecQuery, statements, parameter) {
  　　return new Promise((resolve) => {
  　　　　poolFn(connecQuery, statements, parameter).then(data => {
  　　　　　　resolve(data);
  　　　　});
  　　});
  }
  
  module.exports = {
  　　findData(statements, parameter) {
  　　　　return queryFn(connecQueryFind, statements, parameter);
  　　},
  　　addData(statements, parameter) {
  　　　　return queryFn(connecQueryAdd, statements, parameter);
  　　},
  　　deleData(statements, parameter) {
  　　　　return queryFn(connecQueryDele, statements, parameter);
  　　},
  　　exitData(statements, parameter) {
  　　　　return queryFn(connecQueryExit, statements, parameter);
  　　}
  };