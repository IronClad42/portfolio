var express = require("express");
var exe = require("./db");
var router = express.Router();

router.get("/",function(req,res){
    res.render("admin/home.ejs");
});


router.get("/introduction",async function(req,res){

    var data = await exe(`SELECT * FROM introduction`);
    var obj = {"intro":data[0]}
    res.render("admin/introduction.ejs",obj);
});

router.post("/save_information",async function(req,res){






    if(req.files){

        if(req.files.user_photo){

            var user_photo = new Date().getTime()+req.files.user_photo.name;
            req.files.user_photo.mv("public/"+user_photo);
            var sql = `UPDATE introduction SET user_photo = '${user_photo}' WHERE intro_id = 1 `;
            var data = await exe(sql);
        }
        if(req.files.resume){
            var resume = new Date().getTime()+req.files.resume.name;
            req.files.resume.mv("public/"+resume);
            var sql = `UPDATE introduction SET resume = '${resume}' WHERE intro_id = 1 `
            var data = await exe(sql);
        }
    }
    
    

    var d = req.body;

    if (d.about_details) 
    {
        d.about_details = d.about_details.replaceAll("'", "\\'");
    }

    var sql = `UPDATE  introduction SET
                    
                user_name = '${d.user_name}', 
                user_tagline = '${d.user_tagline}', 
                user_mobile = '${d.user_mobile}', 
                user_email = '${d.user_email}', 
                linkedin = '${d.linkedin}',
                instagram_link = '${d.instagram_link}',
                facebook_link = '${d.facebook_link}',
                twitter_link = '${d.twitter_link}',
                about_details = '${d.about_details}'
               

                WHERE intro_id = 1



              `;

    var data = await exe(sql);
    // res.send(req.body);
    res.redirect("introduction");
});

router.get("/education",async function(req,res){

    var data = await exe(`SELECT * FROM qualification`);
    var obj =   {"list":data};
    // res.render("admin/education.ejs",{"list":data}); // => pass the obj in shortcut from
    res.render("admin/education.ejs",obj);

});

router.post("/save_education",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO qualification(qualification_name , university , passing_year , parcentage)VALUES
                                ('${d.qualification_name}' , '${d.university}' , '${d.passing_year}' , '${d.parcentage}' )`;



     var data = await exe(sql);
    //  res.send(req.body);
    res.redirect("/admin/education")
});


router.get("/skills",async function(req,res){

    var data = await exe(`SELECT * FROM skills`);
    
    // var obj = {"skills_list":data};
    // res.render("admin/skills.ejs",obj);

    res.render("admin/skills.ejs",{"skills":data})
})

router.post("/save_skill",async function(req,res){

    var skill_image = '';

    if(req.files){
        if(req.files.skill_image){

            skill_image = new Date().getTime()+req.files.skill_image.name;
           req.files.skill_image.mv("public/"+skill_image);
   
       }  
    }

    var b = req.body;

    var sql = `INSERT INTO skills(skill_image , skill_title)VALUES ('${skill_image}' , '${b.skill_title}')`;
   
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/skills")
})

router.get("/project",async function(req,res){

    var data = await exe(`SELECT * FROM project`);
    
    var obj = {"project":data}

    res.render("admin/project.ejs",obj);
});
router.post("/project", async function (req, res) {
    // if (req.files && req.files.upload_image) {
    //     var new_name = new Date().getTime() + req.files.upload_image.name;
    //     req.files.upload_image.mv("public/" + new_name, async function (err) {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }

    //         // Insert project data
    //         var s = `INSERT INTO project(upload_image , project_information) VALUES ('${new_name}' , '${req.body.project_information}')`;

    //         // Assuming exe is a function to run the SQL query
    //         var data = await exe(s);

    //         res.redirect("/admin/project");
    //     });
    // } else {
    //     res.status(400).send("No file uploaded.");
    // }


    if(req.files)
    {
        if(req.files.upload_image)
        {
            var new_name = new Date().getTime()+req.files.upload_image.name;
            req.files.upload_image.mv("public/"+new_name);
        }
    }

     var s = `INSERT INTO project(upload_image , project_information) VALUES ('${new_name}' , '${req.body.project_information}')`;
    //  var data = await exe(s);
     res.redirect("/admin/project");

});


router.get("/edit/:id", async (req, res) => {
    // Render an edit page or handle edit functionality

    var id = req.params.id
    var s = `SELECT * FROM project  WHERE project_id = '${id}'`;

    var data = await exe(s);
    
    var obj = {"info":data[0]}
    res.render('admin/edit.ejs',obj);
});


router.post("/save_contact_details",async function(req,res){

    var id = req.params.id;
    
    var b = req.body;

    
    if(req.files)
        {
            if(req.files.upload_image)
            {
                var new_name = new Date().getTime()+req.files.upload_image.name;
                req.files.upload_image.mv("public/"+new_name);
            }
        }

    var s = `UPDATE  project SET

            project_information = '${b.project_information}',
            upload_image = '${new_name}'

            WHERE project_id = ${id}

            `;

            var data = await exe(s);

            res.send(data)

            // res.redirect("admin/edit")
})
module.exports = router;


//  CREACTE TABLE introduction(intro_id INT PRIMARY KEY AUTO_INCREMENT,
//      user_name VARCHAR(100),
//      user_tagline VARCHAR(200),
//      user_mobile VARCHAR(10),
//      user_email VARCHAR(100),
//      linkedin VARCHAR(200),
//      instagram_link VARCHAR(200),
//      facebook_link VARCHAR(200),
//      twitter_link VARCHAR(200),
//      about_details TEXT,
//          user_photo Text,
//          resume TEXT


//  )



// CREACT TABLE 


// CREATE TABLE qualification(qualification_id INT PRIMARY KEY AUTO_INCREMENT,
//     qualification_name VARCHAR(100),
//     university VARCHAR(100),
//     passing_year INT,
//     parcentage VARCHAR(100)

// )


// CREACT TABLE skills(skill_id INT PRIMARY KEY AUTO_INCREMENT,
//     skill_image Text,
//     skill_title VARCHAR(100)
// )

// CREATE TABLE project(project_id INT PRIMARY KEY AUTO_INCREMENT,
//     upload_image TEXT,
//     project_information TEXT

// )

