const mongo = require( "mongodb" ).MongoClient;
const assert = require( "assert" );
const md5 = require( "md5" );
const jws = require( "jsonwebtoken" );
const fs = require( "mz/fs" );
const rsa = require( "node-rsa" );
const atob = require( "atob" );

require( "dotenv" ).config( { path: "../variables.env" } );

exports.validateRegister = ( req, res, next ) => {
    req.checkBody( "username", "Please supply a username." ).notEmpty();
    req.sanitizeBody( "username" );
    /* req.checkBody( "email", "Please supply a valid email address." ).isEmail();
    req.sanitizeBody( "email" ).normalizeEmail( {
        remove_dots            : false,
        remove_extension       : false,
        gmail_remove_subaddress: false,
    } ); */
    req.checkBody( "password", "Please supply a password." ).notEmpty();
    req.checkBody( "password_confirm", "Please supply a confirm password." ).notEmpty();
    req.checkBody( "password_confirm", "Your passwords do not match." ).equals( req.body.password );

    const errors = req.validationErrors();
    if ( errors ) {
        req.flash( "error", errors.map( err => err.msg ) );
        res.render( "register", {
            title   : "Register",
            username: req.body.username,
            flashes : req.flash(),
        } );
        return next( new Error( "Validation Error" ) );
    }
    return next();
};

exports.register = async ( req, res, next ) => {
    const db = await mongo.connect( process.env.DATABASE );

    const username = await db.collection( "users" ).findOne( { username: req.body.username } );
    if ( username !== null ) {
        req.flash( "error", "This username has already been registered." );
        res.render( "register", {
            title           : "Register",
            username        : req.body.username,
            password        : req.body.password,
            password_confirm: req.body.password_confirm,
            flashes         : req.flash(),
        } );
        db.close();
        return next();
    }

    const userDocument = {
        username: req.body.username.trim(), // unique
        // email: req.body.email.trim().toLowerCase(), validator.isEmail(), unique
        password: md5( req.body.password ),
        cards   : [],
        settings: {},
    };

    const response = db.collection( "users" ).insertOne( userDocument );
    if ( response.result.ok != 1 ) {
        req.flash( "error", "Account could not be registered." );
        res.render( "register", {
            title           : "Register",
            username        : req.body.username,
            password        : req.body.password,
            password_confirm: req.body.password_confirm,
            flashes         : req.flash(),
        } );
        return next();
    }

    req.flash( "success", "Your account has been successfully registered." );
    req.registered = true;
    return next();
};

exports.login = async ( req, res, next ) => {
    const db = await mongo.connect( process.env.DATABASE );

    const privateKeyFile = await fs.readFile( "./private-key.pem" );
    const privateKey = new rsa();
    privateKey.importKey( privateKeyFile, "pkcs1-private-pem" );

    const username = req.query.username;
    let password = req.query.password;
    password = atob( password );
    password = privateKey.decrypt( password, "utf8" );
    password = md5( password );

    const docs = await db.collection( "users" ).find( { username } ).toArray();
    if ( !docs || docs.length === 0 ) {
        return next( null, false, { message: "Incorrect username." } );
    }
    if ( docs[0].password !== password ) {
        return next( null, false, { message: "Incorrect password." } );
    }
    console.log( `Found user: ${username}` );
    db.close();

    const token = await jws.sign( { username: req.query.username }, process.env.SECRET );
    req.flash( "success", "You successfully logged in." );
    res.json( token );
};

/* exports.isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    
    req.flash( "error", "You must be logged in to visit this page." );
    res.redirect( "back" );
}; */
