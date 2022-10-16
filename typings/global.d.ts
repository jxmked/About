interface XIO {
    ENVIRONMENT_MODE:"dev"|"prod";
}

interface Window {
    localforage:LocalForage;
    __ENVIRONMENT__:Map<string, any>;
    XIO:XIO;
};


interface RepoProperties {
    id:number;
    node_id: string;
    name:string;
    html_url:string;
    description:string;
    languages:{[key:string]:number};
    homepage:string;
    topics:string[];
    stars:number;
    forks:number;
    download_link:string
};