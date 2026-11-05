const commercialPhone='556140426929';
const adsConversion='AW-10780783077/AuuiCOKuo_wCEOXj1pQo';
document.addEventListener('click',event=>{
 const whatsappLink=event.target.closest('a[href^="https://wa.me/"]');
 if(whatsappLink&&typeof window.gtag==='function'){
  window.gtag('event','conversion',{send_to:adsConversion});
 }
},true);
const planPrices={'500 Mega':'99,90','700 Mega':'129,90','900 Mega':'149,90','1000 Mega':'199,90'};
function whatsappUrl(interest){const price=planPrices[interest];const message=price?'Olá! Encontrei a Canaã pelo Google e gostaria de falar com um atendente. Tenho interesse no plano de '+interest+' por R$ '+price+'/mês. Gostaria de consultar a cobertura para meu endereço.':'Olá! Encontrei a Canaã pelo Google e gostaria de falar com um atendente. Tenho interesse em '+interest+'. Gostaria de consultar as opções e a cobertura para meu endereço.';return 'https://wa.me/'+commercialPhone+'?text='+encodeURIComponent(message);}
document.querySelectorAll('[data-plan]').forEach(button=>button.addEventListener('click',()=>{openContactChoice(button.dataset.plan,button);}));
document.querySelectorAll('.choices button').forEach(button=>button.addEventListener('click',()=>{button.parentElement.querySelectorAll('button').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});button.classList.add('selected');button.setAttribute('aria-pressed','true');const p=+document.querySelector('#people .selected').dataset.value,d=+document.querySelector('#devices .selected').dataset.value;const plan=p>=5||d>=10?'1000 Mega':p>=4||d>=8?'900 Mega':p>=2||d>=4?'700 Mega':'500 Mega';document.getElementById('recommended').textContent=plan;document.getElementById('quiz-cta').dataset.plan=plan;}));
document.getElementById('contact-form').addEventListener('submit',event=>{event.preventDefault();openContactChoice(document.getElementById('interest').value,event.submitter);});


if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const items=document.querySelectorAll('.section-title,.plan,.wifi-box,.moments article,.quiz-box,.difference-grid article,.contact-box,.company-info,.legal-info');
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-visible');observer.unobserve(entry.target);}});},{threshold:0.08});
 items.forEach(item=>{if(item.getBoundingClientRect().top>innerHeight){item.classList.add('reveal-pending');if(item.classList.contains('plan'))item.style.setProperty('--reveal-delay',(Array.from(item.parentElement.children).indexOf(item)*70)+'ms');observer.observe(item);}});
}

if ('IntersectionObserver' in window) {
 const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(link=>{const active=link.getAttribute('href')==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});
 document.querySelectorAll('main section[id]').forEach(section=>navObserver.observe(section));
}

const carouselToggle=document.getElementById('carousel-toggle');
carouselToggle.addEventListener('click',()=>{const paused=carouselToggle.closest('.services-carousel').classList.toggle('is-paused');carouselToggle.setAttribute('aria-pressed',String(paused));carouselToggle.textContent=paused?'Retomar animação':'Pausar animação';});

const testimonialDialog=document.getElementById('audio-dialog');
const previewButton=document.getElementById('audio-preview');
previewButton.addEventListener('click',()=>{testimonialDialog.hidden=false;previewButton.hidden=true;previewButton.setAttribute('aria-expanded','true');});
function closeTestimonials(){testimonialDialog.hidden=true;previewButton.hidden=false;previewButton.setAttribute('aria-expanded','false');previewButton.focus();}
testimonialDialog.querySelector('.audio-dismiss').addEventListener('click',closeTestimonials);
testimonialDialog.addEventListener('keydown',event=>{if(event.key==='Escape')closeTestimonials();});

