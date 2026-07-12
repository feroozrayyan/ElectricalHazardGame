import React, { useState } from 'react';
import { AgeGroup, getQuizQuestions } from '../utils/ageAdapter';
import { 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Trophy,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSuccessSound, playErrorSound, playFanfareSound } from '../utils/audio';

interface QuizViewProps {
  ageGroup: AgeGroup;
}

export default function QuizView({ ageGroup }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = getQuizQuestions(ageGroup);
  const activeQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    
    setSelectedAnswerIndex(optionIdx);
    setIsAnswered(true);

    if (optionIdx === activeQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < quizQuestions.length) {
      setCurrentQuestionIndex(nextIdx);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      playFanfareSound();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative gradient sphere */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      {!quizFinished ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <BookOpen size={18} />
              </span>
              <h3 className="font-display font-bold text-lg text-slate-100">Safety Ranger Quiz</h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
              Question <span className="text-indigo-400 font-bold">{currentQuestionIndex + 1}</span> of {quizQuestions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="bg-indigo-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Text */}
          <div className="my-2">
            <h4 className="text-lg md:text-xl font-display font-bold text-slate-100 leading-snug">
              {activeQuestion.question}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {activeQuestion.options.map((option, idx) => {
              let btnClass = 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300';
              let icon = null;

              if (isAnswered) {
                if (idx === activeQuestion.correctAnswerIndex) {
                  btnClass = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                  icon = <CheckCircle size={18} className="text-emerald-400 shrink-0" />;
                } else if (idx === selectedAnswerIndex) {
                  btnClass = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                  icon = <XCircle size={18} className="text-rose-400 shrink-0" />;
                } else {
                  btnClass = 'bg-slate-950/40 border-slate-900 text-slate-500 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm md:text-base font-medium transition-all duration-200 flex items-center justify-between gap-3 ${btnClass} ${!isAnswered ? 'cursor-pointer active:scale-[0.99]' : ''}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex gap-3 text-sm"
              >
                <div className="text-indigo-400 mt-0.5 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-indigo-400 font-display uppercase tracking-wider text-xs">
                    Why is this?
                  </h5>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    {activeQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-slate-950 font-display font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <span>{currentQuestionIndex + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished View */
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6 space-y-6"
        >
          <div className="flex justify-center">
            <div className="p-5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full shadow-lg relative">
              <Trophy size={48} className="text-amber-300 animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-display font-black text-slate-100">
              Quiz Completed!
            </h3>
            <p className="text-slate-400 text-sm">
              Excellent job completing the Electrical Safety Ranger challenge.
            </p>
          </div>

          {/* Score Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 max-w-xs mx-auto">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Your Safety Score</span>
            <span className="text-4xl font-display font-black text-indigo-400">{score} / {quizQuestions.length}</span>
            <p className="text-xs text-slate-400 mt-1">
              {score === quizQuestions.length 
                ? '🎖️ Perfect Score! You are an Official Safety Specialist!' 
                : score >= 3 
                ? '👍 Great job! You know how to keep safe at home!' 
                : '📖 Try again to learn how to keep safe from shocks!'}
            </p>
          </div>

          {/* Certificate of Safety Badge */}
          {score >= 3 && (
            <motion.div 
              initial={{ rotate: -5, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="border-2 border-dashed border-indigo-500/40 bg-indigo-950/10 p-6 rounded-3xl max-w-sm mx-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500 text-slate-950 rounded-2xl shrink-0 shadow-md">
                  <Award size={28} className="stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold tracking-widest block">Badge Unlocked</span>
                  <h4 className="font-display font-bold text-slate-100">Certified Safety Specialist</h4>
                  <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                    Recognized for identifying electrical household hazards and prioritizing safety rules.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Restart Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-display font-bold rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Retry Trivia</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
