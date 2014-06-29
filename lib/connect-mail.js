/*
 * connect-mail
 * https://github.com/parroit/connect-mail
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

//var EventEmitter = require('events').EventEmitter;

function ConnectMail(server){
    if (! (this instanceof ConnectMail) ) {
        return new ConnectMail(server);
    }

    this.server = server;
    this.middlewares = [];
}

ConnectMail.prototype.authorize = function(authorizer){
    this.authorizer = authorizer;
    if ( authorizer.install )  {
        authorizer.install(this);
    }
};

ConnectMail.prototype.listen = function(){
    this.server.listen(25);
    console.log('connect mail is listening on port 25');
};

ConnectMail.prototype.use = function(middleware){
    this.middlewares.push(middleware);
    if ( middleware.install ) {
         middleware.install(this);
    }
};

module.exports = ConnectMail;