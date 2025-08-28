import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { ResumeData, WorkExperience } from "@/types/resume";
import MonthYearPicker from "@/components/ui/calendar";

interface WorkExperienceFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const WorkExperienceForm = ({ data, onChange }: WorkExperienceFormProps) => {
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

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [],
      achievements: []
    };
    
    onChange({
      ...data,
      workExperience: [...data.workExperience, newExperience]
    });
  };

  const updateWorkExperience = (id: string, field: string, value: string | boolean | string[]) => {
    console.log('updateWorkExperience called:', { id, field, value }); // Debug log
    
    const updatedData = {
      ...data,
      workExperience: data.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    };
    
    console.log('Updated data:', updatedData); // Debug log
    onChange(updatedData);
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter(exp => exp.id !== id)
    });
  };

  const updateResponsibilities = (id: string, responsibilities: string) => {
    const responsibilitiesList = responsibilities.split('\n').filter(r => r.trim());
    updateWorkExperience(id, 'responsibilities', responsibilitiesList);
  };

  const updateAchievements = (id: string, achievements: string) => {
    const achievementsList = achievements.split('\n').filter(a => a.trim());
    updateWorkExperience(id, 'achievements', achievementsList);
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
    console.log('handleDateChange called:', { id, field, value }); // Debug log
    
    if (value === "Present") {
      console.log('Setting Present for:', field); // Debug log
      updateWorkExperience(id, field, "Present");
      // Only set current to true if this is an end date change
      if (field === 'endDate') {
        updateWorkExperience(id, 'current', true);
      }
    } else {
      const month = (value.month + 1).toString().padStart(2, '0');
      const dateString = `${value.year}-${month}`;
      console.log('Setting date:', dateString, 'for:', field); // Debug log
      updateWorkExperience(id, field, dateString);
      // Only set current to false if this is an end date change
      if (field === 'endDate') {
        updateWorkExperience(id, 'current', false);
      }
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

  // Handle the "Currently working here" toggle
  const handleCurrentToggle = (id: string, checked: boolean) => {
    console.log('handleCurrentToggle called:', { id, checked }); // Debug log
    
    if (checked) {
      // Turn ON: Set current to true and end date to "Present"
      updateWorkExperience(id, 'current', true);
      updateWorkExperience(id, 'endDate', 'Present');
    } else {
      // Turn OFF: Set current to false and clear end date
      updateWorkExperience(id, 'current', false);
      updateWorkExperience(id, 'endDate', '');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Work Experience</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addWorkExperience}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.workExperience.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No work experience entries yet. Click "Add Experience" to get started.
        </div>
      )}

      {data.workExperience.map((exp, index) => (
        <div key={exp.id} className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-medium">Experience #{index + 1}</h5>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeWorkExperience(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                placeholder="Tech Corp Inc."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Position *</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location *</Label>
            <Input
              value={exp.location}
              onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    console.log('Start Date button clicked for:', exp.id); // Debug log
                    setShowStartDatePicker(showStartDatePicker === exp.id ? null : exp.id);
                  }}
                  className="w-full justify-start text-left font-normal h-12 px-4 border-2 hover:border-primary transition-all duration-200"
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(exp.startDate)}
                </Button>
                
                {showStartDatePicker === exp.id && (
                  <div className="absolute top-full left-0 z-50 mt-2" ref={startDatePickerRef}>
                    <MonthYearPicker
                      value={parseDateString(exp.startDate)}
                      onChange={(value) => {
                        console.log('Start Date MonthYearPicker onChange:', value); // Debug log
                        handleDateChange(exp.id, 'startDate', value);
                      }}
                      isEndDate={false}
                      className="w-80 shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
            
                        <div className="space-y-2">
              <Label>End Date</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    console.log('End Date button clicked for:', exp.id); // Debug log
                    console.log('Current state:', { current: exp.current, endDate: exp.endDate }); // Debug log
                    setShowEndDatePicker(showEndDatePicker === exp.id ? null : exp.id);
                  }}
                  className={`w-full justify-start text-left font-normal h-12 px-4 border-2 transition-all duration-200 hover:border-primary`}
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(exp.endDate)}
                </Button>
                
                {showEndDatePicker === exp.id && (
                                    <div className="absolute top-full left-0 z-50 mt-2" ref={endDatePickerRef}>
                    <MonthYearPicker
                      value={exp.current ? "Present" : (exp.endDate ? parseDateString(exp.endDate) : undefined)}
                      onChange={(value) => {
                        console.log('End Date MonthYearPicker onChange:', value); // Debug log
                        handleDateChange(exp.id, 'endDate', value);
                      }}
                      isEndDate={true}
                      className="w-80 shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Key Responsibilities *</Label>
            <Textarea
              value={exp.responsibilities.join('\n')}
              onChange={(e) => updateResponsibilities(exp.id, e.target.value)}
              placeholder="Developed and maintained web applications&#10;Collaborated with cross-functional teams&#10;Implemented automated testing procedures"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">Each line will be a separate bullet point</p>
          </div>

          <div className="space-y-2">
            <Label>Key Achievements (Optional)</Label>
            <Textarea
              value={(exp.achievements || []).join('\n')}
              onChange={(e) => updateAchievements(exp.id, e.target.value)}
              placeholder="Increased application performance by 40%&#10;Led team of 5 junior developers&#10;Reduced deployment time by 60%"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Include quantifiable achievements when possible</p>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use action verbs to start each responsibility</li>
          <li>• Include specific achievements with numbers</li>
          <li>• Focus on impact and results, not just duties</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkExperienceForm;