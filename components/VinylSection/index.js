import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        {vinyls.map((vinyl, index) => (
          <motion.div
            key={vinyl.id}
            className="relative aspect-square cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 15,
              z: 50
            }}
            onClick={() => setSelectedVinyl(vinyl)}
          >
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden transform preserve-3d hover:shadow-xl transition-all duration-300">
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full">
            <div className="relative flex justify-center">
              <div className="relative w-96 h-96">
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: -48 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full h-full"
                >
                  <img
                    src={selectedVinyl.cover}
                    alt={`${selectedVinyl.title} by ${selectedVinyl.artist}`}
                    className="w-full h-full rounded-lg shadow-2xl object-cover"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 0, scale: 0.8, opacity: 0 }}
                  animate={{ 
                    x: 160,
                    scale: 1,
                    opacity: 1
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full h-full -z-10"
                >
                  <motion.img
                    src={selectedVinyl.disk}
                    alt="Vinyl record"
                    className="w-full h-full rounded-full shadow-2xl "
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-20 left-0 text-white"
                >
                  <h2 className="text-2xl font-bold -ml-10">{selectedVinyl.title}</h2>
                  <p className="text-lg opacity-75 -ml-10">{selectedVinyl.artist}</p>
                </motion.div>
              </div>

              <button
                onClick={() => setSelectedVinyl(null)}
                className="absolute top-0 right-0 text-white rounded-full p-2 hover:bg-white hover:bg-opacity-20"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VinylCollection;