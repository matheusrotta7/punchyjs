class HostUtils {
    
    static getHost() {
        
        const env = process.env.NODE_ENV
        if(env == "development"){
            return "http://localhost"
        }
        else if (env == "production"){
            return "https://punchy.app"
        }
        
    }

}

export default HostUtils