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

    // Generate canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
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

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, 170);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight;
  };

  // Header
  addText(resumeData.personalInfo.fullName || 'Your Name', 20, true);
  yPosition += 5;
  
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.address
  ].filter(Boolean).join(' | ');
  
  addText(contactInfo, 10);
  yPosition += 10;

  // Education
  if (resumeData.education.length > 0) {
    addText('EDUCATION', 14, true);
    yPosition += 2;
    
    resumeData.education.forEach(edu => {
      addText(`${edu.degree} in ${edu.field}`, 12, true);
      addText(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 10);
      if (edu.gpa) addText(`GPA: ${edu.gpa}`, 10);
      yPosition += 5;
    });
  }

  // Work Experience
  if (resumeData.workExperience.length > 0) {
    addText('EXPERIENCE', 14, true);
    yPosition += 2;
    
    resumeData.workExperience.forEach(exp => {
      addText(`${exp.position}`, 12, true);
      addText(`${exp.company}, ${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 10);
      exp.responsibilities.forEach(resp => {
        addText(`• ${resp}`, 9);
      });
      yPosition += 5;
    });
  }

  // Skills
  if (resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) {
    addText('SKILLS', 14, true);
    yPosition += 2;
    
    if (resumeData.skills.technical.length > 0) {
      addText(`Technical: ${resumeData.skills.technical.join(', ')}`, 10);
    }
    if (resumeData.skills.soft.length > 0) {
      addText(`Soft Skills: ${resumeData.skills.soft.join(', ')}`, 10);
    }
  }

  // Download
  const fileName = resumeData.personalInfo.fullName 
    ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf';
  
  pdf.save(fileName);
};