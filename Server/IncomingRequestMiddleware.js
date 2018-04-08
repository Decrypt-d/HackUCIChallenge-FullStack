function paramConversion(parameter)
{
    return parameter.replace(/%22/g,"").replace(/%40/g,"@");
}

function IncomingRequestMiddleware(req,res,next){
    var data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end',function()
    {
        console.log(data);
        const d = data.split("=");
        req.body = {};
   
        for (let i = 0; i < d.length; ++i)
        {
            d[i] =  paramConversion(d[i]);
            console.log(d[i]);
        }
        if (d[0] === "email")
            req.body.email = d[1];
        return next();
    })
}

module.exports = IncomingRequestMiddleware;