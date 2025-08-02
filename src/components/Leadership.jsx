import ReactMarkdown from 'react-markdown';

const Leadership = ({ data }) => (
  <div>
    <h2>Leadership</h2>
    {data.map((lead, index) => (
      <div key={index}>
        <h3>{lead.organization}</h3>
        <p>{lead.role}</p>
        <p>{lead.date}</p>
        <p>{lead.location}</p>
        <ReactMarkdown>{lead.description}</ReactMarkdown>
      </div>
    ))}
  </div>
);

export default Leadership;