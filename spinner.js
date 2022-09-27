var spinner = document.querySelector("#spinner");
let random;


const fetchElements = async () => {
    const response = await fetch("http://localhost:3001/elements");
    const data = await response.json();
    await render(data);
    return data;
};



const render = async (elements) => {
    spinner.innerHTML = "";
    let arr = [];
    elements.forEach(element => {
        if (element.status === "notChoosed") {
            arr.push(element.id);
        }
    });

    //arr random
    random = arr[Math.floor(Math.random() * arr.length)];
    let randomElement = elements.find(element => element.id === random); //find random element      
    randomElement.style = "transform: scale(1.3)"; //
    await elements.map((e) => {
        if (e.status === "notChoosed") {
            var newSpin = document.createElement("div");
            newSpin.classList.add("scale-50");
            newSpin.classList.add("w-48");
            newSpin.classList.add("nodeChildrenSpinner");

            newSpin.innerHTML = `
            <div class="flex w-48 rounded-3xl px-4 h-48 scale-50 text-base flex-col  shadow-lg shadow-white p-3 ${(e.id == random) ? 'bg-yellow-400 text-white h-52 -mt-2' : 'bg-white'} ${(e.status != 'notChoosed') ? 'bg-gray-200' : ''}" id="id_${e.id}" >
            <h3 class="text-2xl font-semibold items-baseline whitespace-nowrap">${e.fullName}</h3>
           
            ${(e.status != 'notChoosed') ? ('<hr class="border-white"/><p class="text-black mt-2">' + e.date + '</p>') : ''}
            </div>
            `;
            document.getElementById('spinnerWinner').innerHTML = randomElement.fullName
            document.getElementById('spinnerWinnerId').value = randomElement.id
            spinner.appendChild(newSpin);
        }
    });
    scrollToElement(randomElement.id);
};



//scroll to
const scrollToElement = (id) => {
    let childrenPos = document.getElementById('id_' + id).offsetLeft; //get position of element     
    let parentPos = document.getElementById("spinner").offsetLeft; //get position of parent

    spinner.scrollTo({
        left: childrenPos - parentPos - 150, 
        behavior: 'smooth' 
    })

};





spinner.addEventListener('scroll', () => {
    let nodeChildren = document.querySelectorAll("nodeChildrenSpinner");
   
    nodeChildren.forEach((e) => {
        if (e.offsetLeft < spinner.scrollLeft + spinner.clientWidth) {
            //scale
            e.style.transform = `scale(0.2)`;
            e.style.transition = `transform 0.5s`;
        } else {
            //scale
            e.style.transform = `scale(0.9)`;
            e.style.transition = `transform 0.5s`;
        }
    })

})




//onclick rendomize
var elements = fetchElements();

//add event listener to randomize button
const randomizeButton = document.querySelector("#btnSpinner");
randomizeButton.addEventListener("click", fetchElements);


fetchElements();
document.querySelector("#btnAdd").addEventListener("click", fetchElements);