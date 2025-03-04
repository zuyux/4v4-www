'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CenterPanel({ color, texture, background, secondaryColor }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const rendererRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Initialize cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: texture === 'rough' ? 0.8 : 0.1,
      metalness: 1.0,
    });
    const cubeMesh = new THREE.Mesh(geometry, material);
    scene.add(cubeMesh);
    cubeRef.current = cubeMesh;

    // Use secondaryColor for lights (convert hex to Three.js color)
    const lightColor = new THREE.Color(secondaryColor);
    const ambientLight = new THREE.AmbientLight(lightColor, 0.8); // Use secondary color for ambient light
    const pointLight = new THREE.PointLight(lightColor, 1.5, 100); // Use secondary color for point light
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    // Set background
    scene.background = new THREE.Color(background);
    camera.position.z = 5;

    // Event handlers
    const handleMouseDown = (event) => {
      event.preventDefault(); // Prevent default browser behavior
      if (event.button === 0) { // Left mouse button only
        setIsDragging(true);
        setPreviousMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
        console.log('Mouse down - Starting drag');
      }
    };

    const handleMouseMove = (event) => {
      event.preventDefault(); // Prevent text selection or other default behaviors
      if (isDragging && cubeRef.current) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        cubeRef.current.rotation.y += deltaX * 0.005;
        cubeRef.current.rotation.x += deltaY * 0.005;
        setPreviousMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
        console.log('Rotating cube:', cubeRef.current.rotation);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      console.log('Mouse up - Stopped dragging');
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      console.log('Mouse leave - Stopped dragging');
    };

    // Add event listeners to the canvas
    const canvas = mountRef.current;
    if (canvas) {
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      // Ensure the canvas captures events correctly
      canvas.style.touchAction = 'none'; // Disable touch actions to prevent interference
    }

    // Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      if (canvas) {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [color, texture, background, secondaryColor]); // Added secondaryColor to dependencies

  // Update cube properties
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.material.color.set(color);
      cubeRef.current.material.roughness = texture === 'rough' ? 0.8 : 0.1;
      cubeRef.current.material.metalness = 0.0;
      if (texture.startsWith('data:image/')) {
        new THREE.TextureLoader().load(texture, (tex) => {
          cubeRef.current.material.map = tex;
          cubeRef.current.material.needsUpdate = true;
          console.log('Texture applied:', texture);
        });
      } else {
        cubeRef.current.material.map = null;
        cubeRef.current.material.needsUpdate = true;
      }
    }
  }, [color, texture]);

  return (
    <main className="w-4/6 flex items-center justify-center bg-white">
      <div
        ref={mountRef}
        className="w-96 h-96 rounded-lg cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => e.preventDefault()} // Prevent default to ensure smooth dragging
      />
    </main>
  );
}