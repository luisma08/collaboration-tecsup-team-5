export const renderProducts = (data) => {
    const charactersContainer = document.getElementById('charactersContainer');
    charactersContainer.innerHTML = '';
    console.log(data);
  
    data.forEach((element) => {
      const { id, title, description, price, category, thumbnail} = element;
  
      charactersContainer.innerHTML += `
        <div class="col-md-4" key="${id}">
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
                <span class="badge text-bg-success">${category}</span>
                <span class="badge text-bg-secondary">Precio $. ${price}</span>
              </p>
              <p class="card-text">${description}</p>
            </div>
            <button type="button" class="btn btn-success rounded-0 add-btn" id="${id}">Agregar al carrito</button>
          </div>
        </div>
      `;
    });
    let addBtn = document.querySelectorAll('.add-btn');
    const addBtns = [...addBtn];
    console.log(addBtns);
    addBtns.forEach((btn) => {
      btn.addEventListener('click', event => {
        let index = parseInt(event.target.id);
        addCart(index);
      });
        
    });
  };

  const PRODUCTS_DATASTORAGE = 'products-storage';
  const products = JSON.parse(localStorage.getItem(PRODUCTS_DATASTORAGE)) ?? [];

  const addCart = async (index) => {
    const data = await fetchSingleProducts(index);
    addProductStorage(data);
  };

  //search single product
  const fetchSingleProducts = async (index) => {

    try {

        const { data } = await axios.get(`https://dummyjson.com/products/${index}`);
        console.log('Producto obtenido');
        console.log(data);
        
        return data;

    } catch (error) {
      console.log(error);
    } finally {
      console.log('conexion establecida');
    }
  };

  const addProductStorage = (data) => {
    const id = data.id;
    const title = data.title;
    const brand = data.brand;
    const category = data.category;
    const price = data.price;
    const thumbnail = data.thumbnail;
    
    products.push({ id, title, brand, category, price, thumbnail });
    localStorage.setItem(PRODUCTS_DATASTORAGE, JSON.stringify(products));
    readCartProduct();
  };

  export const readCartProducts = () => {
    //addProductStorage();
    readCartProduct();
  };
  //add single product
  const readCartProduct = () => {
    const tBodyCard = document.getElementById('tBodyCard');
    let suma = 0;
    tBodyCard.innerHTML = '';
    console.log('Producto renderizado');
    //console.log(dataList);

    products.forEach((elements, index) => {
    const { id, title, brand, category, price, thumbnail } = elements;/** Desectructurar elementos {} par acceder a ellos */
    //console.log(title);
    tBodyCard.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>EC-${id}</td>
        <td>${title}</td>
        <td>${brand}</td>
        <td>${category}</td>
        <td>$ ${price}</td>
        <td>
          <img
            src="${thumbnail}"
            alt="${title}" class="img-fluid" style="max-width: 128px;" />
        </td>
        <td>
          <button 
            class="btn btn-danger m-1 delete-btn" id="${index}">
            🗑
          </button>
        </td>
      </tr>
    `;

    suma += price;
    index += 1;
    const totalPrice = document.getElementById('totalPrice');
    const mxCart = document.getElementById('mxCart');
    mxCart.textContent = index;
    totalPrice.innerText = `$ ${suma}`;
    });
    let delBtn = document.querySelectorAll('.delete-btn');
    const delBtns = [...delBtn];
    console.log(delBtns);
    delBtns.forEach((btn) => {
      btn.addEventListener('click', event => {
        let index = parseInt(event.target.id);
        console.log(index);
        deletePokemon(index);
      });
        
    });
  };

  const deletePokemon = (index) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-1',
          cancelButton: 'btn btn-danger mx-1'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index, 1);
            localStorage.setItem(PRODUCTS_DATASTORAGE, JSON.stringify(products));
            readCartProduct();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelar',
            'Tu archivo imaginario está a salvo :)',
            'error'
          )
        }
      })
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
    console.log("LimiteSS: " +limit);
    console.log("InicioSS: " +skip);

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
        console.log("Limite: " +limit);
        console.log("Inicio: " +skip);

        return data.products;

    } catch (error) {
      console.log(error);
    } finally {
      window.scrollTo(0, 900);
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
      window.scrollTo(0, 900);
    }
  };

  