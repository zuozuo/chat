var User = require('./../models/user')

exports.show = function(req, res){
	res.render('sign_up', { title: 'Singup' })
};

exports.create = function(req, res){
	data = req.body
  req.assert(['user', 'username'], 'required').notEmpty();
  req.assert(['user', 'email'], 'required').notEmpty();
  req.assert(['user', 'password'], 'required').notEmpty();
  var errors = req.validationErrors();
  console.log(errors);
  
	user = User.findOne({email: data.email}, 
		function(err, obj){
			if (err) 
				console.log(err);
			else if (obj) {
        req.flash('danger', "邮箱已存在。")
				res.redirect('/sign_up')
      }
			else {
				User.create([data], function(err, jellybean, snickers){
					if (err) console.log(err);
					else {
						res.render('index', { title: 'index' })
					}
				})
			}
		}
	)
};
