var express = require("express");
var exe = require("./db");
var router = express.Router();
var mail = require("./send_mail")

router.get("/",async function(req,res){

    var intro = await exe(`SELECT * FROM introduction `);
    var qualification = await exe(`SELECT * FROM qualification `);
    var skills = await exe(`SELECT * FROM skills `);
    var project = await exe(`SELECT * FROM project`);
    var obj = {"intro":intro[0],"qualification":qualification,"skills":skills,"project":project};
    
    res.render("user/home.ejs",obj);
});

router.post("/save_contact_details",async function(req,res){
    
    var d = req.body;

   var str = `

            <h1>Portfoio Update <br></h1>
            Name : ${d.name}<br>
            Email : ${d.email}<br>
            Message :<i> ${d.message}</i><br>

          `;

          var data = await mail(str);
    res.redirect("/")
})
module.exports = router;