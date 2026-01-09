async function healthcheck(req,res){
    return res.send("Everything is ok")
}

module.exports = healthcheck;