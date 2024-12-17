import React, { useState, Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const vinyls = [
  {
    id: 1,
    title: "Queen Greatest Hits",
    artist: "Queen",
    cover: "/vinyls/covers/queen.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/queen.glb",
  },
  {
    id: 2,
    title: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    cover: "/vinyls/covers/gkmc.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/gkmc.glb",
  },
  {
    id: 3,
    title: "Abbey Road",
    artist: "The Beatles",
    cover: "/vinyls/covers/beatles.svg",
    disk: "/vinyls/disks/beatles.svg",
    modelUrl: "/vinyls/models/beatles.glb",
  },
  {
    id: 4,
    title: "Doris",
    artist: "Earl Sweatshirt",
    cover: "/vinyls/covers/doris.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/doris.glb",
  },
  {
    id: 5,
    title: "Hoe Cakes",
    artist: "MF Doom",
    cover: "/vinyls/covers/mfdoom.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/mfdoom.glb",
  },
  {
    id: 6,
    title: "The Story of Star Wars",
    artist: "John Williams",
    cover: "/vinyls/covers/starwars1.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/starwars1.glb",
  },
  {
    id: 7,
    title: "All-Time Classics",
    artist: "Frank Sinatra",
    cover: "/vinyls/covers/sinatra.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/sinatra.glb",
  },
  {
    id: 8,
    title: "21 At 33",
    artist: "Elton John",
    cover: "/vinyls/covers/eltonjohn.svg",
    disk: "/vinyls/disks/eltonjohn.svg",
    modelUrl: "/vinyls/models/elton.glb",
  },
  {
    id: 9,
    title: "Love Yourself",
    artist: "BTS",
    cover: "/vinyls/covers/bts.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/bts.glb",
  },
  {
    id: 10,
    title: "Christmas",
    artist: "Michael Bublé",
    cover: "/vinyls/covers/buble.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/buble.glb",
  },
  {
    id: 11,
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    cover: "/vinyls/covers/wutang.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/wutang.glb",
  },
  {
    id: 12,
    title: "West Side Story",
    artist: "Soundtrack",
    cover: "/vinyls/covers/wss.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/wss.glb",
  },
  {
    id: 13,
    title: "The Best of Broadway",
    artist: "Various Artists",
    cover: "/vinyls/covers/broadway.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/broadway.glb",
  },
  {
    id: 14,
    title: "The Unfinished Symphony",
    artist: "Franz Schubert",
    cover: "/vinyls/covers/schubert.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/schubert.glb",
  },
  {
    id: 15,
    title: "Piano Concerto in A Minor",
    artist: "Edvard Grieg",
    cover: "/vinyls/covers/grieg.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/grieg.glb",
  },
  {
    id: 16,
    title: "The Scarecrow of Oz",
    artist: "Soundtrack",
    cover: "/vinyls/covers/oz.svg",
    disk: "/vinyls/disks/oz.svg",
    modelUrl: "/vinyls/models/oz.glb",
  },
  {
    id: 17,
    title: "Pokemon 25: The Album",
    artist: "Various Artists",
    cover: "/vinyls/covers/pokemon.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/pokemon.glb",
  },
  {
    id: 18,
    title: "The Pink Pantheress",
    artist: "Henry Mancini",
    cover: "/vinyls/covers/pinkpanther.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/pinkpanther.glb",
  },
  {
    id: 19,
    title: "Star Wars",
    artist: "John Williams",
    cover: "/vinyls/covers/starwars2.svg",
    disk: "/vinyls/disks/starwars2.svg",
    modelUrl: "/vinyls/models/starwars2.glb",
  },
  {
    id: 20,
    title: "ye",
    artist: "Kanye West",
    cover: "/vinyls/covers/ye.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/ye.glb",
  },
  {
    id: 21,
    title: "Circles",
    artist: "Mac Miller",
    cover: "/vinyls/covers/circles.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/circles.glb",
  },
  {
    id: 22,
    title: "I Know NIGO!",
    artist: "Nigo",
    cover: "/vinyls/covers/nigo.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/nigo.glb",
  },
  {
    id: 23,
    title: "Bad",
    artist: "Michael Jackson",
    cover: "/vinyls/covers/bad.svg",
    disk: "/vinyls/disks/bad.svg",
    modelUrl: "/vinyls/models/bad.glb",
  },
  {
    id: 24,
    title: "Jackboys",
    artist: "Jackboys",
    cover: "/vinyls/covers/jackboys.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/jackboys.glb",
  },
  {
    id: 25,
    title: "?",
    artist: "XXXTENTACION",
    cover: "/vinyls/covers/xxxtentacion.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/xxxtentacion.glb",
  },
  {
    id: 26,
    title: "King Of The Mischevious Sout Vol. 2",
    artist: "Denzel Curry",
    cover: "/vinyls/covers/denzel.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/denzel.glb",
  },
  {
    id: 27,
    title: "The Melodic Blue",
    artist: "Baby Keem",
    cover: "/vinyls/covers/keem.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/keem.glb",
  },
  {
    id: 28,
    title: "Barbie - Ken Cover",
    artist: "Various Artists",
    cover: "/vinyls/covers/ken.svg",
    disk: "/vinyls/disks/placeholder.svg",
    modelUrl: "/vinyls/models/ken.glb",
  },
];


const VinylModel = ({ modelUrl, scale = 1, rotation = [0, 0, 0], position = [0, 0, 0], isPlaying }) => {
  const { scene } = useGLTF(modelUrl, true);
  const modelRef = useRef();
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      const targetX = isPlaying ? -2 : 0;
      // Smooth transition using lerp
      modelRef.current.position.x = THREE.MathUtils.lerp(
        modelRef.current.position.x,
        targetX,
        0.1
      );
    }
  });

  const clonedScene = React.useMemo(() => {
    return scene.clone();
  }, [scene, modelUrl]);

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={scale}
      rotation={rotation}
    />
  );
};

