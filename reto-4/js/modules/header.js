import { fetchReadProducts, renderProducts } from "../utils/utils.js";

const header = () => {
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

export default header;