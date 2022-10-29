export default () => {};

const propertyExist:Function = (name:string):boolean => {
    return Object.prototype.hasOwnProperty.call(Object, name);
}
const proto = Object.prototype;
const attr = {
    configurable: false,
    enumerable: false,
    writable: false
};

if(! propertyExist("take")) {
    // Using `get` as method name Throws an error 
    Object.defineProperty(proto, "take", 
        Object.assign(attr, {
            value: function(key:string|number, fallback:any):any {
                const props = this!;
                return (props.hasOwnProperty(key)) ? props[key as keyof typeof props] : fallback;
            }
        })
    );
    
    console.log("Object.prototype.get has been defined");
}


if(! propertyExist("fromEntries")) {
    Object.defineProperty(proto, "fromEntries", Object.assign(attr, {
        value: function(obj:any) {
            const build = {};
            
            for (const pair of obj) {
                if (Object(pair) !== pair) {
                  throw new TypeError('iterable for fromEntries should yield objects');
                }
            
                // Consistency with Map: contract is that entry has "0" and "1" keys, not
                // that it is an array or iterable.
            
                const { '0': key, '1': val } = pair;
            
                Object.defineProperty(build, key, {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: val,
                });
            }
            
            return build;
        }
    })) 
}