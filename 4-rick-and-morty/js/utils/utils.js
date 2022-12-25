export const renderCharacters = (data) => {
    const charactersContainer = document.getElementById('charactersContainer');
    charactersContainer.innerHTML = '';
  
    data.forEach((element) => {
      const { id, title, description, price, category, thumbnail} = element;
  
      charactersContainer.innerHTML += `
        <div class="col-md-4" key=${id}>
          <div class="card bg-dark border border-2 border-light border-opacity-25 h-100 mx-auto"
            style="width: min(100%, 18rem);">
            <div class="card-header text-center">
              ${title}
            </div>
            <div class="card-body">
              <img src="${thumbnail}" class="card-img-top" alt="Anime 1" width="256" height="144"
                style="width: 100%; height: 192px; object-fit: cover; border-radius: 0.5rem"/>
              <h5 class="card-title mt-2">${title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${category}</h6>
              <p class="card-text">
                <span class="badge text-bg-primary">${category}</span>
                <span class="badge text-bg-secondary">Precio $. ${price}</span>
              </p>
              <p class="card-text">${description}</p>
            </div>
            <div class="card-footer text-center">
              <a href="${thumbnail}" target="_blank" rel="noopener noreferrer" class="card-link">Agregar al carritos</a>
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
  
  export const fetchReadCharacters = async (limit = 10, skip = 1) => {
    const previousCharacters = document.getElementById('previousCharacters');
    const nextCharacters = document.getElementById('nextCharacters');

    try {

        const { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        //const pages = data.info['pages'];

        if(skip == 0){
            previousCharacters.setAttribute('disabled', true);
            previousCharacters.classList.add('text-light', 'bg-dark');
        } else if (limit == 30){
            nextCharacters.setAttribute('disabled', true);
            nextCharacters.classList.add('text-light', 'bg-dark');
        } else {
            previousCharacters.removeAttribute('disabled');
            nextCharacters.removeAttribute('disabled');
            previousCharacters.classList.remove('text-light', 'bg-dark');
            nextCharacters.classList.remove('text-light', 'bg-dark');
        }
        console.log("Limite: " +limit);
        console.log("Inicio: " +skip);
        return data.products;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };