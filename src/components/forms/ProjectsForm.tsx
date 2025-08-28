import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { ResumeData, Project } from "@/types/resume";
import MonthYearPicker from "@/components/ui/calendar";

interface ProjectsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState<string | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState<string | null>(null);
  const startDatePickerRef = useRef<HTMLDivElement>(null);
  const endDatePickerRef = useRef<HTMLDivElement>(null);

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startDatePickerRef.current && !startDatePickerRef.current.contains(event.target as Node)) {
        setShowStartDatePicker(null);
      }
      if (endDatePickerRef.current && !endDatePickerRef.current.contains(event.target as Node)) {
        setShowEndDatePicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      achievements: []
    };
    
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    onChange({
      ...data,
      projects: data.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(project => project.id !== id)
    });
  };

  const updateTechnologies = (id: string, technologies: string) => {
    const technologiesList = technologies.split('\n').filter(t => t.trim());
    updateProject(id, 'technologies', technologiesList);
  };

  const updateAchievements = (id: string, achievements: string) => {
    const achievementsList = achievements.split('\n').filter(a => a.trim());
    updateProject(id, 'achievements', achievementsList);
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Select Date";
    if (dateString === "Present") return "Present";
    const [year, month] = dateString.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleDateChange = (id: string, field: 'startDate' | 'endDate', value: { month: number; year: number } | "Present") => {
    if (value === "Present") {
      updateProject(id, field, "Present");
    } else {
      const month = (value.month + 1).toString().padStart(2, '0');
      const dateString = `${value.year}-${month}`;
      updateProject(id, field, dateString);
    }
    
    // Close the date picker
    if (field === 'startDate') {
      setShowStartDatePicker(null);
    } else {
      setShowEndDatePicker(null);
    }
  };

  const parseDateString = (dateString: string) => {
    if (!dateString || dateString === "Present") return { month: new Date().getMonth(), year: new Date().getFullYear() };
    const [year, month] = dateString.split('-');
    return { month: parseInt(month) - 1, year: parseInt(year) };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Projects & Portfolio</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addProject}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {data.projects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No projects yet. Click "Add Project" to showcase your work.
        </div>
      )}

      {data.projects.map((project, index) => (
        <div key={project.id} className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-medium">Project #{index + 1}</h5>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-commerce Website"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Project URL (Optional)</Label>
              <Input
                value={project.url || ''}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Description *</Label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="A full-stack e-commerce web application built with React and Node.js..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies Used *</Label>
            <Input
              value={project.technologies.join(', ')}
              onChange={(e) => updateTechnologies(project.id, e.target.value)}
              placeholder="React, Node.js, MongoDB, Express"
            />
            <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowStartDatePicker(showStartDatePicker === project.id ? null : project.id)}
                  className="w-full justify-start text-left font-normal h-12 px-4 border-2 hover:border-primary transition-all duration-200"
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(project.startDate)}
                </Button>
                
                {showStartDatePicker === project.id && (
                  <div className="absolute top-full left-0 z-50 mt-2" ref={startDatePickerRef}>
                    <MonthYearPicker
                      value={parseDateString(project.startDate)}
                      onChange={(value) => handleDateChange(project.id, 'startDate', value)}
                      isEndDate={false}
                      className="w-80 shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>End Date *</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEndDatePicker(showEndDatePicker === project.id ? null : project.id)}
                  className="w-full justify-start text-left font-normal h-12 px-4 border-2 hover:border-primary transition-all duration-200"
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(project.endDate)}
                </Button>
                
                {showEndDatePicker === project.id && (
                  <div className="absolute top-full left-0 z-50 mt-2" ref={endDatePickerRef}>
                    <MonthYearPicker
                      value={parseDateString(project.endDate)}
                      onChange={(value) => handleDateChange(project.id, 'endDate', value)}
                      isEndDate={true}
                      className="w-80 shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Key Achievements (Optional)</Label>
            <Textarea
              value={(project.achievements || []).join('\n')}
              onChange={(e) => updateAchievements(project.id, e.target.value)}
              placeholder="Implemented responsive design&#10;Integrated payment gateway&#10;Achieved 98% test coverage"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Each line will be a separate bullet point</p>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include 2-4 of your best projects</li>
          <li>• Focus on projects relevant to your target role</li>
          <li>• Include GitHub links or live demos when possible</li>
          <li>• Highlight the impact and results of your work</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;