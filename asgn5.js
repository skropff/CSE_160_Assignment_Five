import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/*
function main() {
	 const scene = new THREE.Scene();
	
	const myCanvas = document.querySelector('#example');

const renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});

const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.z = 3;

// 1. Create the shape (width, height, depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 2. Create the look (color)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 3. Combine them into a mesh
const cube = new THREE.Mesh(geometry, material);

cube.rotation.set(0.5, 0.5, 0); // Tilts the cube slightly

// 4. Add the cube to your scene
scene.add(cube);

    renderer.render(scene, camera);

}
*/

function main() {
    const scene = new THREE.Scene();
    const myCanvas = document.querySelector('#example');
	
	const loader = new THREE.TextureLoader();

    const renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true
    });
    renderer.setClearColor(0x111111); // Dark background to make colors pop

    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    // Position camera high and to the side for a 3D perspective
    //camera.position.set(6, 5, 8);
    //camera.lookAt(0, 0, 0);
	

    // --- 1. LIGHTING (Essential for 3D depth) ---
	/*
    const mainLight = new THREE.PointLight(0xffffff, 50);
    mainLight.position.set(2, 5, 5);
    scene.add(mainLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
	*/
	
	
	// --- 1. LIGHTING (Distinctly visible setup) ---

// 1. Ambient Light: Low intensity, subtle blue tint for soft shadows



// Optional: Point the SpotLight at the sun
// spot.target = sun; 


    // --- 2. THE CENTER SPHERE (The Sun) ---
	const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
	
	loader.load('sun.jpg', function(texture) {
    //const sphereMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0x442200 });
	
		//const sunTexture = loader.load('sun.jpg'); 
		const sphereMat = new THREE.MeshStandardMaterial({ 
			map: texture // Apply the texture here
		});
		const sun = new THREE.Mesh(sphereGeo, sphereMat);
		scene.add(sun);
		renderer.render(scene, camera);
	});
/*
    // --- 3. THE CYLINDER (The Central Axis) ---
    const cylGeo = new THREE.CylinderGeometry(0.1, 0.1, 10, 32);
    const cylMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const axis = new THREE.Mesh(cylGeo, cylMat);
    scene.add(axis);

    // --- 4. THE 18 CUBES (The Orbiting Planets) ---
    const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);

    for (let i = 0; i < 18; i++) {
        // Create a color gradient based on index
        const hue = i / 18; 
        const cubeMat = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color().setHSL(hue, 0.8, 0.5) 
        });
        
        const cube = new THREE.Mesh(cubeGeo, cubeMat);

        // Pattern Math: Double Helix / Spiral
        const angle = i * 0.8;       // Rotation around the center
        const radius = 2 + (i * 0.1); // Slowly expanding radius
        const yPos = (i * 0.4) - 3.5; // Stacking from bottom to top

        cube.position.set(
            Math.cos(angle) * radius,
            yPos,
            Math.sin(angle) * radius
        );

        // Tilt cubes for better 3D look
        cube.rotation.set(angle, angle, 0);
        
        scene.add(cube);
    }

    // --- 5. RENDER ---
    renderer.render(scene, camera)
	*/
	// --- 3. THE ORBIT GROUP (The Pivot) ---
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
/*	
	// A very dim blue so we don't lose the dark side entirely
const ambient = new THREE.AmbientLight(0x4040ff, 0.05); 

// The main white "Sun" light
const directional = new THREE.DirectionalLight(0xffffff, 2.5);

// A neon Green stage light—this WILL be noticeable against the red nebula
const spot = new THREE.SpotLight(0x00ff00, 300); 
spot.position.set(-4, 4, 2);



//const ambient = new THREE.AmbientLight(0x00ffff, 0.2); 
scene.add(ambient);

// 2. Directional Light: Strong white "Sunlight" from one side
//const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(5, 10, 7); // Coming from top-right
scene.add(directional);

// 3. Spot Light: Concentrated "Stage light" with a specific color
//const spot = new THREE.SpotLight(0x00ff00, 100); // Bright Red
//spot.position.set(-5, 5, 0); // Coming from the left
spot.angle = Math.PI / 6;    // Narrow beam
spot.penumbra = 0.5;         // Soft edges

// Ensure the green spotlight is actually looking at the center
spot.target = orbitGroup; 
scene.add(spot.target); // Essential: you must add the target to the scene too!

scene.add(spot);
*/

