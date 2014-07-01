/*
 * connect-mail
 * https://github.com/parroit/connect-mail
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';


function ConnectMail(server) {
    if (!(this instanceof ConnectMail)) {
        return new ConnectMail(server);
    }

    this.server = server;
    this.middlewares = [];
}

ConnectMail.prototype.authorize = function(authorizer) {
    this.authorizer = authorizer;
    if (authorizer.install) {
        authorizer.install(this);
    }
};

ConnectMail.prototype.listen = function() {
    var middlewares = this.middlewares;
    var mw = middlewares[0];
    this.server.on('mail',function(mail){
        mail.accept = function(){};
        mail.reject = function(){};
        mw(mail);
    });

    this.server.listen();


};

ConnectMail.prototype.use = function(middleware) {
    this.middlewares.push(middleware);
    if (middleware.install) {
        middleware.install(this);
    }
};

module.exports = ConnectMail;
