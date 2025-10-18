const initialData = {
  header: {
    name: 'Daniel Tarazona',
    title: 'Senior iOS / Cross-Platform Engineer | AI & Mobile Architecture',
    location: 'Medellín, Colombia',
    email: 'shiftcipher@hotmail.com',
    phone: '+57 315 837 5156',
    github: 'https://github.com/danieltarazona',
    summary:
      'Senior iOS Engineer with 10+ years of experience building high-performance, scalable apps for fintech, enterprise, and AI-driven platforms. Proven record improving efficiency, security, and usability across Swift, C++, and React ecosystems. Passionate about crafting impactful mobile experiences that merge design, data, and innovation.',
  },

  education: [
    {
      institution: 'UNIVERSIDAD DEL VALLE',
      location: 'Cali, Colombia',
      degree: 'B.S. Software Engineering (Coursework Completed)',
      date: '2017 – 2022',
      coursework:
        'Focused on C++, Scheme/Lisp, AI, data structures, computer architecture, and game development with Unity. Built strong engineering fundamentals through hands-on system-level projects.',
    },
    {
      institution: 'SERVICIO NACIONAL DE APRENDIZAJE (SENA)',
      location: 'Cali, Colombia',
      degree: 'A.S. Information Systems Analysis and Development',
      date: '2015 – 2018',
      coursework:
        'Specialized in SQL, Oracle, Node.js, and Android development for enterprise systems.',
    },
    {
      institution: 'MIT – Global Startup Labs / Universidad Icesi',
      location: 'Cali, Colombia',
      degree: 'Mobile Technology Entrepreneurship',
      date: '2013',
      coursework:
        'Accelerated program in Python, Django, and Android development. Applied lean startup principles to create scalable mobile products.',
    },
  ],

  skills: {
    programming: 'iOS (Swift, SwiftUI, Objective-C), C/C++, React Native, Node.js, TypeScript, GraphQL, AWS, Firebase, Python, Solidity',
    design: 'Xcode, GitHub Actions, Fastlane, Figma, Adobe XD, Unity, Docker, Jira',
    projects: [
      {
        name: 'Lululemon Athletica – GuestApp',
        date: 'Apr 2022 – Present',
        description:
          'Redesigned notification systems using Swift Generics (+25% reusability) and implemented Awin/Adobe Analytics SDKs for sales tracking.',
      },
      {
        name: 'GSS – Orion macOS App',
        date: 'Apr 2024 – Aug 2024',
        description:
          'Built Linux/macOS control software for 4K gyrostabilized cameras using FFmpeg, GStreamer, and C++. Achieved 60+ FPS and reduced deployment time by 40%.',
      },
      {
        name: 'DataKit – AI Productivity Suite',
        date: 'May 2021 – Ongoing',
        description:
          'Created AI-powered suite for iOS/macOS enabling intelligent data profiling. Contributed to open-source SDKs (Raylib, SDL, Lumen).',
      },
      {
        name: 'PopuLab GeoPortal – React + GraphQL',
        date: 'Aug 2021 – Aug 2022',
        description:
          'Built real-time geodata visualization tool for Real State research using PostgreSQL, Hasura, and Prisma. Supported university-backed research publications.',
      },
    ],
  },

  experience: [
    {
      company: 'ENDAVA',
      role: 'Senior iOS Engineer',
      date: 'Mar 2022 – Sep 2025',
      location: 'Remote / Medellín, Colombia',
      description:
        'Delivered high-impact iOS features for enterprise clients, optimizing authentication and analytics modules. Championed reusable SDK design and reduced app crash rates by 30%. Mentored LATAM engineers and integrated modern SwiftUI practices across teams.',
    },
    {
      company: 'ENDAVA - COLOMBIA MOBILE COMMUNITY',
      role: 'Founder & Lead',
      date: 'Feb 2023 – Sep 2025',
      location: 'Remote / Medellín, Colombia',
      description:
        'Built a national community for mobile engineers, expanding membership by 50%. Led SwiftUI workshops and promoted cross-company SDK sharing, accelerating project delivery by 30%.',
    },
    // {
    //   company: 'APPLICA',
    //   role: 'Senior iOS Engineer – Itau Uruguay',
    //   date: 'Jun 2021 – Jun 2022',
    //   location: 'Remote / Montevideo, Uruguay',
    //   description:
    //     'Developed a secure enterprise payroll platform for 100K+ users with Face ID, iToken, and OAuth 2.0. Strengthened security compliance and cut fraud by 40%.',
    // },
    {
      company: 'KOOMBEA',
      role: 'Senior iOS Engineer – Trainerz',
      date: 'Jan 2022 – Mar 2022',
      location: 'Remote / Barranquilla, Colombia',
      description:
        'Revamped SwiftUI interface for a health app, improving retention by 35% via Firebase-backed real-time data and intuitive UX.',
    },
    {
      company: 'ENCORA (Avantica)',
      role: 'Senior iOS Engineer – CreditSesame',
      date: 'Sep 2020 – May 2021',
      location: 'Remote / Cali, Colombia',
      description:
        'Reduced build times by 50% with metaprogramming using Sourcery and optimized CI/CD pipelines. Strengthened test automation with XCTest and XCUITest frameworks.',
    },
    {
      company: 'CAFETO SOFTWARE',
      role: 'Senior JavaScript Engineer – Cropswap',
      date: 'Jun 2020 – Sep 2020',
      location: 'Cali, Colombia',
      description:
        'Developed React Native platform with advanced geolocation features, boosting app adoption by 25% in the Los Angeles market.',
    },
    {
      company: 'CODEAPPS',
      role: 'CEO / Blockchain Architect',
      date: 'Mar 2017 – Oct 2018',
      location: 'Cali, Colombia',
      description:
        'Directed cross-functional teams in blockchain, web, and VR initiatives. Improved mining efficiency by 30% via Solidity and Node.js optimizations.',
    },
  ],

  leadership: [
    {
      organization: 'COLOMBIA MOBILE COMMUNITY',
      role: 'Founder & Leader',
      date: '2023 – Present',
      description:
        'Grew LATAM mobile developer network to 50+ members, mentoring engineers and driving regional innovation initiatives.',
    },
    {
      organization: 'MINISTRY OF EDUCATION (MEN)',
      role: 'Top National Score – IT Technologist',
      date: '2018',
      description:
        'Ranked among top national performers in IT Saber Pro exams for software engineering excellence.',
    },
  ],

  certificates: [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'AWS Training & Certification',
      date: 'Dec 2023',
    },
    {
      name: 'Generative AI for Developers',
      issuer: "O'Reilly",
      date: 'May 2024',
    },
    {
      name: 'RAG – Retrieval-Augmented Generation',
      issuer: "O'Reilly",
      date: 'May 2024',
    },
    {
      name: 'LLMs Operation',
      issuer: "O'Reilly",
      date: 'Apr 2024',
    },
    {
      name: 'Carrera de Apple Fullstack',
      issuer: 'Platzi',
      date: 'Mar 2023',
    },
    {
      name: 'BSA & AML Requirements',
      issuer: 'Bankers Academy',
      date: 'Dec 2020',
    },
    {
      name: 'EF SET English C1 Advanced',
      issuer: 'EF Standard English Test',
      date: 'Jun 2020',
    },
  ],
};

export default initialData;
