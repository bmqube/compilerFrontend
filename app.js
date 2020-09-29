const code = document.getElementById("code");
const languageBody = document.getElementById("languages");
const stdin = document.getElementById("stdin");
const url = "https://compilekor.herokuapp.com/";
const urlExecute = url + "execute";
const urlRemaining = url + "remaining";

const stdout = document.getElementById("stdout");
const time = document.getElementById("time");
const memory = document.getElementById("memory");
const runButton = document.getElementById("runButton");

function runCode() {
  if (runButton.innerText === "Run Your Code") {
    runButton.innerText = "Close";
    runButton.className = "btn btn-danger";
  } else {
    runButton.innerText = "Run Your Code";
    runButton.className = "btn btn-primary";
  }

  const collapse = document.getElementById("collapseStdout");
  if (code.value && !collapse.classList.contains("show")) {
    const tmp = languageBody.value.split("_");
    const language = tmp[0];
    const version = parseInt(tmp[1]);

    fetch(urlExecute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code.value,
        stdin: stdin.value,
        language: language,
        version: version,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        stdout.innerText = data["output"];
        time.innerText = `Execution Time: ${data["cpuTime"]}`;
        memory.innerText = `Memory Used: ${data["memory"]}`;
      });
    // } else if () {
  } else {
    stdout.innerText = "Code is empty :/";
  }
}

fetch(urlRemaining, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("remaining").innerText = 200 - data["used"];
  });

const languages = [
  {
    name: "C",
    lang: "c",
    version: 4,
  },
  {
    name: "C++",
    lang: "cpp",
    version: 4,
  },
  {
    name: "C++ 17",
    lang: "cpp17",
    version: 0,
  },
  {
    name: "Java",
    lang: "java",
    version: 3,
  },
  {
    name: "Python 2",
    lang: "python2",
    version: 2,
  },
  {
    name: "Python 3",
    lang: "python3",
    version: 3,
  },
  {
    name: "Node Js",
    lang: "nodejs",
    version: 3,
  },
  {
    name: "C#",
    lang: "csharp",
    version: 3,
  },
  {
    name: "Kotlin",
    lang: "kotlin",
    version: 2,
  },
  {
    name: "Objective C",
    lang: "objc",
    version: 3,
  },
  {
    name: "PHP",
    lang: "php",
    version: 3,
  },
];

for (let i = 0; i < languages.length; i++) {
  const language = languages[i];
  languageBody.innerHTML += `<option value="${language.lang}_${language.version}">${language.name}</option>`;
}
