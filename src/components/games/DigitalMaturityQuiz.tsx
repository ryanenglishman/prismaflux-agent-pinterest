"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Send, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RadarChart } from "./RadarChart";
import {
  QUIZ_QUESTIONS,
  DIMENSIONS,
  DIMENSION_COLORS,
  RECOMMENDATIONS,
} from "@/lib/constants/quiz-questions";

export function DigitalMaturityQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const dimensionScores = useMemo(() => {
    const scores: Record<string, number> = {};
    DIMENSIONS.forEach((d) => (scores[d] = 0));
    Object.entries(answers).forEach(([qIdx, optIdx]) => {
      const q = QUIZ_QUESTIONS[Number(qIdx)];
      const opt = q.options[optIdx];
      Object.entries(opt.scores).forEach(([dim, pts]) => {
        scores[dim] = Math.min(20, (scores[dim] || 0) + pts);
      });
    });
    return scores;
  }, [answers]);

  const totalScore = useMemo(
    () => Object.values(dimensionScores).reduce((a, b) => a + b, 0),
    [dimensionScores]
  );

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }));

    // Auto advance after a brief pause to show selection
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < totalQuestions - 1) {
        setCurrentQ((c) => c + 1);
      }
    }, 600);
  };

  const handleFinish = () => setShowResults(true);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await fetch("/api/lead-magnet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Quiz Maturite Digitale", email, score: totalScore }),
    });
    setEmailSent(true);
  };

  const getLevel = (score: number): "low" | "medium" | "high" => {
    if (score <= 6) return "low";
    if (score <= 13) return "medium";
    return "high";
  };

  const getGrade = (score: number) => {
    if (score < 20) return { label: "Debutant", color: "#FF5252", emoji: "🌱" };
    if (score < 40) return { label: "En construction", color: "#FFD740", emoji: "🔧" };
    if (score < 60) return { label: "Intermediaire", color: "#FF6B35", emoji: "📈" };
    if (score < 80) return { label: "Avance", color: "#00E676", emoji: "🚀" };
    return { label: "Expert", color: "#6366F1", emoji: "🏆" };
  };

  // ─── RESULTS SCREEN ───
  if (showResults) {
    const grade = getGrade(totalScore);

    return (
      <div className="space-y-8">
        {/* Score hero */}
        <motion.div
          className="glass-card p-8 md:p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/3" />
          <div className="relative">
            <motion.div
              className="text-5xl mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {grade.emoji}
            </motion.div>
            <motion.p
              className="text-7xl md:text-8xl font-bold"
              style={{ color: grade.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {totalScore}
              <span className="text-2xl text-text-muted">/100</span>
            </motion.p>
            <motion.p
              className="text-lg font-semibold mt-2"
              style={{ color: grade.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {grade.label}
            </motion.p>
            <motion.p
              className="text-sm text-text-secondary mt-2 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {totalScore < 30 && "Votre potentiel de croissance digitale est immense. Chaque point d'amelioration peut transformer votre acquisition de clients."}
              {totalScore >= 30 && totalScore < 60 && "De bonnes bases sont en place. Avec les bons ajustements strategiques, vous pouvez doubler votre impact digital."}
              {totalScore >= 60 && totalScore < 80 && "Votre presence digitale est solide. Optimisons les derniers leviers pour maximiser votre avantage concurrentiel."}
              {totalScore >= 80 && "Impressionnant ! Vous exploitez la majorite des leviers du marketing digital. Passons en mode optimisation avancee."}
            </motion.p>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-sm font-semibold text-text text-center mb-4">
            Votre profil par dimension
          </h3>
          <RadarChart scores={dimensionScores} />
        </motion.div>

        {/* Dimension details */}
        <div className="space-y-3">
          {DIMENSIONS.map((dim, i) => {
            const score = dimensionScores[dim];
            const level = getLevel(score);
            const pct = (score / 20) * 100;

            return (
              <motion.div
                key={dim}
                className="glass-card p-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: DIMENSION_COLORS[dim] }}
                    />
                    <span className="text-sm font-semibold text-text">{dim}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `${DIMENSION_COLORS[dim]}20`,
                        color: DIMENSION_COLORS[dim],
                      }}
                    >
                      {level === "low" ? "A developper" : level === "medium" ? "En progres" : "Solide"}
                    </span>
                    <span className="text-sm font-bold" style={{ color: DIMENSION_COLORS[dim] }}>
                      {score}/20
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 rounded-full bg-bg-card overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: DIMENSION_COLORS[dim] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 1.1 + i * 0.1 }}
                  />
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {RECOMMENDATIONS[dim]?.[level]}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Email capture */}
        <motion.div
          className="glass-card p-6 md:p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

          {emailSent ? (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <CheckCircle2 size={36} className="text-brand" />
              <p className="text-base font-semibold text-text">
                Votre rapport detaille arrive sous 24h !
              </p>
              <p className="text-sm text-text-muted">
                Avec des recommandations actionables pour chaque dimension.
              </p>
            </motion.div>
          ) : (
            <>
              <Sparkles size={24} className="text-brand mx-auto mb-3" />
              <p className="text-base font-semibold text-text mb-1">
                Recevez votre rapport personnalise par email
              </p>
              <p className="text-xs text-text-muted mb-5">
                Plan d&apos;action detaille avec les priorites pour votre entreprise.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.be"
                  aria-label="Votre adresse email"
                  className="flex-1 bg-bg-card border border-border rounded-full px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Recevoir <Send size={14} />
                </button>
              </form>
            </>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <Button href="/contact" size="lg" className="pulse-glow">
            Discuter de mes resultats avec un expert
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // ─── QUIZ SCREEN ───
  const question = QUIZ_QUESTIONS[currentQ];

  return (
    <div>
      {/* Step indicator dots */}
      <div className="flex items-center justify-center gap-1.5 mb-6">
        {QUIZ_QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentQ
                ? "w-8 bg-brand"
                : i < currentQ && answers[i] !== undefined
                  ? "w-2 bg-brand/50"
                  : "w-2 bg-bg-card border border-border"
            }`}
            layout
          />
        ))}
      </div>

      {/* Progress text */}
      <div className="flex justify-between items-center text-xs text-text-muted mb-2">
        <span>Question {currentQ + 1} sur {totalQuestions}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-bg-card overflow-hidden mb-8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-hover"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Context tip */}
          {question.context && (
            <motion.div
              className="flex items-start gap-2 mb-5 p-3 rounded-xl bg-brand-dim/50 border border-brand/10"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Info size={14} className="text-brand shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                {question.context}
              </p>
            </motion.div>
          )}

          <h3 className="text-xl md:text-2xl font-bold text-text mb-6 leading-snug">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const isSelected = answers[currentQ] === i;
              const isJustSelected = selectedOption === i;

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand bg-brand-dim"
                      : "border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{opt.emoji}</span>
                    <span className="text-sm text-text flex-1">{opt.text}</span>
                    {isJustSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle2 size={18} className="text-brand" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => {
            setSelectedOption(null);
            setCurrentQ((c) => Math.max(0, c - 1));
          }}
          disabled={currentQ === 0}
          className="text-sm text-text-muted hover:text-text disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={14} /> Precedente
        </button>

        {answeredCount === totalQuestions ? (
          <Button onClick={handleFinish} size="sm" className="pulse-glow">
            Voir mes resultats <ArrowRight size={14} className="ml-1" />
          </Button>
        ) : currentQ < totalQuestions - 1 && answers[currentQ] !== undefined ? (
          <button
            onClick={() => {
              setSelectedOption(null);
              setCurrentQ((c) => c + 1);
            }}
            className="text-sm text-brand hover:underline flex items-center gap-1 cursor-pointer"
          >
            Suivante <ArrowRight size={14} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
