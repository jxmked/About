interface XIO {
    ENVIRONMENT_MODE:"dev"|"prod";
}

interface Window {
    localforage:LocalForage;
    __ENVIRONMENT__:Map<any, any>;
    XIO:XIO;
};
