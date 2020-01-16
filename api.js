var express = require('express');
// var http = require('http');
const path = require('path');
const fs = require('fs');
const mv = require('mv');
const jwt = require('jwt-simple');
const router=express.Router();
const request = require('request');
const bodyParser = require('body-parser');
const htmlspecialchars = require('htmlspecialchars');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
function createRouter(db){
  const owner = '';
  router.get('/CategList', function (req, res, next) {
    db.query(
      'SELECT * FROM ax_category',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  router.get('/CategList/:caid', function (req, res, next) {
    db.query(
      'SELECT * FROM ax_category WHERE category_id='+req.params.caid,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  router.post('/users/authenticate',multipartMiddleware, (req, res)=> {
    var username=req.body.username;
    var password=req.body.password;
    db.query(
      'SELECT * FROM ax_user WHERE user_name=\''+username+'\' AND password=\''+password+'\'',
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'+error});
        } else {
        
          if(results.length>0){
            if(results[0].password==password && results[0].user_name==username){
              var payload = { uid: username };
              var secret = 'xxx';
              var token = jwt.encode(payload, secret);
              var tokens = jwt.decode(token, secret);
              res.send({'token': token});
            }
            else{
              res.send({"code":204,"success":"user and pass does not match"}); 
            }
          }else{
            res.send({"code":204,"success":'user does not exist'})
          }
        }
      }
    );
  });
  router.post('/addCatergory', multipartMiddleware, (request, response) =>{
    // const reqcatergory=JSON.parse(request.body.dataC);
    var filenames;
    var Cquery;
    const filename = request;
    // const path = req.file. path;
    console.log(filename);
    
      // if(request.files.uploads){
      //   var tem_path= request.files.uploads.path;
      //   var target_apth ='./img/'+ Date.now() + "_" +request.files.uploads.name;
      //   filenames = target_apth;
      // }else{
      //   filenames ='';
      // }
      const Caid = reqcatergory.Caid;
      const CategoryName = reqcatergory.CategoryName;
      const description = reqcatergory.description;
      const statUs = reqcatergory.statUs;
      const Parent = reqcatergory.Parent;
      const Filters = reqcatergory.Filters;
      var fileimg = filenames;
      const Keyword = reqcatergory.Keyword;
      const MetaTagTitle = reqcatergory.MetaTagTitle;
      const MetaTagDescription = reqcatergory.MetaTagDescription;
      const MetaTagKeywords = reqcatergory.MetaTagKeywords;
      var des=htmlspecialchars(description); 
      if(CategoryName!='' && des!=''&& statUs!=''&&Keyword!=''&&MetaTagTitle!=''){
        if(Caid!=''){
          Cquery='updaet';
        }else{
          Cquery='Add';
        }
        // db.query(
        //   'INSERT INTO ax_category (category_name,description,parent,filters,image,meta_tag_title,keyword_seo,meta_tag_description,meta_tag_keywords,status,add_date,update_date)'+
        //    'VALUES ("'+CategoryName+'","'+des+'","'+Parent+'","'+Filters+'","'+fileimg+'","'+MetaTagTitle+'","'+Keyword+'","'+MetaTagDescription+'","'+statUs+'","'+MetaTagKeywords+'",NOW(),NOW())',
        //   (error,results)=>{
        //       if(error){
        //         response.json({status:'1',error:'All fields are Error'+error});
        //       }else{
        //         if(request.files.uploads){
        //           mv(tem_path,target_apth,function(err){
        //             if (err) throw err;
        //             response.end();
        //           })
        //         }
        //         response.json({status:'0',error:'Add Catergory Successfully '});
        //       }
        //   }
        // )
      }else{
        response.json({status:'error',error:'All fields are mandatory'});
      }
      return response;
  });
    return router
}

module.exports = createRouter;
