import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/types/resume';

export const generatePDF = async (resumeData: ResumeData) => {
  try {
    // Get the resume preview element
    const element = document.getElementById('resume-preview');
    if (!element) {
      console.error('Resume preview element not found');
      return;
    }

    // Add some padding to ensure top content is not clipped
    const originalPadding = element.style.padding;
    element.style.padding = '20px';
    
    // Generate canvas from HTML with better settings
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // Restore original padding
    element.style.padding = originalPadding;

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with proper margins
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 190; // A4 width minus margins (210 - 20)
    const pageHeight = 277; // A4 height minus margins (295 - 18)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 10; // Start with top margin

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10; // Maintain top margin
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    const fileName = resumeData.personalInfo.fullName 
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

// Alternative simple PDF generation without HTML rendering
export const generateSimplePDF = (resumeData: ResumeData) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const lineHeight = 6;
  const margin = 20;
  const pageHeight = 280;
  const pageWidth = 210;

  // Helper function to format dates properly
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    // Handle the format "2020-06" or "2020-06-01"
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length >= 2) {
        const year = parts[0];
        const month = parseInt(parts[1]);
        
        // Convert month number to month name
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        if (month >= 1 && month <= 12) {
          const formatted = `${monthNames[month - 1]} ${year}`;
          console.log(`Date formatted: ${dateString} -> ${formatted}`);
          return formatted;
        }
      }
    }
    
    // If we can't parse it, return the original
    console.log(`Date not formatted: ${dateString}`);
    return dateString;
  };

  // Helper function to add centered text
  const addCenteredText = (text: string, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, 170);
    
    // Check if we need a new page
    if (yPosition + (lines.length * lineHeight) > pageHeight) {
      pdf.addPage();
      yPosition = 20;
    }
    
    lines.forEach((line: string) => {
      const textWidth = pdf.getTextWidth(line);
      const xPosition = (pageWidth - textWidth) / 2;
      pdf.text(line, xPosition, yPosition);
      yPosition += lineHeight;
    });
  };

  // Helper function to add left-aligned text
  const addText = (text: string, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, 170);
    
    // Check if we need a new page
    if (yPosition + (lines.length * lineHeight) > pageHeight) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight;
  };

  // Helper function to add section header with border
  const addSectionHeader = (text: string) => {
    yPosition += 5;
    
    // Add border line
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    
    addText(text, 14, true);
    yPosition += 2;
  };

  // Helper function to add horizontal line
  const addHorizontalLine = () => {
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
  };

  // Header - Centered like in template
  addCenteredText(resumeData.personalInfo.fullName || 'Your Name', 20, true);
  yPosition += 5;
  
  // Contact Information - Centered
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.address
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    addCenteredText(contactInfo, 10);
    yPosition += 5;
  }

  // Additional contact info - Centered
  if (resumeData.personalInfo.linkedIn || resumeData.personalInfo.portfolio) {
    const additionalInfo = [
      resumeData.personalInfo.linkedIn,
      resumeData.personalInfo.portfolio
    ].filter(Boolean).join(' | ');
    
    if (additionalInfo) {
      addCenteredText(additionalInfo, 10);
      yPosition += 5;
    }
  }

  // Add border after header (like in template)
  addHorizontalLine();

  // Professional Summary
  addSectionHeader('PROFESSIONAL SUMMARY');
  const summary = `Experienced ${resumeData.workExperience.length > 0 ? 'professional' : 'individual'} with expertise in ${resumeData.skills.technical.length > 0 ? resumeData.skills.technical.slice(0, 3).join(', ') : 'various technical skills'}. ${resumeData.education.length > 0 ? `Holds a ${resumeData.education[0]?.degree || 'degree'} in ${resumeData.education[0]?.field || 'relevant field'}.` : ''} Demonstrated ability to deliver results and drive success in challenging environments.`;
  addText(summary, 10);
  yPosition += 5;

  // Education
  if (resumeData.education.length > 0) {
    addSectionHeader('EDUCATION');
    
    resumeData.education.forEach(edu => {
      // Title and institution on same line
      const titleText = `${edu.degree} in ${edu.field}`;
      const institutionText = `${edu.institution}`;
      
      addText(titleText, 12, true);
      addText(institutionText, 10);
      
      // Dates on the right side with proper formatting and bold
      const dateText = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.setFont('helvetica', 'bold');
      pdf.text(dateText, pageWidth - margin - dateWidth, yPosition - lineHeight);
      pdf.setFont('helvetica', 'normal');
      
      if (edu.gpa) addText(`GPA: ${edu.gpa}`, 10);
      
      if (edu.achievements && edu.achievements.length > 0) {
        edu.achievements.forEach(achievement => {
          addText(`• ${achievement}`, 9);
        });
      }
      yPosition += 3;
    });
  }

  // Work Experience
  if (resumeData.workExperience.length > 0) {
    addSectionHeader('EXPERIENCE');
    
    resumeData.workExperience.forEach(exp => {
      addText(`${exp.position}`, 12, true);
      addText(`${exp.company}, ${exp.location}`, 10);
      
      // Dates on the right side with proper formatting and bold
      const dateText = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.setFont('helvetica', 'bold');
      pdf.text(dateText, pageWidth - margin - dateWidth, yPosition - lineHeight);
      pdf.setFont('helvetica', 'normal');
      
      if (exp.responsibilities && exp.responsibilities.length > 0) {
        exp.responsibilities.forEach(resp => {
          addText(`• ${resp}`, 9);
        });
      }
      
      if (exp.achievements && exp.achievements.length > 0) {
        exp.achievements.forEach(achievement => {
          addText(`Achievement: ${achievement}`, 9);
        });
      }
      yPosition += 3;
    });
  }

  // Projects
  if (resumeData.projects.length > 0) {
    addSectionHeader('PROJECTS');
    
    resumeData.projects.forEach(project => {
      addText(`${project.name}`, 12, true);
      
      // Dates on the right side with proper formatting and bold
      const dateText = `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.setFont('helvetica', 'bold');
      pdf.text(dateText, pageWidth - margin - dateWidth, yPosition - lineHeight);
      pdf.setFont('helvetica', 'normal');
      
      addText(project.description, 10);
      
      if (project.technologies && project.technologies.length > 0) {
        addText(`Technologies: ${project.technologies.join(', ')}`, 10);
      }
      
      if (project.achievements && project.achievements.length > 0) {
        project.achievements.forEach(achievement => {
          addText(`• ${achievement}`, 9);
        });
      }
      yPosition += 3;
    });
  }

  // Skills - Combined section including languages
  if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0 || resumeData.skills.languages.length > 0) {
    addSectionHeader('SKILLS');
    
    // Combine all skills into one comprehensive line
    const allSkills = [];
    
    if (resumeData.skills.technical.length > 0) {
      allSkills.push(`Technical: ${resumeData.skills.technical.join(', ')}`);
    }
    if (resumeData.skills.soft.length > 0) {
      allSkills.push(`Soft: ${resumeData.skills.soft.join(', ')}`);
    }
    if (resumeData.skills.languages.length > 0) {
      allSkills.push(`Languages: ${resumeData.skills.languages.join(', ')}`);
    }
    
    // Add all skills in one line with proper spacing
    if (allSkills.length > 0) {
      addText(allSkills.join(' | '), 10);
    }
  }

  // Footer line
  addHorizontalLine();

  // Download
  const fileName = resumeData.personalInfo.fullName 
    ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf';
  
  pdf.save(fileName);
};