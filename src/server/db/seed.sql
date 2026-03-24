-- Seeding Roles
INSERT INTO DataReactProfile_Roles (id, name, job_title, sort_order) VALUES 
('mobile', 'Mobile Developer', 'Senior iOS Engineer', 1),
('react', 'React Developer', 'Senior JavaScript Engineer', 2),
('game', 'Game Developer', 'Senior Unity Developer', 3),
('fullstack', 'Fullstack', 'Senior Fullstack Engineer', 4);

-- Seeding Header
UPDATE DataReactProfile_Header 
SET name = 'Daniel Tarazona',
    location_en = 'Medellin, Colombia',
    location_es = 'Medellin, Colombia',
    location_fr = 'Medellin, Colombie',
    email = 'shiftcipher@hotmail.com',
    phone = '+57 315 837 5156',
    github = 'https://github.com/danieltarazona'
WHERE id = 'default';

-- Seeding Education
INSERT INTO DataReactProfile_Education (id, institution_en, degree_en, date_start, date_end, location_en, coursework_en, sort_order) VALUES
('edu1', 'UNIVERSIDAD DEL VALLE', 'Bachelor''s Degree in Software Engineering (Pursued; Coursework Completed)', '2017', '2022', 'Cali, Colombia', 'Mastered advanced data structures and interpreters in Scheme (Lisp) and C++, processors and computer architecture, interactive programming in Java, calculus, linear algebra, physics, machine learning, artificial intelligence, and game design and development in Unity. Technologies: Scheme (Lisp), Racket (Lisp), C/C++, Java, Python, Jupyter, and LaTeX.', 1),
('edu2', 'SERVICIO NACIONAL DE APRENDIZAJE (SENA)', 'Associate''s Degree in Information Systems Analysis and Development', '2015', '2018', 'Cali, Colombia', 'Relevant Coursework: SQL, Node.js SDK for Oracle, Oracle, MySQL, PostgreSQL, Android, C#, and PHP.', 2),
('edu3', 'MASSACHUSETTS INSTITUTE OF TECHNOLOGY - UNIVERSIDAD ICESI', 'MIT - Global Startup Labs Mobile Technology Entrepreneurship', '2013', '2013', 'Cali, Colombia', 'Immersed in Django, Python, Java, Android, HTML, CSS3, SASS, Bootstrap, Emmet, fostering entrepreneurial acumen in mobile technology. Explored innovative startup methodologies at gsl.mit.edu, blending technical prowess with business innovation to launch scalable digital ventures.', 3),
('edu4', 'UNIVERSIDAD DEL VALLE', 'Bachelor''s Degree in Architecture', '2009', 'Present', 'Cali, Colombia', 'Explored color and light in architecture alongside multiple expression techniques. Harnessed technologies such as Autodesk Revit, Autodesk AutoCAD, Autodesk 3D Max, Rhinoceros 3D, Grasshopper 3D, Blender, Cycles, Lumion, Adobe Illustrator, Adobe Photoshop.', 4),
('edu5', 'COLEGIO PARROQUIAL SANTIAGO APÓSTOL', 'High School Technical Degree in Industrial Design', '1999', '2009', 'Cali, Colombia', 'Gained foundational skills in industrial design, utilizing Corel Draw and Microsoft Office and Wix.com to cultivate early expertise in visual and technical communication.', 5);

-- Seeding Languages
INSERT INTO DataReactProfile_Languages (id, name_en, level, sort_order) VALUES
('lang1', 'Spanish', 'Native', 1),
('lang2', 'English', 'C1 Full Professional Proficiency', 2),
('lang3', 'French', 'B1 Professional Working Proficiency', 3),
('lang4', 'Japanese', 'A2 Limited Working Proficiency', 4),
('lang5', 'German', 'A1 Elementary Proficiency', 5);

