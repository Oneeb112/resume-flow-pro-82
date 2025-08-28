import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { ResumeData, Education } from "@/types/resume";
import MonthYearPicker from "@/components/ui/calendar";

interface EducationFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const EducationForm = ({ data, onChange }: EducationFormProps) => {
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

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    };
    
    onChange({
      ...data,
      education: [...data.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: string, value: string | string[]) => {
    onChange({
      ...data,
      education: data.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const updateAchievements = (id: string, achievements: string) => {
    const achievementsList = achievements.split('\n').filter(a => a.trim());
    updateEducation(id, 'achievements', achievementsList);
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
      updateEducation(id, field, "Present");
    } else {
      const month = (value.month + 1).toString().padStart(2, '0');
      const dateString = `${value.year}-${month}`;
      updateEducation(id, field, dateString);
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
        <h4 className="font-medium">Education Details</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No education entries yet. Click "Add Education" to get started.
        </div>
      )}

      {data.education.map((edu, index) => (
        <div key={edu.id} className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-medium">Education #{index + 1}</h5>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="University of California"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Field of Study *</Label>
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label>GPA (Optional)</Label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowStartDatePicker(showStartDatePicker === edu.id ? null : edu.id)}
                  className="w-full justify-start text-left font-normal h-12 px-4 border-2 hover:border-primary transition-all duration-200"
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(edu.startDate)}
                </Button>
                
                {showStartDatePicker === edu.id && (
                  <div className="absolute top-full left-0 z-50 mt-2" ref={startDatePickerRef}>
                    <MonthYearPicker
                      value={parseDateString(edu.startDate)}
                      onChange={(value) => handleDateChange(edu.id, 'startDate', value)}
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
                  onClick={() => setShowEndDatePicker(showEndDatePicker === edu.id ? null : edu.id)}
                  className="w-full justify-start text-left font-normal h-12 px-4 border-2 hover:border-primary transition-all duration-200"
                >
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {formatDateForDisplay(edu.endDate)}
                </Button>
                
                {showEndDatePicker === edu.id && (
                  <div className="absolute top-full left-0 z-50 mt-2" ref={endDatePickerRef}>
                    <MonthYearPicker
                      value={parseDateString(edu.endDate)}
                      onChange={(value) => handleDateChange(edu.id, 'endDate', value)}
                      isEndDate={true}
                      className="w-80 shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Achievements & Activities (Optional)</Label>
            <Textarea
              value={(edu.achievements || []).join('\n')}
              onChange={(e) => updateAchievements(edu.id, e.target.value)}
              placeholder="Dean's List&#10;Graduated Magna Cum Laude&#10;Member of Computer Science Society"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Each line will be a separate bullet point</p>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• List education in reverse chronological order</li>
          <li>• Include relevant coursework if you're a recent graduate</li>
          <li>• Only include GPA if it's above 3.5</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;