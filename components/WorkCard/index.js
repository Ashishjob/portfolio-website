import { useEffect, useState } from "react";
import Image from "next/image";

const WorkCard = ({ img, imgMobile, name, description, onClick, dates }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Set the initial screen size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup the listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300"
        style={{ height: "300px" }}
      >
        <div className="relative h-full w-full">
          {isMobile ? (
            <Image
              alt={name}
              className="object-cover hover:scale-110 transition-all ease-out duration-300"
              src={imgMobile}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Image
              alt={name}
              className="object-cover hover:scale-110 transition-all ease-out duration-300"
              src={img}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      </div>

      <h1 className="mt-5 text-2xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h3 className="text-lg opacity-50">{dates ? dates : "Dates"}</h3>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
