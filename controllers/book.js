const checkRoute = (req, res) => {
    res.json({
        success : true,
        message : "book route is working"
    })
}


module.exports = {checkRoute}