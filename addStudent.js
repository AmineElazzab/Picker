var tableContent = document.querySelector(".tableContent");

const getInput = () => {
  let fullname = document.getElementById("fullname").value;
  let brief = document.getElementById("brief").value;
  let element = {
    id: `${Math.floor(Math.random() * 10)}${Date.now()}`, //generate random id  with date now and random number between 0 and 10 
    fullName: fullname,
    brief: brief,
    status: "notChoosed",
    date: "Null",
  };
  console.log(element);
  addElement(element);
};

document.querySelector("#btnAdd").addEventListener("click", getInput); //fetch elements when page is loaded 

//fetch elements
const fetchElements = async () => {
  const response = await fetch("http://localhost:3001/elements");
  const data = await response.json();
  await render(data);
  return data;
};

fetchElements();

//add elements to json
const addElement = async (element) => {
  const res = await fetch("http://localhost:3001/elements", {
    method: "POST",
    headers: {
      "Content-type": "application/json",    //send data in json format          
    },
    body: JSON.stringify(element),    //convert data to json  
  });
  const data = await res.json();  //convert data to json      
  console.log(data);
  render(fetchElements());
};

const render = (elements) => {
  tableContent.innerHTML = "";
  elements.map((e, idx) => {
    var newTd = document.createElement("tr");
    newTd.classList.add("hover:bg-white");
    newTd.innerHTML = `
        <td class="text-center text-black">${e.fullName}</td>
        <td class="text-center text-black">
        <span class="bg-yellow-400  py-1 px-3 rounded-full text-base">${e.brief}</span>
        </td>
        <td class="text-center text-black">${e.status !== "notChoosed" ? e.status : "not yet"
      }</td>
      <td class="py-3 px-6 text-center">
      <span class="bg-yellow-400 py-1 px-3 rounded-full text-base">${e.date}</span>
        </td>
        <td class="p-2 flex justify-center text-black">
        <button class="p-1  rounded-md bg-yellow-400 text-black px-3 focus:scale-95 btnReset" id="${e.id}">Reset</button>
        </td>
        `;
    tableContent.appendChild(newTd);
  });
  console.log(elements);
  addEventListenerToReset();
};

const addEventListenerToReset = () => {
  const btnReset = document.querySelectorAll(".btnReset");
  btnReset.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      resetElement(e.target.id);
    });
  });
};

//edit date from date input to json
const updateElement = async (element) => {
  const res = await fetch(`http://localhost:3001/elements/${element.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await res.json();
  render(fetchElements());
};

//reset one element
const resetElement = async (idElement) => {
  let elements = await fetchElements();
  elements.map((e) => {
    if (e.id === idElement) {
      e.status = "notChoosed";
      e.date = "";
      updateElement(e);
    }
  });
};

const changeDate = async () => {
  let elements = await fetchElements();
  elements.map((e) => {
    var idElement = document.getElementById("spinnerWinnerId").value;
    console.log(idElement);
    if (e.id === idElement) {
      e.date = document.getElementById("datePickerInput").value;
      e.status = "choosed";
      updateElement(e);
    }
  });
};

document.querySelector("#ChooseBtn").addEventListener("click", changeDate);
