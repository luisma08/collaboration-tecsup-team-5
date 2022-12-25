import { fetchReadProducts, renderProducts } from "../utils/utils.js";

const products = async () => {
  const previousProducts = document.getElementById('previousProducts');
  const nextProducts = document.getElementById('nextProducts');
  let limit = 10;
  let skip = 0;

  previousProducts.addEventListener('click', async () => {
    limit-=10;
    skip-=10;
    const data = await fetchReadProducts(limit, skip);
    renderProducts(data);
  });

  nextProducts.addEventListener('click', async () => {
    limit+=10;
    skip+=10;
    const data = await fetchReadProducts(limit, skip);
    renderProducts(data);
  });

  const data = await fetchReadProducts(limit, skip);
  renderProducts(data);
  //pagination(data);
};

export default products;