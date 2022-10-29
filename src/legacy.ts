export default () => {};

console.log("Handling possible legacy method");

const propertyExist:Function = (name:string):boolean => {
    return Object.prototype.hasOwnProperty.call(Object, name);
};

const propertyExistB:Function = (name:string):boolean => {
    return Object.prototype.hasOwnProperty.call(Array, name);
};

const proto_o = Object.prototype;
const proto_a = Array.prototype;

const attr = {
    configurable: false,
    enumerable: false,
    writable: false
};

const legacies:Function[] = [];

legacies.push(() => {
    let success:boolean = false;
    if(! propertyExist("take") && propertyExist("assign")) {
        // Using `get` as method name Throws an error 
        Object.defineProperty(proto_o, "take", 
            Object.assign(attr, {
                value: function(key:string|number, fallback:any):any {
                    const props = this!;
                    return (props.hasOwnProperty(key)) ? props[key as keyof typeof props] : fallback;
                }
            })
        );
        success = true;
        console.log("Object.prototype.take has been defined");
    } else {
        return true;
    }
    return success;
});

legacies.push(() => {
    let success:boolean = false;
    if(! propertyExist("fromEntries") && propertyExist("assign")) {
        Object.defineProperty(proto_o, "fromEntries", Object.assign(attr, {
            value: function(arr:any) {
                const build = {};
                
                for (let index = 0; index < arr.length; index++) {
                    const pair = arr[index];
                    
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
        }));
        success = true;
        console.log("Using legacy Object.prototype.fromEntries");
    } else {
        return true;
    }
    
    return success;
});

legacies.push(() => {
    let success:boolean = false;
    
    if(! propertyExist("entries") && propertyExist("keys") && propertyExist("assign")) {
        Object.defineProperty(proto_o, "entries", Object.assign(attr, {
            value: function(obj:object):Array<any> {
                const ownProps = Object.keys(obj);
                let index = ownProps.length;
                const arr = new Array(index);
                
                while(index--)
                    arr[index] = [ownProps[index], obj[ownProps[index as keyof typeof ownProps] as keyof typeof obj]];
                
                return arr;
            }
        }));
        success = true;
        console.log("Using legacy Object.prototype.entries");
    } else {
        return true;
    }
    
    return success;
});

legacies.push(() => {
    let success:boolean = false;
    
    if(! propertyExist("keys") && propertyExist("assign")) {
        Object.defineProperty(proto_o, "keys", Object.assign(attr, {
            value: function(obj:object):Array<any> {
                const arr = [];
                for (let key in obj)
                    arr.push(key);
                
                return arr;
            }
        }));
        success = true;
        
        console.log("Using legacy Object.prototype.keys");
    } else {
        return true;
    }
    
    return success;
});



/**
 * Try to fill up the missing
 * */
let i = legacies.length + 7;

while (legacies.length > 0 && (i--) > 0) {
    if(legacies[0]())
        legacies.shift();
}