-- Seeding Experience
INSERT INTO DataReactProfile_Experience (id, company, role_en, date_start, date_end, location_en, description_en, sort_order) VALUES
('exp1', 'Lululemon Athletica - GuestApp', 'Senior iOS Developer', 'April 2022', 'September 2025', 'Remote', 'Developed an SDK with Awin tracking and Adobe Analytics for conversion and sales insights. Redesigned membership experience. Leveraged Contentful, Splunk, and rigorous testing for quality. Proposed legacy code improvements. Two times winner of Innovation Week, Weardrop Widget and RealityKit shoes presentation.', 1),
('exp2', 'DataKit - Stealth Productivity Suite', 'Senior macOS/iOS Engineer', 'May 2021', 'Ongoing', 'Remote', 'DataKit is a suite of AI-powered productivity tools and apps for iOS, iPadOS, and macOS includes DataKeyboard an iPadOS / macOS app typing and work automation or DataCapture a chrome extension for data management. Contributed to open source projects as OpenParsec for remote macOS control, LumosEngine iOS Support, iOS/Xcode fixes and support for SDL3, Python improvements for Overpass API, Swift SDK enhancements for CouchBase Lite, C and iOS support for Raylib.', 2),
('exp3', 'GSS Gyro Stabilized Systems - Orion', 'Senior macOS App Developer', 'April 2024', 'August 2024', 'Remote', 'Migrated a Linux app to macOS for 4K gyrostabilized camera control on handheld controllers used in Commercial and Military industries on US and Japan. Using Xcode, C/C++/C# with FFmpeg, GStreamer, Blackmagic SDI and DirectLink with integrated global navigation, AR with interactive layers, and multilingual support. Achieved 60+ FPS and cut development and deployment time by 40% in cross-platforms.', 3),
('exp4', 'Colombia Mobile Community Lead - Volunteer', 'Community Lead', 'November 2023', 'April 2024', 'Remote', 'Built an iOS Design System with Figma and Endava BeeQ. Integrated AWS Amplify/Cognito with CLI automation. Certified in AI, RAG, and LLMs. Contributed to SDL3 with Metal support and boosted project kickoff by 30% via collaborative SDKs.', 4),
('exp5', 'GeoPortal for PopuLab - React Platform', 'Senior React Developer', 'August 2021', 'August 2022', 'Remote', 'Designed and built a GeoPortal for PopuLab (Lancaster University-funded), enabling real-time GeoJSON/JSONB data parsing. Integrated Node.js, GraphQL, PostgreSQL 14, Prisma, Hasura, and CSVKIT for dynamic geodata visualization. Supported COVID-19 research on vulnerable populations, contributing to academic publications and community outreach.', 5),
('exp6', 'Itau Uruguay', 'Senior iOS Enterprise App Developer', 'June 2021', 'June 2022', 'Remote / Montevideo, Uruguay', 'Led development of a secure payroll enterprise app using MVP architecture with Face ID, Touch ID, iToken, and OAuth 2.0. Enhanced authentication and fund transfers, reducing fraud by 40% for over 100K users. Ensured full compliance with banking standards, improving security and operational efficiency.', 6),
('exp7', 'Pineapel', 'Senior iOS App Developer', 'March 2022', 'March 2022', 'Remote / Miami', 'Expertly rescued and modernized a legacy project by upgrading to Xcode 13, harnessing Swift, Texture, and SwiftUI. Optimized performance metrics and eradicated compatibility hurdles, facilitating flawless deployment and bolstering application stability in production environments.', 7),
('exp8', 'Trainerz Health', 'Senior iOS App Developer', 'January 2022', 'March 2022', 'Remote / Barranquilla', 'Directed UI/UX innovation using SwiftUI for a health application tailored to expecting mothers. Integrated Firebase for seamless authentication, data orchestration, and real-time synchronization, surging user retention by 35% via intuitive interfaces and dependable backend infrastructure.', 8),
('exp9', 'Transcard', 'Senior iOS SDK and iOS App Developer', 'June 2021', 'December 2021', 'Remote / Barranquilla', 'Forged a versatile Swift Package Manager-based SDK for financial ecosystems, complemented by a demo application integrating Mastercard, Apple Pay, and OAuth 2.0. Streamlined payment workflows, halving integration durations by 50% and enabling secure, efficient transactions for fintech enterprises.', 9),
('exp10', 'CreditSesame', 'Senior iOS App Developer', 'September 2020', 'May 2021', 'Remote / Cali', 'Pioneered development with VIPER/SwiftUI architectures and Sourcery metaprogramming, optimizing build processes via CocoaPods. Implemented A/B testing through Optimize.ly/Mixpanel, curtailing build times by 50% and fortifying reliability with comprehensive XCTest/XCUITests frameworks.', 10),
('exp11', 'Cropswap', 'Senior React Native App Developer', 'June 2020', 'September 2020', 'On-Site / Cali', 'Constructed a React Native application for organic crop exchanges, embedding advanced mapping capabilities. Enhanced user experiences with Redux, catalyzing a 25% uptick in platform adoption within the Los Angeles market.', 11),
('exp12', 'Boxia', 'Senior React Native App Developer', 'January 2020', 'June 2020', 'Remote', 'Engineered a React Native application featuring Mapbox integration for superior geospatial functionality. Prioritized performance and usability, earning acclaim and high ratings on AppAdvice through meticulous design and optimization.', 12),
('exp13', 'Swiftli', 'iOS and React Native App Developer', 'August 2019', 'December 2019', 'On-Site / Cali', 'Architected an iOS/React Native coworking social platform with Algolia search, Mapbox navigation, and Stripe payments. Amplified user engagement via MVVM patterns and real-time interactions, fostering vibrant community connections.', 13),
('exp14', 'CODEAPPS', 'Chief Executive Officer', 'March 2017', 'October 2018', 'On-Site / Cali', 'Directed company operations, attaining fiscal objectives via strategic implementations in blockchain, web development, and VR technologies. Aligned multidisciplinary teams for sustained growth, navigating challenges with visionary leadership.', 14),
('exp15', 'Blockchain - Mining and Learning', 'Blockchain Architect', 'March 2017', 'May 2018', 'On-Site / Cali', 'Oversaw extensive Ethereum mining initiatives from 2010 onward, developing smart contracts and API integrations like CoinGate. Realized 30% cost efficiencies through pioneering Solidity and Node.js solutions, advancing blockchain infrastructure.', 15),
('exp16', 'FREELANCER - TeleVoip', 'Back End Developer', 'February 2014', 'March 2015', 'Canary Islands, Spain', 'Engineered backend solutions for TeleVoip, integrating MailChimp/Mandrill services. Maintained multilingual GitHub repositories, optimizing communication and operational strategies for global reach.', 16),
('exp17', 'Javascript Developer', 'Fullstack JavaScript Developer', 'March 2011', 'March 2015', 'Worldwide', 'Constructed high-efficiency web applications using Node.js, npm, Gulp, and Express.js. Delivered scalable, premium-quality solutions to diverse international clients, emphasizing innovation and performance.', 17),
('exp18', 'WEB ARCHITECTURE ROBOTICS', 'Freelance Designer', 'February 2010', 'February 2014', 'Cali, Colombia', 'Specialized in web programming, architectural visualization, and robotics. Employed Rhinoceros, V-Ray, and Python scripting to produce innovative 3D models, surmounting economic constraints with resourceful design approaches.', 18),
('exp19', 'Posesionclo.com', 'WordPress Developer', 'April 2017', 'March 2018', 'Remote', 'Developed a dynamic fashion e-commerce website for Manufacturas Economicas using WordPress themes, plugins, webhooks, and filters. Elevated online sales by 20% through enhanced functionality and user-centric design.', 19),
('exp20', 'Hyperspace VR', 'Unity Game Developer', 'August 2017', 'December 2017', 'Remote', 'Single-handedly created a captivating spaceship VR game in Unity 5 with C#, emphasizing modular design and sustained performance at 60+ FPS. Supported iOS 7+ devices, showcasing mastery in VR user interfaces and immersive game mechanics.', 20),
('exp21', 'Vitral Studio', 'WordPress Developer', 'August 2017', 'October 2017', 'Remote', 'Oversaw WordPress development utilizing CLI tools to craft a dynamic website for the studio, enhancing digital presence and interactive user experiences.', 21),
('exp22', 'TCC Shipping', 'WordPress Plugin Developer', 'June 2017', 'July 2017', 'Remote', 'Engineered a bespoke plugin for shipping tracking and labeling at TCC Colombia, leveraging WordPress API, SOAP, and PHP 7. Streamlined logistics operations, reducing processing times by 25% and boosting efficiency.', 22),
('exp23', 'Invisible to the Eye', 'WordPress Developer', 'January 2017', 'April 2017', 'Remote', 'Crafted innovative UI/UX/UIX designs in Medellin using Adobe Comp CC, XD, and Sketch 3, delivering intuitive and engaging interfaces that prioritize user satisfaction.', 23),
('exp24', 'MiCosechApp', 'iOS App Developer', 'December 2016', 'March 2017', 'Remote', 'Developed a robust iOS 9-10 application with Alamofire, Siesta, Sourcery, SwiftGen, and Fastlane. Incorporated Nuke, Cache, and Hue for optimized performance, ensuring seamless deployment and superior user experiences.', 24),
('exp25', 'InventAR.io', 'Laravel App Developer', 'July 2016', 'March 2017', 'Remote', 'Innovated an AR-driven shipping and shopping analytics platform with inventory management features. Utilized Laravel, Node.js, Three.js, and Bootstrap to enhance retail efficiencies by 35%, transforming operational workflows.', 25),
('exp26', 'PizzaApp', 'iOS App Developer', 'July 2016', 'July 2016', 'Remote', 'Built a Swift-powered iOS application, emphasizing user-friendly features for effortless food ordering and enhanced customer satisfaction.', 26),
('exp27', 'BabyMoon - UX Design', 'UX Designer', 'January 2017', 'January 2017', 'Remote', 'Digital concept using Adobe Comp CC on iPad, demonstrating exceptional creativity and proficiency in modern design tools.', 27);

