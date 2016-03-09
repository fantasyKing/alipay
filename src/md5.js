/**
 * Created on 12/3/15.
 */

import crypto from 'crypto';

const md5Sign = (source, key) => crypto.createHash('md5')
                                        .update(source + key, 'utf8')
                                        .digest('hex');

const md5Verify = (source, key, sign) => md5Sign(source + key, key) === sign;

export default {md5Sign, md5Verify};