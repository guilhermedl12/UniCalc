const toggle =
  document.getElementById(
    "themeToggle"
  );

const icon =
  document.getElementById(
    "themeIcon"
  );

function calcular(){
  const u1 = parseFloat(document.getElementById("u1").value);
  const u2 = parseFloat(document.getElementById("u2").value);
  const resultado = document.getElementById("resultado");

  // Validação inicial: U1 é obrigatória
  if(isNaN(u1)){
    resultado.innerHTML = `
      <div class="placeholder">
        Digite ao menos a nota da Unidade 1.
      </div>
    `;
    return;
  }

  let html = "";

  // CENÁRIO A: O usuário SÓ digitou a Unidade 1 (Modo Previsão)
  if (isNaN(u2)) {
    // Usando base 7 para manter o padrão decimal (ex: 6.9)
    const precisaU2 = (7 - (u1 * 0.4)) / 0.6;

    html = `
      <div class="bloco">
        <h3>🎯 Para passar direto</h3>
        <p>Você precisa tirar na Unidade 2:</p>
        <div class="numero">
          ${precisaU2 <= 10 ? Math.max(0, precisaU2).toFixed(1) : "Impossível"}
        </div>
      </div>
    `;
  } 
  // CENÁRIO B: O usuário digitou AMBAS as notas (Modo Resultado)
  else {
    const media = Math.floor(((u1 * 4) + (u2 * 6)) / 10 * 10) / 10;
    
    // Para evitar que 6.96 vire 7.0 injustamente, testamos o valor real primeiro
    if (media >= 7) {
      html = `
        <div class="bloco aprovado">
          <div class="status">✅ Aprovado direto</div>
          <p>Parabéns! Sua média final foi:</p>
          <div class="numero">${media.toFixed(1)}</div>
        </div>
      `;
    } else {
      const recuperacao = 12 - media;

      html = `
        <div class="bloco">
          <h3>📈 Média parcial</h3>
          <div class="numero">${media.toFixed(1)}</div>
        </div>

        <div class="bloco recuperacao">
          <div class="status">⚠️ Recuperação</div>
          <p>Você precisa tirar na prova final:</p>
          <div class="numero">${recuperacao.toFixed(1)}</div>
          <p class="formula">Fórmula: 12 - ${media.toFixed(1)}</p>
        </div>
      `;
    }
  }

  resultado.innerHTML = html;
}

function limparCampos() {

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

function setTheme(dark) {

  if (dark) {

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

  } else {

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