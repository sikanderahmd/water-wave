var express = require("express");
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: false}));
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



 const sql = require('mssql/msnodesqlv8');


 var config = {
     database: 'master',
     server: 'SIKANDER', 
     driver: 'msnodesqlv8',
     options : {
         trustedConnection: true
     }
 };

 sql.connect(config, function(err){
    if(err){
        console.log(err);
    }
    else {
        let request = new sql.Request();
        request.query("select * from Cooler_Info", function(err, recordSet){
            if(err){
                console.log(err);
            } else {
                let data = recordSet.recordset;
                let name = recordSet.recordset[0]
                 console.log(Number(new Date().getTime().toString().slice(6)));
                // console.log(name);
            }
        });
    }
})


app.get("/", (req, res) => {
 res.render('index');
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/allWaterCoolers", (req, res) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select * from Cooler_Info', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Cooler_ID']
                    console.log(data);
                    console.log(name);
                    res.render('allWaterCoolers', { data: data, name: name });
                }
            });
        }
    })
 
});



//Login form
//============================================================

app.get("/login", (req, res) => {
    res.render("login");
  });

  
app.post("/login", (req, res) => {
   
})
//=============================================================



//Volunteer form
//==============================================================

app.get("/volunteer", (req, res) => {
res.render("volunteer");
});


app.post("/volunteer", (req, res) => {

    let volunteer_id = Number(new Date().getTime().toString().slice(6));
    var dbConn = new sql.connect(config,  
        function(err) {  
            var myTransaction = new sql.Transaction(dbConn);  
            myTransaction.begin(function(error) {  
                var rollBack = false;  
                myTransaction.on('rollback',  
                    function(aborted) {  
                        rollBack = true;  
                    });  
                new sql.Request(myTransaction)  
                    .query(`INSERT INTO Volunteer_Info ([Volunteer_ID],[Volunteer_Email],[Volunteer_Name],[Volunteer_Password]) VALUES ('${volunteer_id}', '${req.body.email}', '${req.body.name}', '${req.body.password}')`,  
                        function(err, recordset) {  
                            if (err) {  
                                if (!rollBack) {  
                                    myTransaction.rollback(function(err) {  
                                        console.dir(err);  
                                    });  
                                }  
                            } else {  
                                myTransaction.commit().then(function(recordset) {  
                                    console.log('Data is inserted successfully!');  
                                }).catch(function(err) {  
                                    console.log('Error in transaction commit ' + err);  
                                });  
                            }  
                        });  
            });  
        });
        res.redirect('/login');
});


//================================================================

//Donate form
//==============================================================

app.get("/donate", (req, res) => {
res.render("donate");
});

app.post("/donate", (req, res) => {

    let donor_id = Number(new Date().getTime().toString().slice(6));
    var dbConn = new sql.connect(config,  
        function(err) {  
            var myTransaction = new sql.Transaction(dbConn);  
            myTransaction.begin(function(error) {  
                var rollBack = false;  
                myTransaction.on('rollback',  
                    function(aborted) {  
                        rollBack = true;  
                    });  
                new sql.Request(myTransaction)  
                    .query(`INSERT INTO Donor_Info ([Donor_ID],[Donor_Email],[Donor_Name],[Donor_Password]) VALUES ('${donor_id}', '${req.body.email}', '${req.body.name}', '${req.body.password}')`,  
                        function(err, recordset) {  
                            if (err) {  
                                if (!rollBack) {  
                                    myTransaction.rollback(function(err) {  
                                        console.dir(err);  
                                    });  
                                }  
                            } else {  
                                myTransaction.commit().then(function(recordset) {  
                                    console.log('Data is inserted successfully!');  
                                }).catch(function(err) {  
                                    console.log('Error in transaction commit ' + err);  
                                });  
                            }  
                        });  
            });  
        });
    res.redirect('/login');
})

//======================================================================


app.get("/admin_panel", (req, res)=>{
    res.render("admin_panel");
});

app.get("/allVolunteers", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select * from Volunteer_Info', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Volunteer_Name']
                    console.log(data);
                    console.log(name);
                    res.render('allVolunteers', { data: data, name: name });
                }
            });
        }
    })

});

app.post('/allVolunteers', (req, res) => {
    const volunteerID = req.body.Volunteer_ID
    console.log(volunteerID);
    res.redirect("/login");

})

