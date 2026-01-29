import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { AnimatedCard } from '../components/common/AnimatedCard';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { CircularProgress } from '../components/common/CircularProgress';
import { GradientText } from '../components/common/GradientText';
import { Badge } from '../components/common/Badge';
import { RoadmapView } from '../components/features/RoadmapView';
import { useCareer } from '../contexts/CareerContext';
import { COMPLETE_CAREER_ROLES } from '../utils/constants';
import { getConfidenceColor, getGrowthColor, getEducationIntensityColor } from '../utils/helpers';

export const RoleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { saveCareer, updateSavedCareer, savedCareers } = useCareer();

  const career = COMPLETE_CAREER_ROLES.find((c) => c.id === id);
  const [selectedPath, setSelectedPath] = useState<'fast' | 'budget' | 'safe'>('fast');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const savedCareer = savedCareers.find((sc) => sc.roleId === id);

  React.useEffect(() => {
    if (savedCareer) {
      setSelectedPath(savedCareer.selectedPath);
      setCompletedSteps(savedCareer.completedSteps);
    }
  }, [savedCareer]);

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Career not found</h2>
            <AnimatedButton onClick={() => navigate('/results')}>Back to Results</AnimatedButton>
          </div>
        </Container>
      </div>
    );
  }

  const handleStepToggle = (stepId: string) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];

    setCompletedSteps(newCompleted);

    if (savedCareer) {
      updateSavedCareer(id!, { completedSteps: newCompleted });
    }
  };

  const handleSave = () => {
    saveCareer(career, selectedPath);
  };

  const roadmap = career.roadmaps[selectedPath];
  const progress = roadmap.length > 0 ? (completedSteps.length / roadmap.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">
      <Container maxWidth="2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AnimatedButton
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            ← Back
          </AnimatedButton>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatedCard hover className="mb-8 bg-white/90 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h1 className="text-3xl font-bold text-gray-900">
                    <GradientText gradient="from-primary-600 to-secondary-500">
                      {career.name}
                    </GradientText>
                  </h1>
                  <Badge variant="info" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0">
                    {career.domain}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getConfidenceColor(career.confidence)}>
                    {career.confidence.charAt(0).toUpperCase() + career.confidence.slice(1)} Confidence
                  </Badge>
                  <Badge className={getGrowthColor(career.growthPotential)}>
                    {career.growthPotential.charAt(0).toUpperCase() + career.growthPotential.slice(1)} Growth
                  </Badge>
                  <Badge variant="info">
                    {career.salaryBand}
                  </Badge>
                  <Badge className={getEducationIntensityColor(career.educationIntensity)}>
                    {career.educationIntensity.charAt(0).toUpperCase() + career.educationIntensity.slice(1)} Education
                  </Badge>
                </div>
              </div>
              <AnimatedButton variant="outline" onClick={handleSave}>
                {savedCareer ? '✓ Saved' : '☆ Save Career'}
              </AnimatedButton>
            </div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100"
              >
                <div className="text-3xl font-bold text-primary-600">{career.fitScore}</div>
                <div className="text-sm text-gray-600 mt-1">Fit Score</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100"
              >
                <div className="text-3xl font-bold text-green-600 capitalize">{career.growthPotential}</div>
                <div className="text-sm text-gray-600 mt-1">Growth</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <div className="text-2xl font-bold text-blue-600">{career.salaryBand}</div>
                <div className="text-sm text-gray-600 mt-1">Salary</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100"
              >
                <div className="text-3xl font-bold text-purple-600 capitalize">{career.educationIntensity}</div>
                <div className="text-sm text-gray-600 mt-1">Education</div>
              </motion.div>
            </motion.div>
          </AnimatedCard>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedCard hover className="mb-8 bg-white/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <GradientText gradient="from-primary-600 to-secondary-500">
                Overview
              </GradientText>
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What the role does</h3>
                <p className="text-gray-600">{career.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Who it suits</h3>
                <p className="text-gray-600">
                  This role is ideal for individuals with strong skills in{' '}
                  {career.requiredSkills.slice(0, 3).join(', ')} and an interest in {career.domain.toLowerCase()}.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Typical work environment</h3>
                <p className="text-gray-600">
                  Common industries: {career.typicalIndustries.join(', ')}
                </p>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedCard hover={false} className="mb-8 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Career Roadmap</h2>
              {savedCareer && (
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">
                    Progress: {completedSteps.length}/{roadmap.length} steps
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Path Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {(['fast', 'budget', 'safe'] as const).map((path) => (
                <motion.button
                  key={path}
                  onClick={() => setSelectedPath(path)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 font-medium transition-all border-b-2 relative ${selectedPath === path
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)} Path
                  {selectedPath === path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <RoadmapView
              steps={roadmap}
              selectedPath={selectedPath}
              completedSteps={completedSteps}
              onStepToggle={savedCareer ? handleStepToggle : undefined}
            />
          </AnimatedCard>
        </motion.div>

        {/* 90-Day Quick Plan */}
        {selectedPath === 'fast' && (
          <AnimatedCard hover={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">90-Day Quick Plan</h2>
            <p className="text-gray-600 mb-4">
              Here are 5 immediate actions you can take to get started:
            </p>
            <div className="space-y-3">
              {roadmap.slice(0, 5).map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                return (
                  <label
                    key={step.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleStepToggle(step.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </AnimatedCard>
        )}
      </Container>
    </div>
  );
};
