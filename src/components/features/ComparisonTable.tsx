import React from 'react';
import { CareerRole } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { getConfidenceColor, getGrowthColor, getEducationIntensityColor } from '../../utils/helpers';

export interface ComparisonTableProps {
  careers: CareerRole[];
  onSetPrimary?: (careerId: string) => void;
  primaryCareerId?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  careers,
  onSetPrimary,
  primaryCareerId,
}) => {
  if (careers.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-500 py-8">No careers selected for comparison</p>
      </Card>
    );
  }

  const comparisonRows = [
    {
      label: 'Fit Score',
      getValue: (career: CareerRole) => career.fitScore,
      render: (career: CareerRole) => (
        <span className="text-2xl font-bold text-primary-600">{career.fitScore}</span>
      ),
    },
    {
      label: 'Confidence',
      getValue: (career: CareerRole) => career.confidence,
      render: (career: CareerRole) => (
        <Badge className={getConfidenceColor(career.confidence)}>
          {career.confidence.charAt(0).toUpperCase() + career.confidence.slice(1)}
        </Badge>
      ),
    },
    {
      label: 'Growth Potential',
      getValue: (career: CareerRole) => career.growthPotential,
      render: (career: CareerRole) => (
        <Badge className={getGrowthColor(career.growthPotential)}>
          {career.growthPotential.charAt(0).toUpperCase() + career.growthPotential.slice(1)}
        </Badge>
      ),
    },
    {
      label: 'Salary Band',
      getValue: (career: CareerRole) => career.salaryBand,
      render: (career: CareerRole) => (
        <span>${career.salaryBand}</span>
      ),
    },
    {
      label: 'Education Intensity',
      getValue: (career: CareerRole) => career.educationIntensity,
      render: (career: CareerRole) => (
        <Badge className={getEducationIntensityColor(career.educationIntensity)}>
          {career.educationIntensity.charAt(0).toUpperCase() + career.educationIntensity.slice(1)}
        </Badge>
      ),
    },
    {
      label: 'Time to Transition',
      getValue: (career: CareerRole) => {
        const fastPath = career.roadmaps.fast;
        const totalDuration = fastPath.reduce((acc, step) => {
          const months = step.duration.match(/(\d+)/)?.[1];
          return acc + (months ? parseInt(months) : 0);
        }, 0);
        return `${Math.ceil(totalDuration / 12)} years`;
      },
      render: (career: CareerRole) => {
        const fastPath = career.roadmaps.fast;
        const totalDuration = fastPath.reduce((acc, step) => {
          const months = step.duration.match(/(\d+)/)?.[1];
          return acc + (months ? parseInt(months) : 0);
        }, 0);
        return (
          <span>~{Math.ceil(totalDuration / 12)} years (fast path)</span>
        );
      },
    },
    {
      label: 'Risk Level',
      getValue: (career: CareerRole) => {
        if (career.educationIntensity === 'high' && career.growthPotential === 'low') return 'High';
        if (career.educationIntensity === 'low' && career.growthPotential === 'high') return 'Low';
        return 'Medium';
      },
      render: (career: CareerRole) => {
        const risk = career.educationIntensity === 'high' && career.growthPotential === 'low' 
          ? 'High' 
          : career.educationIntensity === 'low' && career.growthPotential === 'high'
          ? 'Low'
          : 'Medium';
        const color = risk === 'High' ? 'danger' : risk === 'Low' ? 'success' : 'warning';
        return <Badge variant={color}>{risk}</Badge>;
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Card className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900">Criteria</th>
              {careers.map((career) => (
                <th key={career.id} className="text-center p-4 font-semibold text-gray-900 min-w-[200px]">
                  <div>
                    <div className="font-bold text-lg mb-1">{career.name}</div>
                    <Badge variant="info" size="sm">{career.domain}</Badge>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 font-medium text-gray-700">{row.label}</td>
                {careers.map((career) => (
                  <td key={career.id} className="p-4 text-center">
                    {row.render(career)}
                  </td>
                ))}
              </tr>
            ))}
            {onSetPrimary && (
              <tr className="border-t-2 border-gray-300">
                <td className="p-4 font-medium text-gray-700">Actions</td>
                {careers.map((career) => (
                  <td key={career.id} className="p-4 text-center">
                    <Button
                      variant={primaryCareerId === career.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => onSetPrimary(career.id)}
                    >
                      {primaryCareerId === career.id ? '✓ Primary Goal' : 'Set as Primary'}
                    </Button>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