const whatsappBubble=document.querySelector('.floating-contact > span');
if(whatsappBubble){
 const bubbleMessages=['Ainda tem dúvidas? Me chame aqui','Planos a partir de R$ 99,90/mês','Internet para sua casa. Fale com a Canaã'];
 let bubbleIndex=0;
 whatsappBubble.textContent=bubbleMessages[0];
 const reduceBubbleMotion=matchMedia('(prefers-reduced-motion: reduce)');
 function rotateBubble(){
  if(document.hidden||document.querySelector('.floating-contact:hover'))return;
  bubbleIndex=(bubbleIndex+1)%bubbleMessages.length;
  if(reduceBubbleMotion.matches){whatsappBubble.textContent=bubbleMessages[bubbleIndex];return;}
  whatsappBubble.classList.add('bubble-changing');
  setTimeout(()=>{whatsappBubble.textContent=bubbleMessages[bubbleIndex];whatsappBubble.classList.remove('bubble-changing');},200);
 }
 setInterval(rotateBubble,5000);
}

const planSlides=document.getElementById('plan-slides');
const planCards=Array.from(planSlides.children);
const planDots=Array.from(document.querySelectorAll('[data-slide]'));
let currentPlanSlide=0;
function updatePlanSlide(){
 const viewportCenter=planSlides.getBoundingClientRect().left+planSlides.clientWidth/2;
 let distance=Infinity;
 planCards.forEach((card,index)=>{const rect=card.getBoundingClientRect();const d=Math.abs(rect.left+rect.width/2-viewportCenter);if(d<distance){distance=d;currentPlanSlide=index;}});
 planDots.forEach((dot,index)=>dot.setAttribute('aria-pressed',String(index===currentPlanSlide)));
 document.querySelector('.plan-arrow.prev').disabled=currentPlanSlide===0;
 document.querySelector('.plan-arrow.next').disabled=currentPlanSlide===planCards.length-1;
}
function goToPlan(index){const card=planCards[Math.max(0,Math.min(index,planCards.length-1))];planSlides.scrollTo({left:card.offsetLeft-(planSlides.clientWidth-card.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
planDots.forEach(dot=>dot.addEventListener('click',()=>goToPlan(Number(dot.dataset.slide))));
document.querySelector('.plan-arrow.prev').addEventListener('click',()=>goToPlan(currentPlanSlide-1));
document.querySelector('.plan-arrow.next').addEventListener('click',()=>goToPlan(currentPlanSlide+1));
let planScrollFrame=0;planSlides.addEventListener('scroll',()=>{cancelAnimationFrame(planScrollFrame);planScrollFrame=requestAnimationFrame(updatePlanSlide);},{passive:true});
window.addEventListener('resize',updatePlanSlide);updatePlanSlide();

const contactDialog=document.getElementById('contact-dialog');
let contactTrigger=null;
function openContactChoice(interest,trigger){
 contactTrigger=trigger||document.activeElement;
 const newLink=document.getElementById('contact-new');
 const existingLink=document.getElementById('contact-existing');
 newLink.href=whatsappUrl(interest||'internet residencial');
 existingLink.href='https://wa.me/'+commercialPhone+'?text='+encodeURIComponent('Olá! Encontrei a Canaã pelo Google. Já sou cliente e gostaria de falar com um atendente.');
 [newLink,existingLink].forEach(link=>{link.target='_blank';link.rel='noopener noreferrer';});
 if(!contactDialog.open)contactDialog.showModal();
}
document.querySelectorAll('a[href]').forEach(link=>{
 const href=link.getAttribute('href');
 if(link.closest('#contact-dialog'))return;
 if(href.includes('web.whatsapp.com/send')||href==='#contato'||href.startsWith('tel:')||href.startsWith('mailto:')){
  link.setAttribute('aria-haspopup','dialog');
  link.addEventListener('click',event=>{event.preventDefault();const interest=link.classList.contains('mesh-cta')?'Wi-Fi Mesh':'internet residencial';openContactChoice(interest,link);});
 }
});
document.querySelector('.contact-dialog-close').addEventListener('click',()=>contactDialog.close());
contactDialog.addEventListener('click',event=>{if(event.target===contactDialog){const rect=contactDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)contactDialog.close();}});
contactDialog.addEventListener('close',()=>{if(contactTrigger&&contactTrigger.isConnected)contactTrigger.focus();});
document.querySelectorAll('.contact-path').forEach(link=>link.addEventListener('click',()=>contactDialog.close()));
