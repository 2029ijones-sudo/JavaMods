import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.162.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.162.1/examples/jsm/controls/OrbitControls.js";
import { log } from "../ui/console.js";

export function startEngine(win, world, mods, mode) {
    const canvas = win.document.getElementById("screen");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // sky blue

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(5, 10, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);

    // Grid (ground)
    const grid = new THREE.GridHelper(50, 50);
    scene.add(grid);

    // Mod Runtime
    const JavaMods = {
        items: {},
        registerItem(item) {
            this.items[item.id] = item;
            log("Item registered: " + item.id);

            // Create a 3D box for this item
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const texture = new THREE.TextureLoader().load(item.texture || "assets/logo.png");
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(Math.random() * 10, 1, Math.random() * 10);
            scene.add(cube);
            item.mesh = cube;
        }
    };

    mods.mods.forEach(code => new Function("JavaMods", code)(JavaMods));

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
