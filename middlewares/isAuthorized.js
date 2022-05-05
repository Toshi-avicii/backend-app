const isAuthorized = (roles) => {
    return function(req, res, next) {
        if(roles.includes(req.role) === true) {
            next();
        } else {
            res.status(401).json({
                msg: 'Operation not allowed'
            })
        }
    }
}  

module.exports = isAuthorized;