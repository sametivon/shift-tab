import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStore } from "@/lib/sceneStore";

/* The actual WebGL layer — lazy, client-only (see AmbientLayer).
   One fullscreen plane, one fragment shader:
   • three blooms drifting on the paper base, the first tinted by the
     ACTIVE SCENE's accent (lerped per tick — the page's light follows
     the journey)
   • a cursor-following caustic ridge — the "cursor bends light" moment
   • u_scroll eases the bloom field upward as the visitor travels
   Rendered on demand at ~30fps, dpr ≤ 1.25, skipped on hidden tabs. */

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_res;
  uniform vec2  u_mouse;
  uniform float u_scroll;
  uniform vec3  u_accent;
  varying vec2  v_uv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
               mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
  }
  float bloom(vec2 uv, vec2 c, float r){ return smoothstep(r, 0.0, distance(uv, c)); }

  void main(){
    vec2 uv = v_uv;
    vec2 asp = vec2(u_res.x/u_res.y, 1.0);
    vec2 p = uv * asp;
    float t = u_time * 0.03;
    vec2 m = (u_mouse - 0.5) * 0.10;
    float drift = u_scroll * 0.18;

    vec2 c1 = vec2(0.22*asp.x, 0.30 + drift) + vec2(sin(t*0.9), cos(t*0.7))*0.06 + m*asp;
    vec2 c2 = vec2(0.84*asp.x, 0.24 + drift*0.6) + vec2(cos(t*0.6), sin(t*0.8))*0.07 - m*asp*0.6;
    vec2 c3 = vec2(0.58*asp.x, 0.92 - drift*0.4) + vec2(sin(t*0.5), cos(t*0.9))*0.06 + m*asp*0.4;

    float n = noise(p*2.2 + t) * 0.06;

    vec3 paper = vec3(0.980, 0.980, 0.982);
    vec3 accentSoft  = mix(paper, u_accent, 0.12);  // bloom tint
    vec3 accentSharp = mix(paper, u_accent, 0.26);  // caustic tint
    vec3 emeraldSoft = vec3(0.902, 0.966, 0.940);
    vec3 lavender    = vec3(0.940, 0.932, 0.998);

    vec3 col = paper;
    col = mix(col, accentSoft,  bloom(p, c1, 0.58+n)*0.62);
    col = mix(col, lavender,    bloom(p, c2, 0.50+n)*0.48);
    col = mix(col, emeraldSoft, bloom(p, c3, 0.55+n)*0.42);

    // the cursor bends light: a thin caustic ridge in the noise field,
    // masked to a pool around the pointer
    float ridge = pow(1.0 - abs(noise(p*3.1 - t*0.6)*2.0 - 1.0), 7.0);
    float pool  = bloom(p, u_mouse*asp, 0.34);
    col = mix(col, accentSharp, ridge * pool * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertexShader = /* glsl */ `
  varying vec2 v_uv;
  void main(){ v_uv = uv; gl_Position = vec4(position, 1.0); }
`;

function GradientPlane() {
  const { size, invalidate } = useThree();
  const uniforms = useRef({
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(size.width, size.height) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_scroll: { value: 0 },
    u_accent: { value: new THREE.Color("#6D5EF7") },
  });
  const accentTarget = useRef(new THREE.Color("#6D5EF7"));

  useEffect(() => {
    uniforms.current.u_res.value.set(size.width, size.height);
  }, [size]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      uniforms.current.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // the page's light follows the journey: active scene accent → target
  useEffect(() => {
    const apply = () => {
      const { scenes, activeId } = sceneStore.getSnapshot();
      const accent = scenes.find((s) => s.id === activeId)?.accent;
      if (accent && accent !== "#0F172A") accentTarget.current.set(accent);
    };
    apply();
    return sceneStore.subscribe(apply);
  }, []);

  // demand-mode @ ~30fps: drift is slow, halving render rate halves the
  // GPU bill under every glass surface; hidden tabs pay nothing
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      const u = uniforms.current;
      u.u_time.value += 1 / 30;
      u.u_accent.value.lerp(accentTarget.current, 0.06);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      u.u_scroll.value += ((max > 0 ? window.scrollY / max : 0) - u.u_scroll.value) * 0.08;
      invalidate();
    }, 1000 / 30);
    return () => clearInterval(id);
  }, [invalidate]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AmbientCanvas({ onDead }: { onDead: () => void }) {
  return (
    <Canvas
      className="!absolute inset-0 animate-[fade-in_1.2s_ease-out]"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.25]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      frameloop="demand"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            onDead();
          },
          { once: true }
        );
      }}
    >
      <GradientPlane />
    </Canvas>
  );
}
