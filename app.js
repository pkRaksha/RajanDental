const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");


const app=express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/patientListDB",{useNewUrlParser:true});


const plistSchema={
    name:String,
    Phone:String,
    date:String,
    time:String

}


const Patient=mongoose.model("Patient",plistSchema);




app.get("/",function(req,res){
    res.render("list");

})




app.post("/",function(req,res){
    console.log(req.body)


    const SavePatient=new Patient({name:req.body.patientName,

         Phone:req.body.patientNumber,
         date:req.body.appointmentDate,
         time:req.body.appointmentTime
    })
    SavePatient.save(function(err,SavePatient){
        if(err) throw err
        res.render("list");

    })
   

    })




   


app.listen(3000,function(){
    console.log("Server started in port 3000")
})