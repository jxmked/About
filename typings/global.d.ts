interface XIO {
    ENVIRONMENT_MODE:"dev"|"prod";
}

interface Window {
    localforage:LocalForage;
    __ENVIRONMENT__:Map<string, any>;
    XIO:XIO;
};
