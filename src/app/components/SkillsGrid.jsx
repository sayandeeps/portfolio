import React,{useState} from "react";

// Define your skill data
const skillsData = [
  { name: "HTML", icon: "/html-icon.svg" },
  { name: "CSS", icon: "/css-icon.svg" },
  { name: "JavaScript", icon: "/javascript-icon.svg" },
  { name: "Nodejs", icon: "/node-icon.svg" },
  { name: "Express", icon: "/express-icon.svg" },
  { name: "Flask", icon: "/flask-icon.svg" },
  { name: "PHP", icon: "/php-icon.svg" },
  { name: "CodeIgnitor", icon: "/codeignitor-icon.svg" },
  { name: "Spring Boot", icon: "/springboot-icon.svg" },
  { name: "React.js", icon: "/react-icon.svg" },
  { name: "Next.js", icon: "/nextjs-icon.svg" },
  { name: "Python", icon: "/python-icon.svg" },
  { name: "Docker", icon: "/docker-icon.svg" },
  { name: "Figma", icon: "/figma-icon.svg" },
  { name: "Solidity", icon: "/solidity-icon.svg" },
  { name: "Tailwind CSS", icon: "/tailwindcss-icon.svg" },
  { name: "MySQL", icon: "/mysql-icon.svg" },
  { name: "MongoDB", icon: "/mongodb-icon.svg" },
  { name: "Three.js", icon: "/threejs-icon.svg" },
  { name: "Java", icon: "/java-icon.svg" },
];

const SkillsGrid = () => {
  const [showMore, setShowMore] = useState(false);  
  const [numSkillsDisplayed, setNumSkillsDisplayed] = useState(6); 

  return (
    <div className="grid gap-4 md:grid-cols-5 sm:grid-cols-3">
      {skillsData
        .slice(0, numSkillsDisplayed)
        .map((skill, index) => (
          <div key={index} className="text-center">
            <img src={skill.icon} alt={skill.name} className="mx-auto h-16 w-16" />
            <p className="mt-2 text-sm text-gray-600">{skill.name}</p>
          </div>
        ))}
        <button 
            onClick={() => {
                setShowMore(!showMore);
                setNumSkillsDisplayed(showMore ? 6 : skillsData.length);
            }}
            className="mt-4"
        >
            {showMore ? "View Less Skills" : "View More Skills"}
        </button>
    </div>
  );
};

SkillsGrid.displayName = "SkillsGrid";

export default SkillsGrid;
