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
  // Dominios visibles en el tablero Miro
  ["d1","Seguridad / Ergonomía","Riesgos, ergonomía, seguridad de operación y condiciones de trabajo."],
  ["d2","Máquinas / Mantenimiento","Máquinas, capacidad de medios, fiabilidad, mantenimiento y disponibilidad."],
  ["d3","Método / Proceso","Métodos de trabajo, secuencias, procedimientos, estandarización y flujo de proceso."],
  ["d4","Coste / Financiero","Costes, precios, estimaciones económicas, rentabilidad y recursos financieros."],
  ["d5","Materiales / Almacén","Materiales, materia prima, stock, almacén, tratamientos y aprovisionamiento."],
  ["d6","Personas / Organización","Roles, carga, formación, coordinación, responsabilidad y organización."],
  ["d7","Trazabilidad / Digitalización","Datos, versiones, trazabilidad, sistemas digitales, ERP/PDM y automatización."],
  ["d8","Comercial / Oportunidad","Oferta, cliente, oportunidad, requisitos comerciales y respuesta al mercado."],
  ["d9","Infraestructura / Espacio / Layout","Espacio, implantación, distribución, accesibilidad y medios físicos."],

  // Temas técnicos/transversales del mapa
  ["t1","CAD / Diseño","Modelado, detalle, cambios, rendimiento, reutilización y criterios de diseño."],
  ["t2","PDM / Documentación","Planos, versiones, búsqueda, codificación, propiedades y liberación documental."],
  ["t3","Ofertas","Generación de ofertas, estimaciones, datos técnicos y tiempos de respuesta."],
  ["t4","Gestión de tareas / Equipo","Carga, prioridades, asignación, seguimiento y coordinación."],
  ["t5","Alcance","Definición de requisitos, límites, cambios y expectativas del proyecto."],
  ["t6","Comunicación","Intercambio de información entre cliente, comercial, ingeniería, montaje y fabricación."],
  ["t7","Know-how / Reutilización","Localización de soluciones previas, estándares y conocimiento interno."],
  ["t8","Revisión / Calidad","Errores de plano, interferencias, comprobaciones y revisiones."],
  ["t9","Costes / Tiempos","Coste de pieza, material, mecanizado, montaje, tiempos y estimaciones."],
  ["t10","Materiales / Tratamientos","Selección de material, tratamientos, propiedades y alternativas."],
  ["t11","Fabricación / Montaje","Operaciones, secuencias, montaje, instalación y proceso productivo."],
  ["t12","Tolerancias / Ajustes","Tolerancias, ajustes, función y coherencia con fabricación."],
  ["t13","Máquinas / Medios","Capacidades de máquina, datos de proceso, recursos y restricciones."],
  ["t14","Automatización / Asistentes","Reglas, asistentes, generación automática y eliminación de tareas repetitivas."],
  ["t15","ERP / Integraciones","Relación CAD-PDM-ERP, exportaciones, actualizaciones e intercambio entre sistemas."]
].map(([id,name,description])=>({id,name,description}));

const now = Date.now();

