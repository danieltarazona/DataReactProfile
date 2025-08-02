import Header from './Header.jsx';
import Education from './Education.jsx';
import SkillsProjects from './SkillsProjects.jsx';
import Experience from './Experience.jsx';
import Leadership from './Leadership.jsx';
import Certificates from './Certificates.jsx';

const CVPreview = ({ data }) => (
  <div className="cv-preview">
    <Header data={data.header} />
    <Education data={data.education} />
    <SkillsProjects data={data.skills} />
    <Experience data={data.experience} />
    <Leadership data={data.leadership} />
    <Certificates data={data.certificates} />
  </div>
);

export default CVPreview;