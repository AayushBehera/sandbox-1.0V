import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { AnimatedCard } from '../components/common/AnimatedCard';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { SkillMatrix } from '../components/features/SkillMatrix';
import { GradientText } from '../components/common/GradientText';
import { useCareer } from '../contexts/CareerContext';
import { UserProfile, Skill, Preference } from '../types';
import { PRIORITY_OPTIONS, TIME_HORIZONS, ALL_SKILLS } from '../utils/constants';

type Step = 1 | 2 | 3 | 4;

export const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, updateSkills, updatePreferences, setResults } = useCareer();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    status: 'college_student',
    degree: '',
    fieldOfStudy: '',
    location: '',
    workStyle: 'hybrid',
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [preferences, setPreferences] = useState<Partial<Preference>>({
    priorities: [],
    timeHorizon: '1-3yrs',
    riskTolerance: 'medium',
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!profile.status || !profile.degree || !profile.fieldOfStudy || !profile.location) {
      alert('Please complete all profile fields');
      return;
    }

    if (!preferences.priorities || preferences.priorities.length === 0) {
      alert('Please select at least one priority');
      return;
    }

    const fullProfile: UserProfile = {
      status: profile.status as UserProfile['status'],
      degree: profile.degree,
      fieldOfStudy: profile.fieldOfStudy,
      location: profile.location,
      workStyle: profile.workStyle as UserProfile['workStyle'],
    };

    const fullPreferences: Preference = {
      priorities: preferences.priorities,
      timeHorizon: preferences.timeHorizon || '1-3yrs',
      riskTolerance: preferences.riskTolerance as Preference['riskTolerance'],
    };

    updateProfile(fullProfile);
    updateSkills(skills);
    updatePreferences(fullPreferences);

    setIsAnalyzing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Import matchCareers here to avoid circular dependency
    const { matchCareers } = await import('../utils/careerMatcher');
    const matchedCareers = matchCareers(fullProfile, skills, fullPreferences);

    setResults(matchedCareers);
    setIsAnalyzing(false);

    if (matchedCareers.length > 0) {
      navigate('/results');
    }
  };

  const progress = ((currentStep - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full blur-3xl"></div>
      </div>

      <Container maxWidth="2xl" className="relative z-10">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 4
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full shadow-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <AnimatedCard hover={false} className="backdrop-blur-sm bg-white/90">
          <AnimatePresence mode="wait">
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    <GradientText gradient="from-primary-600 to-secondary-500">
                      Tell us about yourself
                    </GradientText>
                  </h2>
                  <p className="text-gray-600">Help us understand your background and preferences</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current Status
                    </label>
                    <select
                      value={profile.status}
                      onChange={(e) => setProfile({ ...profile, status: e.target.value as UserProfile['status'] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="school_student">School Student</option>
                      <option value="college_student">College Student</option>
                      <option value="graduate">Recent Graduate</option>
                      <option value="working_professional">Working Professional</option>
                      <option value="career_switcher">Career Switcher</option>
                    </select>
                  </div>

                  <Input
                    label="Degree"
                    value={profile.degree || ''}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                    placeholder="e.g., Bachelor of Science"
                  />

                  <Input
                    label="Field of Study"
                    value={profile.fieldOfStudy || ''}
                    onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value })}
                    placeholder="e.g., Computer Science, Psychology, Business"
                  />

                  <Input
                    label="Location"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="e.g., San Francisco, CA"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Work Style Preference
                    </label>
                    <select
                      value={profile.workStyle}
                      onChange={(e) => setProfile({ ...profile, workStyle: e.target.value as UserProfile['workStyle'] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-site</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Skills Matrix */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    <GradientText gradient="from-primary-600 to-secondary-500">
                      Rate your skills
                    </GradientText>
                  </h2>
                  <p className="text-gray-600">Tell us about your skills across all domains</p>
                </div>
                <SkillMatrix skills={skills} onSkillsChange={setSkills} />
              </motion.div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    <GradientText gradient="from-primary-600 to-secondary-500">
                      What matters to you?
                    </GradientText>
                  </h2>
                  <p className="text-gray-600">Select your priorities and preferences</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Priorities (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {PRIORITY_OPTIONS.map((priority, idx) => (
                      <motion.button
                        key={priority}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const current = preferences.priorities || [];
                          if (current.includes(priority)) {
                            setPreferences({
                              ...preferences,
                              priorities: current.filter((p) => p !== priority),
                            });
                          } else {
                            setPreferences({
                              ...preferences,
                              priorities: [...current, priority],
                            });
                          }
                        }}
                        className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${preferences.priorities?.includes(priority)
                          ? 'border-primary-600 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow'
                          : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-primary-50'
                          }`}
                      >
                        {priority}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Time Horizon
                  </label>
                  <select
                    value={preferences.timeHorizon}
                    onChange={(e) => setPreferences({ ...preferences, timeHorizon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {TIME_HORIZONS.map((horizon) => (
                      <option key={horizon} value={horizon}>
                        {horizon}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Risk Tolerance
                  </label>
                  <select
                    value={preferences.riskTolerance}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        riskTolerance: e.target.value as Preference['riskTolerance'],
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Low - Prefer stable, established paths</option>
                    <option value="medium">Medium - Balanced approach</option>
                    <option value="high">High - Willing to take risks for high growth</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    <GradientText gradient="from-primary-600 to-secondary-500">
                      Review & Analyze
                    </GradientText>
                  </h2>
                  <p className="text-gray-600">Review your information and get your personalized career matches</p>
                </div>

                <div className="space-y-4">
                  <Card className="bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Status:</strong> {profile.status?.replace('_', ' ')}</p>
                      <p><strong>Degree:</strong> {profile.degree}</p>
                      <p><strong>Field:</strong> {profile.fieldOfStudy}</p>
                      <p><strong>Location:</strong> {profile.location}</p>
                      <p><strong>Work Style:</strong> {profile.workStyle}</p>
                    </div>
                  </Card>

                  <Card className="bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                    <p className="text-sm text-gray-600">
                      {skills.length} skills rated across {new Set(skills.map((s) => s.category)).size} domains
                    </p>
                  </Card>

                  <Card className="bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Preferences</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Priorities:</strong> {preferences.priorities?.join(', ')}</p>
                      <p><strong>Time Horizon:</strong> {preferences.timeHorizon}</p>
                      <p><strong>Risk Tolerance:</strong> {preferences.riskTolerance}</p>
                    </div>
                  </Card>
                </div>

                {isAnalyzing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-primary-200 border-t-primary-600"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg font-medium text-gray-700"
                    >
                      Analyzing your profile across 500+ career paths...
                    </motion.p>
                  </motion.div>
                ) : (
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    className="w-full shadow-glow"
                  >
                    Analyze My Career Path →
                  </AnimatedButton>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between mt-8 pt-6 border-t border-gray-200"
            >
              <AnimatedButton
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                ← Back
              </AnimatedButton>
              <AnimatedButton variant="primary" onClick={handleNext} className="shadow-glow">
                Next →
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatedCard>
      </Container>
    </div>
  );
};
