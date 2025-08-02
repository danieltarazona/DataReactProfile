import ReactMarkdown from 'react-markdown';

const Header = ({ data }) => (
  <div>
    <h1>{data.name}</h1>
    <h2>{data.title}</h2>
    <p>{data.location} • {data.email} • {data.phone} • {data.github}</p>
  </div>
);

export default Header;