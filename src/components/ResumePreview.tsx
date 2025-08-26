import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-h-[600px] overflow-y-auto" id="resume-preview">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-center items-center space-x-4 flex-wrap">
            {data.personalInfo.email && (
              <span>{data.personalInfo.email}</span>
            )}
            {data.personalInfo.phone && (
              <span>{data.personalInfo.phone}</span>
            )}
          </div>
          <div className="flex justify-center items-center space-x-4 flex-wrap">
            {data.personalInfo.address && (
              <span>{data.personalInfo.address}</span>
            )}
            {data.personalInfo.linkedIn && (
              <span>{data.personalInfo.linkedIn}</span>
            )}
            {data.personalInfo.portfolio && (
              <span>{data.personalInfo.portfolio}</span>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              </div>
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            EXPERIENCE
          </h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}, {exp.location}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                  {exp.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mt-1 ml-4">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}><strong>Achievement:</strong> {achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            PROJECTS
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.url && (
                    <p className="text-gray-600 text-sm">{project.url}</p>
                  )}
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-gray-600 mt-1">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              )}
              {project.achievements && project.achievements.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            SKILLS
          </h2>
          {data.skills.technical.length > 0 && (
            <div className="mb-2">
              <strong className="text-gray-900">Technical Skills:</strong>{' '}
              <span className="text-gray-700">{data.skills.technical.join(', ')}</span>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div className="mb-2">
              <strong className="text-gray-900">Soft Skills:</strong>{' '}
              <span className="text-gray-700">{data.skills.soft.join(', ')}</span>
            </div>
          )}
          {data.skills.languages.length > 0 && (
            <div className="mb-2">
              <strong className="text-gray-900">Languages:</strong>{' '}
              <span className="text-gray-700">{data.skills.languages.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
        Generated by AI Resume Builder
      </div>
    </div>
  );
};

export default ResumePreview;