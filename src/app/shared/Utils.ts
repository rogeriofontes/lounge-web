export default class Utils {
    
    static now() { 
        let today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getUTCFullYear();
        let day = today.getDay();
        return new Date(year, month, day);
    }
}