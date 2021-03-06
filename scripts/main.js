function abrirAddModal() {
  let btnAddPolitico = document.querySelector(".add-politico");
  let modal = document.getElementById("createmodal");
  btnAddPolitico.onclick = () => {
    modal.style.display = "block";
  };
  cerrarModal(modal);
  insertCard();
}

function cerrarModal(element) {
  let closeElement = element.querySelector(".modal-elementClose");
  let btncancelar = element.querySelector(".modal-cancel");
  closeElement.onclick = () => {
    element.style.display = "none";
  };
  btncancelar.onclick = () => {
    event.preventDefault();
    element.style.display = "none";
  };
}
// Para cerrar el modal haciendo clic fuera

window.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

abrirAddModal();

function getValues(element) {
  const inputName = element.querySelector("[placeholder='Nombres']");
  const inputLastname = element.querySelector("[placeholder='Apellidos']");
  const inputPartido = element.querySelector(
    "[placeholder='Partido Político']"
  );
  const inputAlias = element.querySelector("[placeholder='Alias']");
  const inputUrlPhoto = element.querySelector(
    "[placeholder='URL de fotografía']"
  );
  const textAreaComentario = element.querySelector("[name='comment']");

  return {
    elements: {
      inputName,
      inputLastname,
      inputPartido,
      inputAlias,
      inputUrlPhoto,
      textAreaComentario
    },
    values: {
      nombres: inputName.value,
      apellidos: inputLastname.value,
      partido: inputPartido.value,
      alias: inputAlias.value,
      foto: inputUrlPhoto.value,
      comentario: textAreaComentario.value
    }
  };
}

function insertCard() {
  const form = document.querySelector(".form-create");
  form.addEventListener("submit", function() {
    event.preventDefault();
    const values = getValues(form).values;
    createCard(values);
    this.reset();
    this.closest(".modal").style.display = "none";
  });
}

function createCard(values) {
  const { nombres, apellidos, partido, alias, foto, comentario } = values;
  let card = document.createElement("article");
  card.classList.add("card");
  card.innerHTML = ` 
<div>
<div class="card-buttons">
  <span class="js_edit">Editar</span>
  <span class="js_delete">[x]</span>
</div>
  <figure>
    <img class="card-image" src="${foto}"/>
  </figure>
  <ul class="card-ul">
    <li>
      <span class="card-data">Nombre :</span>
      <div>
        <span class="card-input-text nombres">${nombres}</span>
        <span class="card-input-text apellidos">${apellidos}</span>
      </div>
    </li>
    <li>
      <span class="card-data">Partido Político:</span>
      <span class="card-input-text partido">${partido}</span>
    </li>
    <li>
      <span class="card-data">Alias:</span>
      <span class="card-input-text alias">${alias}</span>
    </li>
    <li>
      <span class="card-data">Comentario:</span>
      </li>
      <li>
      <span class="card-input-text comentario">${comentario}</span>
    </li>
  </ul>
</div>
`;
  const cardSection = document.getElementById("cards");
  cardSection.appendChild(card);

  card.querySelector(".js_delete").onclick = function() {
    this.closest(".card").remove();
  };
  card.querySelector(".js_edit").addEventListener("click", function() {
    abrirEditModal();
    formEditInit(card);
  });
  
}

function abrirEditModal() {
  let modal2 = document.getElementById("editmodal");
  modal2.style.display = "block";
  cerrarModal(modal2);
}

function formEditInit(card) {
  let formedit = document.querySelector(".form-edit");

  const inputName = formedit.querySelector("[placeholder='Nombres']");
  const inputLastname = formedit.querySelector("[placeholder='Apellidos']");
  const inputPartido = formedit.querySelector(
    "[placeholder='Partido Político']"
  );
  const inputAlias = formedit.querySelector("[placeholder='Alias']");
  const inputUrlPhoto = formedit.querySelector(
    "[placeholder='URL de fotografía']"
  );
  const textAreaComentario = formedit.querySelector("[name='comment']");

  let valorescarta = getValuesCard(card).values;
  inputLastname.value = valorescarta.apellidos;
  inputName.value = valorescarta.nombres;
  inputPartido.value = valorescarta.partido;
  inputAlias.value = valorescarta.alias;
  textAreaComentario.value = valorescarta.comentario;
  inputUrlPhoto.value = valorescarta.foto;

  let btnenviar = formedit.querySelector(".modal-aceptar");
  btnenviar.addEventListener("click", function() {
    event.preventDefault();
    imprimirdatosenCard (card)
    this.closest(".modal").style.display = "none";
  });
}
function getValuesCard(element) {
  this.element = element;
  let nombres = this.element.querySelector(".nombres");
  let apellidos = this.element.querySelector(".apellidos");
  let alias = this.element.querySelector(".alias");
  let partido = this.element.querySelector(".partido");
  let comentario = this.element.querySelector(".comentario");
  let urlphoto = this.element.querySelector(".card-image");

  return {
    values: {
      nombres: nombres.innerHTML,
      apellidos: apellidos.innerHTML,
      partido: partido.innerHTML,
      alias: alias.innerHTML,
      foto: urlphoto.src,
      comentario: comentario.innerHTML
    }
  };
}

function imprimirdatosenCard (element){
  let formedit = document.querySelector(".form-edit");
  const valores = getValues(formedit).values;
  this.element.innerHTML = ` 
<div>
<div class="card-buttons">
  <span class="js_edit">Editar</span>
  <span class="js_delete">[x]</span>
</div>
  <figure>
    <img class="card-image" src="${valores.foto}"/>
  </figure>
  <ul class="card-ul">
    <li>
      <span class="card-data">Nombre :</span>
      <div>
        <span class="card-input-text nombres">${valores.nombres}</span>
        <span class="card-input-text apellidos">${valores.apellidos}</span>
      </div>
    </li>
    <li>
      <span class="card-data">Partido Político:</span>
      <span class="card-input-text partido">${valores.partido}</span>
    </li>
    <li>
      <span class="card-data">Alias:</span>
      <span class="card-input-text alias">${valores.alias}</span>
    </li>
    <li>
      <span class="card-data">Comentario:</span>
      </li>
      <li>
      <span class="card-input-text comentario">${valores.comentario}</span>
    </li>
  </ul>
</div>
`
 
this.element.querySelector(".js_delete").onclick = function() {
  this.closest(".card").remove();
};
this.element.querySelector(".js_edit").addEventListener("click", function() {
  abrirEditModal();
  formEditInit(element);
});


}
