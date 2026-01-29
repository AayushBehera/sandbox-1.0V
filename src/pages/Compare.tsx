import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { ComparisonTable } from '../components/features/ComparisonTable';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { AnimatedCard } from '../components/common/AnimatedCard';
import { GradientText } from '../components/common/GradientText';
import { useCareer } from '../contexts/CareerContext';

export const Compare: React.FC = () => {
  const navigate = useNavigate();
  const { compareCareers, removeFromCompare, clearCompare } = useCareer();
  const [primaryCareerId, setPrimaryCareerId] = React.useState<string | undefined>();

  if (compareCareers.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedCard hover className="text-center py-16 bg-white/90 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <GradientText gradient="from-primary-600 to-secondary-500">
                  No careers to compare
                </GradientText>
              </h2>
              <p className="text-gray-600 mb-8">
                Add careers from the results page to compare them side-by-side
              </p>
              <div className="flex gap-4 justify-center">
                <AnimatedButton onClick={() => navigate('/results')}>
                  + Browse Careers
                </AnimatedButton>
                <AnimatedButton variant="outline" onClick={() => navigate('/assessment')}>
                  Start Assessment
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">
      <Container maxWidth="2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <GradientText gradient="from-primary-600 to-secondary-500">
                Compare Careers
              </GradientText>
            </h1>
            <p className="text-gray-600">
              Compare up to 4 careers side-by-side to make an informed decision
            </p>
          </div>
          <div className="flex gap-2">
            <AnimatedButton variant="outline" onClick={() => navigate('/results')}>
              ← Back to Results
            </AnimatedButton>
            {compareCareers.length > 0 && (
              <AnimatedButton variant="ghost" onClick={clearCompare}>
                Clear All
              </AnimatedButton>
            )}
          </div>
        </motion.div>

        <ComparisonTable
          careers={compareCareers}
          onSetPrimary={setPrimaryCareerId}
          primaryCareerId={primaryCareerId}
        />

        {compareCareers.length < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatedCard hover className="mt-6 text-center bg-white/90 backdrop-blur-sm">
              <p className="text-gray-600 mb-4">
                Add more careers to compare (currently {compareCareers.length}/4)
              </p>
              <AnimatedButton variant="outline" onClick={() => navigate('/results')}>
                + Add More Careers
              </AnimatedButton>
            </AnimatedCard>
          </motion.div>
        )}
      </Container>
    </div>
  );
};
