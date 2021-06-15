var express = require('express');
var router = express.Router();
var mysql= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodedemo'
});

connection.connect(function(err)
{
  if(!err)
  {
    console.log("DB connected")
  }
  else
  {
    console.log("DB conected issue")
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRUD OPERATION' });
});


router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact',);
});

router.get('/master', function(req, res, next) {
  res.render('master');
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add-process', function(req, res, next) {
  console.log(req.body);

  const mybodydata=
  {
    room_type : req.body.txt1,
    room_details : req.body.txt2,
    room_price : req.body.txt3,
  }

  connection.query("insert into tbl_room set ?",mybodydata,function(err,result){
       if(err) throw err;
       res.redirect('/add')
  });


});

router.get('/display', function(req, res, next) {
  
  connection.query("select * from tbl_room",function(err,db_rows)
  {
     if(err) throw err;
     console.log(db_rows);
     res.render('display',{db_rows_array:db_rows});
     
  });
});

//delete route

router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  console.log(deleteid);
  connection.query("delete  from tbl_room where room_id = ? ",[deleteid],function(err,db_rows)
  {
     if(err) throw err;
     console.log(db_rows);
     res.redirect('/display');
     
  });
});


//edit route
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  console.log(editid);
  connection.query("select * from tbl_room where room_id = ? ",[editid],function(err,db_rows)
  {
     if(err) throw err;
     console.log(db_rows);
     res.render('edit',{db_rows_array:db_rows});
     
  });
});

// route
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  var rtype=req.body.txt1;
  var rdetails=req.body.txt2;
  var rprice=req.body.txt3;

   connection.query(" update tbl_room set room_type = ?,room_details=?,  room_price=? where room_id=?",[rtype,rdetails,rprice,editid],function(err,db_rows)
  {
     if(err) throw err;
     res.redirect('/display');
  });
});

module.exports = router;





