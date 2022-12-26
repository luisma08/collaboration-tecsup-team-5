import { fetchReadProducts, renderProducts, fetchReadCategory } from "../utils/utils.js";

export const header = () => {
  const searchForm = document.getElementById('searchForm');
  const previousProducts = document.getElementById('previousProducts');
  const nextProducts = document.getElementById('nextProducts');
  let limit = 10;
  let skip = 0;

  const searchProducts = async (e) => {
    e.preventDefault();
    const name = searchForm.name.value;
    const data = await fetchReadProducts(limit, skip, name);
    renderProducts(data);
    //pagination(data);
    
    previousProducts.addEventListener('click', async () => {
        limit-=10;
        skip-=10;
        const data = await fetchReadProducts(limit, skip, name);
        renderProducts(data);
      });
    
      nextProducts.addEventListener('click', async () => {
        limit+=10;
        skip+=10;
        const data = await fetchReadProducts(limit, skip, name);
        renderProducts(data);
      });
  };
  searchForm.addEventListener('submit', searchProducts);
};

export const categories = () => {
  const categories1 = document.querySelector('.category1');
  const categories2 = document.querySelector('.category2');
  const categories3 = document.querySelector('.category3');
  const categories4 = document.querySelector('.category4');

  categories1.addEventListener('click', async () => {
    const category = document.querySelector('.category1').textContent;
    const data = await fetchReadCategory(category);
    renderProducts(data);
  });

  categories2.addEventListener('click', async () => {
    const category = document.querySelector('.category2').textContent;
    const data = await fetchReadCategory(category);
    renderProducts(data);
  });

  categories3.addEventListener('click', async () => {
    const category = document.querySelector('.category3').textContent;
    const data = await fetchReadCategory(category);
    renderProducts(data);
  });

  categories4.addEventListener('click', async () => {
    const category = document.querySelector('.category4').textContent;
    const data = await fetchReadCategory(category);
    renderProducts(data);
  });
};