const PHASES = [
  {id:"empathize",name:"Empatizar",verb:"Añadir observación",desc:"Recoger hechos, necesidades, frustraciones, comportamientos y contexto sin saltar todavía a la solución.",template:"[USUARIO / PERFIL] necesita / intenta [OBJETIVO], pero [DIFICULTAD OBSERVADA], porque [CONTEXTO O MOTIVO].",starter:" necesita / intenta , pero , porque "},
  {id:"define",name:"Definir",verb:"Definir problema",desc:"Convertir observaciones dispersas en necesidades y problemas concretos, apoyados en evidencias de la fase anterior.",template:"[USUARIO / PERFIL] necesita una forma de [NECESIDAD] porque [INSIGHT / CAUSA], aunque actualmente [BARRERA].",starter:" necesita una forma de  porque , aunque actualmente ",sources:true},
  {id:"ideate",name:"Idear",verb:"Proponer idea",desc:"Generar alternativas. Una idea puede responder a uno o varios problemas definidos y conservará esa relación.",template:"¿Cómo podríamos [ACCIÓN / CAMBIO] para que [USUARIO] consiga [RESULTADO] sin [BARRERA / COSTE]?",starter:"¿Cómo podríamos  para que  consiga  sin ?",sources:true},
  {id:"prototype",name:"Prototipar",verb:"Definir prototipo",desc:"Transformar las ideas seleccionadas en experimentos concretos, pequeños y observables.",template:"Vamos a probar [SOLUCIÓN] con [USUARIO / CONTEXTO], simulando [FUNCIÓN CLAVE], para aprender [HIPÓTESIS].",starter:"Vamos a probar  con , simulando , para aprender ",sources:true},
  {id:"test",name:"Probar",verb:"Registrar aprendizaje",desc:"Registrar evidencias del test, separar hechos de opiniones y decidir qué conservar, modificar o descartar.",template:"Al probar [PROTOTIPO], observamos que [EVIDENCIA]. Esto sugiere [APRENDIZAJE], por lo que decidimos [ACCIÓN].",starter:"Al probar , observamos que . Esto sugiere , por lo que decidimos ",sources:true}
];

const DEFAULT_ROLES = [
  {id:"facilitador",name:"Facilitador",phases:["empathize","define","ideate","prototype","test"]},
  {id:"usuario",name:"Usuario / cliente",phases:["empathize","test"]},
  {id:"tecnico",name:"Técnico",phases:["empathize","define","ideate","prototype","test"]},
  {id:"comercial",name:"Comercial",phases:["empathize","define","ideate","test"]},
  {id:"direccion",name:"Dirección",phases:["define","ideate","prototype","test"]}
];

const TOPICS = [
  ["t1","CAD / Diseño","Modelado, detalle, cambios, reutilización y criterios de diseño."],
  ["t2","PDM / Documentación","Planos, versiones, búsqueda, codificación y liberación documental."],
  ["t3","Ofertas","Generación de ofertas, estimaciones, datos técnicos y tiempos de respuesta."],
  ["t4","Gestión de tareas y equipo","Carga, prioridades, asignación, seguimiento y coordinación."],
  ["t5","Alcance","Definición de requisitos, límites, cambios y expectativas del proyecto."],
  ["t6","Colaboración","Intercambio de información entre cliente, comercial, ingeniería y fabricación."],
  ["t7","Know-how / Reutilización","Localización de soluciones previas, estándares y conocimiento interno."],
  ["t8","Revisión y calidad","Errores de plano, interferencias, comprobaciones y revisiones automáticas."],
  ["t9","Costes","Coste de pieza, material, mecanizado, montaje y estimaciones."],
  ["t10","Materiales","Selección, tablas, propiedades y alternativas de material."],
  ["t11","Procesos de fabricación","Operaciones, secuencias, montaje, instalación y proceso productivo."],
  ["t12","Tiempos","Tiempos estimados, históricos, mecanizado, montaje y dedicación."],
  ["t13","Tolerancias","Criterios de tolerancia, ajustes y coherencia entre diseño y fabricación."],
  ["t14","Máquinas y medios","Capacidades de máquina, datos de proceso, recursos y restricciones."],
  ["t15","Automatización","Reglas, asistentes, generación automática y eliminación de tareas repetitivas."]
].map(([id,name,description])=>({id,name,description}));

