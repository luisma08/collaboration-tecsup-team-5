import { fetchReadCharacters, renderCharacters } from "../utils/utils.js";

const header = () => {
  const searchForm = document.getElementById('searchForm');
  const previousCharacters = document.getElementById('previousCharacters');
  const nextCharacters = document.getElementById('nextCharacters');
  let page=1;

  const searchCharacters = async (e) => {
    e.preventDefault();
    const name = searchForm.name.value;
    const data = await fetchReadCharacters(page, name);
    renderCharacters(data);
    //pagination(data);
    
    previousCharacters.addEventListener('click', async () => {
        const data = await fetchReadCharacters(--page, name);
        renderCharacters(data);
      });
    
      nextCharacters.addEventListener('click', async () => {
        const data = await fetchReadCharacters(++page, name);
        renderCharacters(data);
      });
  };
  searchForm.addEventListener('submit', searchCharacters);
};

export default header;