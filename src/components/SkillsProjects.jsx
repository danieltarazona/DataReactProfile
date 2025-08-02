import ReactMarkdown from 'react-markdown';

const SkillsProjects = ({ data }) => (
  <div>
    <h2>Technical Skills & Projects</h2>
    <p><strong>Programming:</strong> {data.programming}</p>
    <p><strong>Design:</strong> {data.design}</p>
    {data.projects.map((proj, index) => (
      <div key={index}>
        <h3>{proj.name}</h3>
        <p>{proj.date}</p>
        <ReactMarkdown>{proj.description}</ReactMarkdown>
      </div>
    ))}
  </div>
);

export default SkillsProjects;