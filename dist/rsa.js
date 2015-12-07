'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ursa = require('ursa');

var _ursa2 = _interopRequireDefault(_ursa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param source [String] raw string to be encrypt.
 * @param publicKey [Buffer] public key buffer. (eg. new Buffer('publicKeyString', 'utf8') or
 * fs.readFileSync('/path/to/public.pem'))
 * @returns [String] encrypted base64 string.
 */
var rsaEncrypt = function rsaEncrypt(source, publicKey) {

  var crt = _ursa2.default.createPublicKey(publicKey);
  return crt.encrypt(source, 'utf8', 'base64');
};

/**
 *
 * @param source [String] encrypted base64 string.
 * @param privateKey [Buffer] private key buffer. (eg. new Buffer('privateKeyString', 'utf8') or
 * fs.readFileSync('/path/to/private.pem'))
 * @returns [String] decrypted raw string.
 */
/**
 * Created on 12/4/15.
 */

var rsaDecrypt = function rsaDecrypt(source, privateKey) {

  var key = _ursa2.default.createPrivateKey(privateKey);
  return key.decrypt(source, 'base64', 'utf8');
};

/**
 *
 * @param source [String] raw string to be sign.
 * @param privateKey [Buffer] private key buffer. (eg. new Buffer('privateKeyString', 'utf8') or
 * fs.readFileSync('/path/to/private.pem'))
 * @returns [String] signed and base64 encoded string
 */
var rsaSign = function rsaSign(source, privateKey) {

  var key = _ursa2.default.createPrivateKey(privateKey);
  var signer = _ursa2.default.createSigner('sha1');
  signer.update(source, 'utf8');
  return signer.sign(key, 'base64');
};

/**
 *
 * @param source [String] raw string to be verify
 * @param publicKey [Buffer] public key buffer. (eg. new Buffer('publicKeyString', 'utf8') or
 * fs.readFileSync('/path/to/public.pem'))
 * @param signature [String] signed base64 string
 * @returns [Boolean] verify result
 */
var rsaVerify = function rsaVerify(source, publicKey, signature) {

  var crt = _ursa2.default.createPublicKey(publicKey);
  var verifier = _ursa2.default.createVerifier('sha1');
  verifier.update(source, 'utf8');
  return verifier.verify(crt, signature, 'base64');
};

exports.default = { rsaEncrypt: rsaEncrypt, rsaDecrypt: rsaDecrypt, rsaSign: rsaSign, rsaVerify: rsaVerify };