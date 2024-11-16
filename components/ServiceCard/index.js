import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description, link }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <a href={link} target="_blank" rel="noreferrer">
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 link`}
    >
      <h1 className="text-2xl">{name ? name : "Heading"}</h1>
      <p className="mt-2 opacity-40 text-lg">
        {description
          ? description
          : "This project involves designing and implementing a sophisticated fullstack database system tailored for an art museum environment."}
      </p>
    </div>
    </a>
  );
};

export default ServiceCard;
