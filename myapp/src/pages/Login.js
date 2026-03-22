import { useState } from "react";
function Login() {
  const [role, setRole] = useState("student");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
  const handleLogin = async () => {
    if (!loginId || !password) {
      alert("Please fill all fields");
      return;
    }
    const isStudent = role === "student";
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/${role}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isStudent
              ? { rollNo: loginId, password }
              : { employeeId: loginId, password }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);

      if (data.role === "student") {
        window.location.href = "/student";
      } else {
        window.location.href = "/teacher";
      }
    } catch (err) {
      alert("Server not reachable");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📘</div>
          <h1 className="text-2xl font-bold text-gray-800">QuizPortal</h1>
          <p className="text-sm text-gray-400 mt-1">SKIT Jaipur</p>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            👨‍🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("teacher")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              role === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            👩‍🏫 Teacher
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              {role === "student" ? "Roll Number" : "Employee ID"}
            </label>
            <input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder={role === "student" ? "Enter Roll Number" : "Enter Employee ID"}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-2"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">Quiz Portal · Academic Project</p>
      </div>
    </div>
  );
}

export default Login;