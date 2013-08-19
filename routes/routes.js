
/*
 * GET home page.
 */

exports.index = function(req, res){
  // req.flash('info', 'Flash is back!')
  res.render('index', { title: 'Express Index' });
};

exports.about = function(req, res){
	res.render('index', { title: 'About' })
}

