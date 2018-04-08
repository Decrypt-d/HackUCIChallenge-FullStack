const express = require('express');
const app = express();
const validator = require('validator')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const IncomingRequestMiddleware = require(__dirname + "/IncomingRequestMiddleWare.js");
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const adapter = new FileSync('db.json');
const db = low(adapter);


function checkDupInEmailList(email)
{
    const emailList = db.get("Emails").value();
    for (let i = 0; i < emailList.length; ++i)
        if (emailList[i] == email)
            return false;
    return true;
}


//Entry Point Number 1. POST request to update database
app.post("/api/addEmail", (req,res) =>{
    console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!req.body || req.body.email == null || !req.body.email )
    {
        res.status(400).send("Parameter email was not sent with the request body");
        return;
    }
    if (validator.isEmail(req.body.email) === false)
    {
        res.status(400).send("Invalid email address");
        return;
    }
    if (!checkDupInEmailList(req.body.email))
    {
        res.status(400).send("Duplicate Email Entry");
        return;
    }
    db.get('Emails').push(req.body.email).write();
    res.status(200).send("Email successfully added to database");
});


function createEmailCommaSeparatedString()
{
    const emailList = db.get('Emails').value();
    return new Promise((resolve,reject) => {
        let toSend = "";
        for (let i = 0; i < emailList.length; ++i)
            toSend += emailList[i] + ",";
        toSend = toSend.substring(0,toSend.length - 1);
        resolve(toSend);
    })
}


//Entry point 2 for getting emails in database
app.get("/api/getEmails",(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    createEmailCommaSeparatedString().then(
        toSend => res.status(200).send(toSend)
    )
})

const port = process.env.Server_Port || 3000;
app.listen(port, () => {console.log("Server Started")});