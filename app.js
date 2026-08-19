const PHASES = [
  {
    id:"empathize", name:"Empatizar", verb:"Añadir observación",
    desc:"Recoger hechos, necesidades, frustraciones, comportamientos y contexto sin saltar todavía a la solución.",
    template:"[USUARIO / PERFIL] necesita / intenta [OBJETIVO], pero [DIFICULTAD OBSERVADA], porque [CONTEXTO O MOTIVO].",
    starter:" necesita / intenta , pero , porque "
  },
  {
    id:"define", name:"Definir", verb:"Definir problema",
    desc:"Convertir observaciones dispersas en necesidades y problemas concretos, apoyados en evidencias de la fase anterior.",
    template:"[USUARIO / PERFIL] necesita una forma de [NECESIDAD] porque [INSIGHT / CAUSA], aunque actualmente [BARRERA].",
    starter:" necesita una forma de  porque , aunque actualmente ",
    sources:true
  },
  {
    id:"ideate", name:"Idear", verb:"Proponer idea",
    desc:"Generar alternativas. Una idea puede responder a uno o varios problemas definidos y conservará esa relación.",
    template:"¿Cómo podríamos [ACCIÓN / CAMBIO] para que [USUARIO] consiga [RESULTADO] sin [BARRERA / COSTE]?",
    starter:"¿Cómo podríamos  para que  consiga  sin ?",
    sources:true
  },
  {
    id:"prototype", name:"Prototipar", verb:"Definir prototipo",
    desc:"Transformar las ideas seleccionadas en experimentos concretos, pequeños y observables.",
    template:"Vamos a probar [SOLUCIÓN] con [USUARIO / CONTEXTO], simulando [FUNCIÓN CLAVE], para aprender [HIPÓTESIS].",
    starter:"Vamos a probar  con , simulando , para aprender ",
    sources:true
  },
  {
    id:"test", name:"Probar", verb:"Registrar aprendizaje",
    desc:"Registrar evidencias del test, separar hechos de opiniones y decidir qué conservar, modificar o descartar.",
    template:"Al probar [PROTOTIPO], observamos que [EVIDENCIA]. Esto sugiere [APRENDIZAJE], por lo que decidimos [ACCIÓN].",
    starter:"Al probar , observamos que . Esto sugiere , por lo que decidimos ",
    sources:true
  }
];

const DEFAULT_ROLES = [
  {id:"facilitador", name:"Facilitador", phases:["empathize","define","ideate","prototype","test"]},
  {id:"usuario", name:"Usuario / cliente", phases:["empathize","test"]},
  {id:"tecnico", name:"Técnico", phases:["empathize","define","ideate","prototype","test"]},
  {id:"comercial", name:"Comercial", phases:["empathize","define","ideate","test"]},
  {id:"direccion", name:"Dirección", phases:["define","ideate","prototype","test"]}
];

const DEMO = {
  projectName:"Nuevo reto BerriKide",
  currentPhase:"empathize",
  roles:DEFAULT_ROLES,
  topics:[
    {id:"t1",name:"Ofertas",description:"Problemas y oportunidades en el proceso de ofertar."},
    {id:"t2",name:"Documentación",description:"Planos, versiones, PDM y acceso a información."}
  ],
  contributions:[
    {id:"c1",phase:"empathize",author:"Ane",role:"comercial",cluster:"Ofertas",priority:"alta",text:"El comercial necesita preparar una oferta rápida, pero depende de ingeniería para conocer tiempos y componentes, porque la información no está estructurada.",sourceIds:[],createdAt:Date.now()-100000},
    {id:"c2",phase:"empathize",author:"Mikel",role:"tecnico",cluster:"Documentación",priority:"media",text:"El técnico necesita reutilizar diseños anteriores, pero tarda en encontrarlos, porque los nombres y carpetas no siguen siempre el mismo criterio.",sourceIds:[],createdAt:Date.now()-90000}
  ]
};

let state = loadState();
let currentView = "cards";
let selectedSources = new Set();

function loadState(){
  try{
    const raw=localStorage.getItem("bk-design-thinking-v1");
    return raw ? JSON.parse(raw) : structuredClone(DEMO);
  }catch(e){ return structuredClone(DEMO); }
}
function saveState(){ localStorage.setItem("bk-design-thinking-v1",JSON.stringify(state)); }

const $ = s => document.querySelector(s);
const phase = () => PHASES.find(p=>p.id===state.currentPhase);
const roleName = id => (state.roles.find(r=>r.id===id)||{}).name || id;

