import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Sun,
  Lightbulb,
  Eye,
  CalendarCheck,
  Sparkles,
  Box,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Car } from '../types';
import { CarCard } from './CarCard';

interface Showroom3DViewProps {
  cars: Car[];
  wishlistIds: string[];
  compareIds: string[];
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
}

const PAINT_FINISHES = [
  { name: 'Portimao Blue', hex: '#1B4F9C' },
  { name: 'Obsidian Black', hex: '#14171F' },
  { name: 'Champagne Gold', hex: '#C9A23F' },
  { name: 'Mineral White', hex: '#E5E7EB' },
  { name: 'Selenite Grey', hex: '#4B5563' },
  { name: 'Rubellite Red', hex: '#881337' },
];

export const Showroom3DView: React.FC<Showroom3DViewProps> = ({
  cars,
  wishlistIds,
  compareIds,
  onToggleWishlist,
  onToggleCompare,
  onSelectCar,
  onBookTestDrive,
}) => {
  const bmwAndBenz = cars.filter(
    (c) => c.brand === 'BMW' || c.brand === 'Mercedes-Benz'
  );

  const [activeCar, setActiveCar] = useState<Car>(bmwAndBenz[0] || cars[0]);
  const [paintHex, setPaintHex] = useState<string>(PAINT_FINISHES[0].hex);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [studioLight, setStudioLight] = useState<'gold' | 'cool' | 'bright'>('gold');
  const [viewMode, setViewMode] = useState<'3d' | 'render'>('3d');
  const [cameraZoom, setCameraZoom] = useState<number>(6.2);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const bodyMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const headlightMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const autoRotateRef = useRef(autoRotate);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ y: -0.65, x: 0.12 });

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Update paint color dynamically
  useEffect(() => {
    if (bodyMatRef.current) {
      bodyMatRef.current.color.set(paintHex);
    }
  }, [paintHex]);

  // Update headlights dynamically
  useEffect(() => {
    if (headlightMatRef.current) {
      headlightMatRef.current.emissiveIntensity = headlightsOn ? 2.6 : 0.05;
    }
  }, [headlightsOn]);

  // Update studio lighting dynamically
  useEffect(() => {
    if (spotLightRef.current && rimLightRef.current) {
      if (studioLight === 'gold') {
        spotLightRef.current.color.set('#FFE4B5');
        rimLightRef.current.color.set('#D4AF37');
      } else if (studioLight === 'cool') {
        spotLightRef.current.color.set('#DBEAFE');
        rimLightRef.current.color.set('#38BDF8');
      } else {
        spotLightRef.current.color.set('#FFFFFF');
        rimLightRef.current.color.set('#F3F4F6');
      }
    }
  }, [studioLight]);

  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = cameraZoom;
    }
  }, [cameraZoom]);

  // Build & animate Three.js 3D Car Scene
  useEffect(() => {
    if (viewMode !== '3d' || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090E');
    scene.fog = new THREE.Fog('#07090E', 10, 24);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.85, cameraZoom);
    camera.lookAt(0, 0.55, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight('#ffffff', 0.65);
    scene.add(ambient);

    const spot = new THREE.SpotLight('#FFE4B5', 85, 25, Math.PI / 4, 0.45, 1.5);
    spot.position.set(4, 7.5, 5);
    spot.castShadow = true;
    scene.add(spot);
    spotLightRef.current = spot;

    const rim = new THREE.PointLight('#D4AF37', 35, 18);
    rim.position.set(-4.5, 3, -4);
    scene.add(rim);
    rimLightRef.current = rim;

    const fill = new THREE.DirectionalLight('#93C5FD', 0.9);
    fill.position.set(-3, 4, 4);
    scene.add(fill);

    // Reflective Turntable Platform
    const turntable = new THREE.Mesh(
      new THREE.CylinderGeometry(3.3, 3.5, 0.16, 64),
      new THREE.MeshStandardMaterial({
        color: '#0D1017',
        metalness: 0.75,
        roughness: 0.22,
      })
    );
    turntable.position.y = -0.08;
    turntable.receiveShadow = true;
    scene.add(turntable);

    // Golden Turntable Halo Ring
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(3.22, 3.3, 64),
      new THREE.MeshBasicMaterial({ color: '#D4AF37', side: THREE.DoubleSide })
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.01;
    scene.add(halo);

    // Build Procedural Luxury Car (adapts to Sedan vs SUV & BMW vs Benz)
    const isSUV = activeCar.bodyType === 'SUV';
    const isBMW = activeCar.brand === 'BMW';

    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: paintHex,
      metalness: 0.82,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    bodyMatRef.current = bodyMat;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#0A0E17',
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.35,
      transparent: true,
      opacity: 0.9,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: '#E5E7EB',
      metalness: 0.95,
      roughness: 0.1,
    });

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: '#111318',
      metalness: 0.3,
      roughness: 0.7,
    });

    const headlightMat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      emissive: '#E0F2FE',
      emissiveIntensity: headlightsOn ? 2.6 : 0.05,
    });
    headlightMatRef.current = headlightMat;

    const taillightMat = new THREE.MeshStandardMaterial({
      color: '#EF4444',
      emissive: '#DC2626',
      emissiveIntensity: 2.0,
    });

    // Lower Chassis / Body
    const bodyHeight = isSUV ? 0.68 : 0.52;
    const bodyY = isSUV ? 0.66 : 0.52;
    const mainBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.92, bodyHeight, 4.45),
      bodyMat
    );
    mainBody.position.y = bodyY;
    mainBody.castShadow = true;
    carGroup.add(mainBody);

    // Sculpted Front Hood Slope
    const hood = new THREE.Mesh(
      new THREE.BoxGeometry(1.86, 0.16, 1.45),
      bodyMat
    );
    hood.position.set(0, bodyY + bodyHeight / 2 + 0.02, 1.45);
    hood.rotation.x = 0.08;
    carGroup.add(hood);

    // Cabin / Greenhouse
    const cabinLength = isSUV ? 2.55 : 2.15;
    const cabinHeight = isSUV ? 0.62 : 0.48;
    const cabinZ = isSUV ? -0.35 : -0.18;
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.68, cabinHeight, cabinLength),
      glassMat
    );
    cabin.position.set(0, bodyY + bodyHeight / 2 + cabinHeight / 2 - 0.02, cabinZ);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Panel
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.06, cabinLength - 0.35),
      bodyMat
    );
    roof.position.set(0, bodyY + bodyHeight / 2 + cabinHeight - 0.01, cabinZ);
    carGroup.add(roof);

    // Brand-Specific Front Grille
    if (isBMW) {
      // BMW Iconic Dual Kidney Grille
      [-0.24, 0.24].forEach((xOff) => {
        const kidneyFrame = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.32, 0.08),
          chromeMat
        );
        kidneyFrame.position.set(xOff, bodyY - 0.02, 2.23);
        carGroup.add(kidneyFrame);

        const kidneyInner = new THREE.Mesh(
          new THREE.BoxGeometry(0.34, 0.26, 0.09),
          darkTrimMat
        );
        kidneyInner.position.set(xOff, bodyY - 0.02, 2.24);
        carGroup.add(kidneyInner);
      });
    } else {
      // Mercedes-Benz Wide Chrome Star Grille
      const benzGrille = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.3, 0.08),
        darkTrimMat
      );
      benzGrille.position.set(0, bodyY - 0.02, 2.23);
      carGroup.add(benzGrille);

      const chromeBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.04, 0.1),
        chromeMat
      );
      chromeBar.position.set(0, bodyY - 0.02, 2.24);
      carGroup.add(chromeBar);

      const starRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.11, 0.02, 12, 24),
        chromeMat
      );
      starRing.position.set(0, bodyY - 0.02, 2.28);
      carGroup.add(starRing);
    }

    // LED Headlights
    [-0.68, 0.68].forEach((xOff) => {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.11, 0.1), headlightMat);
      lamp.position.set(xOff, bodyY + 0.08, 2.21);
      carGroup.add(lamp);
    });

    // Connected LED Taillight Bar
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.09, 0.08), taillightMat);
    tailBar.position.set(0, bodyY + 0.1, -2.22);
    carGroup.add(tailBar);

    // 4 Luxury Alloy Wheels + Brake Calipers
    const wheelRadius = isSUV ? 0.42 : 0.36;
    const wheelPositions: [number, number, number][] = [
      [-0.96, wheelRadius, 1.38],
      [0.96, wheelRadius, 1.38],
      [-0.96, wheelRadius, -1.38],
      [0.96, wheelRadius, -1.38],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.28, 32),
        darkTrimMat
      );
      tire.rotation.z = Math.PI / 2;
      tire.position.set(x, y, z);
      carGroup.add(tire);

      const rimMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelRadius * 0.66, wheelRadius * 0.66, 0.29, 20),
        chromeMat
      );
      rimMesh.rotation.z = Math.PI / 2;
      rimMesh.position.set(x, y, z);
      carGroup.add(rimMesh);
    });

    carGroup.rotation.y = rotRef.current.y;
    scene.add(carGroup);

    // Mouse / Touch Orbit Controls
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      rotRef.current.y += dx * 0.008;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotateRef.current && !isDraggingRef.current) {
        rotRef.current.y += 0.005;
      }
      if (carGroupRef.current) {
        carGroupRef.current.rotation.y = rotRef.current.y;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeCar, viewMode]);

  const studioRenderImg =
    activeCar.brand === 'BMW' ? '/images/bmw-3d-studio.jpg' : '/images/benz-3d-studio.jpg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3D37A] text-xs uppercase tracking-[0.22em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Interactive 3D German Luxury Pavilion
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            BMW &amp; Mercedes-Benz 3D Studio
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Drag to rotate 360° in real-time WebGL, customize metallic finishes, toggle LED lighting,
            or switch to photorealistic studio renders.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-[#0D1017] p-1.5 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === '3d' ? 'bg-[#D4AF37] text-black' : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" /> Interactive 3D Model
          </button>
          <button
            onClick={() => setViewMode('render')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'render' ? 'bg-[#D4AF37] text-black' : 'text-zinc-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Studio CGI Render
          </button>
        </div>
      </div>

      {/* Model Selector Tabs (BMW & Mercedes-Benz) */}
      <div className="flex flex-wrap gap-2.5">
        {bmwAndBenz.map((car) => {
          const active = activeCar.id === car.id;
          return (
            <button
              key={car.id}
              onClick={() => setActiveCar(car)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                active
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3D37A]'
                  : 'bg-[#0D1017] border-white/10 text-zinc-300 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="opacity-70 mr-1.5">{car.brand}</span>
              {car.name}
            </button>
          );
        })}
      </div>

      {/* 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#07090E] min-h-[420px] sm:min-h-[500px]">
          {viewMode === '3d' ? (
            <>
              <div
                ref={mountRef}
                className="w-full h-[420px] sm:h-[500px] cursor-grab active:cursor-grabbing"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-zinc-200 flex items-center gap-2 pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 text-[#F3D37A]" /> Drag to Rotate 360° • Real-Time WebGL
              </div>

              {/* Zoom & Quick Toggles */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setCameraZoom((z) => Math.max(4.4, z - 0.6))}
                  title="Zoom In"
                  className="p-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/15 text-white cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCameraZoom((z) => Math.min(8.5, z + 0.6))}
                  title="Zoom Out"
                  className="p-2.5 rounded-xl bg-black/70 hover:bg-black border border-white/15 text-white cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="relative w-full h-[420px] sm:h-[500px] overflow-hidden group">
              <img
                src={studioRenderImg}
                alt={`${activeCar.brand} ${activeCar.name} 3D Studio Render`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3D37A] text-xs font-semibold">
                  8K Studio CGI Showcase — {activeCar.brand}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Controls Panel */}
        <div className="lg:col-span-4 rounded-3xl glass-panel p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                {activeCar.brand} • {activeCar.bodyType}
              </span>
              <h2 className="font-display text-2xl font-bold text-white mt-0.5">
                {activeCar.name}
              </h2>
              <p className="font-mono-num text-xl font-bold text-gold-gradient mt-1">
                {activeCar.priceDisplay}
                <span className="text-xs text-zinc-400 font-normal ml-1.5">Est. Ex-Showroom</span>
              </p>
            </div>

            {/* Metallic Paint Customizer */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2.5">
                3D Metallic Paint Finish
              </label>
              <div className="flex flex-wrap gap-2.5">
                {PAINT_FINISHES.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPaintHex(p.hex)}
                    title={p.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                      paintHex === p.hex
                        ? 'border-[#F3D37A] scale-110 ring-2 ring-[#D4AF37]/40'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: p.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Studio Toggles */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  autoRotate
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#F3D37A]'
                    : 'bg-white/[0.04] border-white/10 text-zinc-300'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                {autoRotate ? 'Spin: ON' : 'Spin: OFF'}
              </button>
              <button
                onClick={() => setHeadlightsOn(!headlightsOn)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  headlightsOn
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#F3D37A]'
                    : 'bg-white/[0.04] border-white/10 text-zinc-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {headlightsOn ? 'LEDs: ON' : 'LEDs: OFF'}
              </button>
            </div>

            {/* Studio Lighting Presets */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> Studio Lighting
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gold', label: 'Gold' },
                  { id: 'cool', label: 'Cyber' },
                  { id: 'bright', label: 'Daylight' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setStudioLight(m.id as 'gold' | 'cool' | 'bright')}
                    className={`py-2 rounded-lg text-xs font-semibold border cursor-pointer ${
                      studioLight === m.id
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-white/[0.04] text-zinc-300 border-white/10'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Spec Mini-Strip */}
            <div className="grid grid-cols-2 gap-2.5 text-xs pt-2 border-t border-white/10">
              <div>
                <span className="text-zinc-400 block">Power</span>
                <span className="font-mono-num font-bold text-white">{activeCar.horsepower} bhp</span>
              </div>
              <div>
                <span className="text-zinc-400 block">0–100 km/h</span>
                <span className="font-mono-num font-bold text-white">{activeCar.acceleration}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onSelectCar(activeCar)}
              className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#F3D37A]" /> Full Specifications &amp; Gallery
            </button>
            <button
              onClick={() => onBookTestDrive(activeCar)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3D37A] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" /> Book VIP Test Drive
            </button>
          </div>
        </div>
      </div>

      {/* Full BMW & Mercedes-Benz Collection Cards */}
      <div className="space-y-6 pt-4">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            German Engineering Icons
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            All BMW &amp; Mercedes-Benz Models ({bmwAndBenz.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bmwAndBenz.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlistIds.includes(car.id)}
              isCompared={compareIds.includes(car.id)}
              onToggleWishlist={onToggleWishlist}
              onToggleCompare={onToggleCompare}
              onSelectCar={onSelectCar}
              onBookTestDrive={onBookTestDrive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
