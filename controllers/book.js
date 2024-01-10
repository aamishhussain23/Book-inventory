const checkRoute = (req, res) => {
    res.json({
        success : true,
        message : "Server is working"
    })
}


module.exports = {checkRoute}