import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [section, setSection] = useState("");
  const [results, setResults] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("exams");

  const filteredResults = selectedExam
    ? results.filter((r) => r.examId?._id === selectedExam)
    : results;

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");
    if (!storedUser || role !== "teacher") { navigate("/"); return; }
    setUser(storedUser);
    fetch("http://localhost:5000/api/exam").then((res) => res.json()).then((data) => setExams(data)).catch((err) => console.log(err));
    fetch("http://localhost:5000/api/result").then((res) => res.json()).then((data) => setResults(data)).catch((err) => console.log(err));
  }, [navigate]);

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const handleCreateExam = async () => {
    if (!subject || !duration || !section) { alert("Fill all fields"); return; }
    try {
      const res = await fetch("http://localhost:5000/api/exam/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, duration, section, teacherId: user.id }),
      });
      const data = await res.json();
      if (data.success) {
        setExams((prev) => [...prev, data.exam]);
        setSubject(""); setDuration(""); setSection("");
      }
    } catch (err) { console.log(err); }
  };

  const handleAddQuestion = async () => {
    if (!selectedExam || !question || options.includes("") || !correctAnswer) { alert("Fill all fields"); return; }
    try {
      const res = await fetch("http://localhost:5000/api/question/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId: selectedExam, question, options, correctAnswer }),
      });
      const data = await res.json();
      if (data.success) { setQuestion(""); setOptions(["", "", "", ""]); setCorrectAnswer(""); }
    } catch (err) { console.log(err); }
  };

  if (!user) return null;

  const tabs = [
    { id: "exams", label: "My Exams" },
    { id: "create", label: "Create Exam" },
    { id: "questions", label: "Add Questions" },
    { id: "results", label: "Student Results" },
  ];

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
          <span className="text-lg font-bold text-indigo-600">ExamPortal</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 px-4 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-400 mt-0.5">{user.department} · {user.designation}</p>
              <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">
                Teacher
              </span>
            </div>
           
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit flex-wrap shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* My Exams */}
        {activeTab === "exams" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Created Exams</h3>
              <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2.5 py-1 rounded-full">{exams.length} total</span>
            </div>

            {exams.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                  <div key={exam._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-bold text-gray-800 text-sm">{exam.subject}</p>
                      <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2">
                        §{exam.section}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">⏱ {exam.duration} mins</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <span className="text-4xl mb-3">📭</span>
                <p className="font-medium text-gray-600">No exams yet</p>
                <p className="text-sm mt-1">Go to "Create Exam" to get started</p>
              </div>
            )}
          </div>
        )}

        {/* Create Exam */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-md">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">New Exam</h3>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Subject Name</label>
                <input className={inputClass} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics, Physics" />
              </div>
              <div>
                <label className={labelClass}>Duration (minutes)</label>
                <input className={inputClass} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 60" />
              </div>
              <div>
                <label className={labelClass}>Section</label>
                <select className={inputClass} value={section} onChange={(e) => setSection(e.target.value)}>
                  <option value="">Select Section</option>
<option value="4CS-DS-A-G1">4CS-DS-A-G1</option>
<option value="4CS-DS-A-G2">4CS-DS-A-G2</option>
<option value="4CS-DS-B-G1">4CS-DS-B-G1</option>
<option value="4CS-DS-B-G2">4CS-DS-B-G2</option>
<option value="4CS-AI-A-G1">4CS-AI-A-G1</option>
<option value="4CS-AI-A-G2">4CS-AI-A-G2</option>
<option value="4CS-AI-B-G1">4CS-AI-B-G1</option>
<option value="4CS-AI-B-G2">4CS-AI-B-G2</option>
                </select>
              </div>
              <button
                onClick={handleCreateExam}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2"
              >
                Create Exam →
              </button>
            </div>
          </div>
        )}

        {/* Add Questions */}
        {activeTab === "questions" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-md">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">Add Question</h3>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Select Exam</label>
                <select className={inputClass} value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                  <option value="">Choose an exam</option>
                  {exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>{exam.subject} — Section {exam.section}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Question</label>
                <input className={inputClass} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Type the question here..." />
              </div>
              <div>
                <label className={labelClass}>Options</label>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((opt, index) => (
                    <input
                      key={index}
                      className={inputClass}
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Correct Answer</label>
                <input className={inputClass} value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} placeholder="Must match an option exactly" />
              </div>
              <button
                onClick={handleAddQuestion}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                + Add Question
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {activeTab === "results" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Student Results</h3>
              <div className="flex items-center gap-3">
                <select
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                >
                  <option value="">All Exams</option>
                  {exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>{exam.subject}</option>
                  ))}
                </select>
                <span className="text-xs text-gray-400">{filteredResults.length} entries</span>
              </div>
            </div>

            {filteredResults.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <div className="grid grid-cols-5 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <div>Student</div>
                  <div>Exam</div>
                  <div>Roll No</div>
                  <div>Section</div>
                  <div className="text-right">Score</div>
                </div>
                {filteredResults.map((r, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-5 gap-4 px-5 py-3.5 items-center text-sm hover:bg-gray-50 transition-colors ${
                      index !== filteredResults.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{r.studentId?.name || "—"}</div>
                    <div className="text-gray-500 text-xs">{r.examId?.subject || "—"}</div>
                    <div className="text-gray-400 text-xs font-mono">{r.studentId?.rollNo || "—"}</div>
                    <div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-medium">
                        {r.studentId?.section || "—"}
                      </span>
                    </div>
                    <div className="text-right">
                      {(() => {
                        const pct = Math.round((r.score / r.total) * 100);
                        const pass = pct >= 50;
                        return (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            pass ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
                          }`}>
                            {r.score}/{r.total}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <span className="text-4xl mb-3">🎓</span>
                <p className="font-medium text-gray-600">No results yet</p>
                <p className="text-sm mt-1">No students have attempted any exam</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default TeacherDashboard;