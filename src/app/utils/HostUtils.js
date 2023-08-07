class HostUtils {
    
    static getHost() {
        
        const env = process.env.NODE_ENV
        if(env == "development"){
            return "localhost"
        }
        else if (env == "production"){
            return "punchy.app"
        }
        
    }

}

export default HostUtils