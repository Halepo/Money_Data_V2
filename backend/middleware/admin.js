const isAdmin = (req, res, next) => {
    if (req.company.role != "admin") {
        return res.status(403).send('Access denied.');
    }
    next();
};

module.exports = { isAdmin };