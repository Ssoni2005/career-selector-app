const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const state = {
  stream: "pcm",
  interest: "technology",
  work: "analytical",
  duration: "degree",
  exam: "medium",
  priority: "job",
};

const labels = {
  stream: {
    pcm: "Science PCM",
    pcb: "Science PCB",
    commerce: "Commerce",
    arts: "Arts / Humanities",
  },
  interest: {
    technology: "Technology",
    health: "Healthcare",
    business: "Business & Finance",
    creative: "Creative & Media",
    law: "Law & Society",
    service: "Public Service",
    science: "Science & Nature",
    hospitality: "Hospitality & Travel",
  },
  work: {
    analytical: "Logic & problem solving",
    people: "Helping people",
    creative: "Creating & communicating",
    practical: "Hands-on / field work",
    leadership: "Business & leadership",
  },
  duration: { short: "1–2 years", degree: "3–4 years", long: "5+ years" },
  exam: {
    low: "Direct / moderate admission preferred",
    medium: "Comfortable with entrance tests",
    high: "Ready for highly competitive exams",
  },
  priority: {
    job: "Early employment",
    professional: "Professional career",
    government: "Government / public service",
    flexible: "Broad and flexible degree",
  },
};

// Eligibility is a hard gate. A pathway is never shown when the selected stream is not listed here.
const pathways = [
  {
    id: "engineering",
    title: "Engineering & Technology",
    icon: "⚙️",
    streams: ["pcm"],
    interests: ["technology"],
    works: ["analytical", "practical"],
    durations: ["degree", "long"],
    exam: "medium",
    priorities: ["job", "professional"],
    route: "B.Tech / B.E. / Architecture",
    years: "4–5 years",
    admission: "JEE, state CET or institute admission",
    eligibility: "PCM required for most engineering and architecture routes",
    courses: ["B.Tech", "B.E.", "B.Arch"],
    next: "Compare branches and verify Mathematics, entrance and institute eligibility.",
  },
  {
    id: "engineeringDiploma",
    title: "Engineering Diploma",
    icon: "🛠️",
    streams: ["pcm"],
    interests: ["technology"],
    works: ["practical", "analytical"],
    durations: ["short", "degree"],
    exam: "low",
    priorities: ["job"],
    route: "Diploma in Engineering",
    years: "3 years, with possible lateral entry later",
    admission: "Polytechnic / state admission",
    eligibility: "Science and Mathematics requirements vary by board/state",
    courses: ["Mechanical", "Civil", "Electrical", "Computer diploma"],
    next: "Check local polytechnic eligibility and lateral-entry options.",
  },
  {
    id: "computer",
    title: "Computer Applications & IT",
    icon: "💻",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["technology", "business"],
    works: ["analytical", "creative"],
    durations: ["degree"],
    exam: "low",
    priorities: ["job", "flexible"],
    route: "BCA / BSc CS / BSc IT",
    years: "3–4 years",
    admission: "CUET / university admission",
    eligibility: "Mathematics requirements vary by institution and course",
    courses: ["BCA", "BSc Computer Science", "BSc IT"],
    next: "Verify whether Mathematics is required by each institution before applying.",
  },
  {
    id: "medicine",
    title: "Medicine & Dentistry",
    icon: "🩺",
    streams: ["pcb"],
    interests: ["health"],
    works: ["people", "analytical"],
    durations: ["long"],
    exam: "high",
    priorities: ["professional"],
    route: "MBBS / BDS / AYUSH",
    years: "5–6 years",
    admission: "NEET and counselling",
    eligibility: "PCB and NEET eligibility required",
    courses: ["MBBS", "BDS", "BAMS", "BHMS"],
    next: "Check current NEET rules, expected score, fees and long-study commitment.",
  },
  {
    id: "allied",
    title: "Allied Health & Nursing",
    icon: "🧪",
    streams: ["pcb"],
    interests: ["health"],
    works: ["people", "practical", "analytical"],
    durations: ["degree"],
    exam: "medium",
    priorities: ["job", "professional"],
    route: "BSc Nursing / BPT / Allied Health",
    years: "3–4.5 years",
    admission: "State, university or programme-specific entrance",
    eligibility: "PCB is commonly required; exact rules vary",
    courses: [
      "BSc Nursing",
      "Physiotherapy",
      "Medical Lab Technology",
      "Radiology",
    ],
    next: "Compare clinical training, internship and registration requirements.",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    icon: "💊",
    streams: ["pcb", "pcm"],
    interests: ["health", "science"],
    works: ["analytical", "practical"],
    durations: ["short", "degree"],
    exam: "medium",
    priorities: ["job", "professional"],
    route: "D.Pharm / B.Pharm",
    years: "2–4 years",
    admission: "State / university admission",
    eligibility: "PCM or PCB accepted in many programmes; verify local rules",
    courses: ["D.Pharm", "B.Pharm"],
    next: "Check state admission and pharmacy council recognition.",
  },
  {
    id: "pureScience",
    title: "Pure Science & Research",
    icon: "🔬",
    streams: ["pcm", "pcb"],
    interests: ["science", "technology", "health"],
    works: ["analytical"],
    durations: ["degree", "long"],
    exam: "medium",
    priorities: ["flexible", "professional"],
    route: "BSc / BS / Integrated MSc",
    years: "3–5 years",
    admission: "CUET / IISER / university admission",
    eligibility: "Subject-specific eligibility depends on the chosen science",
    courses: ["Physics", "Chemistry", "Mathematics", "Biology"],
    next: "Choose the subject you genuinely want to study beyond graduation.",
  },
  {
    id: "agriculture",
    title: "Agriculture & Environment",
    icon: "🌿",
    streams: ["pcb", "pcm"],
    interests: ["science"],
    works: ["practical", "analytical"],
    durations: ["degree"],
    exam: "medium",
    priorities: ["job", "government", "flexible"],
    route: "BSc Agriculture / Food / Environment",
    years: "3–4 years",
    admission: "ICAR, CUET, state or university admission",
    eligibility: "Science eligibility varies by programme and state",
    courses: [
      "BSc Agriculture",
      "Food Technology",
      "Forestry",
      "Environmental Science",
    ],
    next: "Verify subject requirements and field/lab facilities.",
  },
  {
    id: "commerceDegree",
    title: "Commerce & Management",
    icon: "💼",
    streams: ["commerce", "pcm", "pcb", "arts"],
    interests: ["business"],
    works: ["leadership", "analytical", "people"],
    durations: ["degree"],
    exam: "low",
    priorities: ["job", "flexible"],
    route: "B.Com / BBA / BMS / Economics",
    years: "3–4 years",
    admission: "CUET / university admission",
    eligibility:
      "Open to multiple streams; Economics/Maths requirements may vary",
    courses: ["B.Com", "BBA", "BMS", "BA Economics"],
    next: "Compare curriculum, internships and placement evidence.",
  },
  {
    id: "professionalFinance",
    title: "CA / CS / CMA",
    icon: "📚",
    streams: ["commerce", "pcm", "pcb", "arts"],
    interests: ["business", "law"],
    works: ["analytical", "leadership"],
    durations: ["long", "degree"],
    exam: "high",
    priorities: ["professional"],
    route: "Professional foundation and staged examinations",
    years: "Usually 3–5+ years",
    admission: "Institute-specific foundation/executive stages",
    eligibility:
      "Available after Class 12; stream advantage differs by programme",
    courses: ["CA", "CS", "CMA"],
    next: "Read the official exam structure and choose accounting, governance or costing focus.",
  },
  {
    id: "law",
    title: "Law",
    icon: "⚖️",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["law", "business", "service"],
    works: ["creative", "analytical", "people"],
    durations: ["long"],
    exam: "medium",
    priorities: ["professional", "government"],
    route: "BA LLB / BBA LLB / other integrated law",
    years: "5 years",
    admission: "CLAT, AILET or university entrance",
    eligibility: "Open to all streams subject to marks and entrance rules",
    courses: ["BA LLB", "BBA LLB", "BCom LLB"],
    next: "Practise reading, logical reasoning and verify entrance requirements.",
  },
  {
    id: "humanities",
    title: "Humanities & Social Sciences",
    icon: "📖",
    streams: ["arts", "commerce", "pcm", "pcb"],
    interests: ["law", "service", "creative"],
    works: ["creative", "people", "analytical"],
    durations: ["degree"],
    exam: "low",
    priorities: ["flexible", "government"],
    route: "BA in Humanities / Social Sciences",
    years: "3–4 years",
    admission: "CUET / university admission",
    eligibility: "Open to several streams; subject conditions vary",
    courses: ["Psychology", "Political Science", "Sociology", "English"],
    next: "Choose a subject based on genuine interest and postgraduate plans.",
  },
  {
    id: "design",
    title: "Design, Fashion & Animation",
    icon: "🎨",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["creative", "technology"],
    works: ["creative", "practical"],
    durations: ["short", "degree"],
    exam: "medium",
    priorities: ["job", "professional"],
    route: "B.Des / BFA / specialised diploma",
    years: "2–4 years",
    admission: "NID, NIFT, UCEED or portfolio-based admission",
    eligibility:
      "Most streams accepted; specific programmes may set subject rules",
    courses: ["B.Des", "BFA", "Fashion Design", "Animation & VFX"],
    next: "Build a portfolio and verify institute accreditation and placements.",
  },
  {
    id: "media",
    title: "Journalism & Media",
    icon: "🎙️",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["creative", "law"],
    works: ["creative", "people"],
    durations: ["degree"],
    exam: "low",
    priorities: ["job", "flexible"],
    route: "Journalism / Mass Communication / Film",
    years: "3–4 years",
    admission: "CUET / university / interview or portfolio",
    eligibility: "Generally open to all streams",
    courses: ["Journalism", "Mass Communication", "Film", "Public Relations"],
    next: "Create a sample article, video or podcast before choosing the course.",
  },
  {
    id: "teaching",
    title: "Teaching & Education",
    icon: "👩‍🏫",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["service", "science", "law"],
    works: ["people", "creative"],
    durations: ["degree", "long"],
    exam: "medium",
    priorities: ["government", "professional"],
    route: "Integrated teacher education or Degree + B.Ed",
    years: "4–5 years",
    admission: "CUET / state / university admission",
    eligibility: "Choose a degree subject you are eligible to teach later",
    courses: ["Integrated BA/BSc-B.Ed", "Degree + B.Ed"],
    next: "Select the school subject you want to teach and verify teacher-education rules.",
  },
  {
    id: "defence",
    title: "Defence Services",
    icon: "🛡️",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["service"],
    works: ["practical", "leadership", "people"],
    durations: ["degree", "long"],
    exam: "high",
    priorities: ["government", "professional"],
    route: "NDA / service-specific entry / Degree + CDS",
    years: "Training varies",
    admission: "Official UPSC or service recruitment process",
    eligibility:
      "Branch, age, subjects and medical standards differ; Navy/Air Force technical routes often require PCM",
    courses: ["NDA", "Service entry", "Degree + CDS/AFCAT"],
    next: "Check the latest official notification for age, branch, subjects and medical standards.",
  },
  {
    id: "hospitality",
    title: "Hospitality, Culinary & Travel",
    icon: "🏨",
    streams: ["pcm", "pcb", "commerce", "arts"],
    interests: ["hospitality", "business"],
    works: ["people", "practical", "leadership"],
    durations: ["short", "degree"],
    exam: "low",
    priorities: ["job"],
    route: "Hotel Management / Culinary / Travel",
    years: "1–4 years",
    admission: "NCHM / university / diploma admission",
    eligibility: "Generally open to all streams",
    courses: ["Hotel Management", "Culinary Arts", "Travel & Tourism"],
    next: "Evaluate internships, customer-facing work and shift requirements.",
  },
];

