import {envRes} from "globals";

export const isEmpty:Function = (param:any): boolean => {
    if(param instanceof Object) {
        // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
        for(const prop in param) {
            if(Object.prototype.hasOwnProperty.call(param, prop))
                return false;
        }
        
        return JSON.stringify(param) === JSON.stringify({})
    }
    
    if(param instanceof Array) {
        return param.length == 0;
    }
    
    if(param instanceof String) {
        return (param === "" || param === void 0 || param === null)
    }
    
    throw new TypeError("Undefined Object");
    
}
