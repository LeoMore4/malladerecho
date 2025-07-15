const subjects = {
  // PRIMER AÑO
  "Teoría general del derecho": {
    year: 1,
    unlocks: ["derecho penal y procesal penal"]
  },
  "elementos del derecho civil,parte General": {
    year: 1,
    unlocks: ["obligaciones civiles y comerciales", "elementos del derecho comercial"]
  },
  "Derechos humanos y garantías": {
    year: 1,
    unlocks: ["derecho penal y procesal penal", "derecho administrativo", "derecho internacional público"]
  },
  "Teoría del estado": {
    year: 1,
    unlocks: ["derecho constitucional"]
  },
  "análisis económico y financiero": {
    year: 1,
    unlocks: []
  },

  // SEGUNDO AÑO
  "derecho constitucional": {
    year: 2,
    unlocks: ["derecho administrativo", "derecho del trabajo y la seguridad social", "derecho internacional público"]
  },
  "derecho penal y procesal penal": {
    year: 2,
    unlocks: ["finanzas públicas y derecho tributario"]
  },
  "obligaciones civiles y comerciales": {
    year: 2,
    unlocks: ["contratos civiles y comerciales", "elementos del derechos reales", "elementos del derecho procesal civil", "derecho administrativo"]
  },
  "elementos del derecho comercial": {
    year: 2,
    unlocks: ["sociedades civiles y comerciales", "derecho internacional privado"]
  },

  // TERCER AÑO
  "derecho administrativo": {
    year: 3,
    unlocks: ["finanzas públicas y derecho tributario"]
  },
  "elementos del derecho procesal civil": {
    year: 3,
    unlocks: []
  },
  "contratos civiles y comerciales": {
    year: 3,
    unlocks: ["derecho del trabajo y la seguridad social", "derecho internacional público", "familia y sucesiones", "sociedades civiles y comerciales"]
  },
  "elementos del derechos reales": {
    year: 3,
    unlocks: ["familia y sucesiones"]
  },

  // CUARTO AÑO
  "Derecho del trabajo y la seguridad social": {
    year: 4,
    unlocks: []
  },
  "Derecho internacional público": {
    year: 4,
    unlocks: []
  },
  "familia y sucesiones": {
    year: 4,
    unlocks: ["derecho internacional privado"]
  },
  "sociedades civiles y comerciales": {
    year: 4,
    unlocks: ["finanzas públicas y derecho tributario"]
  },

  // QUINTO AÑO
  "finanzas públicas y derecho tributario": {
    year: 5,
    unlocks: []
  },
  "derecho internacional privado": {
    year: 5,
    unlocks: []
  },
  "nivel único de idioma": {
    year: 5,
    unlocks: []
  }
};

const grid = document.getElementById("grid");
const state = {};

function createSubject(name, data) {
  const div = document.createElement("div");
  div.classList.add("subject", "locked");
  div.innerText = name;
  div.dataset.name = name;
  grid.appendChild(div);

  state[name] = {
    element: div,
    completed: false,
    locked: true
  };
}

// Inicializar materias
Object.entries(subjects).forEach(([name, data]) => {
  createSubject(name, data);
});

// Desbloquear ramos sin requisitos
["Teoría general del derecho",
 "elementos del derecho civil,parte General",
 "Derechos humanos y garantías",
 "Teoría del estado",
 "análisis económico y financiero"].forEach(name => {
  state[name].locked = false;
  state[name].element.classList.remove("locked");
});

function unlock(subjectName) {
  const subject = state[subjectName];
  if (!subject || subject.completed || subject.locked) return;

  subject.completed = true;
  subject.element.classList.remove("locked");
  subject.element.classList.add("completed");

  const unlocks = subjects[subjectName].unlocks || [];
  unlocks.forEach(name => {
    const target = state[name];
    if (target) {
      target.locked = false;
      target.element.classList.remove("locked");
    }
  });
}

// Evento click
Object.keys(state).forEach(name => {
  state[name].element.addEventListener("click", () => {
    if (!state[name].locked) {
      unlock(name);
    }
  });
});