-- Seeding Leadership
INSERT INTO DataReactProfile_Leadership (id, organization_en, role_en, date_start, date_end, location_en, description_en, sort_order) VALUES
('lead1', 'COLOMBIA MOBILE COMMUNITY', 'Founder and Leader', '2023', 'Present', 'Medellin, Colombia', 'Founded and led a thriving community dedicated to mobile development collaboration and knowledge exchange. Delivered expert SwiftUI sessions, forged LATAM alliances, expanding membership by 50%. Accelerated project deliveries through shared SDK ecosystems, thriving amidst a regional technological renaissance.', 1);

-- Seeding Awards
INSERT INTO DataReactProfile_Awards (id, name_en, issuer_en, date, description_en, sort_order) VALUES
('awd1', 'Top National Scores Saber Pro 2017 – IT Technologist', 'MINISTRY OF NATIONAL EDUCATION (MEN)', 'December 2018', 'Honored for achieving top national scores in the IT Saber Pro assessment, demonstrating exceptional resilience and proficiency in software engineering despite personal adversities.', 1),
('awd2', 'Open Innovation Program in Hydrocarbons and Mining', 'INNPULSA - ECOPETROL - ARGOS', 'June 03, 2014', 'Awarded for excellence in INNPULSA Innovación Abierta, recognizing innovative contributions to open innovation initiatives.', 2);