const DiskModel = ({ isPlaying, diskUrl }) => {
  const diskRef = useRef();
  const texture = useLoader(THREE.TextureLoader, diskUrl);
  const initialRotation = [Math.PI / 2, 0, 0];
  
  useFrame((state, delta) => {
    if (diskRef.current) {
      const targetX = isPlaying ? 2 : 0;
      const targetZ = isPlaying ? 0 : -2;
      
      diskRef.current.position.x = THREE.MathUtils.lerp(
        diskRef.current.position.x,
        targetX,
        0.1
      );
      
      diskRef.current.position.z = THREE.MathUtils.lerp(
        diskRef.current.position.z,
        targetZ,
        0.1
      );

      if (isPlaying) {
        diskRef.current.rotation.y += delta * 2;
      }
    }
  });

  return (
    <mesh
      ref={diskRef}
      position={[0, 0, -2]}
      rotation={initialRotation}
    >
      <cylinderGeometry args={[1, 1, 0.1, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Modal = ({ vinyl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full h-[600px]">
        <Canvas camera={{ position: [0, 0, 8] }} key={vinyl.id}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <VinylModel
              key={`model-${vinyl.id}`}
              modelUrl={vinyl.modelUrl}
              scale={20}
              rotation={[0, 0, 0]}
              isPlaying={isPlaying}
            />
            <DiskModel 
              isPlaying={isPlaying} 
              diskUrl={vinyl.disk}
            />
            <OrbitControls enableZoom={true} enablePan={true} />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-4 left-4 text-white flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div>
            <h2 className="text-2xl font-bold">{vinyl.title}</h2>
            <p className="text-lg opacity-75">{vinyl.artist}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white rounded-full p-2 hover:bg-white hover:bg-opacity-20"
        >
          <span className="sr-only">Close</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const VinylCollection = () => {
  const [selectedVinyl, setSelectedVinyl] = useState(null);

  const vinyls = [
    { id: 1, title: "Queen Greatest Hits", artist: "Queen", cover: "/vinyls/covers/queen.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 2, title: "good kid, m.A.A.d city", artist: "Kendrick Lamar", cover: "/vinyls/covers/gkmc.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 3, title: "Abbey Road", artist: "The Beatles", cover: "/vinyls/covers/beatles.svg", disk: "/vinyls/disks/beatles.svg" },
    { id: 4, title: "Doris", artist: "Earl Sweatshirt", cover: "/vinyls/covers/doris.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 5, title: "Hoe Cakes", artist: "MF Doom", cover: "/vinyls/covers/mfdoom.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 6, title: "The Story of Star Wars", artist: "John Williams", cover: "/vinyls/covers/starwars1.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 7, title: "All-Time Classics", artist: "Frank Sinatra", cover: "/vinyls/covers/sinatra.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 8, title: "21 At 33", artist: "Elton John", cover: "/vinyls/covers/eltonjohn.svg", disk: "/vinyls/disks/eltonjohn.svg" },
    { id: 9, title: "Love Yourself", artist: "BTS", cover: "/vinyls/covers/bts.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 10, title: "Christmas", artist: "Michael Bublé", cover: "/vinyls/covers/buble.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 11, title: "Enter the Wu-Tang (36 Chambers)", artist: "Wu-Tang Clan", cover: "/vinyls/covers/wutang.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 12, title: "West Side Story", artist: "Soundtrack", cover: "/vinyls/covers/wss.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 13, title: "The Best of Broadway", artist: "Various Artists", cover: "/vinyls/covers/broadway.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 14, title: "The Unfinished Symphony", artist: "Franz Schubert", cover: "/vinyls/covers/schubert.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 15, title: "Piano Concerto in A Minor", artist: "Edvard Grieg", cover: "/vinyls/covers/grieg.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 16, title: "The Scarecrow of Oz", artist: "Soundtrack", cover: "/vinyls/covers/oz.svg", disk: "/vinyls/disks/oz.svg" },
    { id: 17, title: "Pokemon 25: The Album", artist: "Various Artists", cover: "/vinyls/covers/pokemon.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 18, title: "The Pink Pantheress", artist: "Henry Mancini", cover: "/vinyls/covers/pinkpanther.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 19, title: "Star Wars", artist: "John Williams", cover: "/vinyls/covers/starwars2.svg", disk: "/vinyls/disks/starwars2.svg" },
    { id: 20, title: "ye", artist: "Kanye West", cover: "/vinyls/covers/ye.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 21, title: "Circles", artist: "Mac Miller", cover: "/vinyls/covers/circles.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 22, title: "I Know NIGO!", artist: "Nigo", cover: "/vinyls/covers/nigo.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 23, title: "Bad", artist: "Michael Jackson", cover: "/vinyls/covers/bad.svg", disk: "/vinyls/disks/bad.svg" },
    { id: 24, title: "Jackboys", artist: "Jackboys", cover: "/vinyls/covers/jackboys.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 25, title: "?", artist: "XXXTENTACION", cover: "/vinyls/covers/xxxtentacion.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 26, title: "King Of The Mischevious Sout Vol. 2", artist: "Denzel Curry", cover: "/vinyls/covers/denzel.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 27, title: "The Melodic Blue", artist: "Baby Keem", cover: "/vinyls/covers/keem.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 28, title: "Barbie - Ken Cover", artist: "Various Artists", cover: "/vinyls/covers/ken.svg", disk: "/vinyls/disks/placeholder.svg" },
    { id: 28, title: "Flower Boy", artist: "Tyler the Creator", cover: "/vinyls/covers/flowerboy.svg", disk: "/vinyls/disks/flowerboy.svg" }
];

  return (
    <div className="w-full min-h-screen p-10 mt-2">
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
        {/* Grid view remains the same */}
        {vinyls.map((vinyl, index) => (
          <motion.div
            key={vinyl.id}
            className="relative aspect-square cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 15, z: 50 }}
            onClick={() => setSelectedVinyl(vinyl)}
          >
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={vinyl.cover}
                alt={`${vinyl.title} by ${vinyl.artist}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {selectedVinyl && (
        <Modal 
          vinyl={selectedVinyl} 
          onClose={() => setSelectedVinyl(null)} 
        />
      )}
    </div>
  );
};

export default VinylCollection;