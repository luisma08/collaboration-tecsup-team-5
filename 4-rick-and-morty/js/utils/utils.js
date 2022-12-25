export const renderCharacters = (data) => {
    const charactersContainer = document.getElementById('charactersContainer');
    charactersContainer.innerHTML = '';
  
    data.forEach((element) => {
      const { id, name, status, species, type, gender, origin, location, image } = element;
  
      charactersContainer.innerHTML += `
        <div class="col-md-4" key=${id}>
          <div class="card bg-dark border border-2 border-light border-opacity-25 h-100 mx-auto"
            style="width: min(100%, 18rem);">
            <div class="card-header text-center">
              ${name}
            </div>
            <div class="card-body">
              <img src="${image}" class="card-img-top" alt="Anime 1" width="256" height="144"
                style="width: 100%; height: 192px; object-fit: cover; border-radius: 0.5rem"/>
              <h5 class="card-title mt-2">${name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${type || 'Chanchito'}</h6>
              <p class="card-text">
                <span class="badge text-bg-info">${status}</span>
                <span class="badge text-bg-primary">${species}</span>
                <span class="badge text-bg-secondary">${gender}</span>
              </p>
              <p class="card-text"><span class="text-info fw-bold">Origen:</span> ${origin.name}</p>
              <p class="card-text"><span class="text-info fw-bold">Ubicación:</span> ${location.name}</p>
            </div>
            <div class="card-footer text-center">
              <a href="${image}" target="_blank" rel="noopener noreferrer" class="card-link">Descargar imagen</a>
            </div>
          </div>
        </div>
      `;
    });
  };

  /*export const pagination = ({ info }) => {
    const previousCharacters = document.getElementById('previousCharacters');
    const nextCharacters = document.getElementById('nextCharacters');
    const pages = info['pages'];
    console.log(pages);
  };*/
  
  export const fetchReadCharacters = async (page = 1, name = '') => {
    const previousCharacters = document.getElementById('previousCharacters');
    const nextCharacters = document.getElementById('nextCharacters');

    try {

        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
        const pages = data.info['pages'];

        if(page == 1){
            previousCharacters.setAttribute('disabled', true);
            previousCharacters.classList.add('text-light', 'bg-dark');
        } else if (page == pages){
            nextCharacters.setAttribute('disabled', true);
            nextCharacters.classList.add('text-light', 'bg-dark');
        } else {
            previousCharacters.removeAttribute('disabled');
            nextCharacters.removeAttribute('disabled');
            previousCharacters.classList.remove('text-light', 'bg-dark');
            nextCharacters.classList.remove('text-light', 'bg-dark');
        }
        console.log('Numero de paginas en total');
        console.log(pages);
        console.log("numero de pagina: " + page);
        return data.results;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };