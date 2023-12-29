import ReactGA from "react-ga4";

export interface sendEventProperties {
    label:string;
    category:string;
    action:string;
}

ReactGA.initialize("G-JPJZGW7PW6");

function PageView():void {
    ReactGA.send("pageview");
}

function sendEvent({label , category ,action}:sendEventProperties):void {
    ReactGA.send({
        label,
        category,
        action
    });
}

function externalLinkHook(social:string):void {
    sendEvent({
        label: `Social: ${social}`,
        category: "Social Link Clicked",
        action: "clicked"
    })
};

export { sendEvent, externalLinkHook };
export default PageView;