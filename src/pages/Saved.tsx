import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCareer } from '../contexts/CareerContext';
import { COMPLETE_CAREER_ROLES } from '../utils/constants';

export const Saved: React.FC = () => {
  const { savedCareers, removeSavedCareer, updateSavedCareer } = useCareer();

  const getCareerDetails = (roleId: string) => {
    return COMPLETE_CAREER_ROLES.find((c) => c.id === roleId);
  };

  const getProgress = (savedCareer: typeof savedCareers[0]) => {
    const career = getCareerDetails(savedCareer.roleId);
    if (!career) return { completed: 0, total: 0, percentage: 0 };
    const roadmap = career.roadmaps[savedCareer.selectedPath];
    const total = roadmap.length;
    const completed = savedCareer.completedSteps.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  if (savedCareers.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12">
        <Container>
      <div className="text-center py-16">
        <div className="mx-auto mb-4 text-gray-400 text-6xl">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No saved careers yet</h2>
            <p className="text-gray-600 mb-8">
              Save careers from the results page to track your progress
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/results">
                <Button>Browse Careers</Button>
              </Link>
              <Link to="/assessment">
                <Button variant="outline">Start Assessment</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">
      <Container maxWidth="2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Career Plans</h1>
          <p className="text-gray-600">
            Track your progress on {savedCareers.length} saved career{savedCareers.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedCareers.map((savedCareer) => {
            const career = getCareerDetails(savedCareer.roleId);
            if (!career) return null;

            const progress = getProgress(savedCareer);

            return (
              <Card key={savedCareer.roleId} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{savedCareer.roleName}</h3>
                    <Badge variant="info" size="sm">{savedCareer.domain}</Badge>
                  </div>
                  <button
                    onClick={() => removeSavedCareer(savedCareer.roleId)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Remove saved career"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Selected Path:</span>
                    <Badge variant="info" size="sm">
                      {savedCareer.selectedPath.charAt(0).toUpperCase() + savedCareer.selectedPath.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-medium text-gray-900">
                      {progress.completed}/{progress.total} steps
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link to={`/role/${savedCareer.roleId}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      View Details →
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
