import type {Command} from "./types";
import {COMMANDS} from "./commands";


export function getFilteredCommands(query:String): Command[]{
    if(query.length=== 0) return COMMANDS;
    return COMMANDS
     .filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()));
}