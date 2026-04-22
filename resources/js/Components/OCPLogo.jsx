import React from 'react';

const OCPLogo = ({ className = "w-40", collapsed = false }) => {
    if (collapsed) {
        return (
            <div className={`flex items-center justify-center bg-ocp-green rounded-lg w-10 h-10 ${className}`}>
                <span className="text-white font-display font-black text-xs">OCP</span>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <svg viewBox="0 0 200 180" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified wheat/circle elements */}
                <path d="M40 100C40 60 60 40 100 40M160 100C160 60 140 40 100 40" stroke="#006B3F" strokeWidth="8" strokeLinecap="round"/>
                <path d="M30 110C30 150 60 170 100 170M170 110C170 150 140 170 100 170" stroke="#006B3F" strokeWidth="8" strokeLinecap="round" opacity="0.5"/>
                
                {/* Central Star */}
                <path d="M100 50L115 85H150L122 105L132 140L100 120L68 140L78 105L50 85H85L100 50Z" fill="#006B3F"/>
                
                {/* OCP Text in SVG */}
                <text x="100" y="165" textAnchor="middle" fill="#006B3F" style={{ font: 'bold 35px DM Sans' }}>OCP</text>
            </svg>
        </div>
    );
};

export default OCPLogo;
