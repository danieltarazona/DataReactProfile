/**
 * SQL migration for DataReactProfile D1 database.
 * Drops all existing tables and creates the new schema.
 */

export const MIGRATION_SQL = `
-- Drop existing tables
DROP TABLE IF EXISTS DataReactProfile_Roles;
DROP TABLE IF EXISTS DataReactProfile_Header;
DROP TABLE IF EXISTS DataReactProfile_Education;
DROP TABLE IF EXISTS DataReactProfile_Experience;
DROP TABLE IF EXISTS DataReactProfile_Projects;
DROP TABLE IF EXISTS DataReactProfile_Skills;
DROP TABLE IF EXISTS DataReactProfile_Leadership;
DROP TABLE IF EXISTS DataReactProfile_Certificates;
DROP TABLE IF EXISTS DataReactProfile_Languages;
DROP TABLE IF EXISTS DataReactProfile_Awards;
DROP TABLE IF EXISTS DataReactProfile_SectionOrder;

-- Roles
CREATE TABLE DataReactProfile_Roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    job_title TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Header
CREATE TABLE DataReactProfile_Header (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    title_en TEXT NOT NULL DEFAULT '',
    title_es TEXT NOT NULL DEFAULT '',
    title_fr TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_es TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    github TEXT NOT NULL DEFAULT '',
    summary_en TEXT NOT NULL DEFAULT '',
    summary_es TEXT NOT NULL DEFAULT '',
    summary_fr TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Education
CREATE TABLE DataReactProfile_Education (
    id TEXT PRIMARY KEY,
    institution_en TEXT NOT NULL DEFAULT '',
    institution_es TEXT NOT NULL DEFAULT '',
    institution_fr TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_es TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    degree_en TEXT NOT NULL DEFAULT '',
    degree_es TEXT NOT NULL DEFAULT '',
    degree_fr TEXT NOT NULL DEFAULT '',
    date_start TEXT NOT NULL DEFAULT '',
    date_end TEXT NOT NULL DEFAULT '',
    gpa TEXT NOT NULL DEFAULT '',
    coursework_en TEXT NOT NULL DEFAULT '',
    coursework_es TEXT NOT NULL DEFAULT '',
    coursework_fr TEXT NOT NULL DEFAULT '',
    honors_en TEXT NOT NULL DEFAULT '',
    honors_es TEXT NOT NULL DEFAULT '',
    honors_fr TEXT NOT NULL DEFAULT '',
    sat_scores TEXT NOT NULL DEFAULT '',
    projects_en TEXT NOT NULL DEFAULT '',
    projects_es TEXT NOT NULL DEFAULT '',
    projects_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Experience
CREATE TABLE DataReactProfile_Experience (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL DEFAULT '',
    role_en TEXT NOT NULL DEFAULT '',
    role_es TEXT NOT NULL DEFAULT '',
    role_fr TEXT NOT NULL DEFAULT '',
    date_start TEXT NOT NULL DEFAULT '',
    date_end TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_es TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Projects (nested under experience or standalone)
CREATE TABLE DataReactProfile_Projects (
    id TEXT PRIMARY KEY,
    experience_id TEXT,
    name_en TEXT NOT NULL DEFAULT '',
    name_es TEXT NOT NULL DEFAULT '',
    name_fr TEXT NOT NULL DEFAULT '',
    date_start TEXT NOT NULL DEFAULT '',
    date_end TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_es TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    link TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Skills
CREATE TABLE DataReactProfile_Skills (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL DEFAULT '',
    name_es TEXT NOT NULL DEFAULT '',
    name_fr TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'programming',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Leadership
CREATE TABLE DataReactProfile_Leadership (
    id TEXT PRIMARY KEY,
    organization_en TEXT NOT NULL DEFAULT '',
    organization_es TEXT NOT NULL DEFAULT '',
    organization_fr TEXT NOT NULL DEFAULT '',
    role_en TEXT NOT NULL DEFAULT '',
    role_es TEXT NOT NULL DEFAULT '',
    role_fr TEXT NOT NULL DEFAULT '',
    date_start TEXT NOT NULL DEFAULT '',
    date_end TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_es TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Certificates
CREATE TABLE DataReactProfile_Certificates (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL DEFAULT '',
    name_es TEXT NOT NULL DEFAULT '',
    name_fr TEXT NOT NULL DEFAULT '',
    issuer_en TEXT NOT NULL DEFAULT '',
    issuer_es TEXT NOT NULL DEFAULT '',
    issuer_fr TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Languages
CREATE TABLE DataReactProfile_Languages (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL DEFAULT '',
    name_es TEXT NOT NULL DEFAULT '',
    name_fr TEXT NOT NULL DEFAULT '',
    level TEXT NOT NULL DEFAULT 'B1',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

-- Awards
CREATE TABLE DataReactProfile_Awards (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL DEFAULT '',
    name_es TEXT NOT NULL DEFAULT '',
    name_fr TEXT NOT NULL DEFAULT '',
    issuer_en TEXT NOT NULL DEFAULT '',
    issuer_es TEXT NOT NULL DEFAULT '',
    issuer_fr TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    role_ids TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT ''
);

CREATE TABLE DataReactProfile_SectionOrder (
    id TEXT PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL DEFAULT ''
);
`;

export const SEED_SQL = `
-- Default "All" role
INSERT INTO DataReactProfile_Roles (id, name, job_title, sort_order, created_at, updated_at)
VALUES ('all', 'All', '', 0, datetime('now'), datetime('now'));

-- Default header
INSERT INTO DataReactProfile_Header (id, name, updated_at)
VALUES ('default', '', datetime('now'));

-- Default section order
INSERT INTO DataReactProfile_SectionOrder (id, section_key, sort_order, visible, updated_at) VALUES
('sec-roles', 'roles', 0, 1, datetime('now')),
('sec-header', 'header', 1, 1, datetime('now')),
('sec-education', 'education', 2, 1, datetime('now')),
('sec-skills', 'skills', 3, 1, datetime('now')),
('sec-experience', 'experience', 4, 1, datetime('now')),
('sec-projects', 'projects', 5, 1, datetime('now')),
('sec-leadership', 'leadership', 6, 1, datetime('now')),
('sec-certificates', 'certificates', 7, 1, datetime('now')),
('sec-languages', 'languages', 8, 1, datetime('now')),
('sec-awards', 'awards', 9, 1, datetime('now'));
`;
