import { UserProfile, Skill, Preference, CareerRole } from '../types';
import { COMPLETE_CAREER_ROLES } from './constants';

/**
 * Core career matching algorithm
 * Matches user profile, skills, and preferences to career roles
 */
export function matchCareers(
  profile: UserProfile | null,
  skills: Skill[],
  preferences: Preference | null
): CareerRole[] {
  if (!profile || !preferences) {
    return [];
  }

  const scoredRoles = COMPLETE_CAREER_ROLES.map(role => {
    let score = 0;
    let confidence = 0;

    // Skill matching (40% weight)
    const roleSkills = role.requiredSkills;
    const userSkillMap = new Map(skills.map(s => [s.id, s]));

    let skillMatchCount = 0;
    let totalSkillConfidence = 0;

    roleSkills.forEach(skillId => {
      const userSkill = userSkillMap.get(skillId);
      if (userSkill) {
        skillMatchCount++;
        totalSkillConfidence += userSkill.confidence;

        // Boost score if user loves this skill
        if (userSkill.interest === 'love') {
          score += 15;
        } else if (userSkill.interest === 'curious') {
          score += 8;
        }
      }
    });

    const skillMatchRatio = roleSkills.length > 0 ? skillMatchCount / roleSkills.length : 0;
    const avgConfidence = skillMatchCount > 0 ? totalSkillConfidence / skillMatchCount : 0;

    score += skillMatchRatio * 40;
    score += (avgConfidence / 100) * 20;
    confidence = avgConfidence;

    // Domain alignment with degree field (20% weight)
    const fieldLower = profile.fieldOfStudy.toLowerCase();
    const domainLower = role.domain.toLowerCase();

    if (fieldLower.includes(domainLower.split(' ')[0]) || domainLower.includes(fieldLower.split(' ')[0])) {
      score += 20;
    }

    // Preference matching (30% weight)
    if (preferences.priorities.includes('High salary')) {
      const salaryNum = parseFloat(role.salaryBand.split(' - ')[0].replace(/[^0-9.]/g, ''));
      if (salaryNum > 100) score += 10;
      else if (salaryNum > 70) score += 7;
      else if (salaryNum > 50) score += 4;
    }

    if (preferences.priorities.includes('Work-life balance')) {
      if (role.educationIntensity === 'low') score += 8;
      else if (role.educationIntensity === 'medium') score += 5;
    }

    if (preferences.priorities.includes('Social impact')) {
      if (role.domain.includes('Health') || role.domain.includes('Psychology') || role.domain.includes('Social')) {
        score += 10;
      }
    }

    if (preferences.priorities.includes('Creativity')) {
      if (role.domain.includes('Design') || role.domain.includes('Arts') || role.domain.includes('Creative')) {
        score += 10;
      }
    }

    if (preferences.priorities.includes('Research')) {
      if (role.domain.includes('Research') || role.domain.includes('STEM')) {
        score += 10;
      }
    }

    if (preferences.priorities.includes('Leadership')) {
      if (role.domain.includes('Business') || role.domain.includes('Management')) {
        score += 10;
      }
    }

    if (preferences.priorities.includes('Remote work')) {
      if (role.domain.includes('Tech') || role.domain.includes('Design')) {
        score += 8;
      }
    }

    // Growth potential boost (10% weight)
    if (role.growthPotential === 'high') score += 10;
    else if (role.growthPotential === 'medium') score += 5;

    // Time horizon alignment
    if (preferences.timeHorizon === '<1yr' && role.educationIntensity === 'low') {
      score += 5;
    } else if (preferences.timeHorizon === '1-3yrs' && role.educationIntensity !== 'high') {
      score += 5;
    } else if (preferences.timeHorizon === '5+yrs' && role.educationIntensity === 'high') {
      score += 5;
    }

    // Risk tolerance alignment
    if (preferences.riskTolerance === 'low' && role.growthPotential === 'high') {
      score += 3;
    } else if (preferences.riskTolerance === 'high' && role.growthPotential === 'high') {
      score += 5;
    }

    // Normalize score to 0-100
    const normalizedScore = Math.min(100, Math.max(0, score));

    return {
      ...role,
      fitScore: Math.round(normalizedScore),
      confidence: (confidence > 70 ? 'high' : confidence > 40 ? 'medium' : 'low') as 'low' | 'medium' | 'high',
    };
  });

  // Sort by fit score (descending)
  return scoredRoles.sort((a, b) => b.fitScore - a.fitScore);
}

/**
 * Filter careers by domain
 */
export function filterByDomain(careers: CareerRole[], domains: string[]): CareerRole[] {
  if (domains.length === 0) return careers;
  return careers.filter(career => domains.includes(career.domain));
}

/**
 * Filter careers by minimum fit score
 */
export function filterByMinScore(careers: CareerRole[], minScore: number): CareerRole[] {
  return careers.filter(career => career.fitScore >= minScore);
}

/**
 * Sort careers by various criteria
 */
export function sortCareers(
  careers: CareerRole[],
  sortBy: 'fit' | 'salary' | 'growth' | 'time-to-transition'
): CareerRole[] {
  const sorted = [...careers];

  switch (sortBy) {
    case 'fit':
      return sorted.sort((a, b) => b.fitScore - a.fitScore);
    case 'salary':
      return sorted.sort((a, b) => {
        const aSalary = parseFloat(a.salaryBand.split(' - ')[0].replace(/[^0-9.]/g, ''));
        const bSalary = parseFloat(b.salaryBand.split(' - ')[0].replace(/[^0-9.]/g, ''));
        return bSalary - aSalary;
      });
    case 'growth':
      const growthOrder = { high: 3, medium: 2, low: 1 };
      return sorted.sort((a, b) => growthOrder[b.growthPotential] - growthOrder[a.growthPotential]);
    case 'time-to-transition':
      const intensityOrder = { low: 1, medium: 2, high: 3 };
      return sorted.sort((a, b) => intensityOrder[a.educationIntensity] - intensityOrder[b.educationIntensity]);
    default:
      return sorted;
  }
}
