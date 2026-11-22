import React from 'react';
import { ShieldCheck, Truck, BarChart3, MapPin, Users, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'audit' | 'dashboard' | 'map' | 'citizen' | 'demo';
  setActiveTab: (tab: 'audit' | 'dashboard' | 'map' | 'citizen' | 'demo') => void;
  isOnline: boolean;
  onResetDemo: () => void;
  onSimulateBreakdown: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isOnline,
  onResetDemo,
  onSimulateBreakdown,
}) => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-gray-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-200 to-emerald-400 bg-clip-text text-transparent">
                  CustodyWaste AI
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Hackathon MVP
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                Post-Pickup Segregation Integrity & Chain of Custody Audit
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500 text-gray-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Municipality Panel</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-emerald-500 text-gray-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Handoff Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-500 text-gray-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Custody Map</span>
            </button>

            <button
              onClick={() => setActiveTab('citizen')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'citizen'
                  ? 'bg-emerald-500 text-gray-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Citizen Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'demo'
                  ? 'bg-amber-500 text-gray-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">Demo Story</span>
            </button>
          </nav>

          {/* Quick Demo Utilities */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={onSimulateBreakdown}
              title="Simulates Route B contamination breakdown during transfer"
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Trigger Breakdown</span>
            </button>

            <button
              onClick={onResetDemo}
              title="Reset routes and audits to clean baseline"
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center space-x-1.5 pl-2 border-l border-gray-800 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="text-gray-400">{isOnline ? 'YOLOv8 Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
