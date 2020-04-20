const fs = require("fs");
const path = require('path');

// add url-route in /controllers:

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith("GET ")) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith("PUT ")) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith("DELETE ")) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
// function fileDisplay(router, filePath){
//     //根据文件路径读取文件，返回文件列表
//     fs.readdir(filePath,function(err,files){
//         if(err){
//             console.warn(err)
//         }else{
//             //遍历读取到的文件列表
//             files.forEach(function(filename){
//                 //获取当前文件的绝对路径
//                 var filedir = path.join(filePath,filename);
//                 //根据文件路径获取文件信息，返回一个fs.Stats对象
//                 fs.stat(filedir,function(eror,stats){
//                     if(eror){
//                         console.warn('获取文件stats失败');
//                     }else{
//                         var isFile = stats.isFile();//是文件
//                         var isDir = stats.isDirectory();//是文件夹
//                         if(isFile){
//                             console.log(`process controller: ${filedir}...`);
//                             let mapping = require(__dirname + '/' + filedir);
//                             addMapping(router, mapping);
//                         }
//                         if(isDir){
//                             fileDisplay(router, filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
//                         }
//                     }
//                 })
//             });
//         }
//     });
// }
function fileDisplay(router, filePath){
  //根据文件路径读取文件，返回文件列表
  fs.readdirSync(filePath)
    .forEach(filename => {
      var filedir = path.join(filePath,filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      fs.stat(filedir,function(eror,stats){
          if(eror){
              console.warn('获取文件stats失败');
          }else{
              var isFile = stats.isFile();//是文件
              var isDir = stats.isDirectory();//是文件夹
              if(isFile){
                  console.log(`process controller: ${filedir}...`);
                  let mapping = require(__dirname + '/' + filedir);
                  addMapping(router, mapping);
              }
              if(isDir){
                  fileDisplay(router, filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
          }
      })
    })
}

function addControllers(router, dir) {
  fileDisplay(router, dir)
}

module.exports = function(dir) {
  let controllers_dir = dir || "controllers",
    router = require("koa-router")();
  addControllers(router, controllers_dir);
  return router.routes();
};
