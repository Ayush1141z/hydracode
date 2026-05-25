import type { Command } from "./types";
export const COMMANDS: Command[] =[
    {
        name:"new",
        description: "Start a new conversation",
        value:"/new",
    },
    {
        name:"agents",
        description: "Switch between agents",
        value:"/agents",
    },
    {
        name:"models",
        description: "Select AI model to use",
        value:"/models",
    },
    {
        name:"sessions",
        description: "View and manage sessions",
        value:"/sessions",
    },
    {
        name:"theme",
        description: "Change the color theme",
        value:"/theme",    
    },
    {
        name:"login",
        description: "Sign in with your browser",
        value:"/login",
    },
    {
        name:"logout",
        description: "Sign out of your account",
        value:"/logout",
    },
    {
        name:"upgrade",
        description: "Buy more credits or subscribe to a plan",
        value:"/upgrade",
    },
    {
        name: "usage",
        description: "Open billing portal to view usage and payment details",
        value: "/usage",
    },
    {
        name:"exit",
        description: "Quit the application",
        value:"/exit",
        action: (ctx) =>{
            ctx.exit();
        },
    },
];