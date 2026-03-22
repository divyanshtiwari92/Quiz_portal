import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AttemptQuiz() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/exam")
      .then((res) => res.json())
      .then((data) => {
        const foundExam = data.find((e) => e._id === examId);
        setExam(foundExam);
        if (foundExam) {
          setTimeLeft(foundExam.duration * 60);
        }
      });

    fetch(`http://localhost:5000/api/question/${examId}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.log(err));
  }, [examId]);

  useEffect(() => {
    if (!timeLeft || submitted) return;

    if (timeLeft === 0) {
      alert("⏱️ Time up! Exam submitted!");
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  const handleOptionChange = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);

    let score = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) score++;
    });

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await fetch("http://localhost:5000/api/result/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          examId: examId,
          score,
          total: questions.length,
        }),
      });

      alert("✅ Exam submitted successfully!");
      window.location.href = "/student";
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const answered = Object.keys(answers).length;
  const total = questions.length;
  const isLowTime = timeLeft <= 60;

  if (!exam)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading exam...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top navbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📘</span>
          <div>
            <h1 className="text-base font-bold text-gray-800">{exam.subject} Quiz</h1>
            <p className="text-xs text-gray-400">QuizPortal · SKIT Jaipur</p>
          </div>
        </div>

        {/* Timer + progress */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">
            {answered}/{total} answered
          </span>
          <span
            className={`px-4 py-2 rounded-xl text-sm font-bold tabular-nums ${
              isLowTime
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-blue-50 text-blue-600 border border-blue-200"
            }`}
          >
            ⏱ {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-blue-500 transition-all duration-300"
          style={{ width: total ? `${(answered / total) * 100}%` : "0%" }}
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">

        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                <p className="text-sm font-semibold text-gray-800 mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">
                    {index + 1}
                  </span>
                  {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                        answers[q._id] === opt
                          ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() => handleOptionChange(q._id, opt)}
                        className="accent-blue-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm mt-12">No questions available.</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
        >
          Submit Quiz
        </button>

        <p className="text-center text-xs text-gray-300 mt-4">Quiz Portal · Academic Project</p>
      </div>

    </div>
  );
}

export default AttemptQuiz;