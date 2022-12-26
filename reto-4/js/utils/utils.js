export const renderProducts = (data) => {
    const charactersContainer = document.getElementById('charactersContainer');
    charactersContainer.innerHTML = '';
    console.log(data);
  
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
            <button type="button" class="btn btn-primary rounded-0" onclick="addCard(${id}) id="toCard">Agregar al carrito</button>
          </div>
        </div>
      `;
    });
  };

  const addCard = async (id) => {
    const data = await fetchSingleProducts(index);
    readCardProduct(data);
  };
  //search single product
  const fetchSingleProducts = async (id) => {

    try {

        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        return data;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };
  //add single product
  const readCardProduct = (data) => {
    const tBodyCard = document.getElementById('tBodyCard');
    tBodyCard.innerHTML = '';
    data.forEach((element) => {
    const { id, title, description, category, price, Imagen} = element;/** Desectructurar elementos {} par acceder a ellos */
    tBodyCard.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${category}</td>
        <td>${price}</td>
        <td>
          <img
            src="${Imagen}"
            alt="${title}" class="img-fluid" style="max-width: 128px;" />
        </td>
        <td>
            <button 
            class="btn btn-info m-1" onclick="readPokemon(${id})">
            ✏
          </button>
          <button 
            class="btn btn-danger m-1" onclick="deletePokemon(${id})">
            🗑
          </button>
        </td>
      </tr>
    `;
  });
  };

  /*export const pagination = ({ info }) => {
    const previousCharacters = document.getElementById('previousCharacters');
    const nextCharacters = document.getElementById('nextCharacters');
    const pages = info['pages'];
    console.log(pages);
  };*/
  
  export const fetchReadProducts = async (limit = 10, skip = 0, name = '') => {
    const previousProducts = document.getElementById('previousProducts');
    const nextProducts = document.getElementById('nextProducts');
    //const getLimit = limit;
    //console.log(getLimit);

    try {

        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${name}&limit=${limit}&skip=${skip}`);
        let allLimit = limit;
        let allProducts = data['total'];
        console.log(data);
        console.log('viendo limite ' +allLimit);
        console.log('viendo total ' +allProducts);
        
        if(skip == 0){
            previousProducts.setAttribute('disabled', true);
            previousProducts.classList.add('text-light', 'bg-dark');
            if (allLimit >= allProducts){
              nextProducts.setAttribute('disabled', true);
              nextProducts.classList.add('text-light', 'bg-dark');
            }
        } else if (allLimit >= allProducts){
            nextProducts.setAttribute('disabled', true);
            nextProducts.classList.add('text-light', 'bg-dark');
        } else {
            previousProducts.removeAttribute('disabled');
            nextProducts.removeAttribute('disabled');
            previousProducts.classList.remove('text-light', 'bg-dark');
            nextProducts.classList.remove('text-light', 'bg-dark');
        }
        //console.log("Limite: " +limit);
        //console.log("Inicio: " +skip);

        return data.products;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };

  export const fetchReadCategory = async (category = '') => {
    const previousProducts = document.getElementById('previousProducts');
    const nextProducts = document.getElementById('nextProducts');
    //const getLimit = limit;
    //console.log(getLimit);

    try {

        const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
        console.log(data);

        previousProducts.setAttribute('disabled', true);
        previousProducts.classList.add('text-light', 'bg-dark');
        nextProducts.setAttribute('disabled', true);
        nextProducts.classList.add('text-light', 'bg-dark');
        
        return data.products;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 0);
    }
  };

  