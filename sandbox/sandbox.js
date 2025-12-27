import { startEngine } from "./renderer.js";

export function launchSandbox(world, mods, mode){
    const win = window.open("", "sandbox", "width=640,height=480");
    win.document.write(`<canvas id="screen" width="600" height="400"></canvas>`);
    win.document.close();

    win.onload = () => startEngine(win, world, mods, mode);
}
