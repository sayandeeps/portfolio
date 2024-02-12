import React, { useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const EducationTimeline = () => {
  const darkModeGradients = [
    'linear-gradient(to right, #548D44, #FFD94C)', // Dark green to pastel yellow
    'linear-gradient(to right, #548D44, #FFA07A)', // Dark green to pastel orange
    'linear-gradient(to right, #548D44, #FF8882)', // Dark green to pastel red
  ];

  const timelineRef = useRef(null);

  const handleScroll = () => {
    if (timelineRef.current) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.clientHeight;
      const triggerPoint = timelineTop + timelineHeight * 0.7;
      
      if (scrollTop > triggerPoint) {
        timelineRef.current.classList.add('animate-timeline');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      
      <VerticalTimeline ref={timelineRef} layout="1-column">
        {workExperiences.map((experience, index) => (
          <VerticalTimelineElement
            visible={true}
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: darkModeGradients[Math.floor(Math.random() * darkModeGradients.length)],
              color: '#fff',
              padding: '8px', // Adjust padding
              borderRadius: '4px' // Adjust border radius
            }}
            contentArrowStyle={{ borderRight: '7px solid #fff' }}
            date={experience.date}
            iconStyle={{
              background: darkModeGradients[Math.floor(Math.random() * darkModeGradients.length)],
              color: '#fff',
              width: '20px', // Adjust width
              height: '20px', // Adjust height
              lineHeight: '20px', // Adjust line height
              fontSize: '10px' // Adjust font size
            }}
            icon={<i className="fas fa-briefcase"></i>}
          >
            <h3 className="vertical-timeline-element-title  font-bold text-l">{experience.title}</h3>
            <h4 className="vertical-timeline-element-subtitle  text-xs">{experience.company}</h4>
            <p className="text-xs font-bold ">{experience.skills}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default EducationTimeline;

const workExperiences = [
  {
    title: "Narula Institute of Technology",
    company: "Kolkata",
    date: "2021 - 2025",
    skills: "Information Technology"
  },
  {
    title: "Children Sr. Sec. School",
    company: "Kota",
    date: "2019 - 2021",
    skills: "CBSE"
  }
];
