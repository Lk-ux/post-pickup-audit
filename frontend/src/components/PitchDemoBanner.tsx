import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Truck,
  Eye,
  BarChart3,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WasteRoute } from '../types';

interface PitchDemoBannerProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onTriggerBreakdown: () => void;
  onReset: () => void;
  onNavigateTab: (tab: 'audit' | 'dashboard' | 'map' | 'citizen') => void;
  routes: WasteRoute[];
}

export const PitchDemoBanner: React.FC<PitchDemoBannerProps> = ({
  currentStep,
  onStepChange,
  onTriggerBreakdown,
  onReset,
  onNavigateTab,
  routes,
}) => {
  const steps = [
    {
      title: '1. The Citizen Baseline (Route B)',
      desc: 'Show that households properly segregated waste at the doorstep (Audit Score: 100/100).',
      tab: 'dashboard',
      actionLabel: 'Inspect Route B Baseline',
      run: () => {
        onNavigateTab('dashboard');
      },
    },
    {
      title: '2. The Transfer Station Handoff',
      desc: 'At Transfer Station TS-04, the operator takes a photo of the wet waste hopper.',
      tab: 'audit',
      actionLabel: 'Go to Handoff Audit Form',
      run: () => {
        onNavigateTab('audit');
      },
    },
    {
      title: '3. Run YOLO AI Vision Detection',
      desc: 'Our computer vision model flags foreign PET plastic bottles and blue polybags with red bounding boxes.',
      tab: 'audit',
      actionLabel: 'Run AI Model Scan',
      run: () => {
        onNavigateTab('audit');
      },
    },
    {
      title: '4. The Breakdown: Route Score Plummets',
      desc: 'Simulate the post-pickup contamination event. Route B drops to 66.7 (Below 70 threshold).',
      tab: 'dashboard',
      actionLabel: 'Simulate Breakdown Score',
      run: () => {
        onTriggerBreakdown();
        onNavigateTab('dashboard');
      },
    },
    {
      title: '5. Municipality Inspection Alert',
      desc: 'The municipality dashboard immediately flags Route B and pinpoints Transfer Station TS-04 as the failure point.',
      tab: 'dashboard',
      actionLabel: 'View Municipality Alert',
      run: () => {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        onNavigateTab('dashboard');
      },
    },
  ];

  const current = steps[currentStep] || steps[0];

  return (
    <div className="bg-gradient-to-r from-amber-950/80 via-gray-900 to-emerald-950/80 border-b border-amber-500/30 px-4 py-3 sticky top-16 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Step Indicator & Description */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0">
            {currentStep + 1}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Hackathon Pitch Demo Flow
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-0.5">{current.title}</div>
            <p className="text-xs text-gray-300 hidden sm:block">{current.desc}</p>
          </div>
        </div>

        {/* Step Control Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => {
              current.run();
              if (currentStep < steps.length - 1) {
                onStepChange(currentStep + 1);
              }
            }}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-400 text-gray-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 transition-all flex items-center space-x-1.5"
          >
            <span>{current.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {currentStep > 0 && (
            <button
              onClick={() => onStepChange(currentStep - 1)}
              className="px-2.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
            >
              Back
            </button>
          )}

          <button
            onClick={() => {
              onReset();
              onStepChange(0);
            }}
            className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
