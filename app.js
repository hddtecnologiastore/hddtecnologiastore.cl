"use strict";
/* HDD V2 — JS poder total: efectos + seguridad (esc + validación). Sin secretos. */
(function(){
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function toast(m){var t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("show")},2600)}
var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* Preloader (solo home) */
var pre=$("#preloader"),pf=$("#preFill"),pt=$("#preTxt"),p=0;
if(pre&&!reduced){var iv=setInterval(function(){p=Math.min(100,p+Math.random()*22);if(pf)pf.style.width=p+"%";if(pt)pt.textContent="Iniciando sistema… "+Math.floor(p)+"%";if(p>=100){clearInterval(iv);pre.classList.add("done");setTimeout(function(){pre.remove()},500)}},140)}
else if(pre){pre.classList.add("done");setTimeout(function(){pre.remove()},100)}
/* Progreso scroll + header */
var bar=$("#progress"),topBtn=$("#top");
function onScroll(){var h=document.documentElement;var sc=h.scrollTop/(h.scrollHeight-h.clientHeight||1);if(bar)bar.style.width=(sc*100)+"%";if(topBtn)topBtn.classList.toggle("show",h.scrollTop>600)}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
if(topBtn)topBtn.addEventListener("click",function(){window.scrollTo({top:0,behavior:reduced?"auto":"smooth"})});
/* Nav móvil */
var burger=$("#burger"),nav=$("#nav");
if(burger&&nav)burger.addEventListener("click",function(){var o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o?"true":"false")});
$$("#nav a").forEach(function(a){a.addEventListener("click",function(){if(nav)nav.classList.remove("open")})});
/* Reveal IO */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
$$("[data-reveal]").forEach(function(el){el.classList.add("reveal");io.observe(el)});
/* Cursor glow */
var cur=$("#cursor");
if(cur&&window.matchMedia("(pointer:fine)").matches){window.addEventListener("mousemove",function(e){cur.style.left=e.clientX+"px";cur.style.top=e.clientY+"px"},{passive:true});$$("a,button,.svc,.p-card").forEach(function(el){el.addEventListener("mouseenter",function(){cur.classList.add("big")});el.addEventListener("mouseleave",function(){cur.classList.remove("big")})})}
else if(cur){cur.style.display="none"}
/* Canvas red tecnológica */
(function(){var c=$("#net");if(!c||reduced)return;var x=c.getContext("2d"),pts=[],W,H;function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();window.addEventListener("resize",rs);for(var i=0;i<70;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});(function loop(){x.clearRect(0,0,W,H);pts.forEach(function(a){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;x.fillStyle="rgba(56,189,248,.7)";x.beginPath();x.arc(a.x,a.y,1.4,0,7);x.fill()});for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){var a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;if(d<13000){x.strokeStyle="rgba(56,189,248,"+(0.16*(1-d/13000))+")";x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}requestAnimationFrame(loop)})()})();
/* Typing hero */
(function(){var el=$("#typing");if(!el)return;var w=["garantía real","diagnóstico honesto","atención personalizada"],i=0,j=0,del=false;function t(){var s=w[i];if(!del){j++;el.textContent=s.slice(0,j);if(j===s.length){del=true;setTimeout(t,1300);return}}else{j--;el.textContent=s.slice(0,j);if(j===0){del=false;i=(i+1)%w.length}}setTimeout(t,del?45:110)}if(!reduced)t();else el.textContent=w[0]})();
/* Terminal fake */
(function(){var box=$("#termLines");if(!box)return;var lines=["> diagnóstico y reparación… OK","> limpieza + pasta térmica CPU/GPU","> todas las marcas","> batería: informar estado real","> coordinación por WhatsApp"];var k=0;function n(){if(k>=lines.length)return;var d=document.createElement("div");d.className="ln";d.textContent=lines[k++];box.appendChild(d);setTimeout(n,reduced?0:650)}n()})();
/* Tilt */
(function(){var card=$("#tiltCard");if(!card||reduced||!window.matchMedia("(pointer:fine)").matches)return;card.addEventListener("mousemove",function(e){var r=card.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-10,ry=((e.clientX-r.left)/r.width-.5)*12;card.style.transform="perspective(900px) rotateX("+rx+"deg) rotateY("+ry+"deg)"});card.addEventListener("mouseleave",function(){card.style.transform=""})})();
/* Contadores */
(function(){var els=$$("[data-count]");if(!els.length)return;var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;o.unobserve(e.target);var el=e.target,end=parseInt(el.getAttribute("data-count"),10),suf=el.getAttribute("data-suffix")||"",t0=null;function st(t){if(!t0)t0=t;var pr=Math.min(1,(t-t0)/1400),v=Math.floor(end*(pr<.5?2*pr*pr:1-Math.pow(-2*pr+2,2)/2));el.textContent=v.toLocaleString("es-CL")+suf;if(pr<1)requestAnimationFrame(st)}if(reduced)el.textContent=end.toLocaleString("es-CL")+suf;else requestAnimationFrame(st)})},{threshold:.4});els.forEach(function(el){o.observe(el)})})();
/* Marquee duplicado */
(function(){var m=$("#mq");if(m)m.textContent=m.textContent+m.textContent})();
/* Productos home teaser */
(function(){var box=$("#homeProducts");if(!box||!window.HDD_PRODUCTS)return;box.innerHTML=window.HDD_PRODUCTS.map(function(pr){return '<div class="mini"><span>'+esc(pr.name)+' · '+esc(pr.cpu)+' · '+esc(pr.ram)+'</span><b>'+esc(pr.pTrans)+'</b></div>'}).join("")})();
/* Reviews carousel activo: autoplay + swipe + loop (sin API key, datos locales) */
(function(){var tr=$("#revTrack");if(!tr||!window.HDD_REVIEWS)return;var dots=$("#revDots"),count=$("#revCount"),prev=$("#revPrev"),next=$("#revNext"),box=$("#revBox"),gm=window.HDD_GMAPS||"#resenas";
var slides=window.HDD_REVIEWS.map(function(r){return '<article class="rev"><div class="rev-stars">★★★★★</div><p>“'+esc(r.t)+'”</p><footer><span class="rev-av">'+esc(r.n.charAt(0))+'</span><span><b>'+esc(r.n)+'</b><small>'+esc(r.d)+'</small></span></footer></article>'}).join("");
slides+='<article class="rev rev-cta"><div class="rev-stars">★★★★★</div><p>¿Ya confiaste tu equipo? Súmate en Google.</p><footer><a class="btn primary" target="_blank" rel="noopener" href="'+gm+'">Dejar reseña en Google →</a></footer></article>';
tr.innerHTML=slides;var total=window.HDD_REVIEWS.length+1,idx=0,timer=null,DUR=4500;
function paint(){tr.style.transform="translateX(-"+(idx*100)+"%)";var ds=dots.children;for(var i=0;i<ds.length;i++){ds[i].className=i===idx?"on":"";if(i===idx&&!reduced){var f=ds[i].querySelector("i");if(f){f.style.animation="none";void f.offsetWidth;f.style.animation=""}}}if(count)count.textContent=(idx+1)+" / "+total;tr.setAttribute("aria-live","polite")}
function buildDots(){dots.innerHTML="";for(var i=0;i<total;i++){var d=document.createElement("button");d.setAttribute("aria-label","Ir a reseña "+(i+1));d.innerHTML="<i></i>";(function(k){d.addEventListener("click",function(){go(k);restart()})})(i);dots.appendChild(d)}}
function go(n){idx=((n%total)+total)%total;paint()}
function restart(){stop();if(!reduced)timer=setInterval(function(){go(idx+1)},DUR)}
function stop(){if(timer){clearInterval(timer);timer=null}}
buildDots();paint();restart();
if(next)next.addEventListener("click",function(){go(idx+1);restart()});
if(prev)prev.addEventListener("click",function(){go(idx-1);restart()});
if(box){box.addEventListener("mouseenter",stop);box.addEventListener("mouseleave",restart);box.addEventListener("focusin",stop);box.addEventListener("focusout",restart);
var sx=0;box.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;stop()},{passive:true});
box.addEventListener("touchend",function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(idx+(dx<0?1:-1));restart()},{passive:true});}
document.addEventListener("keydown",function(e){if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;var r=box?box.getBoundingClientRect():null;if(r&&r.top<innerHeight&&r.bottom>0){go(idx+(e.key==="ArrowRight"?1:-1));restart()}});})();
/* Hero mini carousel: 6 reseñas en la ventana en vivo */
(function(){var tr=$("#heroRevTrack");if(!tr||!window.HDD_REVIEWS)return;var dots=$("#heroRevDots");var idx=0,timer=null,DUR=2800;tr.innerHTML=window.HDD_REVIEWS.map(function(r){return '<div style="min-width:100%;min-height:80px;padding:14px;display:flex;gap:10px;align-items:center;box-sizing:border-box;background:rgba(56,189,248,.04);border-bottom:1px solid rgba(96,165,250,.18)"><span class="rev-av" style="width:36px;height:36px;font-size:14px;flex-shrink:0">'+esc(r.n.charAt(0))+'</span><span style="flex:1"><b style="font-size:12px;display:block;color:#e8eefc">'+esc(r.n)+'</b><small style="font-size:11px;color:var(--mut);line-height:1.3;display:block">“'+esc(r.t)+'”</small><small style="font-size:10px;color:var(--gold)">★★★★★ · '+esc(r.d)+'</small></span></div>'}).join("");var total=window.HDD_REVIEWS.length;function paint(){tr.style.transform="translateX(-"+(idx*100)+"%)";if(dots){var ds=dots.children;for(var i=0;i<ds.length;i++)ds[i].style.background=i===idx?"var(--acc)":"rgba(255,255,255,.25)"}}function buildDots(){if(!dots)return;dots.innerHTML="";for(var i=0;i<total;i++){var d=document.createElement("button");d.style.cssText="width:6px;height:6px;border-radius:50%;border:0;padding:0;cursor:pointer;background:rgba(255,255,255,.25)";(function(k){d.addEventListener("click",function(){idx=k;paint();restart()})})(i);dots.appendChild(d)}}function go(n){idx=((n%total)+total)%total;paint()}function restart(){stop();if(!reduced)timer=setInterval(function(){go(idx+1)},DUR)}function stop(){if(timer){clearInterval(timer);timer=null}}buildDots();paint();restart();var card=$("#tiltCard");if(card){card.addEventListener("mouseenter",stop);card.addEventListener("mouseleave",restart)}})();
/* Catálogo dinámico */
(function(){var grid=$("#catGrid");if(!grid||!window.HDD_PRODUCTS)return;var q=$("#q"),fb=$("#fBrand"),fr=$("#fRam"),fs=$("#fSort"),ct=$("#count"),emp=$("#empty"),cmp=$("#cmp"),cmpl=$("#cmpList");
function norm(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function validQ(s){if(!s)return true;s=String(s);if(s.length>100)return false;if(/[<>\"'`]/.test(s))return false;return /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ \-\.,\"]+$/i.test(s)||/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ \-\.,]+$/.test(s)}
function list(){var query=(q.value||"").trim();if(query&&!validQ(query)){q.style.borderColor="#f87171";query=""}else q.style.borderColor="";var b=fb.value,r=fr.value,qn=norm(query);var L=window.HDD_PRODUCTS.filter(function(pr){if(b&&pr.brand!==b)return false;if(r&&!(pr.ram||"").startsWith(r))return false;if(qn&&norm(pr.name+" "+pr.cpu+" "+pr.ram+" "+pr.disk+" "+pr.desc).indexOf(qn)<0)return false;return true});if(fs.value==="asc")L.sort(function(a,b2){return a.price-b2.price});if(fs.value==="desc")L.sort(function(a,b2){return b2.price-a.price});return L}
function stars(n){var s="";for(var i=1;i<=5;i++)s+=i<=n?"★":"☆";return s}
function render(){var L=list();ct.textContent=L.length+" equipo(s) · precios claros, garantía incluida";grid.innerHTML=L.map(function(pr){var specs=[pr.cpu,pr.ram,pr.disk,pr.screen].concat(pr.extra||[]).map(function(s){return "<span>"+esc(s)+"</span>"}).join("");return '<article class="p-card hover-glow"><div class="p-top"><span class="p-brand">'+esc(pr.brand)+' · '+esc(pr.tag)+'</span><span class="p-stars">'+stars(pr.stars)+'</span></div><h3>'+esc(pr.name)+'</h3><div class="specs">'+specs+'</div><p class="p-desc">'+esc(pr.desc)+'</p><div class="p-note">⛨ '+esc(pr.note)+'</div><div class="prices"><div class="price tr"><small>TRANSFERENCIA</small><b>'+esc(pr.pTrans)+'</b></div><div class="price cd"><small>DÉBITO / CRÉDITO</small><b>'+esc(pr.pCard)+'</b></div></div><a class="p-wa" target="_blank" rel="noopener" href="https://wa.me/'+window.HDD_WA+'?text='+pr.wa+'">Consultar por WhatsApp →</a></article>'}).join("");emp.hidden=L.length!==0;if(L.length>=2){cmp.hidden=false;var srt=L.slice().sort(function(a,b){return a.price-b.price});cmpl.innerHTML=srt.map(function(pr,i){return '<div class="cmp-row '+(i===0?"best":"")+'"><span>'+esc(pr.name)+'</span><b>'+esc(pr.pTrans)+(i===0?" ★ mejor":"")+'</b></div>'}).join("")}else cmp.hidden=true}
[q,fb,fr,fs].forEach(function(el){el.addEventListener("input",render);el.addEventListener("change",render)});render()})();
/* Modales */
function openM(id){var m=document.getElementById(id);if(m){m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}}
function closeM(m){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$("[data-open]").forEach(function(b){b.addEventListener("click",function(){var id=b.getAttribute("data-open");if(b.getAttribute("data-svc")){var s=$("#svcType");if(s)s.value=b.getAttribute("data-svc")}openM(id)})});
$$(".ov").forEach(function(m){m.addEventListener("click",function(e){if(e.target===m)closeM(m)})});$$("[data-close]").forEach(function(b){b.addEventListener("click",function(){closeM(b.closest(".ov"))})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")$$(".ov.open").forEach(closeM)});
/* Cookies: solo técnicas, banner mínimo */
(function(){var bar=$("#cookieBar"),ok=$("#cookieOk");if(!bar||!ok)return;try{if(localStorage.getItem("hdd_cookie")==="1"){return}bar.classList.add("show");ok.addEventListener("click",function(){localStorage.setItem("hdd_cookie","1");bar.classList.remove("show")})}catch(e){}})();
/* Form servicio → WhatsApp */
var sf=$("#svcForm");
if(sf)sf.addEventListener("submit",function(e){e.preventDefault();var err=$("#svcErr");err.hidden=true;var n=$("#svcName").value.trim(),ph=$("#svcPhone").value.replace(/\D/g,""),ty=$("#svcType").value,ms=$("#svcMsg").value.trim();
if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,60}$/.test(n)){err.textContent="Nombre inválido (solo letras, 2-60).";err.hidden=false;return}
if(!/^9\d{8}$/.test(ph)){err.textContent="Teléfono inválido: debe ser 9 + 8 dígitos (ej: 961991725).";err.hidden=false;return}
if(ms.length<4||ms.length>300||/[<>]/.test(ms)){err.textContent="Describe el problema (4-300, sin < >).";err.hidden=false;return}
var h=new Date().getHours(),sa=h>=6&&h<13?"Buenos días":h>=13&&h<20?"Buenas tardes":"Buenas noches";
var url="https://wa.me/"+window.HDD_WA+"?text="+encodeURIComponent(sa+", soy "+n+". Contacto: +56 "+ph+". Servicio: "+ty+". Detalle: "+ms);
window.open(url,"_blank");toast("Abriendo WhatsApp con tu solicitud…");closeM($("#serviceModal"));sf.reset()});
/* RUT + empresas */
function vRut(r){r=r.replace(/\./g,"").replace(/-/g,"").trim().toUpperCase();if(!/^[0-9]+[0-9K]$/.test(r))return false;var c=r.slice(0,-1),d=r.slice(-1),s=0,m=2;for(var i=c.length-1;i>=0;i--){s+=parseInt(c[i],10)*m;m=m<7?m+1:2}var e=11-(s%11);var ch=e===11?"0":e===10?"K":String(e);return ch===d}
function fRut(r){r=r.replace(/[^0-9kK]/g,"").toUpperCase();if(r.length<=1)return r;var c=r.slice(0,-1),d=r.slice(-1),o="";for(var i=c.length-1,j=0;i>=0;i--,j++){if(j>0&&j%3===0)o="."+o;o=c[i]+o}return o+"-"+d}
var br=$("#bizRut");if(br)br.addEventListener("input",function(){br.value=fRut(br.value)});
var bf=$("#bizForm");
if(bf)bf.addEventListener("submit",function(e){e.preventDefault();var err=$("#bizErr");err.hidden=true;var n=$("#bizName").value.trim(),r=$("#bizRut").value.trim(),co=$("#bizCom").value.trim(),pe=$("#bizPer").value,ms=$("#bizMsg").value.trim();
if(n.length<2||/[<>]/.test(n)){err.textContent="Empresa inválida.";err.hidden=false;return}
if(!vRut(r)){err.textContent="RUT inválido (ej: 12.345.678-9).";err.hidden=false;return}
if(co.length<2||/[<>]/.test(co)){err.textContent="Comuna inválida.";err.hidden=false;return}
if(ms.length<4||/[<>]/.test(ms)){err.textContent="Describe el servicio (4+, sin < >).";err.hidden=false;return}
var msg="Hola, quiero cotizar plan empresas.%0A%0AEmpresa: "+encodeURIComponent(n)+"%0ARUT: "+encodeURIComponent(r)+"%0AComuna: "+encodeURIComponent(co)+"%0APeríodo: "+encodeURIComponent(pe)+"%0ADetalle: "+encodeURIComponent(ms);
window.open("https://wa.me/"+window.HDD_WA+"?text="+msg,"_blank");toast("Cotización lista en WhatsApp…");closeM($("#bizModal"));bf.reset()});
})();
