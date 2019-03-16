const exjwt = require('express-jwt');
const jwt_decode = require('jwt-decode');
const jwtSecret = '&DqJd-M%PS!Kx8FU7q28+x=GR_Wc9A+8T?%X9!CLYZf7ky-$jTmsVzxaeK9z=wM#Jx7H#U87SGfmKsFTg#UhLBndFCDtPt?#gLWSLgAR@x3@UJs%e9LM4&EfAUEd^U?T';
module.exports =
    {
        jwtSecret,
        "jwtMW": exjwt({
            secret: jwtSecret
        }),
        jwtExpiration: 129600,
        getToken: (req) => jwt_decode(req.headers.authorization.split(' ')[1]),
    };