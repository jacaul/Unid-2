import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  Wrench, 
  AlertOctagon, 
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { U1_COMPONENTS, RETO1_QUESTIONS } from '../../data/challengesData';
import { AerogeneratorComponent, InspectionQuestion, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge1ReviewU1Props {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge1ReviewU1: React.FC<Challenge1ReviewU1Props> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes = 480s
  const [selectedCompId, setSelectedCompId] = useState<string>(U1_COMPONENTS[0].id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackRecord, setFeedbackRecord] = useState<AnswerRecord | null>(null);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [accumulatedBudget, setAccumulatedBudget] = useState(0);
  const [inspectedComponents, setInspectedComponents] = useState<string[]>([U1_COMPONENTS[0].id]);

  // Per-challenge 8-minute countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          soundEffects.playWarning();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const activeComp = U1_COMPONENTS.find(c => c.id === selectedCompId) || U1_COMPONENTS[0];
  const currentQ: InspectionQuestion = RETO1_QUESTIONS[currentQuestionIndex];

  const handleSelectComponent = (comp: AerogeneratorComponent) => {
    soundEffects.playClick();
    setSelectedCompId(comp.id);
    if (!inspectedComponents.includes(comp.id)) {
      setInspectedComponents(prev => [...prev, comp.id]);
    }
  };

  const handleAnswerSubmit = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const chosenOption = currentQ.options.find(o => o.id === optionId);
    const isCorrect = !!chosenOption?.isCorrect;

    const scoreDelta = isCorrect ? currentQ.points : 0;
    const budgetDelta = isCorrect ? currentQ.budgetImpact : -20000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    const record: AnswerRecord = {
      id: `ans_${Date.now()}`,
      level: 1,
      questionId: currentQ.id,
      questionTitle: currentQ.title,
      userAnswer: chosenOption?.text || '',
      correctAnswer: currentQ.options.find(o => o.isCorrect)?.text || '',
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentQ.explanation,
      textbookRef: currentQ.paraninfoPage,
      timestamp: Date.now(),
    };

    setFeedbackRecord(record);
    setAccumulatedRecords(prev => [...prev, record]);
    setAccumulatedScore(prev => prev + scoreDelta);
    setAccumulatedBudget(prev => prev + budgetDelta);
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentQuestionIndex < RETO1_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setFeedbackRecord(null);
      // Auto highlight relevant component
      const nextQ = RETO1_QUESTIONS[currentQuestionIndex + 1];
      setSelectedCompId(nextQ.componentId);
      if (!inspectedComponents.includes(nextQ.componentId)) {
        setInspectedComponents(prev => [...prev, nextQ.componentId]);
      }
    } else {
      // Challenge 1 completed!
      soundEffects.playLevelUp();
      onComplete(accumulatedScore, accumulatedBudget, accumulatedRecords);
    }
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Reto Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/80 text-cyan-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                Reto 1 de 4 (U1)
              </span>
              <span className="text-xs text-slate-400">Repaso Técnico de Componentes</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              CHEQUEO TÉCNICO PREVIO AL MONTAJE
            </h2>
          </div>
        </div>

        {/* Reto 1 Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo Reto 1:</span>
            <span className={`font-bold ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Progreso: </span>
            <span className="font-bold text-cyan-400">{currentQuestionIndex + 1}/{RETO1_QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Schematic & Technical Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Vector Diagram of Aerogenerator & Subsystems (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-1.5">
                <span>ESQUEMA DE DESPIECE TÉCNICO (FIG. 1.38)</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
                {inspectedComponents.length}/6 Inspeccionados
              </span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 relative overflow-hidden flex items-center justify-center">
              <svg 
                viewBox="0 0 340 380" 
                className="w-full max-h-72 select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Accent */}
                <defs>
                  <pattern id="turbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="340" height="380" fill="url(#turbGrid)" />

                {/* Ground Line */}
                <line x1="20" y1="350" x2="320" y2="350" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

                {/* Foundation / Virola */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_virola')!)}
                >
                  <polygon 
                    points="130,350 110,370 230,370 210,350" 
                    fill={selectedCompId === 'comp_virola' ? '#0284c7' : '#1e293b'} 
                    stroke={selectedCompId === 'comp_virola' ? '#38bdf8' : '#64748b'} 
                    strokeWidth="2" 
                  />
                  <rect 
                    x="150" 
                    y="335" 
                    width="40" 
                    height="15" 
                    fill={selectedCompId === 'comp_virola' ? '#0ea5e9' : '#334155'} 
                    stroke={selectedCompId === 'comp_virola' ? '#7dd3fc' : '#94a3b8'} 
                    strokeWidth="1.5"
                  />
                  <text x="170" y="363" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">
                    ZAPATA Y VIROLA
                  </text>
                </g>

                {/* Tubular Tower */}
                <g>
                  {/* Lower Tower with MV Switchgear */}
                  <polygon 
                    points="152,335 158,230 182,230 188,335" 
                    fill="#1e293b" 
                    stroke="#475569" 
                    strokeWidth="1.5" 
                  />
                  {/* MV Switchgear click target inside tower base */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_celdas_mt')!)}
                  >
                    <rect 
                      x="160" 
                      y="290" 
                      width="20" 
                      height="35" 
                      rx="2"
                      fill={selectedCompId === 'comp_celdas_mt' ? '#8b5cf6' : '#0f172a'} 
                      stroke={selectedCompId === 'comp_celdas_mt' ? '#c084fc' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="170" y="312" fill="#e2e8f0" fontSize="7" fontWeight="bold" textAnchor="middle">
                      20 kV
                    </text>
                  </g>

                  {/* Upper Tower */}
                  <polygon 
                    points="158,230 162,120 178,120 182,230" 
                    fill="#334155" 
                    stroke="#64748b" 
                    strokeWidth="1.5" 
                  />
                </g>

                {/* Yaw Ring (Corona de orientación) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_gondola')!)}
                >
                  <rect 
                    x="160" 
                    y="114" 
                    width="20" 
                    height="6" 
                    fill="#38bdf8" 
                    stroke="#0284c7" 
                    strokeWidth="1" 
                  />
                </g>

                {/* Gondola / Nacelle Body */}
                <g 
                  className="cursor-pointer transition-all"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_gondola')!)}
                >
                  <path 
                    d="M 120 85 L 210 85 Q 225 85 225 100 L 225 114 Q 215 116 150 116 L 120 114 Z" 
                    fill={selectedCompId === 'comp_gondola' ? '#0369a1' : '#1e293b'} 
                    stroke={selectedCompId === 'comp_gondola' ? '#38bdf8' : '#94a3b8'} 
                    strokeWidth="2" 
                  />
                  {/* Anemometer & Wind Vane on rear top */}
                  <line x1="210" y1="85" x2="210" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="210" cy="70" r="3" fill="#38bdf8" />
                </g>

                {/* Multiplicadora (Gearbox) inside Nacelle */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_multiplicadora')!)}
                >
                  <rect 
                    x="142" 
                    y="90" 
                    width="24" 
                    height="20" 
                    rx="2"
                    fill={selectedCompId === 'comp_multiplicadora' ? '#f59e0b' : '#334155'} 
                    stroke={selectedCompId === 'comp_multiplicadora' ? '#fbbf24' : '#64748b'} 
                    strokeWidth="1.5" 
                  />
                  <text x="154" y="103" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    MULT
                  </text>
                </g>

                {/* Generator inside Nacelle */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_generador')!)}
                >
                  <rect 
                    x="172" 
                    y="90" 
                    width="26" 
                    height="20" 
                    rx="3"
                    fill={selectedCompId === 'comp_generador' ? '#10b981' : '#334155'} 
                    stroke={selectedCompId === 'comp_generador' ? '#34d399' : '#64748b'} 
                    strokeWidth="1.5" 
                  />
                  <text x="185" y="103" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    GEN
                  </text>
                </g>

                {/* Rotor Hub (Buje) & Pitch */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_pitch')!)}
                >
                  <path 
                    d="M 120 88 C 105 92 105 108 120 112 Z" 
                    fill={selectedCompId === 'comp_pitch' ? '#e11d48' : '#475569'} 
                    stroke={selectedCompId === 'comp_pitch' ? '#fb7185' : '#cbd5e1'} 
                    strokeWidth="2" 
                  />
                  <circle cx="114" cy="100" r="5" fill="#f43f5e" />
                </g>

                {/* Rotor Blades (3 Palas) */}
                <g opacity="0.85">
                  {/* Blade 1 (pointing up) */}
                  <path d="M 114 96 C 110 50 112 15 114 10 C 116 15 120 50 118 96 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                  {/* Blade 2 (pointing down-left) */}
                  <path d="M 112 103 C 80 140 45 170 40 175 C 45 170 85 130 114 105 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                  {/* Blade 3 (pointing down-right) */}
                  <path d="M 116 103 C 130 140 145 175 150 180 C 145 170 125 135 115 105 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Component Quick Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              {U1_COMPONENTS.map(c => {
                const isSelected = selectedCompId === c.id;
                const isCurrentQ = currentQ.componentId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectComponent(c)}
                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-medium transition-all border ${
                      isSelected
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                        : isCurrentQ
                        ? 'bg-amber-950/60 text-amber-300 border-amber-600/70 animate-pulse'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="truncate font-semibold">{c.name.split('(')[0]}</div>
                    <div className="text-[9px] text-slate-500 capitalize">{c.location}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Component Details Card */}
          <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-cyan-400 font-tech font-bold">
              <span>{activeComp.name}</span>
              <span className="text-[10px] font-mono text-slate-500">{activeComp.paraninfoRef}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeComp.technicalSpec}
            </p>
            <div className="p-1.5 bg-slate-900 rounded text-[10px] text-amber-300 border border-amber-900/40">
              ⚠️ <strong>Punto crítico de inspección:</strong> {activeComp.inspectionCheck}
            </div>
          </div>
        </div>

        {/* Right Column: Technical Question & Immediate Feedback (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            {/* Question Meta */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 text-xs font-mono font-semibold border border-cyan-800">
                Pregunta {currentQuestionIndex + 1} de {RETO1_QUESTIONS.length}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                +{currentQ.points} pts • +{currentQ.budgetImpact.toLocaleString('es-ES')} €
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-tech font-bold text-white mb-2">
              {currentQ.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              {currentQ.prompt}
            </p>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300';

                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500/30';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasAnswered}
                    onClick={() => handleAnswerSubmit(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Box (Appears immediately after answering) */}
            {hasAnswered && feedbackRecord && (
              <div className={`mt-4 p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                feedbackRecord.isCorrect
                  ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-800/80 text-rose-200'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="font-tech font-bold text-sm flex items-center gap-1.5">
                    {feedbackRecord.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>¡VERIFICACIÓN TÉCNICA CORRECTA! (+{currentQ.points} PTS)</span>
                      </>
                    ) : (
                      <>
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                        <span>INFRACCIÓN TÉCNICA (-1 VIDA • REPROCESO -20.000 €)</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                    Ref: {feedbackRecord.textbookRef}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {feedbackRecord.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Unidad 1: Luis Romero Lozano (Paraninfo)
            </span>
            {hasAnswered && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-tech font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-md shadow-cyan-500/20 transition-all hover:scale-102"
              >
                <span>{currentQuestionIndex < RETO1_QUESTIONS.length - 1 ? 'SIGUIENTE INSPECCIÓN' : 'COMPLETAR RETO 1'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
