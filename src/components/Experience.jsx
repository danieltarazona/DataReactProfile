import ReactMarkdown from 'react-markdown';

const Experience = ({ data }) => (
  <div>
    <h2>Relevant Experience</h2>
    {data.map((exp, index) => (
      <div key={index}>
        <h3>{exp.company}</h3>
        <p>{exp.role}</p>
        <p>{exp.date}</p>
        <p>{exp.location}</p>
        <ReactMarkdown>{exp.description}</ReactMarkdown>
      </div>
    ))}
  </div>
);

export default Experience;