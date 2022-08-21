



window.addEventListener("DOMContentLoaded", async () => {
    new NavigationPanel();
    NavigationPanel.addItem("Introduction", "main-introduction");
    NavigationPanel.addItem("About Me", "main-about");
    
    try {
        /**
         * Load Configuration
         * */
        await new Config().load();
        const data:{[id:string]:any} = Config.config;
        const username:string = data['github']['username'];
        
        if(! username) {
            console.error("Github username does not exists");
            return;
        }
        
        await new getColors().then();
        
       new MostLanguages();
       new PersonalProjects();
        
    } catch(e) {
        console.error(e)
        console.error("Failed to parse userdata!");
        console.error("Please check your inputs.");
    }
    
});
