const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log('token :',token);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};

// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//         console.log('Authorization header missing');
//         return res.status(401).json({ error: true, message: 'Access denied, token missing!' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         console.log('Token missing from Authorization header');
//         return res.status(401).json({ error: true, message: 'Access denied, token missing!' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         console.log('Token verification failed', err.message);
//         return res.status(400).json({ error: true, message: 'Invalid token' });
//     }
// }

// module.exports = {authenticateToken};
