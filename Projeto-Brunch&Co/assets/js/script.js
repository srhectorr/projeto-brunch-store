// Modal
function abrirModal(id) { 
  const modal = document.getElementById(id);
  modal.classList.add('abrir');

  if (!modal.dataset.listenerAdicionado) {
    modal.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('fechar') ||
        e.target.classList.contains('janela-modal')
      ) {
        modal.classList.remove('abrir');
      }
    });

    modal.dataset.listenerAdicionado = "true";
  }
};

// Slideshow
const sliderContent = document.querySelector('.slider-content');
let cont = 0; // Começa em 0 para alinhar com os índices (0%, -100%, -200%)

function updateSlide() {
  sliderContent.style.marginLeft = `-${cont * 100}%`;
  document.getElementById(`radio${cont + 1}`).checked = true;
}

// Estado inicial
document.getElementById('radio1').checked = true;
updateSlide();

// Automação
setInterval(() => {
  cont = (cont + 1) % 3; // Ciclo de 0 a 2 para 3 slides
  updateSlide();
}, 4000);

// Adicionar evento para navegação manual
document.querySelectorAll('input[name="btn-radio"]').forEach((radio, index) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      cont = index; // Atualiza o contador com base no índice do rádio selecionado
      updateSlide();
    }
  });
});

