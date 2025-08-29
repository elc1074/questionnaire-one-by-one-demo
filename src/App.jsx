import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Edit your questions here
const QUESTIONS = [
  { id: 1, text: "Sinto preocupação constante com meu desempenho, prazos e exigências do curso (provas, projetos, estágios)." },
  { id: 2, text: "Fico nervoso(a) facilmente quando penso em avaliações." },
  { id: 3, text: "Às vezes perco o sono pensando se meu esforço de estudo é suficiente." },
  { id: 4, text: "Meu coração acelera quando imagino a pressão de uma apresentação ou seminário." },
  { id: 5, text: "Sinto um “aperto” no peito ao ver o prazo se aproximar para uma prova importante." },
];

const LIKERT_LABELS = [
  "Discordo totalmente",
  "Discordo parcialmente",
  "Neutro",
  "Concordo parcialmente",
  "Concordo totalmente",
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("questionnaire-answers");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("questionnaire-answers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [QUESTIONS[step].id]: value });
  };

  const next = () => setStep((s) => Math.min(s + 1, QUESTIONS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <Progress value={progress} className="mb-4" />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">{QUESTIONS[step].text}</h2>

            <div className="flex flex-col gap-3">
              {LIKERT_LABELS.map((label, idx) => (
                <Button
                  key={idx}
                  className="w-full text-left"
                  variant={answers[QUESTIONS[step].id] === idx + 1 ? "default" : "outline"}
                  onClick={() => handleAnswer(idx + 1)}
                >
                  <span className="text-sm text-gray-700">{label}</span>
                </Button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="secondary" onClick={back} disabled={step === 0}>
                Voltar
              </Button>
              <Button onClick={() => next()}>
                {step === QUESTIONS.length - 1 ? "Finalizar" : "Próximo"}
              </Button>
            </div>

            {step === QUESTIONS.length - 1 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">Respostas:</h3>
                <ul className="list-disc list-inside text-sm">
                  {QUESTIONS.map((q) => (
                    <li key={q.id}>
                      <strong>{q.text}</strong>: {answers[q.id] || "-"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
