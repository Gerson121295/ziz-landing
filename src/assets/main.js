

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCjp3Drc86ONtXL-W6PzJsnw&part=snippet%2Cid&order=date&maxResults=7';

const content = null || document.getElementById('content'); //referencia donde queremos agregar los elementos html

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '42a9a4baefmsh12ded504da79aabp1bc418jsn7ff3c50a5496',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


/* fetch('', options)
	.then(response => response.json()) //obtenemos respuesta y la transformamos en JSON
	.then(response => console.log(response)) //Mostramos los elementos
	.catch(err => console.error(err));
 */

    async function fetchData(urlApi){
        const response = await fetch(urlApi, options);
        const data = await response.json();
        return data;
    }

    //LLamar una funcion que se invoca ella misma aunque se puede hacer una funcion para despues llamarla
   //va a permitir automaticamente cuando carga el archivo ejecutar nuestra funcion
    (async() =>{
        try{
            const videos = await fetchData(API);
            //template html para que itere por cada uno de los elementos que esta en la respuesta, estos elementos va a ser representados en el HTML
            // Estrucura de como se representa un item - copiado de index.html
            let view = `
            ${videos.items.map(video => `

            <div class="group relative">
         
            <a href="https://youtube.com/watch?v=${video.id.videoId}">
                <div               
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                               
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
                </a>              
            </div> 
            
            

            `).slice(0,4).join('')}      
            `;    
            content.innerHTML = view;    
        }catch (error){
            console.log(error);
        }

    })();