-- Seeding Certificates
INSERT INTO DataReactProfile_Certificates (id, name_en, issuer_en, date, description_en, sort_order) VALUES
('cert1', 'BSA Requirements', 'Bankers Academy', 'December 04, 2020', 'Earned Certificate of Achievement for mastering assessment criteria in BSA (Bank Secrecy Act) Requirements, ensuring compliance in financial operations.', 1),
('cert2', 'AML Requirements', 'Bankers Academy', 'December 04, 2020', 'Attained Certificate of Achievement for excelling in AML (Anti-Money Laundering) Requirements, bolstering expertise in regulatory adherence.', 2),
('cert3', 'Professional Membership', 'Association for Computing Machinery (ACM)', 'May 2020', 'Admitted as a Professional Member of the Association for Computing Machinery, promoting computing as both a science and a profession through ongoing contributions.', 3),
('cert4', 'EF SET English C1 Advanced', 'EF Standard English Test', 'June 10, 2020', 'Achieved C1 Advanced Level certification in English.', 4),
('cert5', 'AWS Cloud Practitioner', 'AWS Training & Certification', 'December 07, 2023', 'Completed AWS Cloud Practitioner certification, demonstrating foundational cloud computing expertise essential for scalable infrastructure design.', 5),
('cert6', 'Desarrollo de Bases de Datos con SQL', 'SENA', 'April 17, 2017', 'Certified in Desarrollo de Bases de Datos con SQL (40 hours), equipping with advanced database development skills for robust data management.', 6),
('cert7', 'Diseño de Imagen Corporativa', 'SENA', 'October 12, 2016', 'Certified in Diseño de Imagen Corporativa, honing abilities in corporate image design for impactful branding strategies.', 7),
('cert8', 'Carrera de Apple Fullstack', 'Platzi', 'March 09, 2023', 'Earned diploma in Carrera de Apple Fullstack, mastering full-stack development within the Apple ecosystem for innovative app creation.', 8),
('cert9', 'Desarrollo de Competencias en Gerencia y Gestion Empresarial', 'SENA', 'November 08, 2017', 'Certified in Desarrollo de Competencias en Gerencia y Gestion Empresarial (128 hours), developing leadership and management competencies for enterprise success.', 9),
('cert10', 'Curso de Programación de Apps Móviles', 'Universidad Complutense de Madrid', 'November 2015', 'Completed Curso de Programación de Apps Móviles (40 hours), gaining specialized skills in mobile application programming.', 10),
('cert11', 'Estructura del Lenguaje de Programacion C++', 'SENA', 'March 31, 2011', 'Certified in Estructura del Lenguaje de Programacion C++, building strong foundations in object-oriented programming.', 11),
('cert12', 'HTML y Javascript', 'SENA', 'March 24, 2011', 'Certified in HTML y Javascript, establishing core web development skills for dynamic online experiences.', 12),
('cert13', 'Generative AI for Developers', 'O''Reilly', 'May 2024', 'Completed certification in Generative AI for Developers, unlocking advanced techniques in AI-driven content creation and application development.', 13),
('cert14', 'RAG', 'O''Reilly', 'May 2024', 'Certified in RAG (Retrieval-Augmented Generation), enhancing capabilities in AI model integration and knowledge retrieval systems.', 14),
('cert15', 'LLMs Operation', 'O''Reilly', 'April 2024', 'Achieved certification in LLMs Operation, mastering operational aspects of Large Language Models for efficient deployment and management.', 15);

