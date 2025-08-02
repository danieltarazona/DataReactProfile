// src/App.jsx
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'; // Added PDFViewer
import CVPdf from './components/CVPdf.jsx';
import './index.css';

const initialData = {
  header: {
    name: 'Daniel Tarazona',
    title: 'Senior iOS Developer',
    location: 'Medellin, Colombia',
    email: 'shiftcipher@hotmail.com',
    phone: '+57 315 837 5156',
    github: 'https://github.com/danieltarazona',
  },
  education: [
    {
      institution: 'HARVARD UNIVERSITY',
      location: 'Cambridge, MA',
      degree: 'AB in Computer Science, GPA: 3.55/4.0',
      date: 'May 2026',
      coursework: 'Relevant Coursework: Systems Programming, Data Structures and Algorithms, Artificial Intelligence, Introduction to Probability, Multivariable Calculus',
    },
    {
      institution: 'IRVINE HIGH SCHOOL',
      location: 'Irvine, CA',
      degree: 'High School Diploma, SAT I: M-780 V-760',
      date: 'June 2022',
      coursework: 'National Merit Scholar Finalist, Member of Varsity Lacrosse Team.',
    },
  ],
  skills: {
    programming: 'C, C++, C#, SQL, Python, MATLAB, JavaScript, OCaml.',
    design: 'Wix, Adobe XD, Figma.',
    projects: [
      {
        name: 'Firewall Network: CS 145 Final Project',
        date: 'Jan. 2024 - May 2025',
        description: 'Implemented a basic rule-based firewall for programmable network switches using the P4 programming domain-specific language. Allows user to block network traffic based on 5-tuple, including variable-length ranges of IP addresses.',
      },
      {
        name: 'Image Generation Add On: CS 50 Final Project',
        date: 'Sept. 2022 - Dec. 2023',
        description: 'Created a Google Chrome extension that allows users to replace the images on websites they visit with pictures of animals. Implemented using a combination of HTML, CSS, and JavaScript.',
      },
    ],
  },
  experience: [
    {
      company: 'MICROSOFT',
      role: 'Software Engineering Intern',
      date: 'June - August 2025',
      description: 'Designed and implemented a productivity add-on for Office using C# and VSTO in .NET framework to automate and synchronize activity reporting. Created testing and demonstration suites for software.',
      location: 'New York, NY',
    },
    {
      company: 'HARVARD UNIVERSITY',
      role: 'Teaching Fellow, Introduction to Computer Science',
      date: 'September 2024 - May 2025',
      description: 'Taught class of 21 students to program in C, PHP, JavaScript, and object-oriented concepts. Maintained weekly office hours and problem-solving sessions. Graded problem sets and exams.',
      location: 'Cambridge, MA',
    },
    {
      company: 'TECH HILLS',
      role: 'Technology Intern',
      date: 'June - August 2024',
      description: 'Implemented new web site including back-end database storage system and dynamic web pages. Developed and conducted usability tests, implementing enhancements to improve user experience.',
      location: 'Laguna Hills, CA',
    },
  ],
  leadership: [
    {
      organization: 'HARVARD WOMEN IN COMPUTER SCIENCE',
      role: 'Mentorships Co-director / Board Member',
      date: 'January 2024 - Present',
      description: 'Organized outreach campaign, resulting in a 20% increase in alumni mentors in the matching database. Coordinated tech networking night for thirty professionals and 75 students. Upgraded and enhanced website using Wix.',
      location: 'Cambridge, MA',
    },
    {
      organization: 'HARVARD COLLEGE MARATHON CHALLENGE',
      role: 'Training Program Director',
      date: 'January - May 2023',
      description: 'Developed training program for 25 charity runners. Raised over $25,000 to support Phillips Brooks House Association and The Cambridge Food Project.',
      location: 'Cambridge, MA',
    },
  ],
};

function App() {
  const [data, setData] = useState(initialData);

  const updateField = (section, field, value, index = null) => {
    setData((prev) => {
      if (index !== null) {
        const updatedSection = [...prev[section]];
        updatedSection[index][field] = value;
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
      const updatedProjects = [...prev.skills.projects];
      updatedProjects[index][projField] = value;
      return { ...prev, skills: { ...prev.skills, projects: updatedProjects } };
    });
  };

  const addItem = (section) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        projects: [...prev.skills.projects, {}],
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
        <h1>CV Manager</h1>
        <h2>Edit Sections</h2>
        
        {/* Header Editor */}
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

        {/* Education Editor */}
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

        {/* Skills & Projects Editor */}
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

        {/* Experience Editor */}
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

        {/* Leadership Editor */}
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
      </div>

      <div className="pdf-preview">
        <h2>PDF Preview</h2>
        <PDFViewer width="100%" height="600">
          <CVPdf data={data} />
        </PDFViewer>
      </div>

      <div className="export">
        <h2>Export</h2>
        <PDFDownloadLink document={<CVPdf data={data} />} fileName="my-cv.pdf">
          {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;