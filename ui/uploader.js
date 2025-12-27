import { log } from "./console.js";

export function createUploaders(container, callbacks){
    // World input
    const worldInput = document.createElement("input");
    worldInput.type="file";
    worldInput.accept=".mcworld";
    worldInput.onchange = e=>{
        callbacks.onWorldUpload(e.target.files[0]);
        modInput.disabled=false;
        runBtn.disabled=true;
    };

    // Mod input
    const modInput = document.createElement("input");
    modInput.type="file";
    modInput.accept=".zip";
    modInput.disabled=true;
    modInput.onchange = e=>{
        callbacks.onModUpload(e.target.files[0]);
        runBtn.disabled=false;
    };

    // Run button
    const runBtn = document.getElementById("runBtn");

    container.appendChild(worldInput);
    container.appendChild(modInput);

    log("Uploader initialized");
}
