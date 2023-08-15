class HostUtils {
    
    static getHost() {
        
        const env = process.env.NODE_ENV
        if(env == "development"){
            console.log("inside dev environment")
            return "http://localhost:8080"
        }
        else if (env == "production"){
            console.log("inside prod environment")
            return "https://punchy.app:8443"
        }
        
    }

}

export default HostUtils