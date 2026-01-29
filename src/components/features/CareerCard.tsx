import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CareerRole } from '../../types';
import { FloatingCard } from '../3d/FloatingCard';
import { Badge } from '../common/Badge';
import { CircularProgress } from '../common/CircularProgress';

export interface CareerCardProps {
  career: CareerRole;
  onSave?: (careerId: string) => void;
  onCompare?: (careerId: string) => void;
  isSaved?: boolean;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  career,
  onSave,
  onCompare,
  isSaved = false,
}) => {
  return (
    <FloatingCard intensity={10} className="h-full">
      <div className="glass h-full p-8 rounded-[2.5rem] flex flex-col border border-white/40 shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 card-3d group">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1 pr-4">
              <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-2 block">
                {career.domain}
              </span>
              <h3 className="text-2xl font-bold text-neutral-950 tracking-tight leading-none mb-4 group-hover:text-primary-500 transition-colors">
                {career.name}
              </h3>
            </div>
            <div className="relative">
              <CircularProgress value={career.fitScore} size={64} strokeWidth={6} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-500">FIT</span>
              </div>
            </div>
          </div>

          <p className="text-neutral-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
            {career.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="success" size="sm">
              {career.growthPotential} Growth
            </Badge>
            <Badge variant="info" size="sm">
              {career.salaryBand}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-neutral-100 flex items-center gap-4">
          <Link to={`/role/${career.id}`} className="flex-1">
            <button className="w-full py-4 bg-primary-950 text-white rounded-2xl font-bold tracking-widest text-[10px] uppercase hover:bg-black transition-all hover:scale-[1.02] shadow-soft">
              View Roadmap
            </button>
          </Link>

          <div className="flex gap-2">
            {onCompare && (
              <button
                onClick={() => onCompare(career.id)}
                className="w-12 h-12 flex items-center justify-center glass rounded-2xl border border-neutral-200 hover:border-primary-500 transition-colors"
                title="Compare"
              >
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            )}

            {onSave && (
              <button
                onClick={() => onSave(career.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${isSaved ? 'bg-primary-50 text-primary-600' : 'glass border border-neutral-200 hover:border-primary-500 text-neutral-400'
                  }`}
                title="Save"
              >
                {isSaved ? '✓' : '☆'}
              </button>
            )}
          </div>
        </div>
      </div>
    </FloatingCard>
  );
};
