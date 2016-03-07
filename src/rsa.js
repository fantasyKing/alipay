/**
 * Created on 12/4/15.
 */

import ursa from 'ursa';

/**
 *
 * @param source [String] raw string to be encrypt.
 * @param publicKey [Buffer] public key buffer. (eg. new Buffer('publicKeyString', 'utf8') or
 * fs.readFileSync('/path/to/public.pem'))
 * @returns [String] encrypted base64 string.
 */
const rsaEncrypt = (source, publicKey) => {

  const crt = ursa.createPublicKey(publicKey);
  return crt.encrypt(source, 'utf8', 'base64');
};

/**
 *
 * @param source [String] encrypted base64 string.
 * @param privateKey [Buffer] private key buffer. (eg. new Buffer('privateKeyString', 'utf8') or
 * fs.readFileSync('/path/to/private.pem'))
 * @returns [String] decrypted raw string.
 */
const rsaDecrypt = (source, privateKey) => {

  const key = ursa.createPrivateKey(privateKey);
  return key.decrypt(source, 'base64', 'utf8');
};

/**
 *
 * @param source [String] raw string to be sign.
 * @param privateKey [Buffer] private key buffer. (eg. new Buffer('privateKeyString', 'utf8') or
 * fs.readFileSync('/path/to/private.pem'))
 * @returns [String] signed and base64 encoded string
 */
const rsaSign = (source, privateKey) => {

  const key = ursa.createPrivateKey(privateKey);
  console.log('reaSign privateKey = ', privateKey, '; key = ', key);
  const signer = ursa.createSigner('sha1');
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
const rsaVerify = (source, publicKey, signature) => {

  const crt = ursa.createPublicKey(publicKey);
  const verifier = ursa.createVerifier('sha1');
  verifier.update(source, 'utf8');
  return verifier.verify(crt, signature, 'base64');
};

export default {rsaEncrypt, rsaDecrypt, rsaSign, rsaVerify};