// 1. Ambient: Drop to 0.01 to create deep, dramatic shadows
/*
const ambient = new THREE.AmbientLight(0x4040ff, 0.01); 
scene.add(ambient);

// 2. Directional: Keep this for the bright white "Sun" highlight
const directional = new THREE.DirectionalLight(0xffffff, 2.5);
directional.position.set(5, 10, 7);
scene.add(directional);

// 3. Spot Light: Crank the intensity to 2000 so it actually reaches the models
const spot = new THREE.SpotLight(0x00ff00, 2000); 
spot.position.set(-8, 5, 2); // Pull it back slightly
spot.angle = Math.PI / 6;

// CRITICAL: Re-link the target AFTER orbitGroup is created
spot.target = orbitGroup; 
scene.add(spot.target); 
scene.add(spot);
*/

// 1. Ambient: Ultra-low blue so shadows are actually DARK
/*
const ambient = new THREE.AmbientLight(0x0000ff, 0.01); 
scene.add(ambient);

// 2. Directional: The "White Sun" - Crank intensity to 5
const directional = new THREE.DirectionalLight(0xffffff, 5);
directional.position.set(10, 10, 10); 
scene.add(directional);

// 3. Spot Light: The "Neon Green" - Use a massive 15,000 intensity 
// (Three.js lights decay very fast over distance)
const spot = new THREE.SpotLight(0x00ff00, 15000); 
spot.position.set(-15, 5, 5); 
spot.angle = Math.PI / 4;
spot.penumbra = 0.3;

spot.target = orbitGroup; 
scene.add(spot.target); 
scene.add(spot);
*/
// 1. AMBIENT: A base "glow" so objects aren't pitch black
// Use a brighter intensity (0.5) to ensure we see the shapes
/*
const ambient = new THREE.AmbientLight(0x4040ff, 0.5); 
scene.add(ambient);

// 2. DIRECTIONAL: The "White Sun"
// Move it much closer (5, 5, 5) and crank intensity to 10
const directional = new THREE.DirectionalLight(0xffffff, 10);
directional.position.set(5, 5, 5); 
scene.add(directional);

// 3. SPOT LIGHT: The "Neon Green" Stage Light
// Crank intensity to 50,000 (Space scenes need huge numbers)
const spot = new THREE.SpotLight(0x00ff00, 50000); 
spot.position.set(-10, 5, 0); 
spot.angle = Math.PI / 4;
spot.penumbra = 0.1;

// Point it exactly at the center objects
spot.target = orbitGroup; 
scene.add(spot.target); 
scene.add(spot);
*/

// 1. THE SKYBOX (Visual Only - NO LIGHTING)
/*
const loader1 = new THREE.TextureLoader();
loader1.load('stars.jpg', function(texture) {
    scene.background = texture; 
    // IMPORTANT: Make sure scene.environment is NOT set to texture here!
    scene.environment = null; 
});

// 2. AMBIENT: Ultra-low blue (The "Base")
const ambient = new THREE.AmbientLight(0x0000ff, 0.01); 
scene.add(ambient);

// 3. DIRECTIONAL: Bright White (The "Sun")
const directional = new THREE.DirectionalLight(0xffffff, 5);
directional.position.set(10, 10, 10); // Top-Right
scene.add(directional);

// 4. SPOT LIGHT: Massive Neon Green (The "Stage Light")
const spot = new THREE.SpotLight(0x00ff00, 50000); // 50,000 intensity!
spot.position.set(-15, 5, 0); // Far Left
spot.angle = Math.PI / 4;
spot.target = orbitGroup; 
scene.add(spot.target);
scene.add(spot);
*/
/*
const loader1 = new THREE.TextureLoader();
loader1.load('stars.jpg', function(texture) {
    scene.background = texture; 
    // IMPORTANT: Make sure scene.environment is NOT set to texture here!
    scene.environment = null; 
});
// 1. AMBIENT: Ultra-low blue (The "Base")
const ambient = new THREE.AmbientLight(0x0000ff, 0.02); 
scene.add(ambient);

// 2. DIRECTIONAL: Bright White (The "Sun" from Top-Right)
const directional = new THREE.DirectionalLight(0xffffff, 5);
directional.position.set(10, 10, 10); 
scene.add(directional);

// 3. SPOT LIGHT: Massive Neon Green (The "Stage Light" from Left)
const spot = new THREE.SpotLight(0x00ff00, 80000); 
spot.position.set(-15, 5, 0); 
spot.angle = Math.PI / 4;
spot.penumbra = 0.2;

// Point the green light exactly at your orbiting objects
spot.target = orbitGroup; 
scene.add(spot.target); 
scene.add(spot);
*/