app.get("/allDonors", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select * from Donor_Info', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Donor_Name']
                    console.log(data);
                    console.log(name);
                    res.render('allDonors', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/allCoolers", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select * from Cooler_Info', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Cooler_ID']
                    console.log(data);
                    console.log(name);
                    res.render('allCoolers', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/allDonationHistory", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select Donation_Type, Donation_worth, Donation_Time, Donor_Name from Donation, Donor_Info where Donor_Info.Donor_ID=Donation.Donor_ID', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Donation_Type']
                    console.log(data);
                    console.log(name);
                    res.render('allDonationHistory', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/MaintainenceTeamInfo", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select name, email, Role_Title from Maintenance_Team_Info, Maintenance_Team_Role where maintenance_team_role.Role_ID=maintenance_team_info.Role_ID', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('MaintainenceTeamInfo', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/CoolerRefilling", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query("select Cooler_Model, Area_Name, Street from Cooler_Info, Cooler_Locations, locations, Cooler_Refill_Requirement where Refill_Required='1' and Cooler_Area_ID=Area_Code and Cooler_Info.Cooler_ID=Cooler_Locations.Cooler_ID and Cooler_Info.Cooler_ID=Cooler_Refill_Requirement.Cooler_ID", function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('CoolerRefilling', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/CoolerMaintainence", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query("select Cooler_Model, Area_Name, Street from Cooler_Info, Cooler_Locations, locations, Maintenance_status where Maintenance_Required='1' and Cooler_Area_ID=Area_Code and Cooler_Info.Cooler_ID=Cooler_Locations.Cooler_ID and Cooler_Info.Cooler_ID=Maintenance_status.Cooler_ID", function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('CoolerMaintainence', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/CoolersPerArea", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select Area_Name, count(cooler_id) from Locations, Cooler_Locations where Cooler_Area_ID=Area_Code group by Area_Name', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['Area_Name']
                    console.log(data);
                    console.log(name);
                    res.render('CoolersPerArea', { data: data, name: name });
                }
            });
        }
    })

});


app.get("/CoolerInstallation", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select Cooler_make, Cooler_Model, Cooler_Company, Cooler_Capacity, Area_Name, Volunteer_Name from Cooler_Installation, Cooler_Info, Cooler_Locations, locations, Volunteer_Info where Cooler_Info.Cooler_ID=Cooler_Installation.Cooler_ID and Cooler_Installation.Cooler_ID=Cooler_Locations.Cooler_ID and Cooler_Area_ID=Area_Code and Cooler_Installation.Installed_By=Volunteer_Info.Volunteer_ID', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('CoolerInstallation', { data: data, name: name });
                }
            });
        }
    })

});

app.get("/DonationReminder", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query("select Donor_Name,Last_Donation_Date from Donation_Checkup,Donor_Info where Donation_Checkup.Donor_ID=Donor_Info.Donor_id and Last_Donation_Date<='2022-05-29'", function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('DonationReminder', { data: data, name: name });
                }
            });
        }
    })

});


app.get("/MaintainenceHistory", (req, res) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        }
        else {
            let request = new sql.Request();
            request.query('select Cooler_make, Cooler_Model, Cooler_Company, Cooler_Capacity, name, maintenance_date from cooler_info, Cooler_Maintenance, Maintenance_Team_Info where Cooler_Maintenance.Cooler_ID=Cooler_Info.Cooler_ID and Cooler_Maintenance.Maintained_By=Maintenance_Team_Info.ID', function(err, recordSet){
                if(err){
                    console.log(err);
                } else {
                    let data = recordSet.recordset;
                    let name = recordSet.recordset[0]['EmpName']
                    console.log(data);
                    console.log(name);
                    res.render('MaintainenceHistory', { data: data, name: name });
                }
            });
        }
    })

});

app.get('/RegisterCoolerForm', (req, res) => {
    res.render('RegisterCoolerForm');
})

app.post('/RegisterCoolerForm', (req, res) => {
  
    let cooler_id = Number(new Date().getTime().toString().slice(6));
    var dbConn = new sql.connect(config,  
        function(err) {  
            var myTransaction = new sql.Transaction(dbConn);  
            myTransaction.begin(function(error) {  
                var rollBack = false;  
                myTransaction.on('rollback',  
                    function(aborted) {  
                        rollBack = true;  
                    });  
                new sql.Request(myTransaction)  
                    .query(`INSERT INTO Cooler_Info (Cooler_ID,Cooler_Company,Cooler_Capacity,Cooler_make,Cooler_Model) VALUES ('${cooler_id}', '${req.body.coolerManu}', '${req.body.coolerCapacity}', '${req.body.coolerMake}', '${req.body.coolerModel}')`,  
                        function(err, recordset) {  
                            if (err) {  
                                if (!rollBack) {  
                                    myTransaction.rollback(function(err) {  
                                        console.dir(err);  
                                    });  
                                }  
                            } else {  
                                myTransaction.commit().then(function(recordset) {  
                                    console.log('Data is inserted successfully!');  
                                }).catch(function(err) {  
                                    console.log('Error in transaction commit ' + err);  
                                });  
                            }  
                        });  
            });  
        });

  res.redirect('/admin_panel');

})

app.listen("4501", function() {
    console.log("node server listening at port : 4501");
});