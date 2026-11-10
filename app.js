(function(){
  // menu mobilne
  var b=document.querySelector('.burger'),m=document.querySelector('.menu-pan');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('otwarte');b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});}

  // przeciąganie myszą (palec działa natywnie)
  function ciagnij(el){
    var x0=0,s0=0,ruch=false,wcis=false;
    el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;wcis=true;ruch=false;x0=e.clientX;s0=el.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!wcis)return;var dx=e.clientX-x0;if(Math.abs(dx)>4){ruch=true;el.classList.add('ciagnie');}if(ruch){el.scrollLeft=s0-dx;e.preventDefault();}});
    window.addEventListener('pointerup',function(){if(!wcis)return;wcis=false;if(ruch){el.classList.remove('ciagnie');var w=el.firstElementChild?el.firstElementChild.getBoundingClientRect().width:el.clientWidth;var gap=parseFloat(getComputedStyle(el).columnGap)||0;var k=Math.round(el.scrollLeft/(w+gap));el.scrollTo({left:k*(w+gap),behavior:'smooth'});}});
    el.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false;}},true);
    el.addEventListener('dragstart',function(e){e.preventDefault();});
  }

  // mini galerie w kartach
  document.querySelectorAll('.gal').forEach(function(g){
    var s=g.querySelector('.slajdy'),imgs=s.querySelectorAll('img'),n=imgs.length,l=g.querySelector('.licz');
    if(n<2){if(l)l.remove();g.querySelectorAll('button').forEach(function(x){x.remove();});return;}
    function akt(){var i=Math.round(s.scrollLeft/s.clientWidth);if(l)l.textContent=(i+1)+' / '+n;}
    s.addEventListener('scroll',function(){requestAnimationFrame(akt);},{passive:true});akt();
    var p=g.querySelector('button.p'),nx=g.querySelector('button.n');
    if(p)p.addEventListener('click',function(){s.scrollBy({left:-s.clientWidth,behavior:'smooth'});});
    if(nx)nx.addEventListener('click',function(){s.scrollBy({left:s.clientWidth,behavior:'smooth'});});
    ciagnij(s);
  });

  // tory kart
  document.querySelectorAll('.przewijak').forEach(function(w){
    var t=w.querySelector('.tor');if(!t)return;ciagnij(t);
    var st=w.querySelectorAll('.strzalki button');
    function krok(){var c=t.firstElementChild;return c?c.getBoundingClientRect().width+(parseFloat(getComputedStyle(t).columnGap)||0):t.clientWidth;}
    if(st[0])st[0].addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'});});
    if(st[1])st[1].addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'});});
  });

  // pasek mobilny po przewinięciu za główny przycisk
  var mob=document.querySelector('.mob'),cel=document.querySelector('[data-cta]');
  if(mob){
    if(cel&&'IntersectionObserver' in window){
      new IntersectionObserver(function(e){var r=e[0];mob.classList.toggle('widac',!r.isIntersecting&&r.boundingClientRect.top<0);}).observe(cel);
    }else{window.addEventListener('scroll',function(){mob.classList.toggle('widac',scrollY>innerHeight*0.6);},{passive:true});}
  }

  // formularz pokazowy
  var f=document.querySelector('form.zap');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var i=f.querySelector('.info-pokaz');if(i)i.classList.add('widac');});

  // zgody
  var z=document.querySelector('.zgody'),k='bestpm-zgody',v=null;
  try{v=localStorage.getItem(k);}catch(e){}
  if(z&&!v){z.classList.add('widac');
    z.querySelectorAll('button').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem(k,x.dataset.z);}catch(e){}z.classList.remove('widac');});});}

  var r=document.querySelectorAll('[data-rok]');r.forEach(function(x){x.textContent=new Date().getFullYear();});
})();