/*
  Aportaciones base reconstruidas del tablero Miro facilitado por el usuario.
  Cuando un texto pequeño no era totalmente legible se ha conservado únicamente
  la idea que sí puede leerse con seguridad, sin inventar una cita literal.
*/
const MIRO_CONTRIBUTIONS = [
  // CAD
  {id:"miro-cad-01",cluster:"CAD",topicIds:["t1","d3"],priority:"alta",text:"Falta cultura de dibujar a detalle."},
  {id:"miro-cad-02",cluster:"CAD",topicIds:["t1","d3"],priority:"media",text:"Dibujar el diseño da reparo."},
  {id:"miro-cad-03",cluster:"CAD",topicIds:["t1","t15","d7"],priority:"alta",text:"El CAD eléctrico y el CAD mecánico no están integrados."},
  {id:"miro-cad-04",cluster:"CAD",topicIds:["t1","d2"],priority:"media",text:"No dibujar todo porque los ordenadores se colapsan."},
  {id:"miro-cad-05",cluster:"CAD",topicIds:["t1","t2","d7"],priority:"alta",text:"Te cambian el 3D y te han matao."},
  {id:"miro-cad-06",cluster:"CAD",topicIds:["t1","d3"],priority:"alta",text:"Dificultad para seleccionar entidades."},
  {id:"miro-cad-07",cluster:"CAD",topicIds:["t1","d2"],priority:"alta",text:"No se pueden manejar con agilidad determinados modelos o piezas muy pesadas."},
  {id:"miro-cad-08",cluster:"CAD",topicIds:["t1","d3"],priority:"media",text:"Dificultad para hacer pequeñas animaciones."},
  {id:"miro-cad-09",cluster:"CAD",topicIds:["t1","d3"],priority:"media",text:"No se pueden hacer ecuaciones."},
  {id:"miro-cad-10",cluster:"CAD",topicIds:["t1","d2"],priority:"alta",text:"Cuando la memoria se llena, el PC se bloquea."},
  {id:"miro-cad-11",cluster:"CAD",topicIds:["t1","t2","d7"],priority:"alta",text:"Pérdida importante de enlaces al cambiar los 3D."},
  {id:"miro-cad-12",cluster:"CAD",topicIds:["t1","t2","d7"],priority:"alta",text:"Problemas de conversión de archivos."},
  {id:"miro-cad-13",cluster:"CAD",topicIds:["t1","t14","d7"],priority:"media",text:"No hay asistentes de cálculo."},
  {id:"miro-cad-14",cluster:"CAD",topicIds:["t1","d7"],priority:"media",text:"Los esquemas neumáticos y los dibujos 3D son dos cosas independientes."},

  // PDM / documentación
  {id:"miro-pdm-01",cluster:"PDM",topicIds:["t2","t15","d7"],priority:"media",text:"Exportar y mantener actualizados PDF y DXF no aporta valor y consume tiempo."},
  {id:"miro-pdm-02",cluster:"PDM",topicIds:["t2","d7"],priority:"alta",text:"El servidor está lleno de información y da miedo limpiar por si se elimina algo necesario."},
  {id:"miro-pdm-03",cluster:"PDM",topicIds:["t2","t7","d7"],priority:"alta",text:"Hay que prestar mucha atención a que el diseño no tire de referencias de otros proyectos."},
  {id:"miro-pdm-04",cluster:"PDM",topicIds:["t2","t7","d7"],priority:"alta",text:"Solo con experiencia o haciendo arqueología de datos se puede saber qué información reutilizar."},
  {id:"miro-pdm-05",cluster:"PDM",topicIds:["t2","d7","d6"],priority:"alta",text:"¿Cómo sé quién ha modificado por última vez el archivo?"},
  {id:"miro-pdm-06",cluster:"PDM",topicIds:["t2","d3","d7"],priority:"media",text:"Cumplimentar campos en el CAD es lento y no existe suficiente control."},
  {id:"miro-pdm-07",cluster:"PDM",topicIds:["t2","d7"],priority:"alta",text:"Los ítems pueden arrastrar propiedades que no les corresponden por efecto de una copia inicial."},
  {id:"miro-pdm-08",cluster:"PDM",topicIds:["t2","t15","d7"],priority:"alta",text:"Se lanza un diseño al ERP y después se descubre que falta un dato o que no es correcto."},
  {id:"miro-pdm-09",cluster:"PDM",topicIds:["t2","d7","d3"],priority:"alta",text:"Se ha fabricado una pieza en una versión anterior."},
  {id:"miro-pdm-10",cluster:"PDM",topicIds:["t2","t7","d7"],priority:"alta",text:"Necesitamos saber dónde se utiliza o se utilizó un ítem."},
  {id:"miro-pdm-11",cluster:"PDM",topicIds:["t2","d7"],priority:"alta",text:"Se mezclan productos y el problema puede descubrirse al lanzar el diseño."},
  {id:"miro-pdm-12",cluster:"PDM",topicIds:["t1","t2","t15","d7"],priority:"alta",text:"No siempre sabemos qué está manejando el proyecto eléctrico dentro del diseño mecánico."},
  {id:"miro-pdm-13",cluster:"PDM",topicIds:["t2","d6"],priority:"media",text:"Una persona es dueña del diseño hasta que cierra el ensamblaje."},
  {id:"miro-pdm-14",cluster:"PDM",topicIds:["t2","d7"],priority:"media",text:"Las codificaciones no son regulares y pueden variar en guiones, espacios u otros detalles."},
  {id:"miro-pdm-15",cluster:"PDM",topicIds:["t2","d7"],priority:"media",text:"Un mismo componente puede aparecer varias veces."},

  // Revisiones
  {id:"miro-rev-01",cluster:"Revisiones automatizadas",topicIds:["t8","t12","d3"],priority:"alta",text:"Casi todos los planos tienen defectos."},
  {id:"miro-rev-02",cluster:"Revisiones automatizadas",topicIds:["t8","t12","d3"],priority:"alta",text:"Una longitud de roscado puede no ser adecuada: demasiado poca o excesiva."},
  {id:"miro-rev-03",cluster:"Revisiones automatizadas",topicIds:["t8","t12","d3"],priority:"media",text:"Hay métricas que no son coherentes con la función: por ejemplo, rosca, inserto o agujero pasante."},
  {id:"miro-rev-04",cluster:"Revisiones automatizadas",topicIds:["t8","t1","d3"],priority:"media",text:"Interpretar un análisis de interferencias es difícil."},
  {id:"miro-rev-05",cluster:"Revisiones automatizadas",topicIds:["t8","d6","d3"],priority:"alta",text:"Revisar puede resultar interminable y depende mucho de la atención de la persona."},
  {id:"miro-rev-06",cluster:"Revisiones automatizadas",topicIds:["t8","d6"],priority:"alta",text:"Hay pocas horas para revisar y demasiados elementos que comprobar."},

  // Alcance y comunicación
  {id:"miro-alc-01",cluster:"Alcance",topicIds:["t5","t6","d6"],priority:"alta",text:"No sabes que tienes una reunión dentro de 10 minutos."},
  {id:"miro-alc-02",cluster:"Alcance",topicIds:["t5","t6","d7"],priority:"alta",text:"Un mail, llamada, WhatsApp, reunión o videollamada puede dejar fuera a alguien porque no estaba en copia."},
  {id:"miro-alc-03",cluster:"Alcance",topicIds:["t5","t6","d6"],priority:"alta",text:"Dos personas leen el mismo pliego y pueden encontrar o interpretar cosas diferentes."},
  {id:"miro-alc-04",cluster:"Alcance",topicIds:["t5","t6","d8"],priority:"alta",text:"La planificación cambia cuando aparecen nuevas versiones, cambios del cliente o información que llega tarde."},
  {id:"miro-com-01",cluster:"Comunicación",topicIds:["t6","d6","d7"],priority:"media",text:"Las consultas se hacen de palabra y luego cuesta recuperar qué se decidió."},
  {id:"miro-com-02",cluster:"Comunicación",topicIds:["t6","d6","d7"],priority:"media",text:"Tu compañero no quiere ponerse la app en el móvil."},
  {id:"miro-com-03",cluster:"Comunicación",topicIds:["t6","d6"],priority:"media",text:"Compartir y solicitar datos a proveedores o compañeros genera esperas cuando no hay un canal claro."},

  // Gestión de tareas / equipo
  {id:"miro-task-01",cluster:"Gestión de tareas / equipo",topicIds:["t4","t6","d6"],priority:"alta",text:"El cliente no está disponible y el equipo se queda parado."},
  {id:"miro-task-02",cluster:"Gestión de tareas / equipo",topicIds:["t4","t8","d6"],priority:"alta",text:"Se quedan cosas atascadas esperando una revisión."},
  {id:"miro-task-03",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6"],priority:"alta",text:"¡Y todo esto para el viernes!"},
  {id:"miro-task-04",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6"],priority:"media",text:"Se reparten tareas al inicio de la semana, pero las prioridades cambian y el reparto deja de representar la realidad."},
  {id:"miro-task-05",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6"],priority:"media",text:"Dictar las tareas a cada individuo delante de todos no significa necesariamente que exista trabajo en equipo."},
  {id:"miro-task-06",cluster:"Gestión de tareas / equipo",topicIds:["t4","t6","d6"],priority:"alta",text:"El montador entra en la oficina solicitando asistencia inmediata porque necesita resolver una incidencia."},
  {id:"miro-task-07",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6"],priority:"media",text:"Según quién opere, el despiece puede tener un criterio diferente."},
  {id:"miro-task-08",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6","d3"],priority:"media",text:"La incorporación de una nueva persona implica formación y acompañamiento."},
  {id:"miro-task-09",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6"],priority:"alta",text:"Se da por supuesto que una persona ya sabe determinadas cosas porque 'eso es de la escuela'."},
  {id:"miro-task-10",cluster:"Gestión de tareas / equipo",topicIds:["t4","t12","d6","d3"],priority:"media",text:"Se discute por la selección de un sensor."},
  {id:"miro-task-11",cluster:"Gestión de tareas / equipo",topicIds:["t4","t1","d6","d3"],priority:"media",text:"No hay un procedimiento común de delineación ni de modelado 3D."},
  {id:"miro-task-12",cluster:"Gestión de tareas / equipo",topicIds:["t4","d6","d3"],priority:"media",text:"Se discute por la selección de una óptica o cámara."},

  // Generador de ofertas
  {id:"miro-ofe-01",cluster:"Generador de ofertas",topicIds:["t3","d8","d4"],priority:"alta",text:"Hay mucho lanzamiento de bobina y trabajos similares que podrían aprovechar conocimiento anterior."},
  {id:"miro-ofe-02",cluster:"Generador de ofertas",topicIds:["t3","t7","d8","d7"],priority:"alta",text:"Se vende confianza y compromiso, pero no siempre existe un modelo claro para reutilizar datos de ofertas anteriores."},
  {id:"miro-ofe-03",cluster:"Generador de ofertas",topicIds:["t3","d8","d4"],priority:"alta",text:"No tenemos nada estándar ni ladrillos de oro para construir una oferta rápidamente."},
  {id:"miro-ofe-04",cluster:"Generador de ofertas",topicIds:["t3","t1","d8"],priority:"alta",text:"El cliente necesita compartir el modelo con su equipo."},
  {id:"miro-ofe-05",cluster:"Generador de ofertas",topicIds:["t3","d8","d4"],priority:"alta",text:"Se empieza a ofertar y faltan datos."},

  // Costes / tiempos / materiales / fabricación
  {id:"miro-cost-01",cluster:"Calculadora de costes y tiempos",topicIds:["t9","d4"],priority:"alta",text:"El precio puede variar mucho."},
  {id:"miro-cost-02",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t11","d4","d3"],priority:"alta",text:"Estimar tiempos de ciclo es un compromiso y a menudo se basa en vídeos, experiencia o sensaciones."},
  {id:"miro-cost-03",cluster:"Calculadora de costes y tiempos",topicIds:["t9","d4"],priority:"alta",text:"Cuando te dicen el precio final de la pieza, te asustas."},
  {id:"miro-cost-04",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t10","t11","d4","d5"],priority:"alta",text:"Para sacar el coste de un conjunto hay que combinar material, geometría, operaciones, montaje e instalación."},

  // Flujo funcional de calculadora observado en el Miro
  {id:"miro-flow-01",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t10","d5"],priority:"media",text:"Proponer material y tratamiento a partir de la función de la pieza."},
  {id:"miro-flow-02",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t10","d5","d4"],priority:"media",text:"Calcular el tamaño de la materia prima."},
  {id:"miro-flow-03",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t11","d3"],priority:"media",text:"Detectar la forma de la pieza."},
  {id:"miro-flow-04",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t10","d5"],priority:"media",text:"Proponer el tamaño de materia prima."},
  {id:"miro-flow-05",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t11","d4","d5"],priority:"media",text:"Calcular el material a eliminar."},
  {id:"miro-flow-06",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t11","t13","d2","d4"],priority:"alta",text:"Calcular un tiempo y coste estimado de fabricación."},
  {id:"miro-flow-07",cluster:"Calculadora de costes y tiempos",topicIds:["t10","d5"],priority:"media",text:"Mantener una tabla de materiales de usuario y tablas de demasías según material."},
  {id:"miro-flow-08",cluster:"Calculadora de costes y tiempos",topicIds:["t9","t11","t13","d2","d4"],priority:"media",text:"Mantener tablas de tiempos genéricos de arranque de material y cuotas horarias de máquinas."},
  {id:"miro-flow-09",cluster:"Configurador de diseño adaptable",topicIds:["t12","t11","d3"],priority:"media",text:"Introducir el tipo de tolerancia deseada y proponer una tolerancia adecuada."},
  {id:"miro-flow-10",cluster:"Configurador de diseño adaptable",topicIds:["t9","t11","d4"],priority:"media",text:"Calcular el trabajo de montaje e instalación."}
].map((c,i)=>({
  ...c,
  phase:"empathize",
  author:"Miro",
  role:"tecnico",
  sourceIds:[],
  origin:"miro",
  createdAt:now-500000+i*1000
}));

const DEMO = {
  schemaVersion:4,
  projectName:"Eficiencia en la Oficina Técnica",
  currentPhase:"empathize",
  roles:DEFAULT_ROLES,
  topics:TOPICS,
  contributions:MIRO_CONTRIBUTIONS
};

const STORAGE_KEY="design-thinking-v4";
const OLD_KEYS=["design-thinking-v3","design-thinking-v2","bk-design-thinking-v1"];
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

function mergeById(existing, base){
  const out=[...(existing||[])];
  const seen=new Set(out.map(x=>x.id));
  for(const item of base){
    if(!seen.has(item.id)){ out.push(clone(item)); seen.add(item.id); }
  }
  return out;
}

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
  // V4 ALWAYS merges the current catalogue and Miro seed data.
  // User-created content is preserved; missing V4 data is injected.
  const s={
    schemaVersion:4,
    projectName:data.projectName||DEMO.projectName,
    currentPhase:data.currentPhase||"empathize",
    roles:Array.isArray(data.roles)&&data.roles.length?data.roles:clone(DEFAULT_ROLES),
    topics:mergeById(Array.isArray(data.topics)?data.topics:[], TOPICS),
    contributions:[]
  };

  const migrated=(data.contributions||[]).map(c=>{
    let topicIds=Array.isArray(c.topicIds)?c.topicIds.filter(Boolean):[];
    // Old V1/V2 records used cluster as if it were a topic.
    if(!topicIds.length && c.cluster){
      const match=s.topics.find(t=>t.name.toLowerCase()===String(c.cluster).toLowerCase());
      if(match) topicIds=[match.id];
    }
    return {...c,topicIds,cluster:c.group||c.cluster||""};
  });

  s.contributions=mergeById(migrated, MIRO_CONTRIBUTIONS);
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
  const origin=c.origin==="miro"?`<span class="origin-badge">MIRO</span>`:"";
  const src=c.sourceIds?.length?`<div class="card-source">↳ Parte de ${c.sourceIds.length} aportación${c.sourceIds.length>1?"es":""} anterior${c.sourceIds.length>1?"es":""}</div>`:"";
  return `<article class="card"><div class="card-top"><div>${cluster}${origin}</div><span class="priority ${c.priority}"></span></div>${topics?`<div class="topic-tags">${topics}</div>`:""}<div class="card-text">${escapeHtml(c.text)}</div>${src}<div class="card-meta"><span>${escapeHtml(c.author)} · ${escapeHtml(roleName(c.role))}</span><span>${new Date(c.createdAt).toLocaleDateString("es-ES")}</span></div></article>`;
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
