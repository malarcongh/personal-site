import {langdata} from './language.js';


let prevActiveProject;
let transitioning = false;
let timeoutID;
const langBtn = document.querySelector('.lang-btn');
const projectsWrappwer = document.querySelector('.projects-wrapper');


langBtn.addEventListener('click', function(){
  const lang = langBtn.dataset.lang === 'en' ? 'es': 'en'; 
  langBtn.dataset.lang = lang;
  langBtn.querySelector('.lang-text').textContent = lang;

  const textElements = document.querySelectorAll('[data-key]');

  textElements.forEach(el => {
    const text = langdata.languages[lang].strings[el.dataset.key];
    el.innerHTML = text;
  })
})

window.addEventListener('click', function({target}){

  if(target.closest('.gmail-link')){

    const textContainer = target.closest('.gmail-link').querySelector('.gmail-text-container');
    textContainer.classList.toggle('emailShowing');
    const emailIsShowing = textContainer.classList.contains('emailShowing');

    const placeholder = textContainer.querySelector('.placeholder');
    const email = textContainer.querySelector('.email');
    const placeholderWidth = placeholder.offsetWidth;
    const emailWidth = email.offsetWidth;

    if(timeoutID) clearTimeout(timeoutID);

    if(emailIsShowing){
      timeoutID = setTimeout(function(){
        console.log('xxd');
        textContainer.style.width = `${emailWidth}px`;
        textContainer.classList.remove('emailShowing');
        placeholder.classList.remove('hidden');
        email.classList.remove('showing');
      }, 4000)
    }

    const startWidth = emailIsShowing ? placeholderWidth: emailWidth;
    const finalWidth = emailIsShowing ? emailWidth: placeholderWidth;

    console.log({
      startWidth,
      finalWidth
    });

    textContainer.style.width = `${startWidth}px`;

    requestAnimationFrame(function(){
      textContainer.style.width = `${finalWidth}px`;
      email.classList.toggle('showing');
      placeholder.classList.toggle('hidden');
    })

    return;
  }

  const projectItem  = target.closest('.project-item');

  if(transitioning) return;

  if(projectItem){

    projectsWrappwer.classList.toggle('focus');

    if(prevActiveProject && prevActiveProject !== projectItem){
      removeFocus(prevActiveProject, true)
      projectsWrappwer.classList.add('focus');
    }

    transitioning = true;
    let isClosing = prevActiveProject === projectItem;
    prevActiveProject = isClosing ? null: projectItem;
    const projectPreview = projectItem.querySelector('.project-preview');

    projectPreview.addEventListener('transitionend', function(){
      transitioning = false;
      if(isClosing) projectItem.classList.toggle('focus');
    }, {once: true});

    if(!isClosing) projectItem.classList.toggle('focus');
    projectPreview.classList.toggle('active');

    return;
  }

  if(prevActiveProject){
    removeFocus(prevActiveProject, false);
    prevActiveProject = null;
  }
})

function removeFocus(prevActiveProject, wrapperStillActive){
  const projectPreview = prevActiveProject.querySelector('.project-preview');
    projectPreview.addEventListener('transitionend', function(){
      prevActiveProject.classList.remove('focus');
      if(!wrapperStillActive) projectsWrappwer.classList.remove('focus');
    }, {once: true});
    projectPreview.classList.remove('active');
}




const contentItems = document.querySelectorAll('.content-item');
const navLinks = document.querySelectorAll('.nav-list-item');

const observer = new IntersectionObserver(entries => {
  const intersectingEntry = entries.find(entry => entry.isIntersecting);
  if(!intersectingEntry) return;
  const id = intersectingEntry.target.id;
  navLinks.forEach(link => link.classList.remove('item-active'));
  document.querySelector(`.nav-${id}`).classList.add('item-active');

}, {
  threshold: 1
})

contentItems.forEach(item => observer.observe(item));



