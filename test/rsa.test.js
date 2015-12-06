/**
 * Created on 12/4/15.
 */

import rsa from '../lib/rsa';
import chai from 'chai';
import forge from 'node-forge';
import fs from 'fs';
import path from 'path'

let expect = chai.expect;
let assert = chai.assert;


describe('test rsa', () => {

  const pKeypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
  const pPublicKey = new Buffer(forge.pki.publicKeyToPem(pKeypair.publicKey), 'utf8');
  const pPrivateKey = new Buffer(forge.pki.privateKeyToPem(pKeypair.privateKey), 'utf8');

  const publicKey = fs.readFileSync(path.join(__dirname, '../res/rsa_public_key.pem'));
  const privateKey = fs.readFileSync(path.join(__dirname, '../res/rsa_private_key.pem'));

  const testSource = 'test source';

  it('encrypt decrypt', () => {

    const encrypted = rsa.rsaEncrypt(testSource, publicKey);
    const decrypted = rsa.rsaDecrypt(encrypted, privateKey);
    expect(decrypted).to.be.equal(testSource);
  });

  it('node-forge', () => {

    const encrypted = rsa.rsaEncrypt(testSource, pPublicKey);
    const decrypted = rsa.rsaDecrypt(encrypted, pPrivateKey);
    expect(decrypted).to.be.equal(testSource);
  });

  it('sign verify', () => {

    const signature = rsa.rsaSign(testSource, pPrivateKey);
    assert(rsa.rsaVerify(testSource, pPublicKey, signature), 'verify should be true');
  });

});