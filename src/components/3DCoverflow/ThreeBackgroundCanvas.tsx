import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VisualTheme } from '../../types';

interface ThreeBackgroundCanvasProps {
  theme: VisualTheme;
}

export const ThreeBackgroundCanvas: React.FC<ThreeBackgroundCanvasProps> = ({ theme }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Theme Colors
    const getColors = () => {
      switch (theme) {
        case 'luxury-dark':
          return {
            particles: 0xf59e0b, // Amber Gold
            secondary: 0xd97706,
            grid: 0x451a03,
            fog: 0x0b0b0e,
          };
        case 'amber-glass':
          return {
            particles: 0xfbbf24, // Bright Gold
            secondary: 0xb45309,
            grid: 0x78350f,
            fog: 0x120a02,
          };
        case 'cyber-neon':
          return {
            particles: 0x06b6d4, // Cyan
            secondary: 0x8b5cf6, // Violet
            grid: 0x1e1b4b,
            fog: 0x080914,
          };
      }
    };

    let themeColors = getColors();

    // 3. Particles Count & Geometry
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Texture / Material
    const pMaterial = new THREE.PointsMaterial({
      color: themeColors.particles,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 4. Rotating Holographic Wireframe Rings (Orbital HUD)
    const ringGeo1 = new THREE.TorusGeometry(8, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: themeColors.particles,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(12, 0.015, 12, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: themeColors.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 5. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      // Rotate HUD rings
      ring1.rotation.z = elapsedTime * 0.1;
      ring1.rotation.y = elapsedTime * 0.05;
      ring2.rotation.z = -elapsedTime * 0.08;

      // Parallax camera lerp
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
