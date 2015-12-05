/**
 * Created on 12/6/15.
 */

class Notify {

  constructor(config) {

    this.config = config;
    this.https_verify_url = config.https_verify_url;
    this.http_verify_url = config.http_verify_url;
  }
}

export default Notify;