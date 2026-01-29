import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { CareerCard } from '../components/features/CareerCard';
import { Input } from '../components/common/Input';
import { Slider } from '../components/common/Slider';
import { useCareer } from '../contexts/CareerContext';
import { CareerRole } from '../types';
import { filterByDomain, filterByMinScore, sortCareers } from '../utils/careerMatcher';
import { SKILL_CATEGORIES } from '../utils/constants';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { results, saveCareer, addToCompare } = useCareer();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState<'fit' | 'salary' | 'growth' | 'time-to-transition'>('fit');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (career) =>
          career.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          career.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          career.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Domain filter
    if (selectedDomains.length > 0) {
      filtered = filterByDomain(filtered, selectedDomains);
    }

    // Min score filter
    filtered = filterByMinScore(filtered, minScore);

    // Sort
    filtered = sortCareers(filtered, sortBy);

    return filtered;
  }, [results, searchQuery, selectedDomains, minScore, sortBy]);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No results yet</h2>
            <p className="text-gray-600 mb-8">
              Complete the assessment to see your personalized career matches
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12">
      <Container maxWidth="2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Matches</h1>
          <p className="text-gray-600">
            Found {filteredAndSortedResults.length} career{filteredAndSortedResults.length !== 1 ? 's' : ''} matching your profile
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-600"
                >
                  ☰
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <Input
                    placeholder="Search careers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Domain Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain
                  </label>
                  <div className="space-y-2">
                    {SKILL_CATEGORIES.map((category) => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDomains.includes(category.label)}
                          onChange={() => toggleDomain(category.label)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Min Score Filter */}
                <div>
                  <Slider
                    label="Minimum Fit Score"
                    value={minScore}
                    onChange={setMinScore}
                    min={0}
                    max={100}
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="fit">Fit Score</option>
                    <option value="salary">Salary</option>
                    <option value="growth">Growth Potential</option>
                    <option value="time-to-transition">Time to Transition</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(selectedDomains.length > 0 || minScore > 0 || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedDomains([]);
                      setMinScore(0);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredAndSortedResults.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                <p className="text-gray-600">No careers match your current filters</p>
                <button
                  onClick={() => {
                    setSelectedDomains([]);
                    setMinScore(0);
                    setSearchQuery('');
                  }}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedResults.map((career) => (
                  <CareerCard
                    key={career.id}
                    career={career}
                    onSave={(id) => {
                      const careerToSave = filteredAndSortedResults.find((c) => c.id === id);
                      if (careerToSave) {
                        saveCareer(careerToSave, 'fast');
                      }
                    }}
                    onCompare={(id) => {
                      const careerToCompare = filteredAndSortedResults.find((c) => c.id === id);
                      if (careerToCompare) {
                        addToCompare(careerToCompare);
                        navigate('/compare');
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
