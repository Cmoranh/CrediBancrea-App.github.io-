const lb = document.getElementById('lb');
const lbimg = document.getElementById('lbimg');
const lbcap = document.getElementById('lbcap');
document.querySelectorAll('.shot .imgbox').forEach(b => b.addEventListener('click', () => {
  lbimg.src = b.querySelector('img').src;
  lbcap.textContent = b.dataset.cap || '';
  lb.showModal();
}));
document.getElementById('lbx').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
