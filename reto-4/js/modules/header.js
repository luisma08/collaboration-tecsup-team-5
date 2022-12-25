import { fetchReadProducts, renderProducts } from "../utils/utils.js";

const header = () => {
  const searchForm = document.getElementById('searchForm');
  const previousProducts = document.getElementById('previousProducts');
  const nextProducts = document.getElementById('nextProducts');
  let page=1;

  const searchProducts = async (e) => {
    e.preventDefault();
    const name = searchForm.name.value;
    const data = await fetchReadProducts(page, name);
    renderProducts(data);
    //pagination(data);
    
    previousProducts.addEventListener('click', async () => {
        const data = await fetchReadProducts(--page, name);
        renderProducts(data);
      });
    
      nextProducts.addEventListener('click', async () => {
        const data = await fetchReadProducts(++page, name);
        renderProducts(data);
      });
  };
  searchForm.addEventListener('submit', searchProducts);
};

export default header;