'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useMachine } from '@xstate/react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';

import { cvMachine } from '@/lib/cvMachine';
import '@/lib/i18n';
import type { CVData } from '@/lib/types';

import HeaderSection from '@/components/HeaderSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import LeadershipSection from '@/components/LeadershipSection';
import CertificatesSection from '@/components/CertificatesSection';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

// Dynamic import for PDF to avoid SSR issues
const PDFPreviewPanel = dynamic(() => import('@/components/PDFPreviewPanel'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-[var(--color-text-muted)]">Loading PDF preview...</div>
    </div>
  ),
});

type SectionId = 'header' | 'education' | 'skills' | 'experience' | 'leadership' | 'certificates';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [current, send] = useMachine(cvMachine);
  const [activeSection, setActiveSection] = useState<SectionId>('header');
  const [showPreview, setShowPreview] = useState(true);

  const { data, isDirty, lastSaved } = current.context;

  // Load data from localStorage or fetch initial data
  useEffect(() => {
    const loadData = async () => {
      // Try localStorage first
      const savedData = localStorage.getItem('cvData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as CVData;
          send({ type: 'LOAD_DATA', data: parsed });
          return;
        } catch (e) {
          console.error('Error loading saved data:', e);
        }
      }

      // Fetch initial data
      try {
        const response = await fetch('/data.json');
        const initialData = await response.json() as CVData;
        send({ type: 'LOAD_DATA', data: initialData });
      } catch (e) {
        console.error('Error loading initial data:', e);
      }
    };

    loadData();
  }, [send]);

  // Auto-save on changes (debounced)
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        send({ type: 'SAVE' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDirty, send, data]);

  // Export to JSON
  const exportToJson = useCallback(() => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'cv-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [data]);

  // Change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Scroll to section
  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          language={i18n.language}
          onLanguageChange={changeLanguage}
          onExportJson={exportToJson}
          onTogglePreview={() => setShowPreview(!showPreview)}
          showPreview={showPreview}
          isDirty={isDirty}
          lastSaved={lastSaved}
        />

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel */}
          <motion.div
            className="flex-1 overflow-y-auto p-6"
            animate={{ width: showPreview ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header Section */}
              <div id="header">
                <HeaderSection
                  data={data.header}
                  onChange={(field, value) => send({ type: 'UPDATE_HEADER', field, value })}
                />
              </div>

              {/* Education Section */}
              <div id="education">
                <EducationSection
                  items={data.education}
                  onAdd={() => send({ type: 'ADD_ITEM', section: 'education' })}
                  onRemove={(index) => send({ type: 'REMOVE_ITEM', section: 'education', index })}
                  onChange={(index, field, value) =>
                    send({ type: 'UPDATE_ITEM', section: 'education', index, field, value })
                  }
                />
              </div>

              {/* Skills Section */}
              <div id="skills">
                <SkillsSection
                  skills={data.skills}
                  onSkillChange={(field, value) => send({ type: 'UPDATE_SKILLS', field, value })}
                  onProjectAdd={() => send({ type: 'ADD_PROJECT' })}
                  onProjectRemove={(index) => send({ type: 'REMOVE_PROJECT', index })}
                  onProjectChange={(index, field, value) =>
                    send({ type: 'UPDATE_PROJECT', index, field, value })
                  }
                />
              </div>

              {/* Experience Section */}
              <div id="experience">
                <ExperienceSection
                  items={data.experience}
                  onAdd={() => send({ type: 'ADD_ITEM', section: 'experience' })}
                  onRemove={(index) => send({ type: 'REMOVE_ITEM', section: 'experience', index })}
                  onChange={(index, field, value) =>
                    send({ type: 'UPDATE_ITEM', section: 'experience', index, field, value })
                  }
                />
              </div>

              {/* Leadership Section */}
              <div id="leadership">
                <LeadershipSection
                  items={data.leadership}
                  onAdd={() => send({ type: 'ADD_ITEM', section: 'leadership' })}
                  onRemove={(index) => send({ type: 'REMOVE_ITEM', section: 'leadership', index })}
                  onChange={(index, field, value) =>
                    send({ type: 'UPDATE_ITEM', section: 'leadership', index, field, value })
                  }
                />
              </div>

              {/* Certificates Section */}
              <div id="certificates">
                <CertificatesSection
                  items={data.certificates}
                  onAdd={() => send({ type: 'ADD_ITEM', section: 'certificates' })}
                  onRemove={(index) => send({ type: 'REMOVE_ITEM', section: 'certificates', index })}
                  onChange={(index, field, value) =>
                    send({ type: 'UPDATE_ITEM', section: 'certificates', index, field, value })
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* PDF Preview Panel */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-l border-[var(--color-border)] overflow-hidden"
              >
                <PDFPreviewPanel data={data} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
