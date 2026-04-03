'use client';

import React, { useMemo } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Types (mirrored from core since we can't easily import from the library's internal types)
export interface PDFPreviewPanelLabels {
    resume: string;
    preview: string;
    experience: string;
    education: string;
    skills: string;
    programming: string;
    design: string;
    leadership: string;
    certificates: string;
    projects: string;
    awards: string;
    tools: string;
    hobbies: string;
}

export function CVDocument({ data, labels, theme }: any) {
    const styles = useMemo(() => StyleSheet.create({
        page: {
            padding: theme.page.padding,
            fontSize: theme.page.fontSize,
            fontFamily: theme.page.fontFamily,
            color: theme.page.color,
        },
        columnsContainer: {
            flexDirection: 'row',
            marginTop: 10,
        },
        leftColumn: {
            width: '30%',
            paddingRight: 15,
            borderRightWidth: 0.5,
            borderRightColor: '#eee',
        },
        rightColumn: {
            width: '70%',
            paddingLeft: 15,
        },
        header: {
            textAlign: theme.type === 'columns' ? 'left' : 'center',
            marginBottom: 16,
            borderBottomWidth: theme.type === 'columns' ? 1 : 0,
            borderBottomColor: '#eee',
            paddingBottom: 10,
        },
        name: {
            ...theme.typography.name,
        },
        title: {
            ...theme.typography.title,
        },
        contact: {
            ...theme.typography.contact,
        },
        section: {
            marginBottom: theme.page.sectionSpacing ?? 12,
        },
        sectionTitle: {
            ...theme.typography.sectionTitle,
        },
        item: {
            marginBottom: theme.page.itemSpacing ?? 8,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
        },
        rowLeft: {
            flex: 1,
            paddingRight: 10,
        },
        rowRight: {
            flexShrink: 0,
        },
        itemTitle: {
            ...theme.typography.itemTitle,
        },
        itemSubtitle: {
            ...theme.typography.itemSubtitle,
        },
        itemDate: {
            ...theme.typography.itemDate,
        },
        itemLocation: {
            ...theme.typography.itemLocation,
        },
        description: {
            ...theme.typography.description,
            lineHeight: theme.page.lineHeight ?? 1.3,
            textAlign: 'justify',
        },
        skillsList: {
            ...theme.typography.skillsContent,
            marginBottom: 8,
        },
        skillLabel: {
            ...theme.typography.skillsLabel,
        },
    }), [theme]);

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.name}>{data.header.name || 'Your Name'}</Text>
            {data.header.title && <Text style={styles.title}>{data.header.title}</Text>}
            <Text style={styles.contact}>
                {[data.header.location, data.header.email, data.header.phone, data.header.github]
                    .filter(Boolean)
                    .join(theme.type === 'columns' ? '\n' : ' • ')}
            </Text>
        </View>
    );

    const renderEducation = () => data.education && data.education.length > 0 && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.education}</Text>
            {data.education.map((edu: any, index: number) => (
                <View key={index} style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{edu.institution}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemLocation}>{edu.location}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemDate}>{edu.date}</Text>
                        </View>
                    </View>
                    {edu.coursework && <Text style={styles.description}>{edu.coursework}</Text>}
                </View>
            ))}
        </View>
    );

    const renderSkills = () => (data.skills.programming || data.skills.design || data.skills.tools) && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.skills}</Text>
            {data.skills.programming && (
                <Text style={styles.skillsList}>
                    <Text style={styles.skillLabel}>{labels.programming}: </Text>
                    {data.skills.programming}
                </Text>
            )}
            {data.skills.design && (
                <Text style={styles.skillsList}>
                    <Text style={styles.skillLabel}>{labels.design}: </Text>
                    {data.skills.design}
                </Text>
            )}
            {data.skills.tools && (
                <Text style={styles.skillsList}>
                    <Text style={styles.skillLabel}>{labels.tools}: </Text>
                    {data.skills.tools}
                </Text>
            )}
        </View>
    );

    const renderExperience = () => data.experience && data.experience.length > 0 && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.experience}</Text>
            {data.experience.map((exp: any, index: number) => (
                <View key={index} style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{exp.company}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemLocation}>{exp.location}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemSubtitle}>{exp.role}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemDate}>{exp.date}</Text>
                        </View>
                    </View>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                    {exp.projects && exp.projects.length > 0 && (
                        <View style={{ marginTop: 4 }}>
                            {exp.projects.map((proj: any, pIndex: number) => (
                                <View key={pIndex} style={{ marginBottom: 4 }}>
                                    <View style={styles.row}>
                                        <View style={styles.rowLeft}>
                                            <Text style={styles.itemTitle}>
                                                {proj.role ? `${proj.role}, ${proj.name}` : proj.name}
                                            </Text>
                                        </View>
                                        <View style={styles.rowRight}>
                                            <Text style={styles.itemDate}>{proj.date}</Text>
                                        </View>
                                    </View>
                                    {proj.description && <Text style={styles.description}>{proj.description}</Text>}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );

    const renderCertificates = () => {
        if (!data.certificates || data.certificates.length === 0) return null;

        const grouped = data.certificates.reduce((acc: any, cert: any) => {
            const issuer = cert.issuer || 'Other';
            if (!acc[issuer]) acc[issuer] = [];
            acc[issuer].push(cert);
            return acc;
        }, {} as Record<string, any[]>);

        return (
            <View style={styles.section} minPresence={45}>
                <Text style={styles.sectionTitle}>{labels.certificates}</Text>
                {Object.entries(grouped).map(([issuer, certs]: [string, any], iIndex) => (
                    <View key={iIndex} style={{ marginBottom: 6 }}>
                        <Text style={styles.itemTitle}>{issuer}</Text>
                        {certs.map((cert: any, cIndex: number) => (
                            <View key={cIndex} style={{ paddingLeft: 8, marginTop: 2 }}>
                                <View style={styles.row}>
                                    <View style={styles.rowLeft}>
                                        <Text style={{ ...styles.description, marginBottom: 0 }}>{cert.name}</Text>
                                    </View>
                                    <View style={styles.rowRight}>
                                        <Text style={styles.itemDate}>{cert.date}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    const renderProjects = () => data.projects && data.projects.length > 0 && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.projects}</Text>
            {data.projects.map((proj: any, index: number) => (
                <View key={index} style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{proj.name}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemDate}>{proj.date}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.itemSubtitle}>{proj.role}</Text>
                    </View>
                    {proj.description && <Text style={styles.description}>{proj.description}</Text>}
                </View>
            ))}
        </View>
    );

    const renderAwards = () => data.awards && data.awards.length > 0 && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.awards}</Text>
            {data.awards.map((award: any, index: number) => (
                <View key={index} style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{award.name}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemLocation}>{award.location}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemSubtitle}>{award.issuer}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemDate}>{award.date}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderHobbies = () => data.hobbies && data.hobbies.length > 0 && (
        <View style={styles.section} minPresence={40}>
            <Text style={styles.sectionTitle}>{labels.hobbies}</Text>
            {data.hobbies.map((hobby: any, index: number) => (
                <View key={index} style={hobby.description || hobby.location ? styles.item : { marginBottom: 4 }}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{hobby.name}</Text>
                        </View>
                        {hobby.location && (
                            <View style={styles.rowRight}>
                                <Text style={styles.itemLocation}>{hobby.location}</Text>
                            </View>
                        )}
                    </View>
                    {hobby.description && <Text style={styles.description}>{hobby.description}</Text>}
                </View>
            ))}
        </View>
    );

    const renderLeadership = () => data.leadership && data.leadership.length > 0 && (
        <View style={styles.section} minPresence={45}>
            <Text style={styles.sectionTitle}>{labels.leadership}</Text>
            {data.leadership.map((lead: any, index: number) => (
                <View key={index} style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemTitle}>{lead.organization}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemLocation}>{lead.location}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.itemSubtitle}>{lead.role}</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={styles.itemDate}>{lead.date}</Text>
                        </View>
                    </View>
                    {lead.description && <Text style={styles.description}>{lead.description}</Text>}
                </View>
            ))}
        </View>
    );

    if (theme.type === 'columns') {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    {renderHeader()}
                    <View style={styles.columnsContainer}>
                        <View style={styles.leftColumn}>
                            {renderSkills()}
                            {renderCertificates()}
                            {renderAwards()}
                            {renderHobbies()}
                        </View>
                        <View style={styles.rightColumn}>
                            {renderExperience()}
                            {renderProjects()}
                            {renderEducation()}
                            {renderLeadership()}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {renderHeader()}
                {renderEducation()}
                {renderSkills()}
                {renderExperience()}
                {renderProjects()}
                {renderLeadership()}
                {renderCertificates()}
                {renderAwards()}
                {renderHobbies()}
            </Page>
        </Document>
    );
}

export function LocalPDFPreviewPanel({ data, labels, theme }: any) {
    return (
        <div className="h-full flex flex-col bg-[#0f0f1a]">
            <div className="p-4 border-b border-white/5 bg-[#161625]">
                <h2 className="text-lg font-semibold text-gray-200">
                    📄 {labels.preview}
                </h2>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
                <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <PDFViewer width="100%" height="100%" showToolbar={true}>
                        <CVDocument data={data} labels={labels} theme={theme} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
}
