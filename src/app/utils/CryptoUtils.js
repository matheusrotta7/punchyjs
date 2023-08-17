// const { createHmac } = require('node:crypto');
import * as crypto from "crypto"


class CryptoUtils {


    
    static calculateHash(password) {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return hash
    }
    
}

export default CryptoUtils