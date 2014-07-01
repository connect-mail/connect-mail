# connect-mail [![Build Status](https://secure.travis-ci.org/parroit/connect-mail.png?branch=master)](http://travis-ci.org/parroit/connect-mail) [![NPM version](https://badge-me.herokuapp.com/api/npm/connect-mail.png)](http://badges.enytc.com/for/npm/connect-mail) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/parroit/connect-mail/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

> like http://www.senchalabs.org/connect/ but for emails

#Status: this is just a skeleton used while I'm writing documentation and designing the public API


## Getting Started
Install the module with: `npm install connect-mail`

```javascript
var cm = require('connect-mail');
var simplesmtp = require("simplesmtp");
    
var smtp = simplesmtp.createServer();
var app = cm(smtp);

app.use(function(req, res){
    //accept all mails for me
    if (req.to === 'me@parro.it'){
        res.accept();
    } else { 
        //rejects all other ones
        res.reject();
    }

});

app.listen(25);



```

###Authorize a user

```javascript
var cm = require('connect-mail');
var simplesmtp = require("simplesmtp");
    
var smtp = simplesmtp.createServer();
var app = cm(smtp);

app.use(function authorize(req, res){
    req.on ('authorizeUser' , function(connection, username, password, callback){
        if (username === 'you' && password === 'password') {
            req.user = {
                name: 'you'
            };
            //user authenticate successfully
            callback(null,true);
        } else {
            //authentication failed
            callback(null,false);
        }
    });
    
});


app.use(function(req, res){
    //accept all mails for me
    if (req.to === 'me@parro.it'){
        res.accept();
    } else { 
        //rejects all other ones
        res.reject();
    }

});

app.listen(25);



```

## Middlewares

* [*cm-diskdump*](https://github.com/connect-mail/cm-diskdump) a connect-mail middleware that save mails to disk.
* [*cm-diskdump*](https://github.com/connect-mail/cm-diskdump) a connect-mail middleware that authenticate senders using a [*json users storage*](https://github.com/connect-mail/jsonusersstorage).

## Tools

We use [slush](https://github.com/slushjs) as our scaffolding system. We have a 
[generator to create cm apps](https://github.com/connect-mail/slush-cmapp) and [one to
create cm middlewares](https://github.com/connect-mail/slush-cmmid)


## Contributing

Please submit all issues and pull requests to the [parroit/connect-mail](http://github.com/parroit/connect-mail) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/parroit/connect-mail/issues).

## License 

The MIT License

Copyright (c) 2014, Andrea Parodi

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

