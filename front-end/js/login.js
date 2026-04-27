document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://cron-backend-uhya.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);

      window.location.href = "dashboard.html";
    } else {
      document.getElementById("error").innerText = data.message;
    }

  } catch (err) {
    document.getElementById("error").innerText =
      "Blocked by CORS policy ❌";
  }
});