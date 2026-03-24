import fs from 'fs';

function generateId() {
    return Math.random().toString(36).substring(2, 11);
}

const text = fs.readFileSync('cv_text.txt', 'utf8');
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const data = {
    header: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    leadership: [],
    certificates: [],
    languages: [],
    awards: []
};

// 1. Header (First 3 lines usually)
data.header = {
    id: 'header-main',
    name: lines[0] || '',
    title: lines[1] || '',
    email: lines[2]?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || '',
    phone: lines[2]?.match(/\+\d+[\s\d]+/)?.[0] || '',
    github: lines[2]?.match(/https:\/\/github\.com\/[^\s/]+/)?.[0] || '',
    location: lines[2]?.split('•')[0]?.trim() || ''
};

let currentSection = '';
let currentItem = null;

for (let i = 3; i < lines.length; i++) {
    const line = lines[i];

    if (line === 'Education') { currentSection = 'education'; continue; }
    if (line === 'Technical Skills & Projects') { currentSection = 'skills'; continue; }
    if (line === 'Relevant Experience') { currentSection = 'experience'; continue; }
    if (line === 'Leadership') { currentSection = 'leadership'; continue; }
    if (line === 'Certificates') { currentSection = 'certificates'; continue; }
    if (line.startsWith('Spoken Languages:')) {
        const langs = line.replace('Spoken Languages:', '').split(',').map(s => s.trim());
        langs.forEach(l => {
            const parts = l.match(/(.+)\((.+)\)/);
            if (parts) {
                data.languages.push({
                    id: generateId(),
                    name: parts[1].trim(),
                    level: parts[2].trim()
                });
            }
        });
        continue;
    }

    if (currentSection === 'education') {
        const nextLineMatch = lines[i+1] && lines[i+1].match(/\d{4}/);
        
        if (nextLineMatch && !line.match(/\d{4}/) && line.length > 5) {
            if (currentItem) data.education.push(currentItem);
            currentItem = { id: generateId(), institution: line, location: lines[i+1], degree: lines[i+1], date: '', description: '' };
            // Try to extract date from degree line
            const dateMatch = currentItem.degree.match(/(\d{4}\s*-\s*(\d{4}|Present|Ongoing|Actual))/);
            if (dateMatch) {
                currentItem.date = dateMatch[0];
                currentItem.degree = currentItem.degree.replace(dateMatch[0], '').trim();
            }
            i += 1; // skip the degree line next
        } else if (currentItem) {
            currentItem.description += line + ' ';
        }
    } else if (currentSection === 'skills') {
        if (line.startsWith('Programming:')) {
            const list = line.replace('Programming:', '').split(',').map(s => s.trim());
            list.forEach(s => data.skills.push({ id: generateId(), name: s, category: 'programming' }));
        } else if (line.startsWith('Design:')) {
             const list = line.replace('Design:', '').split(',').map(s => s.trim());
             list.forEach(s => data.skills.push({ id: generateId(), name: s, category: 'design' }));
        } else if (line.includes(' - ') && (line.includes('App') || line.includes('Website') || line.includes('Platform'))) {
             // Project
             const parts = line.split(' - ');
             const name = parts[0].trim();
             const typeAndDate = parts[1].split('\t');
             data.projects.push({
                 id: generateId(),
                 name: name,
                 description: lines[i+1] || '',
                 date: typeAndDate[typeAndDate.length - 1]?.trim() || ''
             });
             i++;
        }
    } else if (currentSection === 'experience') {
         if (line === line.toUpperCase() && line.length > 3 && !line.includes('---')) {
             if (currentItem && currentItem.company) data.experience.push(currentItem);
             currentItem = { id: generateId(), company: line, location: lines[i+1], role: lines[i+2], description: '' };
             const dateMatch = currentItem.role.match(/([A-Z][a-z]+\s\d{4}\s*-\s*(\d{4}|Present|Ongoing))/);
             if (dateMatch) {
                 currentItem.date = dateMatch[0];
                 currentItem.role = currentItem.role.replace(dateMatch[0], '').trim();
             }
             i += 2;
         } else if (currentItem) {
             currentItem.description += line + ' ';
         }
    } else if (currentSection === 'leadership') {
        if (line === line.toUpperCase() && line.length > 3) {
            if (currentItem && currentItem.organization) data.leadership.push(currentItem);
            currentItem = { id: generateId(), organization: line, location: lines[i+1], role: lines[i+2], description: '' };
            i += 2;
        } else if (currentItem) {
            currentItem.description += line + ' ';
        }
    } else if (currentSection === 'certificates') {
        const dateMatch = line.match(/([A-Z][a-z]+\s\d{2},\s\d{4})/);
        if (dateMatch) {
            data.certificates.push({
                id: generateId(),
                name: lines[i-1],
                issuer: lines[i+1],
                date: dateMatch[0]
            });
            i++;
        }
    }
}
// Push last items
if (currentItem) {
    if (currentSection === 'education') data.education.push(currentItem);
    if (currentSection === 'experience') data.experience.push(currentItem);
    if (currentSection === 'leadership') data.leadership.push(currentItem);
}

