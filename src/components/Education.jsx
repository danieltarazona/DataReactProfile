import ReactMarkdown from 'react-markdown';
import '../index.css';

const Education = ({ data }) => (
  <div>
    <h2>Education</h2>
    {data.map((edu, index) => (
      <div key={index}>
        <h3>{edu.institution}</h3>
        <p>{edu.location}</p>
        <p>{edu.degree}</p>
        <p>{edu.date}</p>
        <ReactMarkdown>{edu.coursework}</ReactMarkdown>
      </div>
    ))}
  </div>
);

export default Education;