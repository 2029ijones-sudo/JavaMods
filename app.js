import { createModeSelector } from "./ui/modeSelector.js";
import { createUploaders } from "./ui/uploader.js";
import { log } from "./ui/console.js";
import { loadWorld } from "./engine/worldLoader.js";
import { loadMods } from "./engine/injector.js";
import { startEngine } from "./sandbox/renderer.js"; // render directly on main canvas
import { encryptWorld } from "./engine/encryptor.js";
import { exportWorld } from "./engine/exporter.js";

let mode = "world";
let worldData = null;
let modsData = null;

// Run button reference
const runBtn = document.getElementById("runBtn");

// Enable button only when both files are loaded
function updateRunButton() {
    runBtn.disabled = !(worldData && modsData);
}

// Mode selector UI
createModeSelector(document.getElementById("modeSelector"), newMode => {
    mode = newMode;
    log(`Mode set to ${mode}`);
});

// File uploaders
createUploaders(document.getElementById("uploaders"), {
    onWorldUpload: async file => {
        worldData = await loadWorld(file);
        log("World loaded.");
        updateRunButton(); // enable button if both files ready
    },
    onModUpload: async file => {
        modsData = await loadMods(file);
        log("Mods loaded.");
        updateRunButton(); // enable button if both files ready
    }
});

// Run button click
runBtn.onclick = () => {
    log("Run button clicked");

    if (!worldData) { log("No world loaded"); return; }
    if (!modsData) { log("No mods loaded"); return; }

    log("Preparing sandbox...");

    if (mode === "test") {
        encryptWorld(worldData);
        log("World encrypted for Testing Environment.");
    }

    // Launch 3D sandbox on the main canvas (no popups)
    startEngine(worldData, modsData, mode);

    // Export modified world
    exportWorld(worldData);
    log("Sandbox running. Export complete.");
};
