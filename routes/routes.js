const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res) => {

res.redirect("/main");

});

router.get("/login", (req, res) => {
res.render("index");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
  })
);
// main----------------------------------------------------------
router.get("/main", (req, res) => {
    res.render("main");
});

router.post("/signout",(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})
//----------------------------------------------------------------------------------------------------


const IsLogin = (req,res,nex) =>{




}




module.exports = router;
