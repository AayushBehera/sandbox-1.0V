export interface UserProfile {
  status: 'school_student' | 'college_student' | 'graduate' | 'working_professional' | 'career_switcher';
  degree: string;
  fieldOfStudy: string;
  location: string;
  workStyle: 'remote' | 'hybrid' | 'onsite';
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  confidence: number;
  interest: 'love' | 'curious' | 'not_interested';
}

export type SkillCategory = 
  | 'tech' 
  | 'business' 
  | 'law' 
  | 'health' 
  | 'psychology' 
  | 'arts' 
  | 'design' 
  | 'commerce' 
  | 'stem' 
  | 'vocational';

export interface Preference {
  priorities: string[];
  timeHorizon: string;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface CareerRole {
  id: string;
  name: string;
  domain: string;
  description: string;
  fitScore: number;
  confidence: 'low' | 'medium' | 'high';
  growthPotential: 'low' | 'medium' | 'high';
  salaryBand: string;
  educationIntensity: 'low' | 'medium' | 'high';
  typicalIndustries: string[];
  requiredSkills: string[];
  roadmaps: {
    fast: RoadmapStep[];
    budget: RoadmapStep[];
    safe: RoadmapStep[];
  };
}

export interface RoadmapStep {
  id: string;
  title: string;
  type: 'course' | 'project' | 'internship' | 'certification' | 'networking' | 'exam_prep';
  duration: string;
  effort: 'low' | 'medium' | 'high';
  description: string;
  resources?: string[];
}

export interface SavedCareer {
  roleId: string;
  roleName: string;
  domain: string;
  selectedPath: 'fast' | 'budget' | 'safe';
  completedSteps: string[];
  createdAt: string;
}

export interface AssessmentData {
  profile: UserProfile | null;
  skills: Skill[];
  preferences: Preference | null;
}
