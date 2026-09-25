import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  FolderTree, 
  Layers, 
  Coins, 
  AlertTriangle,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { PROJECT_DOCUMENTS } from '../../data/challengesData';
import { ProjectDocCategory, ProjectDocumentItem, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge2DocumentsProps {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge2Documents: React.FC<Challenge2DocumentsProps> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes = 720s
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classifiedMap, setClassifiedMap] = useState<Record<string, { category: ProjectDocCategory; isCorrect: boolean }>>({});
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string; correctCat: string } | null>(null);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);
  const [budget, setBudget] = useState(0);

  // 12-minute countdown timer
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

  const currentItem: ProjectDocumentItem = PROJECT_DOCUMENTS[currentIndex];

  const categoriesConfig: { id: ProjectDocCategory; title: string; subtitle: string; color: string; border: string; bg: string; icon: string }[] = [
    {
      id: 'doc1_memoria',
      title: 'Doc 1: Memoria y Anejos',
      subtitle: 'Justificación, 16 Anejos técnicos (Geotécnico, E.B.S.S., E.I.A.)',
      color: 'text-sky-400',
      border: 'border-sky-500/40 hover:border-sky-400',
      bg: 'bg-sky-950/40',
      icon: 'FolderTree',
    },
    {
      id: 'doc2_planos',
      title: 'Doc 2: Planos del Proyecto',
      subtitle: '7 Grupos normalizados (Viales, zanjas, unifilares, layouts)',
      color: 'text-cyan-400',
      border: 'border-cyan-500/40 hover:border-cyan-400',
      bg: 'bg-cyan-950/40',
      icon: 'Compass',
    },
    {
      id: 'doc3_pliego',
      title: 'Doc 3: Pliego de Condiciones',
      subtitle: 'Prescripciones técnicas de materiales, ensayos y facultativas',
      color: 'text-amber-400',
      border: 'border-amber-500/40 hover:border-amber-400',
      bg: 'bg-amber-950/40',
      icon: 'FileCheck',
    },
    {
      id: 'doc4_presupuesto',
      title: 'Doc 4: Presupuesto y Mediciones',
      subtitle: 'Mediciones, Cuadros de precios 1 y 2, PEM + Gastos e IVA',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      bg: 'bg-emerald-950/40',
      icon: 'Coins',
    },
  ];

  const handleClassify = (catId: ProjectDocCategory) => {
    if (lastFeedback) return; // Wait until clicking next

    const isCorrect = catId === currentItem.correctCategory;
    const catObj = categoriesConfig.find(c => c.id === currentItem.correctCategory)!;

    const scoreDelta = isCorrect ? 200 : 0;
    const budgetDelta = isCorrect ? 10000 : -15000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    const record: AnswerRecord = {
      id: `doc_${Date.now()}`,
      level: 2,
      questionId: currentItem.id,
      questionTitle: currentItem.title,
      userAnswer: categoriesConfig.find(c => c.id === catId)?.title || catId,
      correctAnswer: catObj.title,
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentItem.technicalTip,
      textbookRef: 'Unidad 2 (Págs. 90-124)',
      timestamp: Date.now(),
    };

    setClassifiedMap(prev => ({
      ...prev,
      [currentItem.id]: { category: catId, isCorrect }
    }));
    setAccumulatedRecords(prev => [...prev, record]);
    setScore(prev => prev + scoreDelta);
    setBudget(prev => prev + budgetDelta);

    setLastFeedback({
      isCorrect,
      text: currentItem.technicalTip,
      correctCat: catObj.title,
    });
  };

  const handleNextCard = () => {
    soundEffects.playClick();
    setLastFeedback(null);
    if (currentIndex < PROJECT_DOCUMENTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      soundEffects.playLevelUp();
      onComplete(score, budget, accumulatedRecords);
    }
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-700/80 text-sky-400">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 uppercase">
                Reto 2 de 4 (U2)
              </span>
              <span className="text-xs text-slate-400">Estructura Legal y Técnica</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              CLASIFICACIÓN DOCUMENTAL DEL PROYECTO
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo Reto 2:</span>
            <span className={`font-bold ${timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Documento: </span>
            <span className="font-bold text-sky-400">{currentIndex + 1}/{PROJECT_DOCUMENTS.length}</span>
          </div>
        </div>
      </div>

      {/* Main Inspection Card to Classify */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-800">
              Identificador Técnico: #{currentItem.id}
            </span>
            <span className="text-slate-400 font-medium">
              Rango legal: {currentItem.importanceLegal}
            </span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-xl font-tech font-bold text-white">
                {currentItem.title}
              </h3>
              {currentItem.subType && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                  {currentItem.subType}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentItem.description}
            </p>
          </div>

          {/* Feedback banner if answered */}
          {lastFeedback && (
            <div className={`p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
              lastFeedback.isCorrect
                ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                : 'bg-rose-950/50 border-rose-800 text-rose-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 font-tech font-bold text-sm">
                  {lastFeedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>¡CLASIFICACIÓN REGISTRADA CORRECTAMENTE! (+200 PTS)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>CATEGORÍA ERRÓNEA (-1 VIDA • PERDIDA -15.000 €)</span>
                    </>
                  )}
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                  Pertenece a: {lastFeedback.correctCat}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lastFeedback.text}
              </p>
            </div>
          )}

          {/* Classification Target Slots (4 Categories) */}
          <div className="space-y-2 pt-2">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <span>Selecciona el Documento Reglamentario donde debe incluirse:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoriesConfig.map((cat) => {
                const isSelected = classifiedMap[currentItem.id]?.category === cat.id;
                const isCorrect = currentItem.correctCategory === cat.id;

                let cardStyle = `${cat.bg} ${cat.border} text-slate-300 hover:bg-slate-800/60`;
                if (lastFeedback) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/30';
                  } else {
                    cardStyle = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-40';
                  }
                }

                return (
                  <button
                    key={cat.id}
                    disabled={!!lastFeedback}
                    onClick={() => handleClassify(cat.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${cardStyle} ${
                      !lastFeedback ? 'hover:scale-101 cursor-pointer' : ''
                    }`}
                  >
                    <div>
                      <div className={`font-tech font-bold text-sm mb-1 ${cat.color}`}>
                        {cat.title}
                      </div>
                      <div className="text-xs text-slate-400 leading-snug">
                        {cat.subtitle}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Hacer clic para asignar</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation */}
          {lastFeedback && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextCard}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-tech font-bold text-sm bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:scale-102"
              >
                <span>{currentIndex < PROJECT_DOCUMENTS.length - 1 ? 'SIGUIENTE DOCUMENTO' : 'COMPLETAR RETO 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
