import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  Layers, 
  Play, 
  RotateCcw,
  Sparkles,
  Info,
  Check,
  ChevronRight
} from 'lucide-react';
import { GANTT_TASKS_POOL } from '../../data/challengesData';
import { GanttTask, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge4GanttProps {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge4Gantt: React.FC<Challenge4GanttProps> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(13 * 60); // 13 minutes = 780s
  // Initially shuffle tasks slightly so student has to organize the critical path
  const [tasks, setTasks] = useState<GanttTask[]>(() => {
    const arr = [...GANTT_TASKS_POOL];
    // deterministic pseudo-shuffle: swap pairs to create a realistic puzzle
    const swapped = [...arr];
    [swapped[1], swapped[3]] = [swapped[3], swapped[1]];
    [swapped[4], swapped[6]] = [swapped[6], swapped[4]];
    [swapped[7], swapped[8]] = [swapped[8], swapped[7]];
    return swapped;
  });

  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    errorsCount: number;
    brokenDependencies: { taskName: string; missingPredecessor: string }[];
    isPerfect: boolean;
  } | null>(null);

  const [viewMode, setViewMode] = useState<'puzzle' | 'gantt_preview'>('puzzle');
  const [score, setScore] = useState(0);
  const [budget, setBudget] = useState(0);

  // 13-minute timer
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

  const moveTask = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= tasks.length) return;
    soundEffects.playClick();
    const updated = [...tasks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setTasks(updated);
    setValidationResult(null); // Reset test results on edit
  };

  const handleValidateSequence = () => {
    soundEffects.playClick();
    const broken: { taskName: string; missingPredecessor: string }[] = [];
    const placedTaskIds: string[] = [];

    tasks.forEach((task, idx) => {
      placedTaskIds.push(task.id);
      task.dependencies.forEach(depId => {
        if (!placedTaskIds.includes(depId)) {
          const depTask = GANTT_TASKS_POOL.find(t => t.id === depId);
          broken.push({
            taskName: `${task.code} (${task.name.split(',')[0]})`,
            missingPredecessor: depTask?.name.split(',')[0] || depId,
          });
        }
      });
    });

    // Also check exact order index matching
    const misplaced = tasks.filter((t, i) => t.correctOrderIndex !== i + 1);
    const isPerfect = broken.length === 0 && misplaced.length === 0;

    if (isPerfect) {
      soundEffects.playLevelUp();
      const scoreDelta = 1000;
      const budgetDelta = 50000;
      setScore(scoreDelta);
      setBudget(budgetDelta);

      const record: AnswerRecord = {
        id: `gantt_${Date.now()}`,
        level: 4,
        questionId: 'gantt_critical_path',
        questionTitle: 'Ruta Crítica y Secuencia de Montaje Eólico',
        userAnswer: 'Secuencia óptima 100% verificada sin rotura de precedencias',
        correctAnswer: 'Secuencia normalizada según Figuras 2.25 y 2.26 del libro Paraninfo',
        isCorrect: true,
        scoreDelta,
        budgetDelta,
        explanation: 'Excelente planificación. Todas las precedencias físicas y administrativas se cumplen: viales antes de cimentaciones, curado de hormigón antes de izado de torre, y rotor ensamblado en suelo antes de izado a barquilla.',
        textbookRef: 'Págs. 131-138 (Figuras 2.25 y 2.26)',
        timestamp: Date.now(),
      };

      setValidationResult({
        tested: true,
        errorsCount: 0,
        brokenDependencies: [],
        isPerfect: true,
      });

      // Complete Challenge 4
      setTimeout(() => {
        onComplete(scoreDelta, budgetDelta, [record]);
      }, 1800);
    } else {
      soundEffects.playError();
      onDeductLife();
      setValidationResult({
        tested: true,
        errorsCount: broken.length + misplaced.length,
        brokenDependencies: broken,
        isPerfect: false,
      });
    }
  };

  const handleAutoSolve = () => {
    soundEffects.playClick();
    const sorted = [...GANTT_TASKS_POOL].sort((a, b) => a.correctOrderIndex - b.correctOrderIndex);
    setTasks(sorted);
    setValidationResult(null);
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
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-700/80 text-amber-400">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800 uppercase">
                Reto 4 de 4 (U2)
              </span>
              <span className="text-xs text-slate-400">Ruta Crítica y Precedencias de Obra</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              PLANIFICACIÓN DEL MONTAJE Y DIAGRAMA DE GANTT
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo Reto 4:</span>
            <span className={`font-bold ${timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setViewMode(prev => prev === 'puzzle' ? 'gantt_preview' : 'puzzle')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            {viewMode === 'puzzle' ? 'Ver Diagrama Gantt' : 'Volver a Ordenar Tareas'}
          </button>
        </div>
      </div>

      {/* Instructions & Help */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200 block mb-0.5">Objetivo Pedagógico:</strong>
            Ordena las 12 actividades de obra de arriba a abajo utilizando los botones de subir <ArrowUp className="w-3 h-3 inline text-cyan-400" /> y bajar <ArrowDown className="w-3 h-3 inline text-cyan-400" /> para que ninguna tarea preceda a sus prerrequisitos de montaje (normativa Paraninfo Figuras 2.25 y 2.26). ¡Comprueba la secuencia antes de agotar el tiempo!
          </div>
        </div>
        <button
          onClick={handleAutoSolve}
          className="text-[11px] font-mono text-slate-500 hover:text-amber-400 underline shrink-0"
          title="Ayuda docente de alineación"
        >
          [Ordenar por Guía Didáctica]
        </button>
      </div>

      {/* Validation Result Box */}
      {validationResult && (
        <div className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
          validationResult.isPerfect
            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
            : 'bg-rose-950/70 border-rose-600 text-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-tech font-bold text-base mb-1">
            {validationResult.isPerfect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>¡PLANIFICACIÓN DE MONTAJE PERFECTA! (+1000 PTS • +50.000 €)</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-rose-400" />
                <span>SECUENCIA INCOMPATIBLE CON PRECEDENCIAS (-1 VIDA • REPROGRAMACIÓN -30.000 €)</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            {validationResult.isPerfect 
              ? 'Todas las dependencias críticas y holguras de las fases de obra civil, electromecánica y pruebas han sido validadas conforme al cronograma de 12 meses.'
              : `Se detectaron ${validationResult.errorsCount} inconsistencias en la ruta crítica:`}
          </p>
          {!validationResult.isPerfect && validationResult.brokenDependencies.length > 0 && (
            <ul className="text-xs space-y-1 list-disc pl-5 font-mono text-rose-300">
              {validationResult.brokenDependencies.slice(0, 3).map((err, i) => (
                <li key={i}>
                  La tarea <span className="font-bold text-white">{err.taskName}</span> se colocó antes de haber completado su predecesora obligatoria: <span className="underline">{err.missingPredecessor}</span>.
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* View Mode: Puzzle Sorter */}
      {viewMode === 'puzzle' ? (
        <div className="space-y-2.5">
          {tasks.map((task, index) => {
            const isTargetOrder = task.correctOrderIndex === index + 1;
            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
                  isTargetOrder 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                {/* Left: Position and Code */}
                <div className="flex items-center gap-3 min-w-[80px]">
                  <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                    isTargetOrder 
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {task.code}
                  </span>
                </div>

                {/* Center: Task Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white truncate">
                      {task.name}
                    </span>
                    {task.isCriticalPath && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800 shrink-0">
                        Ruta Crítica
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>Duración: <strong className="text-slate-300">{task.durationWeeks} semanas</strong></span>
                    <span>Recursos: <strong className="text-slate-300">{task.resourceRequired}</strong></span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Predecesores: {task.dependencies.length > 0 ? task.dependencies.join(', ') : 'Ninguno (Inicial)'}
                    </span>
                  </div>
                </div>

                {/* Right: Reorder Up/Down Controls */}
                <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                  <button
                    disabled={index === 0}
                    onClick={() => moveTask(index, index - 1)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Mover tarea arriba"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === tasks.length - 1}
                    onClick={() => moveTask(index, index + 1)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Mover tarea abajo"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode: Gantt Chart Timeline Representation */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-tech font-bold text-white text-sm">CRONOGRAMA DE BARRAS DE GANTT (12 MESES)</span>
            <span className="font-mono text-cyan-400">Semanas 1 a 48 (12 Meses)</span>
          </div>

          <div className="space-y-2 overflow-x-auto pb-2">
            {/* Timeline Header Weeks */}
            <div className="flex items-center text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-1 min-w-[600px]">
              <div className="w-48 shrink-0">Actividad de Proyecto</div>
              <div className="flex-1 grid grid-cols-12 text-center">
                <span>Mes 1</span>
                <span>Mes 2</span>
                <span>Mes 3</span>
                <span>Mes 4</span>
                <span>Mes 5</span>
                <span>Mes 6</span>
                <span>Mes 7</span>
                <span>Mes 8</span>
                <span>Mes 9</span>
                <span>Mes 10</span>
                <span>Mes 11</span>
                <span>Mes 12</span>
              </div>
            </div>

            {/* Gantt Task Bars */}
            {tasks.map((task, idx) => {
              // rough start percentage based on sequence index
              const startMonth = Math.min(10, Math.floor(idx * 0.9));
              const widthMonths = Math.max(1, Math.ceil(task.durationWeeks / 4));

              return (
                <div key={task.id} className="flex items-center text-xs py-1.5 border-b border-slate-800/40 min-w-[600px]">
                  <div className="w-48 truncate text-slate-300 font-medium pr-2 text-[11px]" title={task.name}>
                    {task.code}: {task.name.split(',')[0]}
                  </div>
                  <div className="flex-1 relative h-6 bg-slate-950/60 rounded">
                    <div
                      style={{
                        left: `${(startMonth / 12) * 100}%`,
                        width: `${(widthMonths / 12) * 100}%`,
                      }}
                      className={`absolute top-1 bottom-1 rounded px-2 text-[9px] font-mono font-bold flex items-center justify-between text-slate-950 ${
                        task.isCriticalPath
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm shadow-rose-950'
                          : 'bg-gradient-to-r from-cyan-500 to-teal-400'
                      }`}
                    >
                      <span className="truncate">{task.durationWeeks} sem</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Validate Sequence Button */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-slate-500 font-mono">
          Basado en Cronograma de Montaje (Figura 2.26) • Paraninfo
        </span>
        <button
          onClick={handleValidateSequence}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-tech font-bold text-base bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>VERIFICAR CRONOGRAMA DE OBRA</span>
        </button>
      </div>
    </div>
  );
};
