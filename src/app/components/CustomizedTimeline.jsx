'use client'
import React, { useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import './CustomizedSection.css'; // Import your custom CSS file for styling

const CustomizedSection = () => {
  const darkModeGradients = [
    'linear-gradient(to right, #3182CE, #6B46C1)', // Blue to purple
    'linear-gradient(to right, #4299E1, #805AD5)', // Blue to darker purple
    'linear-gradient(to right, #5A67D8, #9F7AEA)', // Purple to lighter purple
  ];

  // Ref for the timeline element
  const timelineRef = useRef(null);

  // Scroll event handler
  const handleScroll = () => {
    if (timelineRef.current) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.clientHeight;
      const triggerPoint = timelineTop + timelineHeight * 0.7; // Adjust this value as needed
      
      // Check if the timeline is in view
      if (scrollTop > triggerPoint) {
        // Add animation class to timeline elements
        timelineRef.current.classList.add('animate-timeline');
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className="flex justify-center items-center">
      <h2 className="text-4xl font-bold text-white mb-8">Work Experience</h2>
    </div>
    <VerticalTimeline>

      {workExperiences.map((experience, index) => (
        <VerticalTimelineElement
          visible={true}
          key={index}
          className="vertical-timeline-element--work"
          contentStyle={{
            background: darkModeGradients[Math.floor(Math.random() * darkModeGradients.length)], // Random dark gradient color
            color: '#fff'
          }}
          contentArrowStyle={{ borderRight: '7px solid #fff' }}
          date={experience.date}
          iconStyle={{
            background: darkModeGradients[Math.floor(Math.random() * darkModeGradients.length)], // Random dark gradient color for icon background
            color: '#fff'
          }}
          icon={<i className="fas fa-briefcase"></i>}
        >
          <h3 className="vertical-timeline-element-title">{experience.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{experience.company}</h4>
          <p>{experience.skills}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
    </>
  );
        }

export default CustomizedSection;

const workExperiences = [
  {
    title: "Frontend Developer",
    company: "TrainingMug · Internship",
    date: "Dec 2023 - Feb 2024 · 3 mos",
    skills: "Tailwind CSS, Next.js and Redux Toolkit"
  },
  {
    title: "Programmer Analyst Trainee",
    company: "Breadkrrumbs Creative Studio · Internship",
    date: "Sep 2023 - Dec 2023 · 3 mos",
    skills: "IT Service Management, PHP and SQL"
  },
  {
    title: "Research Intern",
    company: "The Computer Noob · Internship",
    date: "Oct 2021 - Nov 2021 · 2 mos",
    skills: "Research Paper on Space Complexity vs Time Complexity"
  },
];
