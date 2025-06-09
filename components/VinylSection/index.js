import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDiscogsCollection } from "../../lib/discogs";

const VinylCollection = () => {
  const [vinyls, setVinyls] = useState([]);
  const [selectedVinyl, setSelectedVinyl] = useState(null);

  useEffect(() => {
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched via API route:", data);
        setVinyls(data);
      });
  }, []);

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
              z: 50,
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
            <div className="relative flex justify-center">
              <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-lg">
                {/* Responsive animation: column on mobile, row on larger screens */}
                {/* Cover */}
                <motion.div
                  initial={{
                    y: 0,
                    x: 0,
                  }}
                  animate={{
                    // On small screens, slide down; on larger, slide right
                    y:
                      typeof window !== "undefined" && window.innerWidth < 640
                        ? 48
                        : 0,
                    x:
                      typeof window !== "undefined" && window.innerWidth >= 640
                        ? -48
                        : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full h-full z-10"
                >
                  <img
                    src={selectedVinyl.cover}
                    alt={`${selectedVinyl.title} by ${selectedVinyl.artist}`}
                    className="w-full h-full rounded-lg shadow-2xl object-cover"
                  />
                </motion.div>

                {/* Vinyl */}
                <motion.div
                  initial={{ y: 0, x: 0 }}
                  animate={{
                    y:
                      typeof window !== "undefined" && window.innerWidth < 640
                        ? 48
                        : 0,
                    x:
                      typeof window !== "undefined" && window.innerWidth >= 640
                        ? -48
                        : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full h-full z-10 group relative"
                >
                  <img
                    src={selectedVinyl.cover}
                    alt={`${selectedVinyl.title} by ${selectedVinyl.artist}`}
                    className="w-full h-full rounded-lg shadow-2xl object-cover"
                  />

                  {/* Hover Info */}
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-sm p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-base font-semibold">
                      {selectedVinyl.title}
                    </h2>
                    <p className="opacity-80">{selectedVinyl.artist}</p>
                    {selectedVinyl.year && (
                      <p className="mt-1">🗓️ Year: {selectedVinyl.year}</p>
                    )}
                    {selectedVinyl.genres && (
                      <p>🎵 Genre: {selectedVinyl.genres}</p>
                    )}
                    {selectedVinyl.format && (
                      <p>💿 Format: {selectedVinyl.format}</p>
                    )}
                  </div>
                </motion.div>

              </div>
              <button
                onClick={() => setSelectedVinyl(null)}
                className="absolute top-0 right-0 text-white rounded-full p-2 hover:bg-white hover:bg-opacity-20"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
