//fetch elements from db.json
const fetchElements = async () => {
    const response = await fetch("http://localhost:3001/elements");
    const data = await response.json();
    return data;
};


//export Csv
const exportCsv = async () => {
    var example = await fetchElements();
    var x = new CSVExport(example,'sujet de veille');
    return false;
  }

document.getElementById("export").addEventListener("click", exportCsv);