const toggle =
document.getElementById(
  "themeToggle"
);

const icon =
document.getElementById(
  "themeIcon"
);

function calcular(){

  const u1 =
  parseFloat(
    document.getElementById("u1").value
  );

  const u2 =
  parseFloat(
    document.getElementById("u2").value
  );

  const resultado =
  document.getElementById(
    "resultado"
  );

  if(isNaN(u1)){

    resultado.innerHTML = `
      <div class="placeholder">
        Digite ao menos
        a nota da Unidade 1.
      </div>
    `;

    return;
  }

  const precisaU2 =
  (70 - (u1 * 4)) / 6;

  let html = `

    <div class="bloco">

      <h3>
        🎯 Para passar direto
      </h3>

      <p>
        Você precisa tirar
        na Unidade 2:
      </p>

      <div class="numero">
        ${
          precisaU2 <= 10
          ? precisaU2.toFixed(1)
          : "Impossível"
        }
      </div>

    </div>
  `;

  if(!isNaN(u2)){

    const media =
    ((u1 * 4)
    + (u2 * 6))
    / 10;

    html += `

      <div class="bloco">

        <h3>
          📈 Média parcial
        </h3>

        <div class="numero">
          ${media.toFixed(1)}
        </div>

      </div>
    `;

    if(media >= 7){

      html += `
        <div class=
        "bloco aprovado">

          <div class=
          "status">

            ✅ Aprovado direto

          </div>

          <p>
            Média final:
            <strong>
              ${media.toFixed(1)}
            </strong>
          </p>

        </div>
      `;
    }else{

      const recuperacao =
      12 - media;

      html += `
        <div class=
        "bloco recuperacao">

          <div class=
          "status">

            ⚠ Recuperação

          </div>

          <p>
            Você precisa tirar:
          </p>

          <div class=
          "numero">

            ${recuperacao.toFixed(1)}

          </div>

          <p>
            Fórmula:
            12 -
            ${media.toFixed(1)}
          </p>

        </div>
      `;
    }
  }

  resultado.innerHTML =
  html;
}

function limparCampos(){

  document
  .getElementById("u1")
  .value = "";

  document
  .getElementById("u2")
  .value = "";

  document
  .getElementById(
    "resultado"
  )
  .innerHTML = `
    <div class="placeholder">
      Campos limpos.
    </div>
  `;
}

/* DARK MODE */

function setTheme(dark){

  if(dark){

    document.body
    .classList.add(
      "dark"
    );

    toggle.checked =
    true;

    icon.textContent =
    "☀️";

    localStorage.setItem(
      "theme",
      "dark"
    );

  }else{

    document.body
    .classList.remove(
      "dark"
    );

    toggle.checked =
    false;

    icon.textContent =
    "🌙";

    localStorage.setItem(
      "theme",
      "light"
    );
  }
}

toggle.addEventListener(
  "change",
  () => {

    setTheme(
      toggle.checked
    );
  }
);

const savedTheme =
localStorage.getItem(
  "theme"
);

setTheme(
  savedTheme ===
  "dark"
);