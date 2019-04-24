module.exports = {
  checkRole: (role)=> {
    return (req,res,next) =>{
      if(req.user && req.user.role === role) next()
      else res.redirect("/auth/login")
    }
  }
}

// checkMovie: (dateType) => {
//   if(req.user.dateType === dateType) next()
// }
