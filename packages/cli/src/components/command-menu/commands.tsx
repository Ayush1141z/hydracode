import { ThemeDialogContent } from "../dialogs";
import type { Command } from "./types";

export const COMMANDS: Command[] =[

    {
        name:"new",
        description: "Start a new conversation",
        value:"/new",
        action: (ctx) =>{
            ctx.toast.show({
                variant: "success",
                message: "Starting New Conversation..."
                
            });
        }
    },
    {
        name:"agents",
        description: "Switch between agents",
        value:"/agents",
        action: (ctx) =>{
           ctx.dialog.open({
                title: "Select an Agent",
                children: (<text>Agent selection coming soon...</text>)
            });
        }
    },
    {
        name:"models",
        description: "Select AI model to use",
        value:"/models",
        action: (ctx) =>{
            
            ctx.dialog.open({
                title: "Select a Model",
                children: (<text>Model selection coming soon...</text>)
            });
        }
    },
    {
        name:"sessions",
        description: "View and manage sessions",
        value:"/sessions",
        action: (ctx) =>{
            ctx.toast.show({
                message: "Opening Sessions..."
            });
        }
    },
    {
        name:"theme",
        description: "Change the color theme",
        value:"/theme",
        action: (ctx) =>{ 
            ctx.dialog.open({
                title: "Select a Theme",
                children: <ThemeDialogContent />
            });
        }   
    },
    {
        name:"login",
        description: "Sign in with your browser",
        value:"/login",
        action: (ctx) =>{
            ctx.toast.show({
                message: "Opening browser for login..."
            });
        }
    },
    {
        name:"logout",
        description: "Sign out of your account",
        value:"/logout",
        action: (ctx) =>{
            ctx.toast.show({
                message: "Logging out..."
            });
        }
    },
    {
        name:"upgrade",
        description: "Buy more credits or subscribe to a plan",
        value:"/upgrade",
        action: (ctx) =>{
            ctx.toast.show({
                message: "Opening credits checkout..."
            });
        }
    },
    {
        name: "usage",
        description: "Open billing portal to view usage and payment details",
        value: "/usage",
        action: (ctx) => {
            ctx.toast.show({
                message: "Opening billing portal..."
            });
        }
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