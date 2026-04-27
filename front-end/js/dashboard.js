const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

if (!token) {
  window.location.href = "login.html";
}

// show username
document.getElementById("userName").innerText = "👤 " + username;
document.getElementById("welcomeUser").innerText = "Hello, " + username;

// SWITCH SECTIONS
function showSection(section) {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("dnsSection").style.display = "none";
  document.getElementById("settingsSection").style.display = "none";

  if (section === "dashboard") {
    document.getElementById("dashboardSection").style.display = "block";
    updateDashboard();
  }

  if (section === "dns") {
    document.getElementById("dnsSection").style.display = "block";
    loadRecords();
  }

  if (section === "settings") {
    document.getElementById("settingsSection").style.display = "block";
  }
}

// LOAD RECORDS
async function loadRecords() {
  const res = await fetch("https://cron-backend-uhya.onrender.com/api/dns", {
    headers: { Authorization: token }
  });

  const data = await res.json();

  const table = document.getElementById("recordsTable");
  table.innerHTML = "";

  data.forEach(r => {
    table.innerHTML += `
  <tr>
    <td>${r.domain}</td>
    <td>${r.ip}</td>
    <td>
      <button class="edit-btn" onclick="editRecord('${r._id}', '${r.domain}', '${r.ip}')">✏️ Edit</button>
      <button class="delete-btn" onclick="deleteRecord('${r._id}')">🗑 Delete</button>
    </td>
  </tr>
`
  });
}
// ADD / UPDATE
async function addOrUpdate() {
  const id = document.getElementById("recordId").value;
  const domain = document.getElementById("domain").value;
  const ip = document.getElementById("ip").value;

  const url = id
    ? `https://cron-backend-uhya.onrender.com/api/dns/${id}`
    : "https://cron-backend-uhya.onrender.com/api/dns/add";

  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ domain, ip })
  });

  loadRecords();
}

// EDIT
function editRecord(id, domain, ip) {
  document.getElementById("recordId").value = id;
  document.getElementById("domain").value = domain;
  document.getElementById("ip").value = ip;
}

// DELETE
async function deleteRecord(id) {
  await fetch(`https://cron-backend-uhya.onrender.com/api/dns/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  loadRecords();
}

// DASHBOARD
async function updateDashboard() {
  const res = await fetch("https://cron-backend-uhya.onrender.com/dns", {
    headers: { Authorization: token }
  });

  const data = await res.json();
  document.getElementById("totalRecords").innerText = data.length;
}

// SETTINGS
async function clearData() {
  alert("Feature can be extended (bulk delete)");
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// INIT
showSection("dashboard");

