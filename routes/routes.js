const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/",(req,res,next) =>{

    const login = req.session.login;

        if (login) {
            console.log(req.session);
            next();
        } else {
            res.render("index");
            return;
        }
    },
    (req, res) => {

    res.render('./main')

});

router.get("/login", (req, res) => {
res.render("Login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),(req, res)=>{
        console.log(res)
        req.session.login = true;
        res.redirect('./main')
    }
);
// main----------------------------------------------------------
router.get("/main",(req,res,next) =>{

    const login = req.session.login;

    if(!login){
        res.status(401).send({ error: `Es nesesario estar Logeado!` });
        return;
    }
    //console.log(req.session);
    next();

}, (req, res) => {
    res.render("main");
});

router.post("/signout",(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})
//----------------------------------------------------------------------------------------------------





module.exports = router;
