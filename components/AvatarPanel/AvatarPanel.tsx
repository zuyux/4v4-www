/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { GridMaterial } from 'babylonjs-materials';
import { AvatarPanelProps, SceneReferences, CameraSettings } from '../../utils/types';
import { createScene, disposeScene } from '../../utils/babylon/createScene';
import { setupCamera } from '../../utils/babylon/setupCamera';
import { setupLighting, updateLightIntensity } from '../../utils/babylon/setupLighting';
import { setupGround } from '../../utils/babylon/setupGround';
import { loadModel, updateModelColor } from '../../utils/babylon/loadModel';
import { setupModelRotationHandlers, setupZoomHandler } from '../../utils/babylon/eventHandlers';
import DebugInfo from './DebugInfo';

const AvatarPanel: React.FC<AvatarPanelProps> = ({
    mintedAddress,
    color,
    background,
    secondaryColor,
    texture,
    modelUrl,
    lightIntensity
}) => {
    // Refs
    const mountRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<BABYLON.Engine | null>(null);
    
    // Scene references
    const refs = useRef<SceneReferences>({
        scene: null,
        camera: null,
        shadowGenerator: null,
        gridMaterial: null,
        ground: null,
        model: null,
        meshMaterial: null
    });

    // State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [previousMousePosition, setPreviousMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [cameraPositionState, setCameraPositionState] = useState<string>('0, 0, 0');
    const [cameraZoomState, setCameraZoomState] = useState<number>(2.4);
    const [currentLightIntensity, setCurrentLightIntensity] = useState<number>(lightIntensity);

    // Camera settings
    const cameraSettings: CameraSettings = {
        alpha: Math.PI / 4,
        beta: Math.PI / 4,
        radius: 3.3,
        position: new BABYLON.Vector3(0, 0, 0)
    };

    // Update camera info for debugging display
    const updateCameraInfo = () => {
        if (refs.current.camera) {
            const position = refs.current.camera.position;
            setCameraPositionState(`${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
            setCameraZoomState(refs.current.camera.radius);
        }
    };

    // Initialize scene and all components
    useEffect(() => {
        if (!mountRef.current || typeof window === 'undefined') return;

        // Create scene and engine
        const { engine, scene } = createScene(mountRef.current, background);
        engineRef.current = engine;
        refs.current.scene = scene;

        // Setup camera
        const camera = setupCamera(scene, mountRef.current, cameraSettings);
        refs.current.camera = camera;

        // Setup lighting
        const { hemisphericLight, directionalLight, directionalLight2, shadowGenerator } = 
            setupLighting(scene, secondaryColor, lightIntensity);
        refs.current.shadowGenerator = shadowGenerator;
        setCurrentLightIntensity(lightIntensity);

        // Setup ground with grid
        const { gridMaterial, ground } = setupGround(scene);
        refs.current.gridMaterial = gridMaterial;
        refs.current.ground = ground;

        // Load model
        loadModel(scene, modelUrl || 'mujerrobot.glb', refs.current, updateCameraInfo);

        // Setup event handlers
        const cleanupRotationHandlers = setupModelRotationHandlers(
            mountRef.current,
            refs.current,
            isDragging,
            setIsDragging,
            previousMousePosition,
            setPreviousMousePosition
        );

        const cleanupZoomHandler = setupZoomHandler(
            mountRef.current,
            refs.current.camera,
            (radius) => {
                setCameraZoomState(radius);
                updateCameraInfo();
            }
        );

        // Animation loop
        engine.runRenderLoop(() => {
            scene?.render();
            updateCameraInfo();
        });

        // Resize listener
        const handleResize = () => {
            engine.resize();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cleanupRotationHandlers();
            cleanupZoomHandler();
            window.removeEventListener('resize', handleResize);
            disposeScene(engine);
        };
    }, [background, secondaryColor, modelUrl]);

    // Update model material color when color prop changes
    useEffect(() => {
        updateModelColor(refs.current.model, refs.current.meshMaterial, color);
    }, [color]);

    // Update rotation when dragging
    useEffect(() => {
        if (refs.current.model && isDragging) {
            // This can be used to apply continuous rotation if needed
        }
    }, [isDragging, previousMousePosition.x, previousMousePosition.y]);

    // Update light intensity when prop changes
    useEffect(() => {
        if (refs.current.scene) {
            const directionalLight = refs.current.scene.getLightByName('dirLight') as BABYLON.DirectionalLight;
            const directionalLight2 = refs.current.scene.getLightByName('dirLight2') as BABYLON.DirectionalLight;
            
            if (directionalLight && directionalLight2) {
                updateLightIntensity(directionalLight, directionalLight2, lightIntensity);
                setCurrentLightIntensity(lightIntensity);
            }
        }
    }, [lightIntensity]);

    return (
        <main className="w-full h-full bg-white">
            <canvas
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing block"
                onMouseDown={(e) => e.preventDefault()}
            />
            <DebugInfo
                cameraPosition={cameraPositionState}
                cameraZoom={cameraZoomState}
                lightIntensity={currentLightIntensity}
            />
        </main>
    );
};

export default AvatarPanel;