export const renderProducts = (data) => {
    const charactersContainer = document.getElementById('charactersContainer');
    charactersContainer.innerHTML = '';
  
    data.forEach((element) => {
      const { id, title, description, price, category, thumbnail} = element;
  
      charactersContainer.innerHTML += `
        <div class="col-md-4" key=${id}>
          <div class="card bg-dark border border-2 border-light border-opacity-25 h-100 mx-auto overflow-hidden""
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
            <button type="button" class="btn btn-primary rounded-0">Agregar al carrito</button>
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
  
  export const fetchReadProducts = async (limit = 10, skip = 1, search = '') => {
    const previousProducts = document.getElementById('previousProducts');
    const nextProducts = document.getElementById('nextProducts');

    try {

        const { data } = await axios.get(`https://dummyjson.com/products/search?q=&limit=${limit}&skip=${skip}`);
        const limits = data['limit'];
        console.log('viendo limite ' +limits);

        if(skip == 0){
            previousProducts.setAttribute('disabled', true);
            previousProducts.classList.add('text-light', 'bg-dark');
        } else if (limit >= limits){
            nextProducts.setAttribute('disabled', true);
            nextProducts.classList.add('text-light', 'bg-dark');
        } else {
            previousCharacters.removeAttribute('disabled');
            nextProducts.removeAttribute('disabled');
            previousProducts.classList.remove('text-light', 'bg-dark');
            nextProducts.classList.remove('text-light', 'bg-dark');
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