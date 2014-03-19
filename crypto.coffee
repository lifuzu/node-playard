crypto = require 'crypto'

module.exports = class Hash

	constuctor: (key) ->
		@key = key

	# instance methods
	encrypt: (string) =>
		cipher = crypto.createCipher 'aes-256-cbc', @key
		crypted = cipher.update string, 'utf8', 'hex'
		crypted += cipher.final 'hex'
		return crypted

	decrypt: (string) =>
		decipher = crypto.createDecipher 'aes-256-cbc', @key
		dec = decipher.update string, 'hex', 'utf8'
		dec += decipher.final 'utf8'
		return dec

	# class methods
	@md5: (string) ->
		crypto.createHash('md5').update(string).digest('hex')

console.log(Hash.md5('hello'))
#hash = Hash('key')
#hash.encrypt("world")
#console.log(hash.decrypt(hash.encrypt("world")))