function render(){
  $("#projectName").value=state.projectName;
  renderPhases();
  renderRoles();
  renderPhaseHeader();
  renderRoleOptions();
  renderTemplate();
  renderSources();
  renderTopics();
  renderBoard();
}
function renderPhases(){
  $("#phaseNav").innerHTML=PHASES.map((p,i)=>`
    <button class="phase-link ${p.id===state.currentPhase?"active":""}" data-phase="${p.id}">
      <span class="phase-num">${i+1}</span><span>${p.name}</span>
    </button>`).join("");
  document.querySelectorAll(".phase-link").forEach(b=>b.onclick=()=>{state.currentPhase=b.dataset.phase;selectedSources.clear();saveState();render();});
}
function renderRoles(){
  const available=state.roles.filter(r=>r.phases.includes(state.currentPhase));
  $("#roleList").innerHTML=available.map(r=>`<div class="role-chip"><span class="role-dot"></span>${r.name}</div>`).join("");
}
function renderPhaseHeader(){
  const p=phase(), idx=PHASES.indexOf(p);
  $("#phaseIndex").textContent=`FASE ${idx+1} DE ${PHASES.length}`;
  $("#phaseTitle").textContent=p.name;
  $("#mobilePhaseTitle").textContent=p.name;
  $("#phaseDescription").textContent=p.desc;
  $("#composeTitle").textContent=p.verb;
  $("#phaseProgress").innerHTML=PHASES.map((x,i)=>`<span class="progress-dot ${i<idx?"done":i===idx?"active":""}"></span>`).join("");
}
function renderRoleOptions(){
  const available=state.roles.filter(r=>r.phases.includes(state.currentPhase));
  const sel=$("#roleSelect"), old=sel.value;
  sel.innerHTML=available.map(r=>`<option value="${r.id}">${r.name}</option>`).join("");
  if(available.some(r=>r.id===old)) sel.value=old;
  $("#activeRolePill").textContent=roleName(sel.value);
  $("#filterRole").innerHTML='<option value="">Todos los roles</option>'+available.map(r=>`<option value="${r.id}">${r.name}</option>`).join("");
}
function renderTemplate(){
  $("#templateText").textContent=phase().template;
}
function previousContributions(){
  const idx=PHASES.findIndex(p=>p.id===state.currentPhase);
  const allowed=new Set(PHASES.slice(0,idx).map(p=>p.id));
  return state.contributions.filter(c=>allowed.has(c.phase));
}
function renderSources(){
  const p=phase(), area=$("#sourceArea");
  if(!p.sources){ area.classList.add("hidden"); return; }
  area.classList.remove("hidden");
  const items=previousContributions();
  $("#sourceSuggestions").innerHTML=items.length ? items.map(c=>`
    <label class="source-card">
      <input type="checkbox" data-source="${c.id}" ${selectedSources.has(c.id)?"checked":""}>
      <span><strong>${PHASES.find(p=>p.id===c.phase)?.name}</strong> · ${c.cluster||"Sin grupo"}<br>${escapeHtml(c.text)}</span>
    </label>`).join("") : '<div class="muted">No hay aportaciones anteriores todavía.</div>';
  document.querySelectorAll("[data-source]").forEach(x=>x.onchange=()=>x.checked?selectedSources.add(x.dataset.source):selectedSources.delete(x.dataset.source));
}
function renderTopics(){
  const clusters=[...new Set([...state.topics.map(t=>t.name),...state.contributions.map(c=>c.cluster).filter(Boolean)])];
  $("#clustersList").innerHTML=clusters.map(x=>`<option value="${escapeHtml(x)}"></option>`).join("");
}
function filtered(){
  const q=$("#searchInput").value.toLowerCase().trim();
  const role=$("#filterRole").value;
  return state.contributions.filter(c=>c.phase===state.currentPhase)
    .filter(c=>!q || c.text.toLowerCase().includes(q) || (c.cluster||"").toLowerCase().includes(q))
    .filter(c=>!role || c.role===role);
}
function renderBoard(){
  const items=filtered(), board=$("#board"), empty=$("#emptyState");
  empty.classList.toggle("hidden",items.length>0);
  if(!items.length){board.innerHTML="";return;}
  if(currentView==="clusters"){
    const groups={};
    items.forEach(c=>(groups[c.cluster||"Sin grupo"]??=[]).push(c));
    board.innerHTML=Object.entries(groups).map(([name,cards])=>`
      <section class="cluster-section"><div class="cluster-title"><h3>${escapeHtml(name)}</h3><span class="cluster-count">${cards.length} aport.</span></div>
      <div class="cluster-cards">${cards.map(cardHtml).join("")}</div></section>`).join("");
  } else board.innerHTML=items.map(cardHtml).join("");
}
function cardHtml(c){
  const src=c.sourceIds?.length ? `<div class="card-source">↳ Parte de ${c.sourceIds.length} aportación${c.sourceIds.length>1?"es":""} anterior${c.sourceIds.length>1?"es":""}</div>`:"";
  return `<article class="card">
    <div class="card-top"><span class="cluster-badge">${escapeHtml(c.cluster||"Sin grupo")}</span><span class="priority ${c.priority}"></span></div>
    <div class="card-text">${escapeHtml(c.text)}</div>${src}
    <div class="card-meta"><span>${escapeHtml(c.author)} · ${escapeHtml(roleName(c.role))}</span><span>${new Date(c.createdAt).toLocaleDateString("es-ES")}</span></div>
  </article>`;
}
function escapeHtml(s=""){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

$("#roleSelect").onchange=e=>$("#activeRolePill").textContent=roleName(e.target.value);
$("#useTemplateBtn").onclick=()=>{$("#contributionInput").value=phase().starter;$("#contributionInput").focus();};
$("#saveContributionBtn").onclick=()=>{
  const text=$("#contributionInput").value.trim();
  if(!text){$("#contributionInput").focus();return;}
  state.contributions.push({
    id:"c"+Date.now(),phase:state.currentPhase,author:$("#authorInput").value.trim()||"Anónimo",
    role:$("#roleSelect").value,cluster:$("#clusterInput").value.trim()||"Sin grupo",
    priority:$("#prioritySelect").value,text,sourceIds:[...selectedSources],createdAt:Date.now()
  });
  $("#contributionInput").value="";selectedSources.clear();saveState();render();
};
$("#projectName").onchange=e=>{state.projectName=e.target.value.trim()||"Proyecto sin nombre";saveState();}
$("#searchInput").oninput=renderBoard;$("#filterRole").onchange=renderBoard;
document.querySelectorAll(".toggle").forEach(b=>b.onclick=()=>{
  currentView=b.dataset.view;document.querySelectorAll(".toggle").forEach(x=>x.classList.toggle("active",x===b));renderBoard();
});
$("#selectAllSourcesBtn").onclick=()=>{previousContributions().forEach(c=>selectedSources.add(c.id));renderSources();};
$("#newTopicBtn").onclick=()=>$("#topicDialog").showModal();
$("#createTopicBtn").onclick=e=>{
  const name=$("#newTopicName").value.trim(); if(!name){e.preventDefault();return;}
  state.topics.push({id:"t"+Date.now(),name,description:$("#newTopicDescription").value.trim()});
  $("#newTopicName").value="";$("#newTopicDescription").value="";saveState();renderTopics();
};
$("#manageRolesBtn").onclick=()=>{renderRolesMatrix();$("#rolesDialog").showModal();};
function renderRolesMatrix(){
  $("#rolesMatrix").innerHTML=`<table class="roles-table"><thead><tr><th>Rol</th>${PHASES.map(p=>`<th>${p.name}</th>`).join("")}</tr></thead><tbody>`+
  state.roles.map(r=>`<tr><td>${escapeHtml(r.name)}</td>${PHASES.map(p=>`<td><input type="checkbox" data-rp="${r.id}:${p.id}" ${r.phases.includes(p.id)?"checked":""}></td>`).join("")}</tr>`).join("")+"</tbody></table>";
}
$("#saveRolesBtn").onclick=()=>{
  state.roles.forEach(r=>r.phases=PHASES.filter(p=>document.querySelector(`[data-rp="${r.id}:${p.id}"]`)?.checked).map(p=>p.id));
  saveState();render();
};
$("#resetBtn").onclick=()=>{ if(confirm("¿Reiniciar la demo y borrar los datos locales?")){state=structuredClone(DEMO);saveState();render();}};
$("#exportBtn").onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="berrikide-design-thinking.json";a.click();URL.revokeObjectURL(a.href);
};
$("#openSidebar").onclick=()=>$("#sidebar").classList.add("open");
$("#closeSidebar").onclick=()=>$("#sidebar").classList.remove("open");

render();
