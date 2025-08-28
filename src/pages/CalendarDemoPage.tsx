import React, { useState } from "react";
import { motion } from "framer-motion";
import MonthYearPicker from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CalendarDemoPage = () => {
  const [selectedDate, setSelectedDate] = useState<{ month: number; year: number }>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const handleDateChange = (value: { month: number; year: number }) => {
    setSelectedDate(value);
    console.log("Selected date:", value);
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Month/Year Picker Calendar</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Component */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MonthYearPicker
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full"
            />
          </motion.div>

          {/* Demo Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Clean month grid layout (3x4)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Year navigation with arrow buttons</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Current month highlighting</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Selected month indication</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Smooth animations and transitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Responsive design</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Date</h2>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Currently Selected</p>
                <p className="text-2xl font-bold text-blue-900">
                  {months[selectedDate.month]} {selectedDate.year}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Click on months:</strong> Select any month from the grid
                </p>
                <p>
                  <strong>Arrow buttons:</strong> Navigate between years
                </p>
                <p>
                  <strong>Current month:</strong> Highlighted with blue border
                </p>
                <p>
                  <strong>Selected month:</strong> Highlighted with blue background
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDemoPage;
