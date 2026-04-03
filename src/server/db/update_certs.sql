-- Batch Update for Certificates
-- Precisely matching user-provided data

INSERT OR REPLACE INTO DataReactProfile_Certificates (id, name_en, issuer_en, date, description_en, sort_order, role_ids) VALUES 
('cert1', 'BSA Requirements', 'Bankers Academy', 'December 04, 2020', 'Earned Certificate of Achievement for mastering assessment criteria in BSA (Bank Secrecy Act) Requirements, ensuring compliance in financial operations.', 1, 'all'),
('cert2', 'AML Requirements', 'Bankers Academy', 'December 04, 2020', 'Attained Certificate of Achievement for excelling in AML (Anti-Money Laundering) Requirements, bolstering expertise in regulatory adherence.', 2, 'all'),
('cert3', 'Professional Membership', 'Association for Computing Machinery (ACM)', 'May 2020', 'Admitted as a Professional Member of the Association for Computing Machinery, promoting computing as both a science and a profession through ongoing contributions.', 3, 'all'),
('cert4', 'EF SET English C1 Advanced', 'EF Standard English Test', 'June 10, 2020', 'Achieved C1 Advanced Level certification in English.', 4, 'all'),
('cert5', 'AWS Cloud Practitioner', 'AWS Training & Certification', 'December 07, 2023', 'Completed AWS Cloud Practitioner certification, demonstrating foundational cloud computing expertise essential for scalable infrastructure design.', 5, 'all'),
('cert6', 'Desarrollo de Bases de Datos con SQL', 'SENA', 'April 17, 2017', 'Certified in Desarrollo de Bases de Datos con SQL (40 hours), equipping with advanced database development skills for robust data management.', 6, 'all'),
('cert7', 'Diseño de Imagen Corporativa', 'SENA', 'October 12, 2016', 'Certified in Diseño de Imagen Corporativa, honing abilities in corporate image design for impactful branding strategies.', 7, 'all'),
('cert8', 'Carrera de Apple Fullstack', 'Platzi', 'March 09, 2023', 'Earned diploma in Carrera de Apple Fullstack, mastering full-stack development within the Apple ecosystem for innovative app creation.', 8, 'all'),
('cert9', 'Desarrollo de Competencias en Gerencia y Gestion Empresarial', 'SENA', 'November 08, 2017', 'Certified in Desarrollo de Competencias en Gerencia y Gestion Empresarial (128 hours), developing leadership and management competencies for enterprise success.', 9, 'all'),
('cert10', 'Curso de Programación de Apps Móviles', 'Universidad Complutense de Madrid', 'November 2015', 'Completed Curso de Programación de Apps Móviles (40 hours), gaining specialized skills in mobile application programming.', 10, 'all'),
('cert11', 'Estructura del Lenguaje de Programacion C++', 'SENA', 'March 31, 2011', 'Certified in Estructura del Lenguaje de Programacion C++, building strong foundations in object-oriented programming.', 11, 'all'),
('cert12', 'HTML y Javascript', 'SENA', 'March 24, 2011', 'Certified in HTML y Javascript, establishing core web development skills for dynamic online experiences.', 12, 'all'),
('cert13', 'Generative AI for Developers', 'O''Reilly', 'May 2024', 'Completed certification in Generative AI for Developers, unlocking advanced techniques in AI-driven content creation and application development.', 13, 'all'),
('cert14', 'RAG', 'O''Reilly', 'May 2024', 'Certified in RAG (Retrieval-Augmented Generation), enhancing capabilities in AI model integration and knowledge retrieval systems.', 14, 'all'),
('cert15', 'LLMs Operation', 'O''Reilly', 'April 2024', 'Achieved certification in LLMs Operation, mastering operational aspects of Large Language Models for efficient deployment and management.', 15, 'all');
