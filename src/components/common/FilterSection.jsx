import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = ({ 
    searchQuery, 
    activeDivision, 
    handleDivisionChange, 
    activeDistrict, 
    setActiveDistrict, 
    districtsForDivision, 
    divisions,
    loading,
    filteredCount
}) => {
    return (
        <motion.div
            className="filter-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            layout
        >
            <h2 className="section-title">
                {searchQuery
                    ? `Results for "${searchQuery}"`
                    : 'Explore Destinations'}
            </h2>
            <div className="category-filters" role="group" aria-label="Filter by division">
                {divisions.map((div, idx) => (
                    <motion.button
                        key={div.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        id={`filter-${div.label.toLowerCase()}`}
                        className={`filter-btn${activeDivision === div.label ? ' active' : ''}`}
                        onClick={() => handleDivisionChange(div.label)}
                    >
                        <span className="filter-emoji">{div.icon}</span>
                        {div.label}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeDivision !== 'All' && districtsForDivision.length > 0 && (
                    <motion.div 
                        key={activeDivision}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="category-filters district-filters" 
                        style={{ marginTop: '10px', overflow: 'hidden' }} 
                        role="group" 
                        aria-label="Filter by district"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`filter-btn district-btn${activeDistrict === 'All' ? ' active' : ''}`}
                            onClick={() => setActiveDistrict('All')}
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                        >
                            All Districts
                        </motion.button>
                        {districtsForDivision.map(dist => (
                            <motion.button
                                key={dist}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`filter-btn district-btn${activeDistrict === dist ? ' active' : ''}`}
                                onClick={() => setActiveDistrict(dist)}
                                style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                            >
                                {dist}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <motion.p 
                    key={filteredCount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="results-count"
                >
                    {filteredCount === 0
                        ? 'No results found'
                        : `Showing ${filteredCount} destination${filteredCount !== 1 ? 's' : ''}`}
                </motion.p>
            )}
        </motion.div>
    );
};

export default FilterSection;
