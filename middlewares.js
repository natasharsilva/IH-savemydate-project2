module.exports = {
  checkRole: (role)=> {
    return (req,res,next) =>{
      if(req.user && req.user.role === role) next()
      else res.redirect("/auth/login")
    }
  },

  isLoggedIn: (req,res,next) =>{
    // if user is authenticated in the session, carry on 
    if (req.user && req.user.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/pages/auth/login');
}}


// checkMovie: (dateType) => {
//   if(req.user.dateType === dateType) next()
// }
