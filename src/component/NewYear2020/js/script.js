

const card = document.querySelector('.card');
const open = card.querySelector('.card__illustration');
const close = card.querySelector('.btn--close');
const content = card.querySelector('.card__content');
const illustration = card.querySelector('.card__illustration')
const cls = {
  show: 'is-show',
  active: 'is-active',
  closing: 'is-closing',
  leave: 'is-leave'
};
  
setTimeout(()=>{
  card.classList.add(cls.show);
},8000);
setTimeout(()=>{
  card.classList.add(cls.active);
},9000);
setTimeout(() => {
  card.classList.add(cls.leave);
},13000);
