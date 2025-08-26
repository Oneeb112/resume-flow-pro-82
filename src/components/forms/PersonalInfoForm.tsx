import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/types/resume";

interface PersonalInfoFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={data.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={data.personalInfo.linkedIn || ''}
            onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            value={data.personalInfo.portfolio || ''}
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
            placeholder="johndoe.dev"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Include your LinkedIn profile for networking</li>
          <li>• Make sure your phone number is current</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoForm;