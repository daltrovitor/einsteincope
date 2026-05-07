'use client'

import { Canvas, useThree } from '@react-three/fiber'
import {
  useGLTF,
  useAnimations,
  Stage,
  Float,
  OrbitControls
} from '@react-three/drei'
import { Suspense, useEffect, useRef, useState, memo } from 'react'
import * as THREE from 'three'
import { KTX2Loader } from 'three-stdlib'

// Preload the model with Draco decoder
const DRACO_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'
const MODEL_URL = '/einstein_salesforce_tower.glb'
useGLTF.preload(MODEL_URL, DRACO_URL)

const Model = memo(({ url }: { url: string }) => {
  const group = useRef<THREE.Group>(null)
  const gl = useThree((state) => state.gl)

  const { scene, animations } = useGLTF(url, DRACO_URL)

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      const firstAction = Object.values(actions)[0]
      if (firstAction) firstAction.play()
    }
  }, [actions])

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.6}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  )
})

Model.displayName = 'EinsteinModel'

export default function Einstein3D() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 500) // Faster load for better UX
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex h-[500px] w-full cursor-grab items-center justify-center active:cursor-grabbing md:h-[800px] lg:h-[950px]">
      {!shouldLoad ? (
        <div className="border-primary/10 flex h-32 w-32 animate-pulse items-center justify-center rounded-full border">
          <div className="bg-primary/20 h-[1px] w-16 rotate-45" />
        </div>
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true
          }}>
          <Suspense fallback={null}>
            <Stage
              intensity={0.6}
              environment="city"
              adjustCamera={false}
              center={{}}>
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
                <Model url={MODEL_URL} />
              </Float>
            </Stage>
            <OrbitControls
              enableZoom={false}
              autoRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
        </Canvas>
      )}
    </div>
  )
}
