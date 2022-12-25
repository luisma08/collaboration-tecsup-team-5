import { fetchReadCharacters, renderCharacters } from "../utils/utils.js";

const characters = async () => {
  const previousCharacters = document.getElementById('previousCharacters');
  const nextCharacters = document.getElementById('nextCharacters');
  let limit = 10;
  let skip = 0;

  previousCharacters.addEventListener('click', async () => {
    limit-=10;
    skip-=10;
    const data = await fetchReadCharacters(limit, skip);
    renderCharacters(data);
  });

  nextCharacters.addEventListener('click', async () => {
    limit+=10;
    skip+=10;
    const data = await fetchReadCharacters(limit, skip);
    renderCharacters(data);
  });

  const data = await fetchReadCharacters(limit, skip);
  renderCharacters(data);
  //pagination(data);
};

export default characters;