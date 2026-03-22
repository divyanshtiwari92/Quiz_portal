import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:5000/api/exam")
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.log(err));

    fetch(`http://localhost:5000/api/result/${storedUser.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("RESULTS:", data);
        setResults(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    if (!storedUser || role !== "student") {
      navigate("/");
      return;
    }

    setUser(storedUser);
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  const attemptedExamIds = results.map(r => String(r.examId));
const availableExams = exams.filter(
  exam =>
    !attemptedExamIds.includes(String(exam._id)) &&
    exam.section === user.section
);
  const examMap = {};
  exams.forEach((exam) => {
    examMap[exam._id] = exam.subject;
  });

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
  const avgPercent = totalPossible > 0
    ? Math.round((totalScore / totalPossible) * 100)
    : null;

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

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Profile</h3>

            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-3">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <p className="font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-indigo-500 mt-0.5">{user.rollNo}</p>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Section</span>
                <span className="font-medium text-gray-700">{user.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Roll No</span>
                <span className="font-medium text-gray-700">{user.rollNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Role</span>
                <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">Student</span>
              </div>
             
            </div>
          </div>

          {/* Available Exams */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Exams</h3>
             
            </div>

            {availableExams.length > 0 ? (
              <div className="space-y-3">
                {availableExams.map((exam) => (
                  <div
                    key={exam._id}
                    onClick={() => navigate(`/quiz/${exam._id}`)}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-indigo-700 text-sm">{exam.subject}</p>
                      <p className="text-xs text-gray-400 mt-0.5">⏱ {exam.duration} mins · Section {exam.section}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                <span className="text-4xl mb-3">🎉</span>
                <p className="font-medium text-gray-600">All exams completed!</p>
                <p className="text-sm mt-1">Check your results below</p>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((r, index) => {
                const percent = Math.round((r.score / r.total) * 100);
                const isPass = percent >= 33;
                return (
                  <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold text-gray-800 text-sm leading-tight">
                        {examMap[String(r.examId)] || "Unknown Subject"}
                      </p>
                     
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Score</span>
                      <span className="font-semibold text-gray-600">{r.score}/{r.total}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div
                        className={`h-2 rounded-full ${isPass ? "bg-emerald-500" : "bg-red-400"}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className={`text-right text-xs font-bold ${isPass ? "text-emerald-600" : "text-red-500"}`}>
                      {percent}%
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <span className="text-4xl mb-3">📭</span>
              <p className="font-medium text-gray-600">No results yet</p>
              <p className="text-sm mt-1">Attempt an exam to see your scores here</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;