-- Seeding Skills tags (comma separated in name_en for now, or split them in React)
-- Since database schema only has one row per category (essentially), wait, schema logic in DB maps it as one string row per category?
-- The user requested "skills deben poder mostrarse como etiquetas y permitir enviarlos una a una".
-- If I change `DataReactProfile_Skills`, it uses `id PRIMARY KEY` but the application expects them separated or we can just insert them one by one!
INSERT INTO DataReactProfile_Skills (id, name_en, category, sort_order) VALUES
('sk1', 'Swift', 'programming', 1),
('sk2', 'C', 'programming', 2),
('sk3', 'C++', 'programming', 3),
('sk4', 'JavaScript', 'programming', 4),
('sk5', 'Node.js', 'programming', 5),
('sk6', 'React Native', 'programming', 6),
('sk7', 'Python', 'programming', 7),
('sk8', 'GraphQL', 'programming', 8),
('sk9', 'HTML5', 'programming', 9),
('sk10', 'CSS3', 'programming', 10),
('sk11', 'Tailwind CSS', 'programming', 11),
('sk12', 'Figma', 'design', 12),
('sk13', 'Autodesk Revit', 'design', 13),
('sk14', 'Autodesk AutoCAD', 'design', 14),
('sk15', 'Unreal Engine 5', 'design', 15),
('sk16', 'Rhinoceros 3D', 'design', 16),
('sk17', 'Blender', 'design', 17),
('sk18', 'Grasshopper 3D', 'design', 18);
