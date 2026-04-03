-- Migration to add missing role columns to DataReactProfile_Projects
ALTER TABLE DataReactProfile_Projects ADD COLUMN role_en TEXT NOT NULL DEFAULT '';
ALTER TABLE DataReactProfile_Projects ADD COLUMN role_es TEXT NOT NULL DEFAULT '';
ALTER TABLE DataReactProfile_Projects ADD COLUMN role_fr TEXT NOT NULL DEFAULT '';