// 1. THE BACKGROUND (KEEP IT VISUAL ONLY)
/*
const loader1 = new THREE.TextureLoader();
loader1.load('stars.jpg', function(texture) {
    scene.background = texture; 
    // CRITICAL: Ensure scene.environment is NOT set to texture!
    scene.environment = null; 
});

// 2. THE AMBIENT (THE BASE)
// Drop this to 0.01. If it's higher, you won't see the green light.
const ambient = new THREE.AmbientLight(0x0000ff, 0.01); 
scene.add(ambient);

// 3. THE DIRECTIONAL (WHITE SUN - TOP RIGHT)
const directional = new THREE.DirectionalLight(0xffffff, 5);
directional.position.set(10, 10, 10); 
scene.add(directional);

// 4. THE SPOTLIGHT (NEON GREEN - LEFT)
// We are using 100,000 because your scene is massive.
const spot = new THREE.SpotLight(0x00ff00, 100000); 
spot.position.set(-15, 5, 0); 
spot.angle = Math.PI / 4;
spot.target = orbitGroup; 
scene.add(spot.target);
scene.add(spot);
*/


const loader1 = new THREE.TextureLoader();
loader1.load('stars.jpg', function(texture) {
    scene.background = texture; 
    // CRITICAL: Ensure scene.environment is NOT set to texture!
    scene.environment = null; 
});

/*
// 1. THE AMBIENT (Visible in the shadows)
// We use a soft blue and higher intensity so the "dark" sides have a visible tint.
const ambient = new THREE.AmbientLight(0x4040ff, 0.4); 
scene.add(ambient);

// 2. THE DIRECTIONAL (The "Sun" - Top Right)
// Pure white light coming from the top right to highlight the Earth.
const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(10, 10, 10); 
scene.add(directional);

// 3. THE SPOTLIGHT (Neon Green - Hits the "Front" or "Side")
// We use a more reasonable intensity. 100k was likely "breaking" the material.
// This will create a sharp green cone of light on one side of your shapes.
const spot = new THREE.SpotLight(0x00ff00, 500); 
spot.position.set(-10, 10, 5); // Positioned to hit the shapes from the front-left
spot.angle = Math.PI / 6;      // Sharper cone for distinction
spot.penumbra = 0.5;           // Soft edges
spot.target = orbitGroup; 
scene.add(spot);
*/
// 4. OPTIONAL: POINT LIGHT (The Central Glow)
// To make the yellow sphere actually look like it's lighting the inner cubes:
/*
const point = new THREE.PointLight(0xffaa00, 100, 15);
point.position.set(0, 0, 0);
scene.add(point);
*/

// 1. THE AMBIENT (The "Fill" - Blue)
// Bump intensity to 0.4. Now the "shadow" sides will have a clear blue tint.
/*
const ambient = new THREE.AmbientLight(0x4444ff, 0.4); 
scene.add(ambient);

// 2. THE DIRECTIONAL (The "Sun" - Top Right)
// Keep this white and strong. It creates the white highlights on the Earth.
const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.set(10, 10, 10); 
scene.add(directional);

// 3. THE SPOTLIGHT (The "Feature" - Neon Green)
// 100k is too high; use 500-1000. 
// Position it to hit the cubes from the front-left so it's separate from the sun.
const spot = new THREE.SpotLight(0x00ff00, 800); 
spot.position.set(-15, 10, 10); 
spot.angle = Math.PI / 6;   // Narrower beam makes it more "noticeable"
spot.penumbra = 0.3;        // Softens the edge slightly
spot.target = orbitGroup; 
scene.add(spot);

// 4. THE POINT LIGHT (The "Core" - Yellow)
// Add this so the central yellow sphere actually glows and hits the inner faces.
const point = new THREE.PointLight(0xffaa00, 150, 20);
point.position.set(0, 0, 0);
scene.add(point);
*/

// 1. THE "FILL" LIGHT (Ambient - Deep Blue)
// Keep this low so it doesn't wash out the other two, but creates blue shadows.
const ambient = new THREE.AmbientLight(0x0000ff, 0.2); 
scene.add(ambient);

// 2. THE "KEY" LIGHT (Directional - Bright Red)
// Positioned high and to the RIGHT.
const directional = new THREE.DirectionalLight(0xff0000, 5); 
directional.position.set(10, 10, 5); 
scene.add(directional);

// 3. THE "RIM" LIGHT (Spotlight - Neon Green)
// Positioned to the LEFT and slightly BEHIND to hit the edges.
const spot = new THREE.SpotLight(0x00ff00, 500); 
spot.position.set(-10, 5, -5); 
spot.angle = Math.PI / 4;
spot.penumbra = 0.1; 
// Crucial: The spotlight needs a target to point at the objects
spot.target = orbitGroup; 
scene.add(spot);

