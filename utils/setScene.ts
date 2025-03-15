export const SetScene = (): string => {
    // Create the Babylon.js engine and scene
    const engine = new BABYLON.Engine(mountRef.current, true);
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

    // Set background color
    scene.clearColor = BABYLON.Color4.FromHexString(background);

    // Create the camera with ArcRotateCamera - Hardcoded parameters
    const camera = new BABYLON.ArcRotateCamera('camera1', cameraAlpha, cameraBeta, cameraRadius, new BABYLON.Vector3(cameraPositionX, cameraPositionY, cameraPositionZ), scene);
    camera.attachControl(mountRef.current, true);
    cameraRef.current = camera;

    // Set lighting
    const light = new BABYLON.HemisphericLight('light1', BABYLON.Vector3.Up(), scene);
    light.diffuse = BABYLON.Color3.FromHexString(secondaryColor);
    light.specular = BABYLON.Color3.White();

    // Add a directional light for better definition
    const directionalLight = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(1, -1, -1), scene);
    directionalLight.intensity = lightIntensity;
    directionalLight.diffuse = BABYLON.Color3.FromHexString("#FFFACD"); // Soft warm yellow color for diffuse
    directionalLight.specular = BABYLON.Color3.White(); // Keep specular white or adjust as needed
    directionalLight.intensity = currentLightIntensity; // Initialize intensity from state
    directionalLight.intensity = lightIntensity; // Initialize intensity from prop

    // Add a second directional light 
    const directionalLight2 = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(-1, 1, 1), scene);
    directionalLight2.intensity = (lightIntensity/3);
    directionalLight2.specular = BABYLON.Color3.White(); // Keep specular white or adjust as needed
    directionalLight2.intensity = (currentLightIntensity/3); // Initialize intensity from state
    directionalLight2.intensity = (lightIntensity/3); // Initialize intensity from prop

    // Add Soft Shadows
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight); // 1024 is shadow map size
    shadowGeneratorRef.current = shadowGenerator; // Store shadow generator in ref

    // --- Floor Grid ---
    const gridMaterial = new GridMaterial("gridMaterial", scene); // Use the imported GridMaterial
    gridMaterialRef.current = gridMaterial; // Store grid material in ref
    gridMaterial.lineColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Thin gray lines
    gridMaterial.mainColor = new BABYLON.Color3(0.96, 0.96, 0.96); // Try using mainColor for bolder lines
    gridMaterial.gridRatio = 0.2; // Adjust for more or fewer major lines
    gridMaterial.backFaceCulling = false; // Ensure grid is visible from both sides

    // Create ground mesh
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    groundRef.current = ground; // Store ground mesh in ref
    ground.material = gridMaterial; // Apply grid material to ground
    ground.receiveShadows = true; // Ground can receive shadows
}