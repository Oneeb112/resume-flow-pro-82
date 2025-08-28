import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Switch } from "./switch";
import { Label } from "./label";

interface MonthYearPickerProps {
  value?: { month: number; year: number } | "Present";
  onChange?: (value: { month: number; year: number } | "Present") => void;
  isEndDate?: boolean;
  className?: string;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
  isEndDate = false,
  className = ""
}) => {
  const [currentYear, setCurrentYear] = useState(
    typeof value === 'object' ? value.year : new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    typeof value === 'object' ? value.month : new Date().getMonth()
  );
  const [isPresent, setIsPresent] = useState(value === "Present");

  // Sync internal state with external value
  useEffect(() => {
    if (typeof value === 'object') {
      setCurrentYear(value.year);
      setSelectedMonth(value.month);
      setIsPresent(false);
    } else if (value === "Present") {
      setIsPresent(true);
    }
  }, [value]);

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const currentDate = new Date();
  const currentYearNum = currentDate.getFullYear();
  const currentMonthNum = currentDate.getMonth();

  const handleYearChange = (direction: 'prev' | 'next') => {
    const newYear = direction === 'prev' ? currentYear - 1 : currentYear + 1;
    setCurrentYear(newYear);
    
    // If switching to current year and selected month is in the future, reset to current month
    if (newYear === currentYearNum && selectedMonth > currentMonthNum) {
      setSelectedMonth(currentMonthNum);
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (isMonthDisabled(monthIndex)) return;
    
    setSelectedMonth(monthIndex);
    if (onChange) {
      onChange({ month: monthIndex, year: currentYear });
    }
  };

  const handlePresentToggle = (checked: boolean) => {
    setIsPresent(checked);
    if (onChange) {
      onChange(checked ? "Present" : { month: selectedMonth, year: currentYear });
    }
  };

  const isMonthDisabled = (monthIndex: number) => {
    // Disable future months if it's the current year
    if (currentYear === currentYearNum && monthIndex > currentMonthNum) {
      return true;
    }
    return false;
  };

  const isCurrentMonth = (monthIndex: number) => {
    return monthIndex === currentMonthNum && currentYear === currentYearNum;
  };

  const isSelectedMonth = (monthIndex: number) => {
    if (isPresent) return false;
    return monthIndex === selectedMonth && currentYear === (typeof value === 'object' ? value.year : currentYear);
  };

  const getDisplayValue = () => {
    if (isPresent) return "Present";
    if (typeof value === 'object') {
      return `${months[value.month]} ${value.year}`;
    }
    return `${months[selectedMonth]} ${currentYear}`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 ${className}`}>
      {/* Present Toggle for End Date */}
      {isEndDate && (
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <Label htmlFor="present-toggle" className="text-sm font-medium text-gray-700">
            Currently working here
          </Label>
          <Switch
            id="present-toggle"
            checked={isPresent}
            onCheckedChange={handlePresentToggle}
          />
        </div>
      )}

      {/* Year Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          onClick={() => handleYearChange('prev')} 
          variant="ghost" 
          size="sm"
          className="h-10 w-10 p-0 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <motion.h2 
          key={currentYear} 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-gray-900"
        >
          {currentYear}
        </motion.h2>
        
        <Button 
          onClick={() => handleYearChange('next')} 
          variant="ghost" 
          size="sm"
          className="h-10 w-10 p-0 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Months Grid - 3x4 Layout */}
      <div className="grid grid-cols-3 gap-3">
        {months.map((month, index) => {
          const disabled = isMonthDisabled(index);
          const isCurrent = isCurrentMonth(index);
          const isSelected = isSelectedMonth(index);
          
          return (
            <motion.button
              key={month}
              onClick={() => handleMonthSelect(index)}
              disabled={disabled}
              className={`
                relative p-4 rounded-xl font-medium text-sm transition-all duration-200 text-center
                ${disabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isSelected
                  ? 'bg-blue-600 text-white shadow-lg scale-105 border-2 border-blue-700'
                  : isCurrent
                  ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100'
                  : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100 hover:border-gray-300 hover:scale-105'
                }
              `}
              whileHover={disabled ? {} : { scale: 1.02 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
            >
              {month}
              
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Current Selection Display */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Selected</p>
          <p className="text-lg font-semibold text-gray-900">
            {getDisplayValue()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthYearPicker;
