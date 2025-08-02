// src/components/Certificates.jsx
import ReactMarkdown from 'react-markdown';

const Certificates = ({ data }) => (
  <div>
    <h2>Certificates</h2>
    {data.map((cert, index) => (
      <div key={index}>
        <h3>{cert.name}</h3>
        <p>{cert.issuer}</p>
        <p>{cert.date}</p>
        <ReactMarkdown>{cert.description}</ReactMarkdown>
      </div>
    ))}
  </div>
);

export default Certificates;