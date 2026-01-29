import React, { useState } from 'react';
import { RoadmapStep } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { getStepTypeIcon, getStepTypeColor, getEffortColor } from '../../utils/helpers';
import { classNames } from '../../utils/helpers';

export interface RoadmapViewProps {
  steps: RoadmapStep[];
  selectedPath: 'fast' | 'budget' | 'safe';
  completedSteps?: string[];
  onStepToggle?: (stepId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  steps,
  selectedPath,
  completedSteps = [],
  onStepToggle,
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isExpanded = expandedSteps.has(step.id);
        const isCompleted = isStepCompleted(step.id);

        return (
          <div key={step.id} className="relative">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
            )}

            <Card
              className={classNames(
                'relative pl-12',
                isCompleted && 'bg-green-50 border-green-200'
              )}
            >
              {/* Step Number */}
              <div className="absolute left-4 top-6 flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-sm">
                {index + 1}
              </div>

              {/* Step Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                    <Badge className={getStepTypeColor(step.type)} size="sm">
                      {getStepTypeIcon(step.type)} {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      ⏱ {step.duration}
                    </span>
                    <span className={classNames('font-medium', getEffortColor(step.effort))}>
                      {step.effort.charAt(0).toUpperCase() + step.effort.slice(1)} Effort
                    </span>
                  </div>
                </div>
                {onStepToggle && (
                  <button
                    onClick={() => onStepToggle(step.id)}
                    className={classNames(
                      'ml-4 px-3 py-1 rounded-md text-sm font-medium transition-colors',
                      isCompleted
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {isCompleted ? '✓ Completed' : 'Mark Complete'}
                  </button>
                )}
              </div>

              {/* Step Description */}
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>

              {/* Expandable Details */}
              {step.resources && step.resources.length > 0 && (
                <div>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {isExpanded ? (
                      <>▲ Hide Resources</>
                    ) : (
                      <>▼ Show Resources</>
                    )}
                  </button>
                  {isExpanded && (
                    <div className="mt-2 pl-4 border-l-2 border-primary-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Resources:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {step.resources.map((resource, idx) => (
                          <li key={idx}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
};
