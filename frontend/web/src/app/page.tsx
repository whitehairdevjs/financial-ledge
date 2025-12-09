"use client";

import CalendarView from "@/components/CalendarView";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">가계부</h1>
        </div>

        {/* 달력 뷰 */}
        <CalendarView />
      </div>
    </div>
  );
}