const esc = (str) => str ? str.toString().replace(/'/g, "''") : '';

let sql = `-- Generated SQL from PDF\n`;
sql += `DELETE FROM DataReactProfile_Header;\n`;
sql += `INSERT INTO DataReactProfile_Header (id, name, title_en, title_es, title_fr, location_en, location_es, location_fr, email, phone, github, summary_en, summary_es, summary_fr) VALUES ('${esc(data.header.id)}', '${esc(data.header.name)}', '${esc(data.header.title)}', '${esc(data.header.title)}', '${esc(data.header.title)}', '${esc(data.header.location)}', '${esc(data.header.location)}', '${esc(data.header.location)}', '${esc(data.header.email)}', '${esc(data.header.phone)}', '${esc(data.header.github)}', '', '', '');\n`;

sql += `DELETE FROM DataReactProfile_Roles;\n`;
sql += `INSERT INTO DataReactProfile_Roles (id, name, job_title, sort_order) VALUES ('all', 'All', 'Senior Developer', 0);\n`;
sql += `INSERT INTO DataReactProfile_Roles (id, name, job_title, sort_order) VALUES ('mobile', 'Mobile', 'Senior Mobile Developer', 1);\n`;
sql += `INSERT INTO DataReactProfile_Roles (id, name, job_title, sort_order) VALUES ('web', 'Web', 'Senior React Developer', 2);\n`;

sql += `DELETE FROM DataReactProfile_Education;\n`;
data.education.forEach((edu, index) => {
    sql += `INSERT INTO DataReactProfile_Education (id, institution_en, institution_es, institution_fr, location_en, location_es, location_fr, degree_en, degree_es, degree_fr, date_start, date_end, coursework_en, coursework_es, coursework_fr, sort_order) VALUES ('${esc(edu.id)}', '${esc(edu.institution)}', '${esc(edu.institution)}', '${esc(edu.institution)}', '${esc(edu.location)}', '${esc(edu.location)}', '${esc(edu.location)}', '${esc(edu.degree)}', '${esc(edu.degree)}', '${esc(edu.degree)}', '${esc(edu.date?.split('-')[0]?.trim())}', '${esc(edu.date?.split('-')[1]?.trim())}', '${esc(edu.description)}', '${esc(edu.description)}', '${esc(edu.description)}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Experience;\n`;
data.experience.forEach((exp, index) => {
    sql += `INSERT INTO DataReactProfile_Experience (id, company, role_en, role_es, role_fr, location_en, location_es, location_fr, date_start, date_end, description_en, description_es, description_fr, sort_order) VALUES ('${esc(exp.id)}', '${esc(exp.company)}', '${esc(exp.role)}', '${esc(exp.role)}', '${esc(exp.role)}', '${esc(exp.location)}', '${esc(exp.location)}', '${esc(exp.location)}', '${esc(exp.date?.split('-')[0]?.trim())}', '${esc(exp.date?.split('-')[1]?.trim())}', '${esc(exp.description)}', '${esc(exp.description)}', '${esc(exp.description)}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Projects;\n`;
data.projects.forEach((proj, index) => {
    sql += `INSERT INTO DataReactProfile_Projects (id, name_en, name_es, name_fr, description_en, description_es, description_fr, date_end, sort_order) VALUES ('${esc(proj.id)}', '${esc(proj.name)}', '${esc(proj.name)}', '${esc(proj.name)}', '${esc(proj.description)}', '${esc(proj.description)}', '${esc(proj.description)}', '${esc(proj.date)}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Skills;\n`;
data.skills.forEach((skill, index) => {
    sql += `INSERT INTO DataReactProfile_Skills (id, name_en, name_es, name_fr, category, sort_order) VALUES ('${esc(skill.id)}', '${esc(skill.name)}', '${esc(skill.name)}', '${esc(skill.name)}', '${esc(skill.category)}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Leadership;\n`;
data.leadership.forEach((lead, index) => {
    sql += `INSERT INTO DataReactProfile_Leadership (id, organization_en, organization_es, organization_fr, role_en, role_es, role_fr, location_en, location_es, location_fr, description_en, description_es, description_fr, date_start, date_end, sort_order) VALUES ('${esc(lead.id)}', '${esc(lead.organization)}', '${esc(lead.organization)}', '${esc(lead.organization)}', '${esc(lead.role)}', '${esc(lead.role)}', '${esc(lead.role)}', '${esc(lead.location)}', '${esc(lead.location)}', '${esc(lead.location)}', '${esc(lead.description)}', '${esc(lead.description)}', '${esc(lead.description)}', '${esc(lead.date?.split('-')[0]?.trim())}', '${esc(lead.date?.split('-')[1]?.trim())}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Certificates;\n`;
data.certificates.forEach((cert, index) => {
    sql += `INSERT INTO DataReactProfile_Certificates (id, name_en, name_es, name_fr, issuer_en, issuer_es, issuer_fr, date, sort_order) VALUES ('${esc(cert.id)}', '${esc(cert.name)}', '${esc(cert.name)}', '${esc(cert.name)}', '${esc(cert.issuer)}', '${esc(cert.issuer)}', '${esc(cert.issuer)}', '${esc(cert.date)}', ${index});\n`;
});

sql += `DELETE FROM DataReactProfile_Languages;\n`;
data.languages.forEach((lang, index) => {
    sql += `INSERT INTO DataReactProfile_Languages (id, name_en, name_es, name_fr, level, sort_order) VALUES ('${esc(lang.id)}', '${esc(lang.name)}', '${esc(lang.name)}', '${esc(lang.name)}', '${esc(lang.level)}', ${index});\n`;
});

fs.writeFileSync('src/server/db/seed_from_pdf.sql', sql);
console.log('Successfully generated src/server/db/seed_from_pdf.sql');
