"use strict";
/* HDD V2 — JS poder total: efectos + seguridad (esc + validación). Sin secretos. */
(function(){
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function toast(m){var t=$("#toast");if(!t)return;t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("show")},2600)}
var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* i18n ES/EN - default es */
var I18N={
es:{
"nav.home":"Inicio","nav.services":"Servicios","nav.process":"Proceso","nav.reviews":"Reseñas","nav.contact":"Contacto",
"hero.badge":"SERVICIO PREMIUM \u00b7 GARANT\u00cdA REAL \u00b7 20 A\u00d1OS",
"hero.title":"Servicio t\u00e9cnico<br><span class=\"grad\">en computaci\u00f3n,</span><br>con <span id=\"typing\" class=\"typing\">garant\u00eda real</span>",
"hero.lead":"Servicio T\u00e9cnico Especializado en Laptops y Equipos de C\u00f3mputo<br>Diagn\u00f3stico preciso, mantenimiento preventivo y reparaci\u00f3n con garant\u00eda por escrito. Respaldado por m\u00e1s de 1.350 clientes satisfechos en Santiago y un \u00edndice de efectividad superior al 99%.",
"hero.cta1":"Agendar diagn\u00f3stico","hero.cta2":"Ver servicios",
"hero.trust1":"\u2605 5.0 Google","hero.trust2":"\uD83D\uDEE1 Garant\u00eda real","hero.trust3":"\u26A1 Diagn\u00f3stico honesto",
"hero.kpi1":"Clientes","hero.kpi2":"A\u00f1os","hero.kpi3":"Satisfacci\u00f3n",
"hero.cardTag":"\u25CF CONFIANZA VERIFICADA \u00b7 EN VIVO","hero.today":"hoy \u00b7 \u00d1u\u00f1oa",
"hero.available":"Disponible hoy en \u00d1u\u00f1oa","hero.cardResp":"Respuesta <10 min",
"hero.cardDesc":"Atenci\u00f3n directa con el Ing. Alejandro \u2014 sin intermediarios. Coordinas por WhatsApp y recibes diagn\u00f3stico honesto antes de reparar.",
"hero.google":"Ver ficha Google 5.0 \u2192",
"hero.foot1k":"RESPUESTA","hero.foot1v":"\u25CF <10 min","hero.foot2k":"DIAGN\u00d3STICO","hero.foot2v":"Honesto","hero.foot3k":"GARANT\u00cdA","hero.foot3v":"Real",
"hero.pill1":"\u2714 Diagn\u00f3stico honesto","hero.pill2":"\u2714 Todas las marcas","hero.pill3":"\u2714 Atenci\u00f3n personalizada",
"hero.marquee":"TODAS LAS MARCAS \u00b7 DIAGN\u00d3STICO HONESTO \u00b7 GARANT\u00cdA REAL \u00b7 \u00d1U\u00d1OA \u00b7 SANTIAGO \u00b7\u00a0",
"services.kick":"SERVICIOS","services.title":"Tu socio tecnol\u00f3gico <span class=\"grad\">de confianza</span>","services.sub":"Soluciones completas con diagn\u00f3stico honesto y garant\u00eda real.",
"services.s1h":"Reparaci\u00f3n de PCs","services.s1p":"Diagn\u00f3stico y reparaci\u00f3n de escritorio y laptops de todas las marcas con garant\u00eda real.","services.s1a":"Solicitar \u2192",
"services.s2h":"Mantenimiento","services.s2p":"Limpieza profunda, cambio de pasta t\u00e9rmica al procesador y gr\u00e1fica, y limpieza general del equipo.","services.s2a":"Solicitar \u2192",
"services.s3h":"Contrato Mensual para Empresas","services.s3p":"Plan de soporte continuo en software y hardware con cobertura mensual. Atenci\u00f3n prioritaria y asistencia remota.","services.s3a":"Cotizar plan \u2192",
"services.s4h":"Soporte T\u00e9cnico","services.s4p":"Atenci\u00f3n remota y presencial con instalaci\u00f3n de software, respuesta r\u00e1pida y soluci\u00f3n efectiva garantizada.","services.s4a":"Solicitar \u2192",
"services.s5h":"Reparaciones F\u00edsicas","services.s5p":"Reparaci\u00f3n de bisagra, pantalla, cambio de teclado, tapas y dem\u00e1s componentes f\u00edsicos de notebook.","services.s5a":"Solicitar \u2192",
"process.title":"C\u00f3mo solicitar <span class=\"grad\">el servicio</span>","process.sub":"Completa el formulario y te contactamos por WhatsApp.",
"process.s1h":"Cu\u00e9ntame","process.s1p":"Nombre, tel\u00e9fono y descripci\u00f3n del problema en el formulario.",
"process.s2h":"Se abre WhatsApp","process.s2p":"Tu mensaje llega directo al Ing. Alejandro Casanova.",
"process.s3h":"Diagn\u00f3stico","process.s3p":"Revisi\u00f3n y presupuesto claro antes de reparar.",
"process.s4h":"Garant\u00eda real","process.s4p":"Atenci\u00f3n personalizada y garant\u00eda.",
"social.kick":"CONTENIDO REAL","social.title":"El taller, <span class=\"grad\">d\u00eda a d\u00eda</span>","social.sub":"S\u00edguenos en Instagram y TikTok para ver trabajos y tips t\u00e9cnicos.",
"social.igDesc":"Trabajos y detr\u00e1s de escena","social.tkDesc":"Tips r\u00e1pidos y urgencias",
"about.kick":"NOSOTROS","about.name":"Ing. Alejandro <span class=\"grad\">Casanova</span>","about.role":"Due\u00f1o & T\u00e9cnico Principal \u2014 20 A\u00f1os de Experiencia","about.desc":"Ingeniero en Sistemas con dos d\u00e9cadas en reparaci\u00f3n, mantenimiento y soporte. Fund\u00f3 HDD Tecnolog\u00eda Store en 2019 en Chile, para un servicio honesto, con garant\u00eda real y atenci\u00f3n personalizada. M\u00e1s de <b>1.350 clientes</b> en Santiago.","about.quote":"\u201cAtenci\u00f3n, servicio y soluci\u00f3n. Eso es lo que ofrezco. Nada menos.\u201d","about.cta1":"Hablar con Alejandro","about.cta2":"Ver rese\u00f1as Google",
"about.badge1":"\u25CF Disponible hoy","about.badge2":"Taller \u00b7 \u00d1u\u00f1oa","about.cardRole":"Due\u00f1o y T\u00e9cnico Principal","about.s1":"a\u00f1os","about.s2":"clientes","about.s3":"\u00e9xito",
"reviews.kick":"PRUEBA SOCIAL","reviews.title":"Lo que dicen <span class=\"grad\">mis clientes</span>","reviews.sub":"Google 5.0 verificado. <a target=\"_blank\" rel=\"noopener\" href=\"https://www.google.com/maps/place/?q=place_id:ChIJC6Bso6XPYpYRk9egCQTftUE\">Ver todas en Google \u2192</a>","reviews.gbtn":"Ver en Google",
"contact.kick":"CONTACTO","contact.title":"Hablemos de <span class=\"grad\">tu equipo</span>","contact.sub":"Coordinamos directamente por WhatsApp con Alejandro.",
"contact.c1p":"Servicio t\u00e9cnico con garant\u00eda real y atenci\u00f3n personalizada.","contact.wa":"WhatsApp directo",
"contact.c2h":"Servicios","contact.s1":"Reparaci\u00f3n de PCs","contact.s2":"Mantenimiento","contact.s3":"Contrato empresas","contact.s4":"Soporte T\u00e9cnico",
"contact.c3h":"Ubicaci\u00f3n","contact.c3p":"Atenci\u00f3n coordinada por WhatsApp con Alejandro","contact.how":"Te indico c\u00f3mo llegar \u2192",
"float.tip":"Escr\u00edbeme ahora",
"modal.svcTitle":"Solicita tu servicio","modal.svcSub":"Te abro WhatsApp con tu mensaje listo. Sin cuentas, sin espera.",
"modal.svcName":"Nombre","modal.svcPhone":"Tel\u00e9fono","modal.svcService":"Servicio","modal.svcOpt1":"Diagn\u00f3stico general","modal.svcOpt2":"Reparaci\u00f3n de PCs","modal.svcOpt3":"Mantenimiento","modal.svcOpt4":"Soporte T\u00e9cnico","modal.svcOpt5":"Reparaci\u00f3n f\u00edsica","modal.svcOpt6":"Notebook reacondicionado",
"modal.svcMsg":"Describe el problema","modal.svcLegal":"Al enviar aceptas <a href=\"privacidad.html\">privacidad</a> y <a href=\"terminos.html\">t\u00e9rminos</a>.","modal.svcBtn":"Enviar por WhatsApp \u2192",
"modal.bizTitle":"Contrato mensual empresas","modal.bizSub":"Cotizaci\u00f3n con RUT validado (m\u00f3dulo 11). Te llega lista a WhatsApp.",
"modal.bizName":"Empresa","modal.bizCom":"Comuna","modal.bizPer":"Per\u00edodo","modal.bizPer1":"3 meses","modal.bizPer2":"6 meses","modal.bizPer3":"1 a\u00f1o","modal.bizMsg":"Qu\u00e9 necesitan","modal.bizLegal":"Al cotizar aceptas <a href=\"privacidad.html\">privacidad</a> y <a href=\"terminos.html\">t\u00e9rminos</a>.","modal.bizBtn":"Cotizar por WhatsApp \u2192"
},
en:{
"nav.home":"Home","nav.services":"Services","nav.process":"Process","nav.reviews":"Reviews","nav.contact":"Contact",
"hero.badge":"PREMIUM SERVICE \u00b7 REAL WARRANTY \u00b7 20 YEARS",
"hero.title":"Technical service<br><span class=\"grad\">for computers,</span><br>with <span id=\"typing\" class=\"typing\">real warranty</span>",
"hero.lead":"Specialized Technical Service for Laptops and Computers<br>Accurate diagnostics, preventive maintenance and repair with written warranty. Trusted by over 1,350 satisfied clients in Santiago with over 99% success rate.",
"hero.cta1":"Book diagnosis","hero.cta2":"View services",
"hero.trust1":"\u2605 5.0 Google","hero.trust2":"\uD83D\uDEE1 Real warranty","hero.trust3":"\u26A1 Honest diagnosis",
"hero.kpi1":"Clients","hero.kpi2":"Years","hero.kpi3":"Satisfaction",
"hero.cardTag":"\u25CF VERIFIED TRUST \u00b7 LIVE","hero.today":"today \u00b7 \u00d1u\u00f1oa",
"hero.available":"Available today in \u00d1u\u00f1oa","hero.cardResp":"Reply <10 min",
"hero.cardDesc":"Direct service with Eng. Alejandro \u2014 no middlemen. Coordinate via WhatsApp and get an honest diagnosis before any repair.",
"hero.google":"View Google profile 5.0 \u2192",
"hero.foot1k":"RESPONSE","hero.foot1v":"\u25CF <10 min","hero.foot2k":"DIAGNOSIS","hero.foot2v":"Honest","hero.foot3k":"WARRANTY","hero.foot3v":"Real",
"hero.pill1":"\u2714 Honest diagnosis","hero.pill2":"\u2714 All brands","hero.pill3":"\u2714 Personalized service",
"hero.marquee":"ALL BRANDS \u00b7 HONEST DIAGNOSIS \u00b7 REAL WARRANTY \u00b7 \u00d1U\u00d1OA \u00b7 SANTIAGO \u00b7\u00a0",
"services.kick":"SERVICES","services.title":"Your trusted <span class=\"grad\">tech partner</span>","services.sub":"Complete solutions with honest diagnosis and real warranty.",
"services.s1h":"PC Repair","services.s1p":"Diagnosis and repair for desktops and laptops of all brands with real warranty.","services.s1a":"Request \u2192",
"services.s2h":"Maintenance","services.s2p":"Deep cleaning, thermal paste replacement for CPU/GPU and full system cleaning.","services.s2a":"Request \u2192",
"services.s3h":"Monthly Business Plan","services.s3p":"Ongoing software and hardware support with monthly coverage. Priority care and remote assistance.","services.s3a":"Get quote \u2192",
"services.s4h":"Technical Support","services.s4p":"Remote and on-site support with software installation, fast response and guaranteed effective solution.","services.s4a":"Request \u2192",
"services.s5h":"Physical Repairs","services.s5p":"Hinge, screen, keyboard, covers and other physical notebook components repair.","services.s5a":"Request \u2192",
"process.title":"How to request <span class=\"grad\">the service</span>","process.sub":"Fill the form and we contact you via WhatsApp.",
"process.s1h":"Tell me","process.s1p":"Name, phone and problem description in the form.",
"process.s2h":"WhatsApp opens","process.s2p":"Your message goes directly to Eng. Alejandro Casanova.",
"process.s3h":"Diagnosis","process.s3p":"Review and clear quote before repair.",
"process.s4h":"Real warranty","process.s4p":"Personalized care and warranty.",
"social.kick":"REAL CONTENT","social.title":"The workshop, <span class=\"grad\">day by day</span>","social.sub":"Follow us on Instagram and TikTok for jobs and tech tips.",
"social.igDesc":"Jobs and behind the scenes","social.tkDesc":"Quick tips and emergencies",
"about.kick":"ABOUT US","about.name":"Eng. Alejandro <span class=\"grad\">Casanova</span>","about.role":"Owner & Lead Technician \u2014 20 Years Experience","about.desc":"Systems Engineer with two decades in repair, maintenance and support. Founded HDD Tecnolog\u00eda Store in 2019 in Chile, for honest service with real warranty and personalized attention. Over <b>1,350 clients</b> in Santiago.","about.quote":"\u201cCare, service and solution. That\u2019s what I offer. Nothing less.\u201d","about.cta1":"Talk to Alejandro","about.cta2":"View Google reviews",
"about.badge1":"\u25CF Available today","about.badge2":"Workshop \u00b7 \u00d1u\u00f1oa","about.cardRole":"Owner & Lead Technician","about.s1":"years","about.s2":"clients","about.s3":"success",
"reviews.kick":"SOCIAL PROOF","reviews.title":"What <span class=\"grad\">my clients</span> say","reviews.sub":"Google 5.0 verified. <a target=\"_blank\" rel=\"noopener\" href=\"https://www.google.com/maps/place/?q=place_id:ChIJC6Bso6XPYpYRk9egCQTftUE\">View all on Google \u2192</a>","reviews.gbtn":"View on Google",
"contact.kick":"CONTACT","contact.title":"Let\u2019s talk about <span class=\"grad\">your device</span>","contact.sub":"We coordinate directly via WhatsApp with Alejandro.",
"contact.c1p":"Technical service with real warranty and personalized attention.","contact.wa":"Direct WhatsApp",
"contact.c2h":"Services","contact.s1":"PC Repair","contact.s2":"Maintenance","contact.s3":"Business plan","contact.s4":"Technical Support",
"contact.c3h":"Location","contact.c3p":"Care coordinated via WhatsApp with Alejandro","contact.how":"Get directions \u2192",
"float.tip":"Message me now",
"modal.svcTitle":"Request your service","modal.svcSub":"I open WhatsApp with your ready message. No accounts, no waiting.",
"modal.svcName":"Name","modal.svcPhone":"Phone","modal.svcService":"Service","modal.svcOpt1":"General diagnosis","modal.svcOpt2":"PC Repair","modal.svcOpt3":"Maintenance","modal.svcOpt4":"Technical Support","modal.svcOpt5":"Physical repair","modal.svcOpt6":"Refurbished notebook",
"modal.svcMsg":"Describe the issue","modal.svcLegal":"By sending you accept <a href=\"privacidad.html\">privacy</a> and <a href=\"terminos.html\">terms</a>.","modal.svcBtn":"Send via WhatsApp \u2192",
"modal.bizTitle":"Monthly business contract","modal.bizSub":"Quote with validated RUT (mod 11). Sent ready to WhatsApp.",
"modal.bizName":"Company","modal.bizCom":"District","modal.bizPer":"Period","modal.bizPer1":"3 months","modal.bizPer2":"6 months","modal.bizPer3":"1 year","modal.bizMsg":"What do you need","modal.bizLegal":"By quoting you accept <a href=\"privacidad.html\">privacy</a> and <a href=\"terminos.html\">terms</a>.","modal.bizBtn":"Quote via WhatsApp \u2192"
}
};
var curLang="es";try{curLang=localStorage.getItem("hdd_lang")||"es"}catch(e){}
function applyLang(l){
 curLang=l;try{localStorage.setItem("hdd_lang",l)}catch(e){}
 document.documentElement.lang=l;
 $$("[data-i18n]").forEach(function(el){
  var k=el.getAttribute("data-i18n");var v=I18N[l]&&I18N[l][k];if(v==null)return;
  if(k==="hero.title"||k==="services.title"||k==="process.title"||k==="social.title"||k==="about.name"||k==="reviews.title"||k==="contact.title"||k==="hero.marquee"||k==="about.desc"||k.indexOf("Legal")>=0){
   el.innerHTML=v;
  } else {
   var hasHTML=/<[a-z]/i.test(v);if(hasHTML)el.innerHTML=v;else el.textContent=v;
  }
 });
 var mq=$("#mq");if(mq&&I18N[l]["hero.marquee"]){mq.textContent=I18N[l]["hero.marquee"]+I18N[l]["hero.marquee"]}
 $$(".lang-btn").forEach(function(b){var a=b.getAttribute("data-lang")===l;b.classList.toggle("active",a);b.setAttribute("aria-pressed",a?"true":"false")});
 window.HDD_LANG=l;
 try{window.dispatchEvent(new CustomEvent("hdd:lang",{detail:l}))}catch(e){}
 var typingWords=l==="en"?["real warranty","honest diagnosis","personalized service"]:["garant\u00eda real","diagn\u00f3stico honesto","atenci\u00f3n personalizada"];
 var typEl=$("#typing");if(typEl)typEl.setAttribute("data-words",typingWords.join("|"));
 document.title=l==="en"?"HDD Technology Store \u2014 Trusted Technical Service | \u00d1u\u00f1oa, Santiago":"HDD Tecnolog\u00eda Store \u2014 Servicio T\u00e9cnico de Confianza | \u00d1u\u00f1oa, Santiago";
}
function initLang(){applyLang(curLang);$$(".lang-btn").forEach(function(b){b.addEventListener("click",function(){applyLang(b.getAttribute("data-lang"))})})}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initLang)}else{initLang()}
window.HDD_I18N=I18N;window.HDD_applyLang=applyLang;
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
/* Typing hero - lang aware */
(function(){function getEl(){return document.getElementById("typing")}var el=getEl();if(!el)return;function getW(){var L="es";try{L=localStorage.getItem("hdd_lang")||"es"}catch(e){}return L==="en"?["real warranty","honest diagnosis","personalized service"]:["garant\u00eda real","diagn\u00f3stico honesto","atenci\u00f3n personalizada"];}var w=getW(),i=0,j=0,del=false;function t(){var cur=getEl();if(!cur)return;var s=w[i];if(!del){j++;cur.textContent=s.slice(0,j);if(j===s.length){del=true;setTimeout(t,1300);return}}else{j--;cur.textContent=s.slice(0,j);if(j===0){del=false;i=(i+1)%w.length;w=getW()}}setTimeout(t,del?45:110)}if(!reduced)t();else el.textContent=w[0];window.addEventListener("hdd:lang",function(e){w=e.detail==="en"?["real warranty","honest diagnosis","personalized service"]:["garant\u00eda real","diagn\u00f3stico honesto","atenci\u00f3n personalizada"];j=0;del=false;i=0})})();
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
