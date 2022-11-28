document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
  
    //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
    const telefono = "51949495862";
  
    const name = document.querySelector("#name").value;
    const mail = document.querySelector("#mail").value;
    const services = document.querySelector("#services").value;
    const description = document.querySelector("#description").value;
  
    resp.classList.remove("fail");
    resp.classList.remove("send");
  
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
          *_Full Stack Frellancer_*%0A
          *Reservas*%0A%0A
          *Hola me llamo*%0A
          ${name}%0A
          *Este es mi correo electronico*%0A
          ${mail}%0A
          *Estoy interesado en adquirir tus servicios de*%0A
          ${services}%0A
          *Te comento mis requerimientos*%0A
          ${description}`;
  
    if (name === "" || mail === "" || services === "") {
      resp.classList.add("fail");
      resp.innerHTML = `Faltan algunos datos, ${name}`;
      return false;
    }
    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `Se ha enviado tu mensaje, ${name}`;
  
    window.open(url);
  });