function isEligible(p) {
  return p.streams.includes(state.stream);
}
function score(p) {
  let s = 0,
    reasons = [];
  if (p.interests.includes(state.interest)) {
    s += 50;
    reasons.push(labels.interest[state.interest]);
  }
  if (p.works.includes(state.work)) {
    s += 20;
    reasons.push(labels.work[state.work]);
  }
  if (p.durations.includes(state.duration)) {
    s += 12;
    reasons.push(labels.duration[state.duration] + " study preference");
  }
  const examLevel = { low: 1, medium: 2, high: 3 };
  if (examLevel[state.exam] >= examLevel[p.exam]) {
    s += 8;
    reasons.push("entrance preference compatible");
  } else s -= 8;
  if (p.priorities.includes(state.priority)) {
    s += 10;
    reasons.push(labels.priority[state.priority]);
  }
  // modest fallback weighting when interest is adjacent but stream eligibility is valid
  if (!p.interests.includes(state.interest)) {
    const adjacent = {
      technology: ["science", "business"],
      health: ["science"],
      business: ["law", "hospitality"],
      creative: ["technology", "law"],
      law: ["service", "business"],
      service: ["law", "science"],
      science: ["technology", "health"],
      hospitality: ["business"],
    };
    if ((adjacent[state.interest] || []).some((x) => p.interests.includes(x)))
      s += 18;
  }
  return { ...p, score: s, reasons: [...new Set(reasons)] };
}
function results() {
  return pathways
    .filter(isEligible)
    .map(score)
    .sort((a, b) => b.score - a.score);
}
function fitLabel(r, i) {
  if (i === 0 && r.score >= 70) return "STRONG FIT";
  if (i === 0) return "BEST AVAILABLE";
  if (r.score >= 55) return "GOOD ALTERNATIVE";
  return "ELIGIBLE ALTERNATIVE";
}
function updateInterestAvailability() {
  const possible = {};
  pathways
    .filter(isEligible)
    .forEach((p) => p.interests.forEach((i) => (possible[i] = true)));
  $$('[data-group="interest"]').forEach((b) => {
    const ok = !!possible[b.dataset.value];
    b.classList.toggle("recommended", ok);
    b.classList.toggle("unavailable", !ok);
  });
  if (!possible[state.interest]) {
    const first = $$('[data-group="interest"]').find(
      (b) => possible[b.dataset.value],
    );
    if (first) {
      state.interest = first.dataset.value;
      $$('[data-group="interest"]').forEach((x) =>
        x.classList.toggle("selected", x === first),
      );
    }
  }
}
function update() {
  state.duration = $("#duration").value;
  state.exam = $("#exam").value;
  updateInterestAvailability();
  const list = results();
  const r = list[0];
  $("#productIcon").textContent = r.icon;
  $("#productTitle").textContent = r.title;
  $("#productReason").textContent =
    `Eligible from ${labels.stream[state.stream]}. Ranked using your interest, preferred work style and study preference.`;
  $("#routeResult").textContent = r.route;
  $("#durationResult").textContent = r.years;
  $("#entranceResult").textContent = r.admission;
  $("#eligibilityResult").textContent = r.eligibility;
  $("#matchTag").textContent = fitLabel(r, 0);
  $("#whyChips").innerHTML = (
    r.reasons.length ? r.reasons : ["Stream eligibility"]
  )
    .map((x) => `<i>${x}</i>`)
    .join("");
  $("#nextStep").textContent = r.next;
  $("#heroMatch").textContent = r.title;
  render(list.slice(0, 3));
  updateProgress();
}
function render(list) {
  $("#rankedGrid").innerHTML = list
    .map(
      (r, i) =>
        `<article class="rank-card"><div class="rank-top"><div><span class="rank-label">#${i + 1} · ${fitLabel(r, i)}</span><h3>${r.icon} ${r.title}</h3></div></div><p>${r.eligibility}</p><div class="rank-meta"><div><span>Route</span><b>${r.route}</b></div><div><span>Duration</span><b>${r.years}</b></div><div><span>Admission</span><b>${r.admission}</b></div></div><div class="rank-flags">${r.courses.map((x) => `<i>${x}</i>`).join("")}</div><div class="safe-note">✓ Eligible pathway for the selected stream; verify institution-specific rules.</div></article>`,
    )
    .join("");
}
function updateProgress() {
  const pct = 100;
  $("#progressText").textContent = pct + "%";
  $("#progressBar").style.width = pct + "%";
}
$$("[data-group]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const group = btn.dataset.group;
    $$(`[data-group="${group}"]`).forEach((x) =>
      x.classList.remove("selected"),
    );
    btn.classList.add("selected");
    state[group] = btn.dataset.value;
    update();
  }),
);
["duration", "exam"].forEach((id) =>
  $("#" + id).addEventListener("change", update),
);
$$("[data-scroll]").forEach(
  (b) =>
    (b.onclick = () =>
      document
        .querySelector(b.dataset.scroll)
        .scrollIntoView({ behavior: "smooth" })),
);
function buildPrint() {
  const list = results().slice(0, 3),
    r = list[0];
  $("#printDate").textContent =
    "Generated on " +
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  $("#printTitle").textContent = r.title;
  $("#printReason").textContent = r.eligibility;
  $("#printStream").textContent = labels.stream[state.stream];
  $("#printInterest").textContent = labels.interest[state.interest];
  $("#printWork").textContent = labels.work[state.work];
  $("#printPreference").textContent =
    `${labels.duration[state.duration]}; ${labels.exam[state.exam]}`;
  $("#printPortfolio").innerHTML = list
    .map(
      (x, i) =>
        `<div class="print-portfolio-item"><b>#${i + 1} ${x.title}</b><span>${x.route} · ${x.years} · ${x.admission}</span></div>`,
    )
    .join("");
}
$("#printBtn").onclick = () => {
  buildPrint();
  setTimeout(() => window.print(), 80);
};
update();