// 4. THE "CORE" LIGHT (Point Light - Bright White/Yellow)
// Increased intensity so the center actually illuminates the cubes passing by.
const point = new THREE.PointLight(0xffffff, 250, 50);
point.position.set(0, 0, 0);
scene.add(point);


    // --- 4. THE 19 SHAPES (1 Cylinder + 18 Cubes) ---
    // Cylinder (Shape 1)

    const cylGeo = new THREE.CylinderGeometry(0.1, 0.1, 10, 32);
    const cylMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const axis = new THREE.Mesh(cylGeo, cylMat);
    orbitGroup.add(axis); // Add to group, not scene

    // 18 Cubes (Shapes 2-19)
    const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    for (let i = 0; i < 18; i++) {
        const hue = i / 18; 
        const cubeMat = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color().setHSL(hue, 0.8, 0.5) 
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);

        const angle = i * 0.8;
        const radius = 2 + (i * 0.1);
        const yPos = (i * 0.4) - 3.5;

        cube.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
        cube.rotation.set(angle, angle, 0);
        
        orbitGroup.add(cube); // Add to group, not scene
    }

	// --- 5. THE ANIMATION LOOP ---
    function animate() {
        requestAnimationFrame(animate);
		
		let eye_x = document.getElementById("eye x");
	let eye_y = document.getElementById("eye y");
	let eye_z = document.getElementById("eye z");
	
	eye_x = parseFloat(eye_x.value) || 6;
	eye_y = parseFloat(eye_y.value) || 5;
	eye_z = parseFloat(eye_z.value) || 8;
	
	let at_x = document.getElementById("at x");
	let at_y = document.getElementById("at y");
	let at_z = document.getElementById("at z");
	
	at_x = parseFloat(at_x.value) || 0;
	at_y = parseFloat(at_y.value || 0);
	at_z = parseFloat(at_z.value) || 0;
	
	camera.position.set(eye_x, eye_y, eye_z)
	camera.lookAt(at_x, at_y, at_z);

        // Rotate the entire group around the Y axis (The Sun)
        orbitGroup.rotation.y += 0.01;

        // Individual rotation for cubes to see light glisten
        orbitGroup.children.forEach(child => {
            if (child.type === 'Mesh' && child !== axis) {
                child.rotation.x += 0.02;
            }
        });

        renderer.render(scene, camera);
    }
	
	// --- 6. ADDING THE .GLB MODEL ---
const gltfLoader = new GLTFLoader();

gltfLoader.load('./Earth.glb', (gltf) => {
	/*
	console.log("Model loaded successfully:", gltf.scene);
    const model = gltf.scene;
	//model.scale.set(50, 50, 50);       // If it's too tiny
	model.scale.set(0.01, 0.01, 0.01); // If it's too huge

    // Adjust scale and position so it doesn't overlap the sun
    model.scale.set(1, 1, 1); 
    model.position.set(4, 0, 0); // Place it out in the orbit

    // Add it to the group so it rotates around the sun
    orbitGroup.add(model);
    
    // Optional: If your model has textures/materials that look dark, 
    // ensure they react to light:
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    */
	console.log("Model loaded successfully.");
    const model = gltf.scene;

    // 1. AUTO-CENTER & AUTO-SCALE
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model's geometry
    model.position.x += (model.position.x - center.x);
    model.position.y += (model.position.y - center.y);
    model.position.z += (model.position.z - center.z);

    // Scale it to be 2 units wide (fits your scene better)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    model.scale.set(scale, scale, scale);

    // 2. FIX VISIBILITY & MATERIALS
    model.traverse((node) => {
        if (node.isMesh) {
            // If it's metallic, it might be reflecting the "black" space
            if (node.material.metalness > 0) {
                node.material.metalness = 0; // Disable metalness to see it with basic lights
            }
            node.material.side = THREE.DoubleSide; // Ensure we see it from both sides
        }
    });

    // Move the now-centered model to its orbit position
    model.position.set(4, 0, 0); 
    
    orbitGroup.add(model);
    
}, undefined, (error) => {
    console.error('An error happened loading the GLB:', error);
});
/*
    const loader1 = new THREE.TextureLoader();
loader1.load('stars.jpg', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
	 scene.background = texture; 
    //scene.background = texture;
    //scene.environment = texture; // This makes your Earth/Sun reflect the sky!
});
*/

	
	
    animate(); // Start the loop
  
}

main();
 