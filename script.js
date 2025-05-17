const projects = [

   { //Motivait Master Work Project
    title: "Motivait Escape Room (Disseration Project)",
    role: "Gameplay/UI Programmer",
    image: "images/MotivaitImage.png",
    description: "A final project where i created a small escape room inspirated game for new members of staff to use to get affeliated with the company and office enviornment.",
    detailPath: "Projects/MotivaitProject.html"
   },

   { //Resident Evil 2 Project
    title: "Slot Based Inventory System",
    role: "Gameplay/UI Programmer",
    image: "images/RE2Project.gif",
    description: 'This project was to create a custom made inventory system using Unreal Engine and C++, inspired by Resident Evil and other survival horror games.',
    detailPath: "Projects/RE2Project.html"
  }
];

// DOM elements
const projectList = document.getElementById("projectList");
const detailSection = document.getElementById("projectDetail");
const detailContent = document.getElementById("detailContent");
const backButton = document.getElementById("backButton");

function showDetail(project) {
  projectList.style.display = "none";
  detailSection.style.display = "block";
  detailContent.innerHTML = "<p>Loading...</p>";

  if (project.detailPath) {
    fetch(project.detailPath)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load detail file.");
        return res.text();
      })
      .then(html => {
        detailContent.innerHTML = html;
      })
      .catch(err => {
        detailContent.innerHTML = `<p style="color: red;">Error loading detail view.</p>`;
        console.error(err);
      });
  } else {
    detailContent.innerHTML = project.detail || `
      <h2>${project.title}</h2>
      <img src="${project.image}" alt="${project.title}" style="width:100%; max-width:700px; border-radius:8px; margin-top:1rem;" />
      <p style="margin-top: 1rem;"><strong>${project.role}</strong></p>
      <p>${project.description}</p>
      <p style="margin-top:1rem;">
        <a href="${project.link}" target="_blank" style="color:#80deea;">External Link →</a>
      </p>
    `;
  }
}


// Back button functionality
backButton.addEventListener("click", () => {
  detailSection.style.display = "none";
  projectList.style.display = "grid";
});

// Render all project cards
projects.forEach(project => {
  const card = document.createElement("div");
  card.classList.add("project-card");

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-role">${project.role}</p>
      <p class="project-description">${project.description}</p>
      <button class="project-link">View Project →</button>
    </div>
  `;

  card.querySelector(".project-link").addEventListener("click", () => showDetail(project));
  projectList.appendChild(card);
});
