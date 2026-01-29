import React, { useState } from 'react';
import { Skill, SkillCategory } from '../../types';
import { ALL_SKILLS, SKILL_CATEGORIES } from '../../utils/constants';
import { Slider } from '../common/Slider';
import { Card } from '../common/Card';
import { classNames } from '../../utils/helpers';

export interface SkillMatrixProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({
  skills,
  onSkillsChange,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<SkillCategory>>(
    new Set(['tech', 'business'])
  );

  const toggleCategory = (category: SkillCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const updateSkill = (skillId: string, updates: Partial<Skill>) => {
    const skillIndex = skills.findIndex(s => s.id === skillId);
    const baseSkill = ALL_SKILLS.find(s => s.id === skillId);
    
    if (!baseSkill) return;

    if (skillIndex >= 0) {
      const updated = [...skills];
      updated[skillIndex] = { ...updated[skillIndex], ...updates };
      onSkillsChange(updated);
    } else {
      const newSkill: Skill = {
        ...baseSkill,
        confidence: 50,
        interest: 'curious',
        ...updates,
      };
      onSkillsChange([...skills, newSkill]);
    }
  };

  const removeSkill = (skillId: string) => {
    onSkillsChange(skills.filter(s => s.id !== skillId));
  };

  const getSkill = (skillId: string): Skill | undefined => {
    return skills.find(s => s.id === skillId);
  };

  const getInterestIcon = (interest: 'love' | 'curious' | 'not_interested') => {
    switch (interest) {
      case 'love':
        return <span className="text-red-500">♥</span>;
      case 'curious':
        return <span className="text-yellow-500">?</span>;
      default:
        return <span className="text-gray-400">✕</span>;
    }
  };

  return (
    <div className="space-y-4">
      {SKILL_CATEGORIES.map((category) => {
        const categorySkills = ALL_SKILLS.filter(s => s.category === category.value);
        const isExpanded = expandedCategories.has(category.value);
        const categorySkillsWithData = categorySkills.map(skill => ({
          skill,
          data: getSkill(skill.id),
        }));

        return (
          <Card key={category.value} className="overflow-hidden">
            <button
              onClick={() => toggleCategory(category.value)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                {categorySkillsWithData.map(({ skill, data }) => {
                  const hasData = !!data;
                  const skillData = data || {
                    ...skill,
                    confidence: 0,
                    interest: 'not_interested' as const,
                  };

                  return (
                    <div
                      key={skill.id}
                      className={classNames(
                        'p-4 rounded-lg border transition-all',
                        hasData
                          ? 'border-primary-200 bg-primary-50'
                          : 'border-gray-200 bg-gray-50'
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <button
                            onClick={() => {
                              if (hasData) {
                                removeSkill(skill.id);
                              } else {
                                updateSkill(skill.id, { confidence: 50, interest: 'curious' });
                              }
                            }}
                            className="ml-2"
                          >
                            {hasData ? (
                              <span className="text-xs text-primary-600 font-medium">Remove</span>
                            ) : (
                              <span className="text-xs text-gray-500">Add</span>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          {getInterestIcon(skillData.interest)}
                          <select
                            value={skillData.interest}
                            onChange={(e) =>
                              updateSkill(skill.id, {
                                interest: e.target.value as 'love' | 'curious' | 'not_interested',
                              })
                            }
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                            disabled={!hasData}
                          >
                            <option value="not_interested">Not Interested</option>
                            <option value="curious">Curious</option>
                            <option value="love">Love</option>
                          </select>
                        </div>
                      </div>
                      {hasData && (
                        <Slider
                          value={skillData.confidence}
                          onChange={(value) => updateSkill(skill.id, { confidence: value })}
                          min={0}
                          max={100}
                          label="Confidence Level"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
