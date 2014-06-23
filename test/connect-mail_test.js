/*
 * connect-mail
 * https://github.com/parroit/connect-mail
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var connect-mail = require('../lib/connect-mail.js');

describe('connect-mail module', function(){
  describe('#awesome()', function(){
    it('should return a hello', function(){
      connect-mail.awesome('livia').should.equal("hello livia");
    });
  });
});
