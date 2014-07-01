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

ConnectMail.prototype.mailReceived = function(mail) {
    var middlewares = this.middlewares;

    mail.accept = function() {
        console.log('mail %s accepted',this.id);
    };
    mail.reject = function() {
        console.log('mail %s rejected',this.id);
    };
    
    function runMiddleWare( idx ){
        if (idx === middlewares.length){
            //no more middlewares, stop execution
            return;
        }

        var mdw = middlewares[idx];
        var next = runMiddleWare.bind(null,idx+1); 
        mdw(mail,next);
    }

    runMiddleWare(0);
};

ConnectMail.prototype.listen = function() {

    this.server.on('mail', this.mailReceived.bind(this));

    this.server.listen();


};

ConnectMail.prototype.use = function(middleware) {
    this.middlewares.push(middleware);
    if (middleware.install) {
        middleware.install(this);
    }
};

module.exports = ConnectMail;
