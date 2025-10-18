// src/App.jsx
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'; // Added PDFViewer
import CVPdf from './components/CVPdf.jsx';
import './index.css';
import { useEffect } from 'react';
import CVPreview from './components/CVPreview.jsx';
import initialData from './data.jsx';

function App() {
  const [data, setData] = useState(initialData);

  const updateField = (section, field, value, index = null) => {
    setData((prev) => {
      if (index !== null) {
        const updatedSection = prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        );
        return { ...prev, [section]: updatedSection };
      } else if (typeof field === 'object') {
        return { ...prev, [section]: { ...prev[section], ...field } };
      } else {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
    });
  };

  const updateProject = (index, projField, value) => {
    setData((prev) => {
      const updatedProjects = prev.skills.projects.map((proj, i) =>
        i === index ? { ...proj, [projField]: value } : proj
      );
      return { ...prev, skills: { ...prev.skills, projects: updatedProjects } };
    });
  };

  const addItem = (section) => {
    const defaultValues = {
      education: { institution: '', location: '', degree: '', date: '', coursework: '' },
      experience: { company: '', role: '', date: '', location: '', description: '' },
      leadership: { organization: '', role: '', date: '', location: '', description: '' },
      certificates: { name: '', issuer: '', date: '', description: '' },
    };
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultValues[section] || {}],
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        projects: [...prev.skills.projects, { name: '', date: '', description: '' }],
      },
    }));
  };

  const removeItem = (section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const removeProject = (index) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        projects: prev.skills.projects.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="app">
      <div className="editor">
        <h1>Data Profile</h1>
        
        <section>
          <h3>Header</h3>
          <input
            type="text"
            value={data.header.name}
            onChange={(e) => updateField('header', 'name', e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={data.header.title}
            onChange={(e) => updateField('header', 'title', e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={data.header.location}
            onChange={(e) => updateField('header', 'location', e.target.value)}
            placeholder="Location"
          />
          <input
            type="email"
            value={data.header.email}
            onChange={(e) => updateField('header', 'email', e.target.value)}
            placeholder="Email"
          />
          <input
            type="tel"
            value={data.header.phone}
            onChange={(e) => updateField('header', 'phone', e.target.value)}
            placeholder="Phone"
          />
          <input
            type="url"
            value={data.header.github}
            onChange={(e) => updateField('header', 'github', e.target.value)}
            placeholder="GitHub"
          />
        </section>

        <section>
          <h3>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateField('education', 'institution', e.target.value, index)}
                placeholder="Institution"
              />
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateField('education', 'location', e.target.value, index)}
                placeholder="Location"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateField('education', 'degree', e.target.value, index)}
                placeholder="Degree"
              />
              <input
                type="text"
                value={edu.date}
                onChange={(e) => updateField('education', 'date', e.target.value, index)}
                placeholder="Date"
              />
              <MDEditor
                value={edu.coursework}
                onChange={(value) => updateField('education', 'coursework', value, index)}
                preview="edit"
              />
              <button onClick={() => removeItem('education', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addItem('education')}>Add Education</button>
        </section>

        <section>
          <h3>Skills & Projects</h3>
          <input
            type="text"
            value={data.skills.programming}
            onChange={(e) => updateField('skills', { programming: e.target.value })}
            placeholder="Programming Skills"
          />
          <input
            type="text"
            value={data.skills.design}
            onChange={(e) => updateField('skills', { design: e.target.value })}
            placeholder="Design Skills"
          />
          {data.skills.projects.map((proj, index) => (
            <div key={index}>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                placeholder="Project Name"
              />
              <input
                type="text"
                value={proj.date}
                onChange={(e) => updateProject(index, 'date', e.target.value)}
                placeholder="Date"
              />
              <MDEditor
                value={proj.description}
                onChange={(value) => updateProject(index, 'description', value)}
                preview="edit"
              />
              <button onClick={() => removeProject(index)}>Remove Project</button>
            </div>
          ))}
          <button onClick={addProject}>Add Project</button>
        </section>

        <section>
          <h3>Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index}>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateField('experience', 'company', e.target.value, index)}
                placeholder="Company"
              />
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateField('experience', 'role', e.target.value, index)}
                placeholder="Role"
              />
              <input
                type="text"
                value={exp.date}
                onChange={(e) => updateField('experience', 'date', e.target.value, index)}
                placeholder="Date"
              />
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateField('experience', 'location', e.target.value, index)}
                placeholder="Location"
              />
              <MDEditor
                value={exp.description}
                onChange={(value) => updateField('experience', 'description', value, index)}
                preview="edit"
              />
              <button onClick={() => removeItem('experience', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addItem('experience')}>Add Experience</button>
        </section>

        <section>
          <h3>Leadership</h3>
          {data.leadership.map((lead, index) => (
            <div key={index}>
              <input
                type="text"
                value={lead.organization}
                onChange={(e) => updateField('leadership', 'organization', e.target.value, index)}
                placeholder="Organization"
              />
              <input
                type="text"
                value={lead.role}
                onChange={(e) => updateField('leadership', 'role', e.target.value, index)}
                placeholder="Role"
              />
              <input
                type="text"
                value={lead.date}
                onChange={(e) => updateField('leadership', 'date', e.target.value, index)}
                placeholder="Date"
              />
              <input
                type="text"
                value={lead.location}
                onChange={(e) => updateField('leadership', 'location', e.target.value, index)}
                placeholder="Location"
              />
              <MDEditor
                value={lead.description}
                onChange={(value) => updateField('leadership', 'description', value, index)}
                preview="edit"
              />
              <button onClick={() => removeItem('leadership', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addItem('leadership')}>Add Leadership</button>
        </section>

        <section>
          <h3>Certificates</h3>
          {data.certificates.map((cert, index) => (
            <div key={index}>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateField('certificates', 'name', e.target.value, index)}
                placeholder="Certificate Name"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateField('certificates', 'issuer', e.target.value, index)}
                placeholder="Issuer"
              />
              <input
                type="text"
                value={cert.date}
                onChange={(e) => updateField('certificates', 'date', e.target.value, index)}
                placeholder="Date"
              />
              <MDEditor
                value={cert.description}
                onChange={(value) => updateField('certificates', 'description', value, index)}
                preview="edit"
              />
              <button onClick={() => removeItem('certificates', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addItem('certificates')}>Add Certificate</button>
        </section>
      </div>

      <div className="pdf-preview">
        <h2>PDF Preview</h2>
        <PDFViewer width="100%" height="600">
          <CVPdf data={data} />
        </PDFViewer>
      </div>

    </div>
  );
}

export default App;