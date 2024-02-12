"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Transforming Images into 3D: Seamlessly Stored on IPFS",
    description: "Developed a project utilizing photogrammetry to convert multiple photos of an object into a 3D mesh. Modified a command-line tool, Object Capture API, to integrate it into a web interface for user convenience. Additionally, implemented IPFS for storing the 3D file, generating a hash link for easy sharing and viewing on other websites.",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/sayandeeps/admin_diversion_2024.git",
    previewUrl: "https://github.com/sayandeeps/admin_diversion_2024.git",
  },
  {
    id: 2,
    title: "3D E-Commerce: Immersive Shopping Experience with IPFS Integration and Polygon Smart Contracts",
    description: "Created an e-commerce platform to showcase 3D objects stored on IPFS. Implemented a smart contract in Solidity and deployed it on Polygon to securely store user details.",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/sayandeeps/diversion2k24.git",
    previewUrl: "ecommerce-ten-pearl.vercel.app",
  },
  {
    id: 3,
    title: "Blockchain-Powered E-Commerce: Instant Answers and Personalized Assistance",
    description: "Our e-commerce platform integrates blockchain for personalized assistance, securely storing user details and providing instant responses to inquiries about products and delivery times using AI. With a user-friendly chat interface, customers enjoy seamless interactions, revolutionizing online shopping.",
    image: "/images/projects/3.png",
    tag: ["All", "AI/ML"],
    gitUrl: "https://github.com/sayandeeps/diversion2k24.git",
    previewUrl: "ecommerce-ten-pearl.vercel.app",
  },
  {
    id: 4,
    title: "Inverntory Management System - using CodeIgnitor 4",
    description: "Our Inventory Management System, powered by CodeIgniter 4 and MySQL, simplifies inventory tracking and sales management. Leveraging the Cart library, users can effortlessly handle add-to-cart functionality, ensuring a seamless experience. With CodeIgniter 4's flexibility, our system offers scalability and customization for businesses, streamlining operations and boosting efficiency.",
    image: "/images/projects/4.png",
    tag: ["All"],
    gitUrl: "https://github.com/sayandeeps/Inventory-Management-System.git",
    previewUrl: "https://github.com/sayandeeps/Inventory-Management-System.git",
  },
  {
    id: 5,
    title: "Dynamic Forms Builder",
    description: " Our project enables easy creation of dynamic forms with Next.js 13, Dnd-kit, and Tailwind CSS or Shadcn UI. Backed by Vercel PostgreSQL and Prisma, it offers a range of layout and form fields, form preview, shareable URLs, and robust submission validation and tracking.",
    image: "/images/projects/5.png",
    tag: ["All"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Secure Aadhar Data Management with Next.js and Firebase",
    description: "Our project combines Firebase's OTP phone login with Aadhar API integration, allowing users to securely access and manage their Aadhar data through an interactive Next.js dashboard, all stored securely in the Appwrite database.",
    image: "/images/projects/6.png",
    tag: ["All"],
    gitUrl: "https://github.com/sayandeeps/cn-work.git",
    previewUrl: "https://cn-work.vercel.app/logindev",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="pt-3">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2 md:mb-4">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="AI/ML"
          isSelected={tag === "AI/ML"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
