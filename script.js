import {langdata} from './language.js';


let prevActiveProject;
let transitioning = false;

const langBtn = document.querySelector('.lang-btn');

const projectsWrappwer = document.querySelector('.projects-wrapper');
const projectItems = document.querySelectorAll('.projects-content-item');

langBtn.addEventListener('click', function(){
  const lang = langBtn.dataset.lang === 'en' ? 'es': 'en'; 
  langBtn.dataset.lang = lang;
  langBtn.querySelector('.lang-text').textContent = lang;

  const textElements = document.querySelectorAll('[data-key]');
  console.log(textElements);

  textElements.forEach(el => {
    // console.log(langdata.languages[lang].strings[el.dataset.key]);
    const text = langdata.languages[lang].strings[el.dataset.key];
    // console.log(text);
    console.log(el.childNodes);
    el.innerHTML = text;
  })
})

window.addEventListener('click', function({target}){

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



