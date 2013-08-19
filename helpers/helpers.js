function helpers(){
  return function(req, res, next){
    res.locals.flash_show = function(){
      type = Object.keys(res.locals.flash).first()
      if (type) {
        return '<div class="alert alert-'+type+'"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+res.locals.flash[type]+'</div>'
      } else {
        return undefined;
      }
    }
    next();
  };
};
module.exports = helpers;
