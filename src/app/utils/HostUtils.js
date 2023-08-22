class HostUtils {
    
    static getHost() {
        
        const env = process.env.NODE_ENV
        if(env == "development"){
            return "http://localhost:8080"
        }
        else if (env == "production"){
            return "https://punchy.app:8443"
        }
        
    }

}

export default HostUtils