import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, WorkExperience } from "@/types/resume";

interface WorkExperienceFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const WorkExperienceForm = ({ data, onChange }: WorkExperienceFormProps) => {
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
    onChange({
      ...data,
      workExperience: data.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
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
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current}
              onCheckedChange={(checked) => {
                updateWorkExperience(exp.id, 'current', Boolean(checked));
                if (checked) {
                  updateWorkExperience(exp.id, 'endDate', '');
                }
              }}
            />
            <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
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