const now = Date.now();
const DEMO = {
  schemaVersion:3,
  projectName:"Eficiencia en la Oficina Técnica",
  currentPhase:"empathize",
  roles:DEFAULT_ROLES,
  topics:TOPICS,
  contributions:[
    {id:"c1",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t1","t15"],cluster:"Estandarización del diseño",priority:"alta",text:"El diseñador necesita dibujar y detallar con criterios homogéneos, pero parte de la información y de las decisiones se repite manualmente en cada proyecto.",sourceIds:[],createdAt:now-150000},
    {id:"c2",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t1","t2","t8"],cluster:"Gestión de cambios",priority:"alta",text:"Los cambios de diseño obligan a revisar varias partes del proyecto y pueden generar trabajo repetido o incoherencias entre modelo, planos y documentación.",sourceIds:[],createdAt:now-149000},
    {id:"c3",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t2","t7"],cluster:"Reutilización",priority:"alta",text:"Encontrar un diseño anterior útil depende demasiado de saber dónde está guardado y cómo fue nombrado.",sourceIds:[],createdAt:now-148000},
    {id:"c4",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t2","t8","t15"],cluster:"Control documental",priority:"alta",text:"La documentación, versiones y planos requieren controles que hoy consumen tiempo y permiten errores evitables.",sourceIds:[],createdAt:now-147000},
    {id:"c5",phase:"empathize",author:"Equipo",role:"comercial",topicIds:["t3","t9","t10","t12"],cluster:"Preparación de ofertas",priority:"alta",text:"Para ofertar con rapidez hacen falta datos técnicos, materiales, costes y tiempos que están repartidos entre personas, diseños y experiencias anteriores.",sourceIds:[],createdAt:now-146000},
    {id:"c6",phase:"empathize",author:"Equipo",role:"comercial",topicIds:["t5","t6","t3"],cluster:"Definición inicial",priority:"alta",text:"Cuando el alcance no queda suficientemente definido al inicio aparecen cambios, interpretaciones distintas y trabajo que no estaba previsto.",sourceIds:[],createdAt:now-145000},
    {id:"c7",phase:"empathize",author:"Equipo",role:"direccion",topicIds:["t6","t5","t4"],cluster:"Flujo de información",priority:"media",text:"La información del cliente y del proyecto pasa por varias personas y canales, por lo que parte del contexto puede perderse o llegar tarde.",sourceIds:[],createdAt:now-144000},
    {id:"c8",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t4","t6"],cluster:"Priorización",priority:"media",text:"La asignación de trabajo y las prioridades cambian durante el proyecto y no siempre es evidente qué debe hacer cada persona a continuación.",sourceIds:[],createdAt:now-143000},
    {id:"c9",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t7","t2","t1"],cluster:"Reutilización",priority:"alta",text:"Existe conocimiento útil en proyectos anteriores, pero localizar la solución adecuada y entender por qué se tomó una decisión requiere experiencia personal.",sourceIds:[],createdAt:now-142000},
    {id:"c10",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t8","t1","t15"],cluster:"Validación técnica",priority:"alta",text:"Errores de detalle, interferencias o datos incompletos pueden detectarse tarde porque muchas comprobaciones dependen de una revisión manual.",sourceIds:[],createdAt:now-141000},
    {id:"c11",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t9","t10","t11","t12"],cluster:"Estimación de pieza",priority:"alta",text:"El precio de una pieza puede variar mucho y su estimación necesita combinar geometría, material, proceso y tiempos.",sourceIds:[],createdAt:now-140000},
    {id:"c12",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t10","t9","t1"],cluster:"Selección técnica",priority:"media",text:"La selección de material necesita propiedades, alternativas y datos de coste que deberían estar disponibles durante la decisión de diseño.",sourceIds:[],createdAt:now-139000},
    {id:"c13",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t11","t14","t9","t12"],cluster:"Estimación de pieza",priority:"alta",text:"Para estimar una pieza hay que proponer cómo se fabricará: operaciones, máquina, montaje e instalación condicionan coste y plazo.",sourceIds:[],createdAt:now-138000},
    {id:"c14",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t12","t9","t11","t7"],cluster:"Datos históricos",priority:"alta",text:"Los tiempos de mecanizado, montaje y dedicación se estiman con experiencia, pero no siempre se reutilizan de forma sistemática los datos históricos.",sourceIds:[],createdAt:now-137000},
    {id:"c15",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t13","t11","t14","t1"],cluster:"Fabricabilidad",priority:"media",text:"Definir tolerancias y ajustes exige criterio técnico y coherencia con la función, el proceso y la capacidad real de fabricación.",sourceIds:[],createdAt:now-136000},
    {id:"c16",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t14","t11","t12","t9"],cluster:"Fabricabilidad",priority:"media",text:"La decisión de fabricación depende de capacidades y datos de las máquinas, pero esa información no siempre está integrada en el flujo de diseño.",sourceIds:[],createdAt:now-135000},
    {id:"c17",phase:"empathize",author:"Equipo",role:"tecnico",topicIds:["t15","t1","t2","t8"],cluster:"Automatización",priority:"alta",text:"Muchas tareas repetitivas de ingeniería podrían convertirse en reglas o asistentes, reservando el criterio humano para las decisiones que realmente lo necesitan.",sourceIds:[],createdAt:now-134000}
  ]
};

const STORAGE_KEY="design-thinking-v3";
const OLD_KEYS=["bk-design-thinking-v1","design-thinking-v2"];
let state=loadState();
let currentView="cards";
let selectedSources=new Set();
let selectedTopics=new Set();

const $=s=>document.querySelector(s);
const phase=()=>PHASES.find(p=>p.id===state.currentPhase);
const roleName=id=>(state.roles.find(r=>r.id===id)||{}).name||id;
const topicById=id=>state.topics.find(t=>t.id===id);
const topicName=id=>topicById(id)?.name||id;

function clone(o){return JSON.parse(JSON.stringify(o));}
function loadState(){
  try{
    const current=localStorage.getItem(STORAGE_KEY);
    if(current) return migrate(JSON.parse(current));
    for(const key of OLD_KEYS){
      const raw=localStorage.getItem(key);
      if(raw) return migrate(JSON.parse(raw));
    }
  }catch(e){}
  return clone(DEMO);
}
function migrate(data){
  const s={...clone(DEMO),...data,schemaVersion:3};
  s.topics=Array.isArray(data.topics)&&data.topics.length?data.topics:clone(TOPICS);
  s.roles=Array.isArray(data.roles)&&data.roles.length?data.roles:clone(DEFAULT_ROLES);
  s.contributions=(data.contributions||[]).map(c=>{
    let topicIds=Array.isArray(c.topicIds)?c.topicIds.filter(Boolean):[];
    if(!topicIds.length && c.cluster){
      const match=s.topics.find(t=>t.name===c.cluster);
      if(match) topicIds=[match.id];
    }
    return {...c,topicIds,cluster:c.group||c.cluster||""};
  });
  return s;
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}

function render(){
  $("#projectName").value=state.projectName;
  renderPhases();renderRoles();renderPhaseHeader();renderRoleOptions();
  renderTemplate();renderSources();renderTopicPicker();renderFilters();renderClusters();renderBoard();
}
function renderPhases(){
  $("#phaseNav").innerHTML=PHASES.map((p,i)=>`<button class="phase-link ${p.id===state.currentPhase?"active":""}" data-phase="${p.id}"><span class="phase-num">${i+1}</span><span>${p.name}</span></button>`).join("");
  document.querySelectorAll(".phase-link").forEach(b=>b.onclick=()=>{state.currentPhase=b.dataset.phase;selectedSources.clear();selectedTopics.clear();saveState();render();});
}
function renderRoles(){
  const available=state.roles.filter(r=>r.phases.includes(state.currentPhase));
  $("#roleList").innerHTML=available.map(r=>`<div class="role-chip"><span class="role-dot"></span>${escapeHtml(r.name)}</div>`).join("");
}
function renderPhaseHeader(){
  const p=phase(),idx=PHASES.indexOf(p);
  $("#phaseIndex").textContent=`FASE ${idx+1} DE ${PHASES.length}`;
  $("#phaseTitle").textContent=p.name;$("#mobilePhaseTitle").textContent=p.name;$("#phaseDescription").textContent=p.desc;$("#composeTitle").textContent=p.verb;
  $("#phaseProgress").innerHTML=PHASES.map((x,i)=>`<span class="progress-dot ${i<idx?"done":i===idx?"active":""}"></span>`).join("");
}
function renderRoleOptions(){
  const available=state.roles.filter(r=>r.phases.includes(state.currentPhase));
  const sel=$("#roleSelect"),old=sel.value;
  sel.innerHTML=available.map(r=>`<option value="${r.id}">${escapeHtml(r.name)}</option>`).join("");
  if(available.some(r=>r.id===old))sel.value=old;
  $("#activeRolePill").textContent=roleName(sel.value);
  const fr=$("#filterRole"),oldFilter=fr.value;
  fr.innerHTML='<option value="">Todos los roles</option>'+available.map(r=>`<option value="${r.id}">${escapeHtml(r.name)}</option>`).join("");
  if([...fr.options].some(o=>o.value===oldFilter))fr.value=oldFilter;
}
function renderTemplate(){$("#templateText").textContent=phase().template;}
function previousContributions(){
  const idx=PHASES.findIndex(p=>p.id===state.currentPhase),allowed=new Set(PHASES.slice(0,idx).map(p=>p.id));
  return state.contributions.filter(c=>allowed.has(c.phase));
}
function renderSources(){
  const area=$("#sourceArea");
  if(!phase().sources){area.classList.add("hidden");return;}
  area.classList.remove("hidden");
  const items=previousContributions();
  $("#sourceSuggestions").innerHTML=items.length?items.map(c=>`<label class="source-card"><input type="checkbox" data-source="${c.id}" ${selectedSources.has(c.id)?"checked":""}><span><strong>${PHASES.find(p=>p.id===c.phase)?.name}</strong> · ${topicListText(c)}<br>${escapeHtml(c.text)}</span></label>`).join(""):'<div class="muted">No hay aportaciones anteriores todavía.</div>';
  document.querySelectorAll("[data-source]").forEach(x=>x.onchange=()=>x.checked?selectedSources.add(x.dataset.source):selectedSources.delete(x.dataset.source));
}
function renderTopicPicker(){
  $("#topicPicker").innerHTML=state.topics.map(t=>`<button type="button" class="topic-option ${selectedTopics.has(t.id)?"selected":""}" data-topic-pick="${t.id}"><span class="check">✓</span>${escapeHtml(t.name)}</button>`).join("");
  document.querySelectorAll("[data-topic-pick]").forEach(b=>b.onclick=()=>{selectedTopics.has(b.dataset.topicPick)?selectedTopics.delete(b.dataset.topicPick):selectedTopics.add(b.dataset.topicPick);renderTopicPicker();});
}
function renderFilters(){
  const ft=$("#filterTopic"),old=ft.value;
  ft.innerHTML='<option value="">Todos los temas</option>'+state.topics.map(t=>`<option value="${t.id}">${escapeHtml(t.name)}</option>`).join("");
  if([...ft.options].some(o=>o.value===old))ft.value=old;
}
function renderClusters(){
  const groups=[...new Set(state.contributions.map(c=>c.cluster).filter(Boolean))].sort();
  $("#clustersList").innerHTML=groups.map(x=>`<option value="${escapeHtml(x)}"></option>`).join("");
}
function filtered(){
  const q=$("#searchInput").value.toLowerCase().trim(),role=$("#filterRole").value,topic=$("#filterTopic").value;
  return state.contributions.filter(c=>c.phase===state.currentPhase)
    .filter(c=>!q||c.text.toLowerCase().includes(q)||(c.cluster||"").toLowerCase().includes(q)||(c.topicIds||[]).some(id=>topicName(id).toLowerCase().includes(q)))
    .filter(c=>!role||c.role===role)
    .filter(c=>!topic||(c.topicIds||[]).includes(topic));
}
function renderBoard(){
  const items=filtered(),board=$("#board"),empty=$("#emptyState");
  empty.classList.toggle("hidden",items.length>0);
  if(!items.length){board.innerHTML="";return;}
  if(currentView==="clusters"){
    const groups={};items.forEach(c=>(groups[c.cluster||"Sin grupo"]??=[]).push(c));
    board.innerHTML=Object.entries(groups).sort(([a],[b])=>a.localeCompare(b)).map(([name,cards])=>groupHtml(name,cards)).join("");
  }else if(currentView==="topics"){
    const groups={};
    items.forEach(c=>{
      const ids=(c.topicIds||[]).length?c.topicIds:["__none"];
      ids.forEach(id=>(groups[id]??=[]).push(c));
    });
    board.innerHTML=Object.entries(groups).sort(([a],[b])=>topicName(a).localeCompare(topicName(b))).map(([id,cards])=>groupHtml(id==="__none"?"Sin tema":topicName(id),cards)).join("");
  }else{
    board.innerHTML=items.map(cardHtml).join("");
  }
}
function groupHtml(name,cards){
  return `<section class="group-section"><div class="group-title"><h3>${escapeHtml(name)}</h3><span class="group-count">${cards.length} aport.</span></div><div class="group-cards">${cards.map(cardHtml).join("")}</div></section>`;
}
function topicListText(c){return (c.topicIds||[]).length?(c.topicIds||[]).map(topicName).join(" · "):"Sin tema";}
function cardHtml(c){
  const topics=(c.topicIds||[]).map(id=>`<span class="topic-tag">${escapeHtml(topicName(id))}</span>`).join("");
  const cluster=c.cluster?`<span class="cluster-badge">${escapeHtml(c.cluster)}</span>`:"";
  const src=c.sourceIds?.length?`<div class="card-source">↳ Parte de ${c.sourceIds.length} aportación${c.sourceIds.length>1?"es":""} anterior${c.sourceIds.length>1?"es":""}</div>`:"";
  return `<article class="card"><div class="card-top">${cluster}<span class="priority ${c.priority}"></span></div>${topics?`<div class="topic-tags">${topics}</div>`:""}<div class="card-text">${escapeHtml(c.text)}</div>${src}<div class="card-meta"><span>${escapeHtml(c.author)} · ${escapeHtml(roleName(c.role))}</span><span>${new Date(c.createdAt).toLocaleDateString("es-ES")}</span></div></article>`;
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

$("#roleSelect").onchange=e=>$("#activeRolePill").textContent=roleName(e.target.value);
$("#useTemplateBtn").onclick=()=>{$("#contributionInput").value=phase().starter;$("#contributionInput").focus();};
$("#saveContributionBtn").onclick=()=>{
  const text=$("#contributionInput").value.trim();
  if(!text){$("#contributionInput").focus();return;}
  state.contributions.push({
    id:"c"+Date.now(),phase:state.currentPhase,author:$("#authorInput").value.trim()||"Anónimo",
    role:$("#roleSelect").value,topicIds:[...selectedTopics],cluster:$("#clusterInput").value.trim(),
    priority:$("#prioritySelect").value,text,sourceIds:[...selectedSources],createdAt:Date.now()
  });
  $("#contributionInput").value="";$("#clusterInput").value="";selectedSources.clear();selectedTopics.clear();saveState();render();
};
$("#projectName").onchange=e=>{state.projectName=e.target.value.trim()||"Proyecto sin nombre";saveState();}
$("#searchInput").oninput=renderBoard;$("#filterRole").onchange=renderBoard;$("#filterTopic").onchange=renderBoard;
document.querySelectorAll(".toggle").forEach(b=>b.onclick=()=>{currentView=b.dataset.view;document.querySelectorAll(".toggle").forEach(x=>x.classList.toggle("active",x===b));renderBoard();});
$("#selectAllSourcesBtn").onclick=()=>{previousContributions().forEach(c=>selectedSources.add(c.id));renderSources();};
$("#newTopicBtn").onclick=()=>$("#topicDialog").showModal();
$("#createTopicBtn").onclick=e=>{
  const name=$("#newTopicName").value.trim();if(!name){e.preventDefault();return;}
  const existing=state.topics.find(t=>t.name.toLowerCase()===name.toLowerCase());
  if(existing){selectedTopics.add(existing.id);return;}
  const id="t"+Date.now();state.topics.push({id,name,description:$("#newTopicDescription").value.trim()});selectedTopics.add(id);
  $("#newTopicName").value="";$("#newTopicDescription").value="";saveState();render();
};
$("#manageRolesBtn").onclick=()=>{renderRolesMatrix();$("#rolesDialog").showModal();};
function renderRolesMatrix(){
  $("#rolesMatrix").innerHTML=`<table class="roles-table"><thead><tr><th>Rol</th>${PHASES.map(p=>`<th>${p.name}</th>`).join("")}</tr></thead><tbody>${state.roles.map(r=>`<tr><td>${escapeHtml(r.name)}</td>${PHASES.map(p=>`<td><input type="checkbox" data-rp="${r.id}:${p.id}" ${r.phases.includes(p.id)?"checked":""}></td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
$("#saveRolesBtn").onclick=()=>{state.roles.forEach(r=>r.phases=PHASES.filter(p=>document.querySelector(`[data-rp="${r.id}:${p.id}"]`)?.checked).map(p=>p.id));saveState();render();};
$("#resetBtn").onclick=()=>{if(confirm("¿Reiniciar los datos locales de la aplicación?")){state=clone(DEMO);selectedSources.clear();selectedTopics.clear();saveState();render();}};
$("#exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="design-thinking.json";a.click();URL.revokeObjectURL(a.href);};
$("#openSidebar").onclick=()=>$("#sidebar").classList.add("open");
$("#closeSidebar").onclick=()=>$("#sidebar").classList.remove("open");

render();
