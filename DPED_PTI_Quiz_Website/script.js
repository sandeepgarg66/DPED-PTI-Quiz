const key = [3, 3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 3, 1, 1, 1, 0, 1, 2, 1, 1, 0, 2, 2, 0, 1, 1, 1, 2, 0, 1, 3, 1, 0, 2, 1, 0, 0, 1, 2];
const chosen = {};
document.getElementById('quiz').addEventListener('click', function(event){
 const button=event.target.closest('button[data-q]');
 if(!button)return;
 const qi=Number(button.dataset.q), oi=Number(button.dataset.opt);
 if(Object.prototype.hasOwnProperty.call(chosen,qi))return;
 chosen[qi]=oi;
 const card=document.getElementById('q'+qi);
 const buttons=card.querySelectorAll('button[data-opt]');
 buttons.forEach((b,index)=>{
   b.disabled=true;
   if(index===key[qi]){b.classList.add('correct');b.querySelector('.mark').textContent='✓';}
 });
 const feedback=document.getElementById('f'+qi);
 if(oi===key[qi]){feedback.textContent='सही उत्तर! ✓';feedback.className='feedback good';}
 else{
   const correct=buttons[key[qi]];
   buttons[oi].classList.add('wrong');buttons[oi].querySelector('.mark').textContent='✕';
   feedback.textContent='गलत उत्तर ✕ | सही उत्तर: '+correct.innerText.replace('✓','').trim();
   feedback.className='feedback bad';
 }
 updateScore();
});
function updateScore(){
 const done=Object.keys(chosen).length;
 let score=0;Object.keys(chosen).forEach(k=>{if(chosen[k]===key[Number(k)])score++;});
 document.getElementById('score').textContent='हल किए गए: '+done+' / '+key.length;
 document.getElementById('result').textContent='स्कोर: '+score+' / '+key.length;
}
document.getElementById('reset').addEventListener('click',function(){
 Object.keys(chosen).forEach(k=>delete chosen[k]);
 document.querySelectorAll('.option').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong');b.querySelector('.mark').textContent='';});
 document.querySelectorAll('.feedback').forEach(f=>{f.textContent='';f.className='feedback';});
 updateScore();window.scrollTo({top:0,behavior:'smooth'});
});
