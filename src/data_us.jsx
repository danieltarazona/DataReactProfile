const initialData = {
  header: {
    name: 'Daniel Tarazona',
    title: 'Senior Mobile / React / Game Developer',
    location: 'Medellin, Colombia',
    email: 'shiftcipher@hotmail.com',
    phone: '+57 315 837 5156',
    github: 'https://github.com/danieltarazona',
    summary: 'Dynamic Developer with 8+ years of expertise in iOS, Swift, React Native and Unity game development. Proven track record delivering high-impact mobile applications that increased user retention, reduced fraud and accelerated deployment. Expert in AI integration for scalable, user-centric solutions.',
  },
  education: [
    {
      institution: 'UNIVERSIDAD DEL VALLE',
      location: 'Cali, Colombia',
      degree: 'Bachelor\'s Degree in Software Engineering (Pursued; In Progress)',
      date: '2017 - 2021',
      coursework: 'Mastered advanced data structures and interpreters in Scheme (Lisp) and C++, processors and computer architecture, interactive programming in Java, calculus, linear algebra, physics, machine learning, artificial intelligence, and game design and development in Unity. Technologies: Scheme (Lisp), Racket (Lisp), C/C++, Java, Python, Jupyter, and LaTeX. Completed coursework equivalent to full degree, developing 5+ projects that demonstrated proficiency in algorithms, AI, and game development, preparing for leadership in scalable software solutions.',
    },
    {
      institution: 'SERVICIO NACIONAL DE APRENDIZAJE (SENA)',
      location: 'Cali, Colombia',
      degree: 'Associate\'s Degree in Information Systems Analysis and Development',
      date: '2015 - 2018',
      coursework: 'Relevant Coursework: SQL, Node.js SDK for Oracle, Oracle, MySQL, PostgreSQL, Android, C#, and PHP. Developed 3 database-driven applications, gaining expertise in backend development and mobile app integration, directly applicable to full-stack engineering roles.',
    },
    {
      institution: 'MASSACHUSETTS INSTITUTE OF TECHNOLOGY - UNIVERSIDAD ICESI',
      location: 'Cali, Colombia',
      degree: 'MIT - Global Startup Labs Mobile Technology Entrepreneurship',
      date: '2013',
      coursework: 'Immersed in Django, Python, Java, Android, HTML, CSS3, SASS, Bootstrap, Emmet, fostering entrepreneurial acumen in mobile technology. Explored innovative startup methodologies at gsl.mit.edu, blending technical prowess with business innovation to launch scalable digital ventures. Contributed to 2 startup projects, applying mobile development skills to prototype user-centric apps.',
    },
    {
      institution: 'UNIVERSIDAD DEL VALLE',
      location: 'Cali, Colombia',
      degree: 'Bachelor\'s Degree in Architecture (Partially Completed Coursework)',
      date: '2009 - 2013',
      coursework: 'Explored color and light in architecture alongside multiple expression techniques. Harnessed technologies such as Autodesk Revit, Autodesk AutoCAD, Autodesk 3D Max, Rhinoceros 3D, Grasshopper 3D, Blender, Cycles, Lumion, Adobe Illustrator, Adobe Photoshop. Designed 10+ architectural models, enhancing visualization skills transferable to UI/UX and 3D game development.',
    },
    {
      institution: 'COLEGIO PARROQUIAL SANTIAGO APÓSTOL',
      location: 'Cali, Colombia',
      degree: 'High School Technical Degree in Industrial Design',
      date: '1999 - 2009',
      coursework: 'Gained foundational skills in industrial design, utilizing Corel Draw and Microsoft Office and Wix.com to cultivate early expertise in visual and technical communication. Created 5+ design projects, building a strong base for UI/UX principles in software development.',
    },
  ],
  skills: {
    programming: 'Swift, Objective-C, C, C++, C#, Solidity, JavaScript, Node.js, React Native, Python, Java, PHP, Laravel, GraphQL, HTML5, CSS3, SASS, Bootstrap, TypeScript, Redux, Firebase, SQLite.',
    design: 'Adobe XD, Figma, Sketch 3, Adobe Comp CC, Autodesk Revit, Autodesk AutoCAD, Rhinoceros 3D, Blender, Lumion, V-Ray, Grasshopper 3D.',
    tools: 'Xcode, Android Studio, Unity, VS Code, Git, Jenkins, Fastlane, CocoaPods, Carthage, SPM.',
    projects: [
      {
        "name": "Spoken Languages:",
        "date": "",
        "description": "Spanish (Native), English (C1 Full Professional Proficiency), French (B1 Professional Working Proficiency), Japanese (A2 Limited Working Proficiency), German (A1 Elementary Proficiency). Multilingual skills enable effective communication in diverse teams."
      },
      // {
      //   "name": "DataKit - Stealth Productivity Suite - iOS/macOS App",
      //   "date": "May 2021 - Ongoing",
      //   "description": "Developed AI-powered productivity suite for iOS, iPadOS, and macOS with DataCapture and DataProfile modules, enabling intelligent data management and automation. Contributed to open source: added iOS features to Lumos Engine, iOS/Xcode support for SDL, Python code for Overpass, SDK enhancements for CouchBase Lite Swift Coder, C and iOS support for Raylib, and Windows-based Lisp improvements for Racket. Improved performance by 40% through optimized algorithms."
      // },
      {
        "name": "Lululemon Athletica - GuestApp - iOS App",
        "date": "April 2022 - Ongoing",
        "description": "Developed SDK with Awin tracking and Adobe Analytics for conversion and sales insights. Redesigned notifications using Generics (+25% reusability) and reduced fraud by 35%. Leveraged Contentful, Splunk, and rigorous testing for quality. Proposed legacy code improvements during Innovation Week, enhancing maintainability."
      },
      {
        "name": "GSS Gyro Stabilized Systems - Orion - macOS App",
        "date": "April 2024 - August 2024",
        "description": "Architected Linux app for 4K gyrostabilized camera control on handheld controllers using C/C++/C# with FFmpeg, GStreamer, Blackmagic SDI and DirectLink. Integrated global navigation, AR with interactive layers, and multilingual support. Achieved 60+ FPS and cut deployment time by 40% cross-platform."
      },
      {
        "name": "Colombia Mobile Community Lead - Volunteer - iOS App",
        "date": "November 2023 - April 2024",
        "description": "Built iOS Design System with Figma and Endava BeeQ. Integrated AWS Amplify/Cognito with CLI automation. Certified in AI, RAG, and LLMs. Contributed to SDL3 with Metal support and boosted project kickoff by 30% via collaborative SDKs."
      },
      {
        "name": "GeoPortal for PopuLab - React Website",
        "date": "August 2021 - August 2022",
        "description": "Designed and built GeoPortal for PopuLab (Lancaster University-funded), enabling real-time GeoJSON/JSONB data parsing. Integrated Node.js, GraphQL, PostgreSQL 14, Prisma, Hasura, and CSVKIT for dynamic geodata visualization. Supported Real State research on vulnerable populations, contributing to academic publications and community outreach."
      },
      // {
      //   "name": "Itau Uruguay - iOS Enterprise App",
      //   "date": "June 2021 - June 2022",
      //   "description": "Led development of a secure payroll enterprise app using MVP architecture with Face ID, Touch ID, iToken, and OAuth 2.0. Enhanced authentication and fund transfers, reducing fraud by 40% for over 100K users. Ensured full compliance with banking standards, improving security and operational efficiency."
      // },
      {
        name: 'Pineapel - iOS App',
        date: 'March 2022 - March 2022',
        description: 'Rescued and modernized legacy project by upgrading to Xcode 13, harnessing Swift, Texture, and SwiftUI. Optimized performance metrics and eradicated compatibility hurdles, facilitating flawless deployment and bolstering application stability in production environments.',
      },
      {
        name: 'Trainerz Health - iOS App',
        date: 'January 2022 - March 2022',
        description: 'Directed UI/UX innovation using SwiftUI for health application tailored to expecting mothers. Integrated Firebase for seamless authentication, data orchestration, and real-time synchronization, surging user retention by 35% via intuitive interfaces and dependable backend infrastructure.',
      },
      {
        name: 'Transcard - iOS SDK and iOS App',
        date: 'June 2021 - December 2021',
        description: 'Forged versatile Swift Package Manager-based SDK for financial ecosystems, complemented by demo application integrating Mastercard, Apple Pay, and OAuth 2.0. Streamlined payment workflows, halving integration durations by 50% and enabling secure, efficient transactions for fintech enterprises.',
      },
      {
        name: 'CreditSesame - iOS App',
        date: 'September 2020 - May 2021',
        description: 'Pioneered development with VIPER/SwiftUI architectures and Sourcery metaprogramming, optimizing build processes via CocoaPods. Implemented A/B testing through Optimize.ly/Mixpanel, curtailing build times by 50% and fortifying reliability with comprehensive XCTest/XCUITests frameworks.',
      },
      {
        name: 'Cropswap - React Native App',
        date: 'June 2020 - September 2020',
        description: 'Constructed React Native application for organic crop exchanges, embedding advanced mapping capabilities. Enhanced user experiences with Redux, catalyzing a 25% uptick in platform adoption within the Los Angeles market.',
      },
      {
        name: 'Boxia - React Native App',
        date: 'January 2020 - June 2020',
        description: 'Engineered React Native application featuring Mapbox integration for superior geospatial functionality. Prioritized performance and usability, earning acclaim and high ratings on AppAdvice through meticulous design and optimization.',
      },
      {
        name: 'Swiftli iOS App',
        date: 'August 2019 - December 2019',
        description: 'Architected iOS/React Native coworking social platform with Algolia search, Mapbox navigation, and Stripe payments. Amplified user engagement via MVVM patterns and real-time interactions, fostering vibrant community connections.',
      },
      {
        name: 'Blockchain - Mining and Learning',
        date: 'March 2017 - May 2018',
        description: 'Directed expansive Ethereum mining operations from 2017, authoring smart contracts and integrating APIs such as CoinGate. Achieved 30% cost reductions through groundbreaking Solidity and Node.js advancements, solidifying expertise in blockchain scalability.',
      },
      {
        name: 'Posesionclo.com - WordPress Website',
        date: 'April 2017 - March 2018',
        description: 'Developed dynamic fashion e-commerce website for Manufacturas Economicas using WordPress themes, plugins, webhooks, and filters. Elevated online sales by 20% through enhanced functionality and user-centric design.',
      },
      {
        name: 'Hyperspace VR - Unity Game',
        date: 'August 2017 - December 2017',
        description: 'Single-handedly created captivating spaceship VR game in Unity 5 with C#, emphasizing modular design and sustained performance at 60+ FPS. Supported iOS 7+ devices, showcasing mastery in VR user interfaces and immersive game mechanics.',
      },
      {
        name: 'Vitral Studio - WordPress Website',
        date: 'August 2017 - October 2017',
        description: 'Oversaw WordPress development utilizing CLI tools to craft dynamic website for the studio, enhancing digital presence and interactive user experiences.',
      },
      {
        name: 'TCC Shipping - WordPress Plugin',
        date: 'June 2017 - July 2017',
        description: 'Engineered bespoke plugin for shipping tracking and labeling at TCC Colombia, leveraging WordPress API, SOAP, and PHP 7. Streamlined logistics operations, reducing processing times by 25% and boosting efficiency.',
      },
      {
        name: 'Invisible to the Eye - WordPress Website',
        date: 'January 2017 - April 2017',
        description: 'Crafted innovative UI/UX/UIX designs in Medellin using Adobe Comp CC, XD, and Sketch 3, delivering intuitive and engaging interfaces that prioritize user satisfaction.',
      },
      {
        name: 'MiCosechApp - iOS App',
        date: 'December 2016 - March 2017',
        description: 'Developed robust iOS 9-10 application with Alamofire, Siesta, Sourcery, SwiftGen, and Fastlane. Incorporated Nuke, Cache, and Hue for optimized performance, ensuring seamless deployment and superior user experiences.',
      },
      {
        name: 'InventAR.io - Laravel App',
        date: 'July 2016 - March 2017',
        description: 'Innovated AR-driven shipping and shopping analytics platform with inventory management features. Utilized Laravel, Node.js, Three.js, and Bootstrap to enhance retail efficiencies by 35%, transforming operational workflows.',
      },
      {
        name: 'BabyMoon - UX Design',
        date: 'January 2017',
        description: 'Digital concept using Adobe Comp CC on iPad, demonstrating exceptional creativity and proficiency in modern design tools.',
      },
      {
        name: 'PizzaApp - iOS App',
        date: 'July 2016',
        description: 'Built Swift-powered iOS application, emphasizing user-friendly features for effortless food ordering and enhanced customer satisfaction.',
      },
    ],
  },
  experience: [
    {
      company: 'ENDAVA',
      role: 'Senior iOS Engineer',
      date: 'March 2022 - Present',
      description: 'Engineered advanced iOS solutions for global clients, integrating SwiftUI, Combine, and Core Data for scalable apps. Led authentication and analytics SDK development, reducing integration time by 40% and boosting app performance by 25%. Collaborated with cross-functional teams to deliver high-quality mobile applications, driving adoption of AI-driven features and modern architectures.',
      location: 'Remote / Medellín, Antioquia, Colombia',
    },
    {
      company: '',
      role: 'Colombia Mobile Community Lead',
      date: 'February 2023 - Present',
      description: 'Founded and led the Colombia Mobile Community, fostering collaboration and knowledge sharing among 50+ mobile engineers. Organized 10+ technical sessions, promoted LATAM partnerships, and accelerated project delivery by 30% through shared SDKs and best practices. Drove exponential community growth and innovation within Endava’s LATAM network.',
      location: 'Remote / Medellín, Antioquia, Colombia',
    },
    {
      company: 'KOOMBEA',
      role: 'Senior iOS Engineer for Trainerz',
      date: 'January 2022 - March 2022',
      description: 'Spearheaded UI/UX advancements in SwiftUI for a specialized health application serving expecting mothers. Integrated Firebase for authentication, data handling, and real-time updates, elevating user retention through ergonomic designs and solid backend capabilities. Ensuring compliance with health data standards.',
      location: 'Remote / Barranquilla, Atlántico, Colombia',
    },
    {
      company: '',
      role: 'Senior iOS Engineer for Transcard',
      date: 'June 2021 - December 2021',
      description: 'Architected a VIPER-pattern application with Swift Package Manager for Apple Pay and Mastercard integrations. Optimized prepaid and virtual card management, reducing integration efforts and enhancing fintech operational fluidity. Improving transaction security and user experience.',
      location: 'Remote / Barranquilla, Atlántico, Colombia',
    },
    // {
    //   company: 'APPLICA',
    //   role: 'Senior iOS Engineer for Itau Uruguay',
    //   date: 'June 2021 - June 2022',
    //   description: 'Architected a secure enterprise payroll application using Swift, UIKit, Fingerprint, FaceID, iToken, and OAuth 2.0. Enhanced security protocols and user interfaces for corporate clientele, diminishing fraud occurrences by 40% in a high-stakes banking environment handling 100,000 concurrent users. Ensured full compliance with banking standards, improving operational efficiency.',
    //   location: 'Remote / Montevideo, Uruguay',
    // },
    {
      company: 'PINEAPEL™',
      role: 'Senior iOS Engineer',
      date: 'March 2022 - March 2022',
      description: 'Revitalized a legacy project by migrating to Xcode 13 with Swift, Texture, and SwiftUI integrations. Eliminated compatibility obstacles, guaranteeing robust production deployment and elevated performance standards. Completed migration in 1 month, ensuring seamless user experience for 50K+ active users.',
      location: 'Remote / Miami, Florida, United States',
    },
    {
      company: 'ENCORA (FORMERLY AVANTICA)',
      role: 'Senior iOS Engineer for CreditSesame',
      date: 'September 2020 - May 2021',
      description: 'Leveraged VIPER/SwiftUI frameworks and Sourcery for advanced metaprogramming. Streamlined build and testing pipelines with CocoaPods and Fastlane, halving processing times by 50% and reinforcing application integrity via XCTest/XCUITests. Implemented A/B testing, improving feature adoption by 20%.',
      location: 'Remote / Cali, Valle del Cauca, Colombia',
    },
    {
      company: 'CAFETO SOFTWARE',
      role: 'Senior JavaScript Engineer for Cropswap',
      date: 'June 2020 - September 2020',
      description: 'Developed a React Native platform for organic exchanges, incorporating Mapbox for sophisticated mapping tools. Boosted market penetration by 25% in Los Angeles through refined user experiences and Redux state management. Launched app with 5K+ downloads in 3 months.',
      location: 'On-Site / Cali, Colombia',
    },
    {
      company: '',
      role: 'Senior JavaScript Engineer for Boxia',
      date: 'January 2020 - June 2020',
      description: 'Crafted a React Native application with Mapbox for enhanced geospatial features. Emphasized optimization and user-centric design, securing 4.8-star ratings and recognition on AppAdvice. Achieved 10K+ installs through intuitive UI/UX.',
      location: 'On-Site / Cali, Colombia',
    },
    {
      company: '',
      role: 'iOS Engineer and React Native Engineer for Swiftli',
      date: 'August 2019 - December 2019',
      description: 'Designed a hybrid iOS/React Native coworking social network integrating Algolia search, Mapbox navigation, and Stripe payments. Heightened engagement with MVVM architecture and dynamic real-time capabilities, cultivating active user communities of 2K+ members.',
      location: 'On-Site / Cali, Colombia',
    },
    {
      company: 'CODEAPPS',
      role: 'Chief Executive Officer',
      date: 'March 2017 - October 2018',
      description: 'Directed company operations, attaining fiscal objectives via strategic implementations in blockchain, web development, and VR technologies. Aligned multidisciplinary teams for sustained growth, navigating challenges with visionary leadership. Achieved 50% revenue growth through innovative tech solutions.',
      location: 'On-Site / Cali, Colombia',
    },
    {
      company: '',
      role: 'Blockchain Architect',
      date: 'March 2017 - May 2018',
      description: 'Oversaw extensive Ethereum mining initiatives from 2010 onward, developing smart contracts and API integrations like CoinGate. Realized 30% cost efficiencies through pioneering Solidity and Node.js solutions, advancing blockchain infrastructure for scalable decentralized applications.',
      location: 'On-Site / Cali, Colombia',
    },
    {
      company: 'TELEVOIP',
      role: 'Back End Developer',
      date: 'February 2014 - March 2015',
      description: 'Engineered backend solutions for TeleVoip, integrating MailChimp/Mandrill services. Maintained multilingual GitHub repositories, optimizing communication and operational strategies for global reach. Improved email delivery rates by 40% through API integrations.',
      location: 'Canary Islands, Spain',
    },
    {
      company: '',
      role: 'Javascript Developer',
      date: 'March 2011 - March 2015',
      description: 'Constructed high-efficiency web applications using Node.js, npm, Gulp, and Express.js. Delivered scalable, premium-quality solutions to diverse international clients, emphasizing innovation and performance. Reduced load times by 30% through optimized code and build processes.',
      location: 'Canary Islands, Spain',
    },
    {
      company: 'WEB ARCHITECTURE ROBOTICS (WAR)',
      role: 'Freelance Designer',
      date: 'February 2010 - February 2014',
      description: 'Specialized in web programming, architectural visualization, and robotics. Employed Rhinoceros, V-Ray, and Python scripting to produce innovative 3D models, surmounting economic constraints with resourceful design approaches. Delivered 15+ projects, enhancing client presentations with high-fidelity visualizations.',
      location: 'Cali, Colombia',
    },
  ],
  leadership: [
    {
      organization: 'MeetUp Vapor, Swift and SwiftConf',
      role: 'Founder and Leader',
      date: '2015 - Present',
      description: 'Founded and led a thriving community dedicated to mobile development collaboration and knowledge exchange. Delivered expert SwiftUI sessions, forged LATAM alliances. Accelerated project deliveries through shared SDK ecosystems, thriving amidst a regional technological renaissance. Organized 10+ events, fostering innovation among 200+ developers.',
      location: 'Cali, Colombia',
    },
    {
      organization: 'MINISTRY OF NATIONAL EDUCATION (MEN)',
      role: 'Top National Scores Saber Pro 2017 – IT Technologist',
      date: 'December 2018',
      description: 'Honored for achieving top national scores in the IT Saber Pro assessment, demonstrating exceptional resilience and proficiency in software engineering despite personal adversities. Ranked in top 1% nationally, validating expertise in IT technologies.',
      location: 'Bogotá, Colombia',
    },
    {
      organization: 'INNPULSA - ECOPETROL - ARGOS',
      role: 'Open Innovation Program in Hydrocarbons and Mining',
      date: 'June 03, 2014',
      description: 'Awarded for excellence in INNPULSA Innovación Abierta, recognizing innovative contributions to open innovation initiatives. Developed prototype solutions for energy sector challenges, demonstrating entrepreneurial skills.',
      location: 'Medellin, Colombia',
    },
  ],
  certificates: [
    {
      name: 'Republic of Colombia Pistols and Rifles 2025',
      issuer: 'Fedetiro',
      date: 'Octuber 29 - November 02, 2025',
      description: 'Mixed Team: 548, Individual: 416, 3x20: 416, Prone: 512',
    },
    {
      name: 'BSA Requirements',
      issuer: 'Bankers Academy',
      date: 'December 04, 2020',
      description: 'Earned Certificate of Achievement for mastering assessment criteria in BSA (Bank Secrecy Act) Requirements, ensuring compliance in financial operations.',
    },
    {
      name: 'AML Requirements',
      issuer: 'Bankers Academy',
      date: 'December 04, 2020',
      description: 'Attained Certificate of Achievement for excelling in AML (Anti-Money Laundering) Requirements, bolstering expertise in regulatory adherence.',
    },
    {
      name: 'Professional Membership',
      issuer: 'Association for Computing Machinery (ACM)',
      date: 'May 20',
      description: 'Admitted as a Professional Member of the Association for Computing Machinery, promoting computing as both a science and a profession through ongoing contributions.',
    },
    {
      name: 'EF SET English C1 Advanced',
      issuer: 'EF Standard English Test',
      date: 'June 10, 2020',
      description: 'Achieved C1 Advanced Level certification in English.',
    },
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'AWS Training & Certification',
      date: 'December 07, 2023',
      description: 'Completed AWS Cloud Practitioner certification, demonstrating foundational cloud computing expertise essential for scalable infrastructure design.',
    },
    {
      name: 'Desarrollo de Bases de Datos con SQL',
      issuer: 'SENA',
      date: 'April 17, 2017',
      description: 'Certified in Desarrollo de Bases de Datos con SQL (40 hours), equipping with advanced database development skills for robust data management.',
    },
    {
      name: 'Diseño de Imagen Corporativa',
      issuer: 'SENA',
      date: 'October 12, 2016',
      description: 'Certified in Diseño de Imagen Corporativa, honing abilities in corporate image design for impactful branding strategies.',
    },
    {
      name: 'Carrera de Apple Fullstack',
      issuer: 'Platzi',
      date: 'March 09, 2023',
      description: 'Earned diploma in Carrera de Apple Fullstack, mastering full-stack development within the Apple ecosystem for innovative app creation.',
    },
    {
      name: 'Desarrollo de Competencias en Gerencia y Gestion Empresarial',
      issuer: 'SENA',
      date: 'November 08, 2017',
      description: 'Certified in Desarrollo de Competencias en Gerencia y Gestion Empresarial (128 hours), developing leadership and management competencies for enterprise success.',
    },
    {
      name: 'Curso de Programación de Apps Móviles',
      issuer: 'Universidad Complutense de Madrid',
      date: 'November, 2015',
      description: 'Completed Curso de Programación de Apps Móviles (40 hours), gaining specialized skills in mobile application programming.',
    },
    {
      name: 'Estructura del Lenguaje de Programacion C++',
      issuer: 'SENA',
      date: 'March 31, 2011',
      description: 'Certified in Estructura del Lenguaje de Programacion C++, building strong foundations in object-oriented programming.',
    },
    {
      name: 'HTML y Javascript',
      issuer: 'SENA',
      date: 'March 24, 2011',
      description: 'Certified in HTML y Javascript, establishing core web development skills for dynamic online experiences.',
    },
    
    {
      name: 'Generative AI for Developers',
      issuer: 'O\'Reilly',
      date: 'May 2024',
      description: 'Completed certification in Generative AI for Developers, unlocking advanced techniques in AI-driven content creation and application development.',
    },
    {
      name: 'RAG',
      issuer: 'O\'Reilly',
      date: 'May 2024',
      description: 'Certified in RAG (Retrieval-Augmented Generation), enhancing capabilities in AI model integration and knowledge retrieval systems.',
    },
    {
      name: 'LLMs Operation',
      issuer: 'O\'Reilly',
      date: 'April 2024',
      description: 'Achieved certification in LLMs Operation, mastering operational aspects of Large Language Models for efficient deployment and management.',
    },
  ],
};

export default initialData;