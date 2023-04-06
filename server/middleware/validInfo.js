module.exports = function(req, res, next) {
    const { email, firstName, lastName, password } = req.body;

    function validEmail(userEmail) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, firstName, lastName, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
      else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }

    else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
      else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    next();
};