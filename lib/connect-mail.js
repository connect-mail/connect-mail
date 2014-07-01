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
    this.errorMiddlewares = [];
}

ConnectMail.prototype.authorize = function(authorizer) {
    this.authorizer = authorizer;
    if (authorizer.install) {
        authorizer.install(this);
    }
};

ConnectMail.prototype.mailReceived = function(mail) {
    var errorMiddlewares    = this.errorMiddlewares;

    mail.accept = function() {
        console.log('mail %s accepted',this.id);
    };
    mail.reject = function() {
        console.log('mail %s rejected',this.id);
    };
    
    function handleMail(middlewares, errorOccurred){
        function runMiddleWare( idx, err ){
            if (err) {
                //an error occurred, switch to error middlewares chain
                return handleMail(errorMiddlewares, err);
            }
            
            if (idx === middlewares.length){
                //no more middlewares, stop execution
                return;
            }

            var mdw = middlewares[idx];
            var next = runMiddleWare.bind(null,idx+1,errorOccurred); 
            
            try {
                mdw(mail,next);    
            } catch (error){
                runMiddleWare( idx, error );
            }  
            
        
        }

        runMiddleWare(0);    
    }

    //start with normal middleware chain
    handleMail(this.middlewares);
    
};

ConnectMail.prototype.listen = function() {

    this.server.on('mail', this.mailReceived.bind(this));

    this.server.listen();


};

ConnectMail.prototype.use = function(middleware) {
    
    if (middleware.install) {
        middleware.install(this);
    }

    if (middleware.length === 2) {
        //this is the signature of a normal middleware
        this.middlewares.push(middleware);    
    } else {
        //this is the signature of an error handler middleware
        this.errorMiddlewares.push(middleware);    
    }
    
};

module.exports = ConnectMail;
