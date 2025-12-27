import { createModeSelector } from "./ui/modeSelector.js";
import { createUploaders } from "./ui/uploader.js";
import { log } from "./ui/console.js";
import { loadWorld } from "./engine/worldLoader.js";
import { loadMods } from "./engine/injector.js";
import { launchSandbox } from "./sandbox/sandbox.js";
import { encryptWorld } from "./engine/encryptor.js";
import { exportWorld } from "./engine/exporter.js";

let mode = "world";
let worldData = null;
let modsData = null;

// Mode selector UI
createModeSelector(document.getElementById("modeSelector"), newMode=>{
    mode = newMode;
    log(`Mode set to ${mode}`);
});

// File uploaders
createUploaders(document.getElementById("uploaders"), {
    onWorldUpload: async file => {
        worldData = await loadWorld(file);
        log("World loaded.");
    },
    onModUpload: async file => {
        modsData = await loadMods(file);
        log("Mods loaded.");
    }
});

// Run button
document.getElementById("runBtn").onclick = async () => {
    if(!worldData || !modsData){ log("Upload both world and mods first"); return; }

    if(mode==="test") encryptWorld(worldData);

    launchSandbox(worldData, modsData, mode);

    exportWorld(worldData);
};
