// console.log('Connected');

const loadData = (word) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    // console.log(URL);
    fetch(URL)
        .then(rep => rep.json())
        .then(data => displayData(data))

}
const displayData = (data) => {
    const targetElement = document.getElementById('detailsContainer')
    // console.log(data);
    data.forEach(element => {
        targetElement.innerHTML = " ";
        console.log();
        // noun 
        const noun1 = element.meanings[0]?.definitions[0]?.definition;
        const noun2 = element.meanings[0]?.definitions[1]?.definition;
        const noun3 = element.meanings[0]?.definitions[2]?.definition;
        // console.log(noun3);


        //synonyms
        const synonyms = element.meanings[0].synonyms;
        let allsynonyms =''
        synonyms.forEach(word => {
            // console.log(word);
            allsynonyms = allsynonyms +' , '+ word;
        })

        //audiosrc , phonetic
        // console.log(allsynonyms);
        let audiosrc = '';
        let phonetic = '';
        element.phonetics.forEach(srlL => {
              
            if (srlL.audio) {
                audiosrc = srlL.audio;
                 
            };
            
            if (srlL.text) {
                // console.log(srlL.text);
                phonetic = srlL.text;
            }
            else {
                phonetic = 'Not Found';
            }
                
        })
        //?creat 
        const div = document.createElement('div')
        div.classList = 'bg-white border-2 p-6'
        div.innerHTML = `
        <div class="flex items-center justify-between">
        <div>
            <h1 class="text-6xl text-black">${element.word}</h1>
            <p class="text-2xl my-4 text-black" style="font-family: 'Source Code Pro', monospace;">${phonetic}
            </p>
        </div>
        <audio controls id="audio" src="${audiosrc}"></audio>
        <button onclick="audio.play()" class="rounded-2xl">
        <i class="fa-solid fa-play fa-4x text-blue-800"></i>
        </button>
    </div>
    <div class="flex items-center justify-center gap-1">
        <h3 class="-mt-2" style="font-family: 'Source Code Pro', monospace;">noun</h3>
        <div class="bg-black h-1 w-[100%] opacity-5"></div>
    </div>
    <div>
        <h6 class="my-6">Meaning</h6>
        <ul class=" ml-8">
            <li class="my-7">
               ${noun1?noun1:" "}
            </li>
            <li class="my-7">
               ${noun2?noun2:''}
            </li>
            <li class="my-7">
               ${noun3?noun3:''}
            </li>
        </ul>
    </div>
    <div>
        <h6 class="my-6">Synonyms: <span class="text-violet-600">${allsynonyms}</span></h6>
    </div>
   
 
    <div class="bg-black h-1 w-[100%] opacity-5"></div>
    <p class="mt-7">Source:<a herf="${allsynonyms}">${element.sourceUrls[0]}</a></p>
        
        `

        targetElement.appendChild(div)
    });


}





const proccessInput = () => {
    const inputFeildValue = document.getElementById('inputValue').value
    // console.log(inputFeildValue);
    document.getElementById('inputValue').value = '';
    loadData(inputFeildValue)
}


document.getElementById('searchBtn').addEventListener('click', function () {
    proccessInput();
})
document.getElementById('inputValue').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {

        proccessInput();

    }
})