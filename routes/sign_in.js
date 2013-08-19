
/*
 * routes for authentication
 */

var User = require('./../models/user')

exports.show = function(req, res){
  res.render('sign_in', { title: 'Signin', message: req.flash('info') });
}

exports.create = function(req, res){
	data = req.body.user
	console.log(data);
  var current_user = User.findOne({email: data['email'], password: data['password']}, function(err, obj){
    if (err) console.log(err);
    else if (obj){
      res.send('login successfully !') 
    }
    else {
			req.flash('danger', '用户名或密码错误！');
      res.redirect('/sign_in'); 
    };
  })
}
