/**
 * Technical datasets for EólicaMaster
 * Based on Paraninfo "Gestión del montaje de parques eólicos" (ISBN: 9788428395625)
 * by Luis Romero Lozano.
 * Includes references to Unidad 1 (Componentes) and Unidad 2 (Planificación).
 */

import {
  AerogeneratorComponent,
  InspectionQuestion,
  ProjectDocumentItem,
  BlueprintHotspot,
  GanttTask,
  Achievement,
} from '../types';

// ==========================================
// LOGROS DEL JUEGO
// ==========================================
export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'u1_master',
    title: 'Inspector de Góndola (U1)',
    description: 'Completaste el chequeo técnico de todos los componentes principales sin perder vidas.',
    iconName: 'ShieldCheck',
    category: 'u1',
  },
  {
    id: 'betz_physicist',
    title: 'Límite de Betz (59.3%)',
    description: 'Demostraste dominio sobre los fundamentos aerodinámicos y la potencia cúbica del viento.',
    iconName: 'Wind',
    category: 'u1',
  },
  {
    id: 'doc_archivist',
    title: 'Especialista Documental CTE (U2)',
    description: 'Clasificaste con precisión los 4 documentos reglamentarios del proyecto eólico.',
    iconName: 'FileCheck',
    category: 'u2',
  },
  {
    id: 'anejos_auditor',
    title: 'Auditor de Anejos Críticos',
    description: 'Identificaste correctamente los estudios geotécnicos, ambientales y de seguridad y salud.',
    iconName: 'FolderTree',
    category: 'u2',
  },
  {
    id: 'blueprint_pro',
    title: 'Topógrafo y Calculista de Layout',
    description: 'Superaste la interpretación de plataformas de grúa y zanjas de media tensión con zahorra al 95% Proctor.',
    iconName: 'Compass',
    category: 'u2',
  },
  {
    id: 'substation_expert',
    title: 'Operador de Subestación 132/20 kV',
    description: 'Identificaste los símbolos unifilares ANSI (50/51, 87, 89, 52) y la aparamenta con gas SF6.',
    iconName: 'Zap',
    category: 'u2',
  },
  {
    id: 'critical_path_hero',
    title: 'Estratega del Diagrama de Gantt',
    description: 'Ordenaste la secuencia de montaje sin romper ninguna precedencia de la ruta crítica.',
    iconName: 'CalendarCheck',
    category: 'gestion',
  },
  {
    id: 'aguas_nuevas_master',
    title: 'Jefe de Obra CIFP Aguas Nuevas',
    description: 'Finalizaste los 4 retos con éxito dentro del plazo de 45 minutos y con superávit presupuestario.',
    iconName: 'Award',
    category: 'gestion',
  },
];

// ==========================================
// RETO 1: CHEQUEO TÉCNICO Y REPASO U1
// ==========================================
export const U1_COMPONENTS: AerogeneratorComponent[] = [
  {
    id: 'comp_gondola',
    name: 'Góndola y Bastidor (Nacelle)',
    system: 'mecanico',
    location: 'gondola',
    technicalSpec: 'Carcasa en fibra de vidrio con bastidor delantero de fundición y trasero soldado. Incorpora cojinete de orientación (yaw) accionado por 4 motorreductoras con arrancador suave y frenos hidráulicos.',
    inspectionCheck: 'Verificar par de apriete en corona de orientación, estado de sellado de claraboyas y holgura de pinzas de freno.',
    correctFunction: 'Aloja el tren de potencia, generador, transformador (según fabricante) y sistemas de control.',
    commonDefect: 'Fugas en circuito de pinzas de freno o desalineación de los piñones de motorreductoras con la corona dentada.',
    paraninfoRef: 'Págs. 46-54 (Figuras 1.38, 1.41 y 1.44)',
  },
  {
    id: 'comp_multiplicadora',
    name: 'Multiplicadora (Gearbox)',
    system: 'mecanico',
    location: 'gondola',
    technicalSpec: 'Transmisión modular de 1 etapa planetaria y tren helicoidal. Multiplica de velocidad lenta del rotor (15-25 rpm) a régimen de generador (1000-1500 rpm).',
    inspectionCheck: 'Chequear sistema de filtrado primario y secundario de aceite, sensores de vibración y brazos de reacción elásticos.',
    correctFunction: 'Transfiere el elevado par mecánico del eje lento al eje rápido acoplado al generador.',
    commonDefect: 'Presencia de micropartículas metálicas en filtro de aceite o desgaste anómalo por desalineación con generador.',
    paraninfoRef: 'Págs. 53-54 (Figura 1.42)',
  },
  {
    id: 'comp_pitch',
    name: 'Sistema Pitch (Control de Paso de Pala)',
    system: 'aerodinamico',
    location: 'buje',
    technicalSpec: 'Accionamiento hidráulico independiente por pala mediante cilindros y acumuladores de nitrógeno a alta presión. Giro individual sobre rodamiento de pala.',
    inspectionCheck: 'Presión en acumuladores de nitrógeno, respuesta a bandera de emergencia y estanqueidad del buje.',
    correctFunction: 'Regula la potencia con vientos altos por control de ángulo y garantiza el frenado aerodinámico primario con triple redundancia.',
    commonDefect: 'Pérdida de presión en el acumulador de nitrógeno que impediría llevar la pala a posición de bandera en corte de corriente.',
    paraninfoRef: 'Págs. 52-54 y 65 (Figuras 1.38 y 1.43)',
  },
  {
    id: 'comp_generador',
    name: 'Generador Eléctrico (DFIG / Síncrono)',
    system: 'electrico',
    location: 'gondola',
    technicalSpec: 'Generador asíncrono doblemente alimentado (DFIG) a 690 V con convertidor en rotor, o síncrono multipolo de imanes permanentes sin multiplicadora (direct-drive).',
    inspectionCheck: 'Temperatura de devanados y rodamientos mediante sondas Pt100, estado de escobillas/anillos rozantes en DFIG.',
    correctFunction: 'Convierte la energía mecánica de rotación en energía eléctrica trifásica a 690 V y 50 Hz con control de potencia activa y reactiva.',
    commonDefect: 'Sobretemperatura por suciedad en intercambiador de aire o chisporroteo en anillo colector.',
    paraninfoRef: 'Págs. 55-60 (Figuras 1.46 a 1.52)',
  },
  {
    id: 'comp_virola',
    name: 'Cimentación y Virola de Nivelación',
    system: 'obra_civil',
    location: 'base_cimentacion',
    technicalSpec: 'Zapata troncocónica/octogonal de hormigón armado (fck ≥ 25-30 MPa) con virola cilíndrica de acero embebida y corona de espárragos/pernos de alto límite elástico.',
    inspectionCheck: 'Nivelación micrométrica de la brida superior de la virola con mortero de resina epoxi sin retracción y control ultrasónico de pernos.',
    correctFunction: 'Transmite al terreno las cargas axiales (N), cortantes horizontales (V) y el momento flector crítico (M) derivado del viento.',
    commonDefect: 'Falta de horizontalidad en la virola (desviación > 1 mm/m) que induciría cargas parásitas catastróficas en la base de la torre.',
    paraninfoRef: 'Págs. 49, 102, 244-247 (Figuras 2.4 y 6.1)',
  },
  {
    id: 'comp_celdas_mt',
    name: 'Celdas de Media Tensión (20 kV - SF6)',
    system: 'electrico',
    location: 'torre',
    technicalSpec: 'Conjunto modular bajo envolvente metálica con gas SF6: celda de entrada/remonte de línea, celda de protección con interruptor automático y celda de salida.',
    inspectionCheck: 'Presión del manómetro de SF6, enclavamientos mecánicos en seccionador de puesta a tierra y tarado del relé 50/51.',
    correctFunction: 'Aísla, maniobra y protege el tramo de generación y el transformador 0.69/20 kV frente a cortocircuitos y sobreintensidades.',
    commonDefect: 'Presión insuficiente de SF6 (alerta de rigidez dieléctrica) o defecto en bloqueo mecánico entre interruptor y cuchillas de tierra.',
    paraninfoRef: 'Págs. 35-36, 56, 255-256 (Figuras 1.27 y 1.28)',
  },
];

export const RETO1_QUESTIONS: InspectionQuestion[] = [
  {
    id: 'q1_betz',
    componentId: 'comp_pitch',
    title: 'Fundamento Aerodinámico: Ley de Betz',
    prompt: 'Según la Unidad 1 del libro Paraninfo, ¿cuál es el factor máximo teórico de aprovechamiento de la energía cinética del viento (Límite de Betz) que puede alcanzar un rotor?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: '59,3 % (coeficiente de potencia Cp = 0.593)', isCorrect: true, technicalRationale: 'Correcto. La Ley de Betz demuestra que si se frenara el 100% del viento la masa de aire se detendría impidiendo el flujo continuo; el óptimo físico es 16/27 ≈ 59,3%.' },
      { id: 'b', text: '70,5 % en aerogeneradores tripala modernos', isCorrect: false, technicalRationale: 'Incorrecto. Ninguna máquina aerodinámica en flujo libre puede superar el 59,3%.' },
      { id: 'c', text: '100 % si se usa regulación por Pitch activo', isCorrect: false, technicalRationale: 'Imposible por el principio de conservación de masa de la columna de aire.' },
      { id: 'd', text: '33,3 % correspondiente a la desaceleración estelar', isCorrect: false, technicalRationale: 'El viento se reduce en 1/3 en el plano del disco, pero el coeficiente de potencia es del 59,3%.' },
    ],
    explanation: 'El Límite de Betz (Págs. 44 y 64) establece que el cociente máximo entre la potencia extraíble y la disponible en la corriente es 0,593. En la práctica, turbinas modernas alcanzan Cp de 0,45 a 0,50.',
    paraninfoPage: 'Pág. 44 y Pág. 82',
    points: 250,
    budgetImpact: 15000,
  },
  {
    id: 'q2_cubo',
    componentId: 'comp_gondola',
    title: 'Relación Potencia-Viento',
    prompt: 'Si la velocidad media del viento incidente en el parque pasa de 6 m/s a 12 m/s (se duplica), ¿cómo varía teóricamente la potencia del viento disponible?',
    questionType: 'parameter-calc',
    options: [
      { id: 'a', text: 'Se multiplica por 8 (varía según el cubo de la velocidad: 2³ = 8)', isCorrect: true, technicalRationale: 'Exacto. La fórmula P = 0.5 · ρ · A · v³ establece que la potencia es proporcional al cubo de la velocidad.' },
      { id: 'b', text: 'Se duplica (varía de forma directamente proporcional: 2x)', isCorrect: false, technicalRationale: 'Error grave. Confundiría la potencia con una relación lineal.' },
      { id: 'c', text: 'Se cuadruplica (varía con el cuadrado: 2² = 4)', isCorrect: false, technicalRationale: 'La superficie de barrido varía con el cuadrado del radio, pero la potencia con la velocidad varía al cubo.' },
      { id: 'd', text: 'Permanece constante si la máquina tiene multiplicadora', isCorrect: false, technicalRationale: 'Falso. La energía cinética transportada por la masa de aire crece con el cubo.' },
    ],
    explanation: 'La ecuación general de potencia del viento (Pág. 43) es P = 1/2 · ρ · A · v³. Al duplicar la velocidad, (2v)³ = 8v³, lo que fundamenta la importancia crítica del estudio de recurso eólico.',
    paraninfoPage: 'Pág. 43 y Pág. 63',
    points: 250,
    budgetImpact: 20000,
  },
  {
    id: 'q3_pitch_nitrogen',
    componentId: 'comp_pitch',
    title: 'Seguridad en el Sistema Pitch',
    prompt: 'Durante la inspección previa al montaje, el técnico comprueba el buje. ¿Por qué es vital que cada pala cuente con un acumulador hidráulico de nitrógeno individual?',
    questionType: 'defect-diagnostics',
    options: [
      { id: 'a', text: 'Para garantizar la puesta en bandera inmediata incluso ante corte total de suministro eléctrico (freno aerodinámico de emergencia)', isCorrect: true, technicalRationale: 'Correcto. Si falla la red o el grupo hidráulico, la energía acumulada en el nitrógeno fuerza las palas a bandera (90°) evitando el embalamiento catastrófico.' },
      { id: 'b', text: 'Para lubricar los rodamientos de apoyo de la multiplicadora', isCorrect: false, technicalRationale: 'El acumulador de nitrógeno pertenece al circuito hidráulico de pitch, no a la lubricación.' },
      { id: 'c', text: 'Para inyectar nitrógeno en el generador y evitar arcos voltaicos', isCorrect: false, technicalRationale: 'El generador tiene refrigeración por aire o agua/glicol, no inyección de N2.' },
      { id: 'd', text: 'Para permitir que el rotor gire a velocidad constante de 1500 rpm', isCorrect: false, technicalRationale: 'El rotor eólico gira a baja velocidad (15-25 rpm).' },
    ],
    explanation: 'El freno primario de un aerogenerador moderno es aerodinámico mediante cambio de paso de pala a posición de bandera (Págs. 53 y 74). La reserva de presión de los acumuladores de nitrógeno dota al sistema de triple redundancia pasiva.',
    paraninfoPage: 'Pág. 53, 74 y 86',
    points: 250,
    budgetImpact: 18000,
  },
  {
    id: 'q4_transformer_location',
    componentId: 'comp_celdas_mt',
    title: 'Ubicación del Transformador de Generación',
    prompt: 'En aerogeneradores multimegavatio modernos (>2 MW), ¿dónde y por qué se suele montar el transformador de potencia BT/MT (0.69 / 20 kV)?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'En la base de la torre, para reducir el peso en cabeza de torre y evitar deterioros en el bucle de cables colgantes por torsión', isCorrect: true, technicalRationale: 'Correcto. Un transformador seco de 2-3 MVA pesa varias toneladas. Ubicarlo en base descarga la estructura y reduce cables pesados de BT en el bucle de torsión.' },
      { id: 'b', text: 'En el cono-nariz del rotor, para enfriarlo con el flujo de aire frontal', isCorrect: false, technicalRationale: 'El cono-nariz aloja el mecanismo de pitch, imposible ubicar un transformador allí.' },
      { id: 'c', text: 'En el exterior del parque, sustituyendo a la subestación', isCorrect: false, technicalRationale: 'Cada aerogenerador tiene su centro de transformación de generación antes de la red colectora.' },
      { id: 'd', text: 'Siempre en la punta de las palas para equilibrar pesos', isCorrect: false, technicalRationale: 'Completamente erróneo.' },
    ],
    explanation: 'Según Paraninfo (Págs. 62 y 82), para potencias elevadas la Opción 2 (base de la torre) es la más habitual para aligerar la barquilla y facilitar el mantenimiento de las celdas de 20 kV.',
    paraninfoPage: 'Pág. 62 y Pág. 82',
    points: 250,
    budgetImpact: 15000,
  },
];

// ==========================================
// RETO 2: CLASIFICACIÓN DOCUMENTAL DEL PROYECTO (U2)
// ==========================================
export const PROJECT_DOCUMENTS: ProjectDocumentItem[] = [
  {
    id: 'doc_anejo_geotecnico',
    title: 'Anejo nº 2: Estudio Geotécnico y Geológico',
    description: 'Ensayos de calicatas, resistividad y tomografía eléctrica para determinar la tensión admisible del terreno (σadm ≥ 2 kg/cm²) donde cimentar zapatas.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Obligatorio según CTE y fundamental para evitar asientos diferenciales en zapatas de aerogenerador.',
    technicalTip: 'Los cálculos y justificaciones técnicas de soporte siempre forman parte de los Anejos de la Memoria (Documento nº 1).'
  },
  {
    id: 'doc_anejo_seguridad',
    title: 'Anejo nº 6 / Estudio Básico de Seguridad y Salud',
    description: 'Definición de riesgos de obra (caídas en altura, riesgo eléctrico, izado), medidas preventivas y presupuesto de EPIs según RD 1627/1997.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Mandato estricto por la Ley 31/1995 de PRL y RD 1627/1997.',
    technicalTip: 'El EBSS acompaña a la Memoria en fase de proyecto para fijar las directrices de prevención antes del inicio de obra.'
  },
  {
    id: 'doc_anejo_impacto_ambiental',
    title: 'Anejo nº 5: Estudio de Impacto Ambiental',
    description: 'Medidas correctoras para avifauna, desbroce selectivo, gestión de residuos y restauración de tierra vegetal en viales y plataformas.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Exigido por la Ley 21/2013 y evaluado por el órgano ambiental de Castilla-La Mancha.',
    technicalTip: 'Los estudios de afección física, biótica y socioeconómica forman el Anejo nº 5 de la Memoria.'
  },
  {
    id: 'doc_anejo_calculos_electricos',
    title: 'Anejo nº 1: Cálculos Justificativos Eléctricos',
    description: 'Dimensionamiento de la red interna de MT (20 kV), intensidades de cortocircuito, caída de tensión y cálculo de la red general de tierras.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Exigido por el Reglamento de Alta Tensión (RD 337/2014) y REBT (RD 842/2002).',
    technicalTip: 'Contiene las fórmulas físicas, intensidades admisibles y verificación de los conductores de aluminio RHZ1-OL.'
  },
  {
    id: 'doc_anejo_viales',
    title: 'Anejo nº 3: Diseño de Viales y Plataformas',
    description: 'Estudios topográficos, gálibos de transporte de palas, radios de curvatura mínimos (R=20m) y cálculo de capas de firme (zahorra artificial).',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Documento justificativo de obra civil para transporte especial.',
    technicalTip: 'Justifica los parámetros geométricos y mecánicos de la explanada de montaje.'
  },
  {
    id: 'doc_plano_plataforma',
    title: 'Plano 2.3: Plataforma de Montaje de Aerogenerador',
    description: 'Esquema acotado con zona de grúa principal (50m, 5 kg/cm²), zona de pluma (70m x 8m), zona de palas (2 kg/cm²) y vial de acceso de 5m.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 1: Generales de Parque y Obra Civil',
    importanceLegal: 'Plano vinculante para la ejecución de la obra civil y posicionamiento de grúas.',
    technicalTip: 'Todos los planos gráficos acotados y firmados forman el Documento nº 2.'
  },
  {
    id: 'doc_plano_zanja_mt',
    title: 'Plano 2.5: Secciones Tipo de Vial y Zanjas de MT',
    description: 'Detalle constructivo de zanja entubada/enterrada (0.64 x 0.88 m), lecho de arena de río, ladrillos/placas PVC, cable de tierra y cinta amarilla.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 1: Generales de Parque y Obra Civil',
    importanceLegal: 'Define la forma exacta de colocación de cables conforme a normas UNESA y REBT.',
    technicalTip: 'Las secciones tipo de zanjas y perfiles transversales son planos de obra civil (Doc 2).'
  },
  {
    id: 'doc_plano_unifilar',
    title: 'Plano 2.33: Esquema Unifilar General de Subestación',
    description: 'Representación simbólica normalizada de aparamenta (132/20 kV), seccionadores 89, interruptores 52, trafos de intensidad y relés de protección.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 7: Planos de Ingeniería de Control',
    importanceLegal: 'Base técnica para homologación ante Red Eléctrica de España (REE) y distribuidora.',
    technicalTip: 'Los esquemas unifilares de subestación y celdas pertenecen al Documento nº 2 (Planos).'
  },
  {
    id: 'doc_plano_cimentacion',
    title: 'Plano 2.4: Esquema y Armado de Cimentación de Torre',
    description: 'Disposición en planta y alzado de la zapata de hormigón armado, jaula de armaduras, virola cilíndrica y pasacables de MT y fibra óptica.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 1: Obra Civil',
    importanceLegal: 'Plano estructural preceptivo para el contratista de obra civil.',
    technicalTip: 'Muestra la geometría, diámetros de ferralla y cotas de nivelación de pernos.'
  },
  {
    id: 'doc_pliego_materiales_zahorra',
    title: 'Pliego: Prescripciones Técnicas de Zahorras y Hormigones',
    description: 'Exigencia de compactación al 95% del Proctor modificado para zahorra artificial en viales y resistencia fck=250 daN/cm² para hormigón en masa.',
    correctCategory: 'doc3_pliego',
    subType: 'Condiciones de Índole Técnica y de Ejecución',
    importanceLegal: 'Regula contractualmente las calidades exigidas a los materiales suministrados.',
    technicalTip: 'El Pliego de Condiciones Particulares (Doc nº 3) fija cómo deben ser los materiales y qué ensayos de laboratorio deben superar.'
  },
  {
    id: 'doc_pliego_facultativo',
    title: 'Pliego: Atribuciones de la Dirección Facultativa',
    description: 'Obligaciones del contratista, funciones del Director de Obra y del Coordinador de Seguridad, libro de órdenes y régimen de recepción provisional.',
    correctCategory: 'doc3_pliego',
    subType: 'Condiciones de Índole Facultativa',
    importanceLegal: 'Regula la relación contractual y técnica entre el promotor y el constructor.',
    technicalTip: 'Todo lo relativo a órdenes, penalizaciones y resolución de discrepancias en obra está en el Pliego (Doc 3).'
  },
  {
    id: 'doc_pliego_pruebas_mt',
    title: 'Pliego: Ensayos y Verificaciones Reglamentarias de MT',
    description: 'Protocolos de ensayo de rigidez dieléctrica en cables RHZ1-OL, pruebas de presión de gas SF6 en celdas y medida de resistencia de la red de tierras.',
    correctCategory: 'doc3_pliego',
    subType: 'Pruebas y Ensayos de Instalaciones Eléctricas',
    importanceLegal: 'Estipula las condiciones obligatorias para admitir la recepción de las instalaciones.',
    technicalTip: 'El Pliego define las pruebas previas a la energización que el instalador debe certificar.'
  },
  {
    id: 'doc_presupuesto_cuadro1',
    title: 'Cuadro de Precios Unitarios nº 1 (Precios en Letra)',
    description: 'Precio desglosado en letra y número por cada unidad de obra (ej: m³ de excavación en zanja = doce euros con cuarenta céntimos).',
    correctCategory: 'doc4_presupuesto',
    subType: 'Capítulo 2 del Presupuesto',
    importanceLegal: 'Prevalece legalmente el precio en letra ante cualquier contradicción numérica.',
    technicalTip: 'Los cuadros de precios 1 y 2 forman el núcleo de valoración del Documento nº 4 (Presupuesto).'
  },
  {
    id: 'doc_presupuesto_mediciones',
    title: 'Estado de Mediciones Detalladas',
    description: 'Cálculo analítico de m³ de movimiento de tierras, metros lineales de zanjas de MT, toneladas de acero y unidades de celdas y aerogeneradores.',
    correctCategory: 'doc4_presupuesto',
    subType: 'Capítulo 1 del Presupuesto',
    importanceLegal: 'Sirve de base para las certificaciones mensuales de obra ejecutada.',
    technicalTip: 'Las mediciones detalladas cuantifican cada partida de obra en el Documento nº 4.'
  },
  {
    id: 'doc_presupuesto_resumen',
    title: 'Resumen General del Presupuesto por Contrata',
    description: 'Suma de presupuestos parciales + 13% Gastos Generales + 6% Beneficio Industrial + 21% IVA para obtener el Presupuesto de Ejecución por Contrata.',
    correctCategory: 'doc4_presupuesto',
    subType: 'Capítulo 5 del Presupuesto',
    importanceLegal: 'Determina el importe económico total contractual de licitación y adjudicación.',
    technicalTip: 'El resumen general aplica los coeficientes económicos reglamentarios sobre el PEM.'
  },
  {
    id: 'doc_anejo_plan_obras',
    title: 'Anejo nº 15: Plan de Obras y Cronograma',
    description: 'Secuencia lógica de tajos, red de precedencias múltiples y previsión de inversión mensual para garantizar el plazo contractual de 12 meses.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Vincula la planificación temporal de trabajos ofertada por el contratista.',
    technicalTip: 'El plan de obras justificativo y su metodología de avance forman el Anejo 15 de la Memoria.'
  },
];

// ==========================================
// RETO 3: INTERPRETACIÓN DE PLANOS Y LAYOUT (U2)
// ==========================================
export const BLUEPRINT_HOTSPOTS: BlueprintHotspot[] = [
  // Plano Plataforma (Figura 2.3)
  {
    id: 'hotspot_grua_principal',
    blueprintType: 'plataforma_montaje',
    xPercent: 44,
    yPercent: 40,
    label: 'Plataforma Grúa Principal (50 m)',
    title: 'Zona de Apoyo y Trabajo de Grúa de Gran Tonelaje',
    technicalDescription: 'Longitud de 50,00 m nivelada al 0% con zahorra compactada al 95% del Proctor modificado y capacidad portante mínima de 5 kg/cm².',
    question: {
      prompt: 'Según el plano de plataforma de montaje de aerogeneradores (Figura 2.3), ¿qué capacidad portante y compactación mínima debe garantizar esta zona?',
      options: [
        { id: 'a', text: 'Capacidad portante de 5 kg/cm² con zahorra al 95% del Proctor modificado', isCorrect: true, rationale: 'Correcto. Las grúas móviles de 500-1000 t ejercen presiones de apoyo enormes a través de sus estabilizadores; 5 kg/cm² al 95% Proctor es la prescripción técnica del libro.' },
        { id: 'b', text: 'Capacidad portante de 2 kg/cm² sin compactación especial', isCorrect: false, rationale: 'Incorrecto. 2 kg/cm² es suficiente para el acopio de palas ligeras, pero peligroso e insuficiente para la grúa principal.' },
        { id: 'c', text: 'Suelo natural con pendiente del 10% para escorrentía', isCorrect: false, rationale: 'La zona de la grúa debe estar rigurosamente nivelada al 0% para evitar vuelcos.' },
        { id: 'd', text: 'Hormigonado masivo de 1 metro de espesor en toda la plataforma', isCorrect: false, rationale: 'No se hormigona toda la plataforma de 50x40 m por motivos económicos y ambientales; se utiliza zahorra artificial compactada.' },
      ],
      correctExplanation: 'La zona de la grúa principal soporta el peso de grúas tipo Liebherr LTR o LR de cientos de toneladas; el plano especifica 50 m nivelados al 0% y capacidad portante de 5 kg/cm² (Pág. 4 y 102).',
      bookFigureRef: 'Figura 2.3 (Pág. 4 y 102)',
    }
  },
  {
    id: 'hotspot_montaje_pluma',
    blueprintType: 'plataforma_montaje',
    xPercent: 82,
    yPercent: 30,
    label: 'Zona Brazo de Grúa (70 x 8 m)',
    title: 'Corredor de Ensamblaje de la Pluma Celosía',
    technicalDescription: 'Espacio despejado longitudinal de 70,00 metros por 8,00 metros de ancho, sin obstáculos, destinado al ensamblaje horizontal del plumín y pluma principal.',
    question: {
      prompt: '¿Por qué el layout de la plataforma reserva un corredor rectilíneo de 70 metros x 8 metros adyacente a la grúa?',
      options: [
        { id: 'a', text: 'Para ensamblar en el suelo los tramos de celosía del brazo de la grúa antes de su elevación', isCorrect: true, rationale: 'Correcto. Las grandes grúas telescópicas/celosía necesitan montar su pluma extendida sobre el terreno antes de bascular a posición vertical de trabajo.' },
        { id: 'b', text: 'Para ubicar las casetas de comedor y aseos del personal', isCorrect: false, rationale: 'Las casetas e instalaciones auxiliares se ubican en la entrada o zonas no operativas.' },
        { id: 'c', text: 'Para enterrar la línea de evacuación de 132 kV', isCorrect: false, rationale: 'La zanja discurre por el vial de acceso, no cruzando el espacio de montaje de la grúa.' },
        { id: 'd', text: 'Para acopiar áridos y cemento para el hormigonado in situ', isCorrect: false, rationale: 'En parques de gran potencia el hormigón procede de plantas externas dosificadas en cubas.' },
      ],
      correctExplanation: 'Las grúas de gran tonelaje requieren un área despejada y libre de obstáculos para armar la pluma de hasta 100-135 m antes de alzarla (Pág. 4, 102 y 249).',
      bookFigureRef: 'Figura 2.3 (Pág. 4 y 102)',
    }
  },
  {
    id: 'hotspot_vial_curvatura',
    blueprintType: 'plataforma_montaje',
    xPercent: 28,
    yPercent: 26,
    label: 'Vial de Acceso: R=20m y ancho 5m',
    title: 'Geometría y Radios de Curvatura de Viales',
    technicalDescription: 'Vial de servicio de 5,00 m de ancho con sobreancho en curvas y radio interior mínimo R=20 m para trailers de transporte especial de palas.',
    question: {
      prompt: 'Al diseñar los caminos de acceso según el Anejo nº 3 y plano 2.3, ¿cuál es el radio de curvatura mínimo (R) para permitir el giro de camiones con palas eólicas de más de 40-50 metros?',
      options: [
        { id: 'a', text: 'R = 20 metros (con sobreancho en curvas y pendientes moderadas)', isCorrect: true, rationale: 'Exacto. Como se indica explícitamente en el plano de plataforma (R=20) y en el Anejo 3, es el mínimo geométrico para trailers especiales con eje trasero autodireccional.' },
        { id: 'b', text: 'R = 5 metros, igual que en carreteras urbanas', isCorrect: false, rationale: 'Un camión de 50 metros encallaría inmediatamente con R=5m.' },
        { id: 'c', text: 'R = 100 metros obligatorio en todas las curvas', isCorrect: false, rationale: 'Sería inviable topográficamente en zonas de montaña y generaría un desmonte inaceptable.' },
        { id: 'd', text: 'No se exige radio mínimo porque las palas siempre se transportan en helicóptero', isCorrect: false, rationale: 'El transporte terrestre es el método estándar y generalizado en España.' },
      ],
      correctExplanation: 'El plano 2.3 fija R=20 m de radio en curvas del vial para permitir el paso de transportes pesados de palas y tramos de torre con cabezas tractoras especiales (Pág. 4 y 117).',
      bookFigureRef: 'Figura 2.3 y Anejo nº 3 (Pág. 4 y 97)',
    }
  },

  // Plano Zanja MT (Figura 2.5)
  {
    id: 'hotspot_zanja_cama_arena',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 32,
    yPercent: 62,
    label: 'Lecho de Arena de Río (10 cm + 185 mm)',
    title: 'Asiento y Protección Dieléctrica del Cable MT',
    technicalDescription: 'Capa de arena fina de río de 10 cm bajo los cables y relleno envolvente de 185 mm para evitar que aristas de rocas dañen el aislamiento XLPE.',
    question: {
      prompt: 'En la sección tipo de zanja para canalización de Media Tensión (Figura 2.5), ¿qué material y espesor se coloca inmediatamente rodeando a los cables de potencia?',
      options: [
        { id: 'a', text: 'Arena fina de río (10 cm de asiento previo y relleno hasta 185 mm sobre cables)', isCorrect: true, rationale: 'Correcto. La arena de río lavada carece de piedras punzantes, amortigua esfuerzos mecánicos y facilita la disipación térmica.' },
        { id: 'b', text: 'Hormigón armado con mallazo electrosoldado de 50 cm', isCorrect: false, rationale: 'El hormigonado directo dificultaría la disipación térmica y futuras reparaciones o sustituciones.' },
        { id: 'c', text: 'Tierra vegetal sin cribar procedente del desbroce', isCorrect: false, rationale: 'La tierra vegetal contiene materia orgánica y piedras que perforarían la cubierta de poliolefina.' },
        { id: 'd', text: 'Zahorra con piedras de tamaño mayor a 50 mm', isCorrect: false, rationale: 'Las piedras grandes dañarían el conductor durante la compactación.' },
      ],
      correctExplanation: 'La norma técnica UNE/UNESA y la Figura 2.5 prescriben 10 cm de cama de arena de río y posterior cobertura de 185 mm antes de colocar las protecciones mecánicas (Págs. 6, 59 y 68).',
      bookFigureRef: 'Figura 2.5 (Págs. 6, 68 y 104)',
    }
  },
  {
    id: 'hotspot_zanja_proteccion_mecanica',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 32,
    yPercent: 44,
    label: 'Protección Mecánica y Señalización',
    title: 'Placas de PVC Rígido / Ladrillos y Cinta Amarilla',
    technicalDescription: 'Placas de PVC rígido o ladrillo cerámico sobre la arena y cinta de señalización de color amarillo de advertencia a 20-30 cm de la superficie.',
    question: {
      prompt: '¿Cuál es la función reglamentaria de la cinta de señalización de color amarillo situada en el relleno superior de la zanja?',
      options: [
        { id: 'a', text: 'Avisar a cualquier excavadora o personal futuro de la presencia de cables de MT en tensión antes de alcanzar la protección física', isCorrect: true, rationale: 'Exacto. Si en el futuro se realizan excavaciones, la cinta amarilla alerta de la línea de alta/media tensión antes de golpear las canalizaciones.' },
        { id: 'b', text: 'Aislar térmicamente el cable para que no pierda calor', isCorrect: false, rationale: 'No tiene propiedades térmicas; es una medida de seguridad preventiva visual.' },
        { id: 'c', text: 'Conducir la corriente de defecto a tierra en caso de cortocircuito', isCorrect: false, rationale: 'La cinta es plástica, no conductora. La tierra la conduce el cable de cobre desnudo del fondo.' },
        { id: 'd', text: 'Impedir que el agua de lluvia penetre en la zanja', isCorrect: false, rationale: 'No es impermeable ni estanca al agua superficial.' },
      ],
      correctExplanation: 'El REBT y la normativa de seguridad obligan al empleo de cinta señalizadora amarilla continua sobre las líneas eléctricas subterráneas para prevenir cortes accidentales (Pág. 6, 59 y 104).',
      bookFigureRef: 'Figura 2.5 (Pág. 6 y 104)',
    }
  },
  {
    id: 'hotspot_zanja_tierra_fondo',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 24,
    yPercent: 90,
    label: 'Red General de Tierras (Cobre Desnudo)',
    title: 'Conductor Desnudo de Cobre en Fondo de Zanja',
    technicalDescription: 'Cable de cobre desnudo de sección calculada (mínimo 50 mm²) tendido longitudinalmente a lo largo de las zanjas uniendo todas las zapatas a la subestación.',
    question: {
      prompt: 'En el fondo de la zanja discurre un cable de cobre desnudo. ¿Cuál es su misión técnica según la Unidad 1 y el Anejo nº 4?',
      options: [
        { id: 'a', text: 'Crear una red de tierras única y continua en todo el parque para disipar corrientes de rayo y limitar tensiones de paso y contacto', isCorrect: true, rationale: 'Correcto. La normativa exige un sistema de tierras único interconectado que enlace zapatas, centros de seccionamiento y subestación para igualar potenciales.' },
        { id: 'b', text: 'Transportar la energía en baja tensión para los servicios auxiliares', isCorrect: false, rationale: 'Es cobre desnudo puesto a tierra; no puede llevar tensión de servicio.' },
        { id: 'c', text: 'Transmitir las señales de fibra óptica al SCADA central', isCorrect: false, rationale: 'La fibra óptica va en un tubo separado o incorporada en cables de telecomunicaciones.' },
        { id: 'd', text: 'Servir como tensor mecánico para que los cables de MT no se muevan', isCorrect: false, rationale: 'No es un tensor mecánico, es el conductor de protección equipotencial.' },
      ],
      correctExplanation: 'La red de tierras en el sistema colector consiste en un bucle conductor de cobre desnudo en el fondo de las zanjas que garantiza la equipotencialidad de todo el parque (Pág. 38 y 58).',
      bookFigureRef: 'Figura 2.5 y Pág. 38/58',
    }
  },

  // Plano Unifilar y Aparamenta Subestación (Figuras 2.10, 2.33, 2.34)
  {
    id: 'hotspot_subestacion_seccionador',
    blueprintType: 'unifilar_subestacion',
    xPercent: 55,
    yPercent: 25,
    label: 'Seccionador con PAT (89-TL)',
    title: 'Seccionador de Línea 145 kV con Puesta a Tierra',
    technicalDescription: 'Aparato mecánico de maniobra que asegura un corte visible en el circuito y permite conectar a tierra la línea durante trabajos de mantenimiento con descargo.',
    question: {
      prompt: 'En el esquema unifilar de la subestación (Figura 2.33), ¿cuál es la diferencia fundamental entre el Seccionador (89) y el Interruptor Automático (52-L)?',
      options: [
        { id: 'a', text: 'El interruptor (52) abre y corta corrientes de cortocircuito bajo carga, mientras que el seccionador (89) solo maniobra sin carga para garantizar corte visible', isCorrect: true, rationale: 'Correcto. Abrir un seccionador bajo carga generaría un arco voltaico destructivo. La secuencia segura es abrir primero el interruptor y luego el seccionador.' },
        { id: 'b', text: 'El seccionador transforma la tensión de 132 kV a 20 kV', isCorrect: false, rationale: 'Esa es la función exclusiva del transformador de potencia.' },
        { id: 'c', text: 'El interruptor solo funciona con corriente continua de 125 V', isCorrect: false, rationale: 'El interruptor de alta tensión corta las tres fases de 132 kV alternas en SF6.' },
        { id: 'd', text: 'Ambos aparatos son idénticos y se abren indistintamente', isCorrect: false, rationale: 'Error muy grave en seguridad eléctrica de alta tensión.' },
      ],
      correctExplanation: 'El interruptor en SF6 extingue corrientes elevadas de falta. El seccionador garantiza la apertura visible de seguridad para las "5 Reglas de Oro" antes de poner a tierra (Págs. 34, 72, 91 y 170).',
      bookFigureRef: 'Figura 2.33 y 2.34 (Págs. 34 y 170)',
    }
  },
  {
    id: 'hotspot_subestacion_reles_ansi',
    blueprintType: 'unifilar_subestacion',
    xPercent: 55,
    yPercent: 60,
    label: 'Relés de Protección ANSI (50/51, 87, 64N)',
    title: 'Unidad de Protección y Telemando SCADA',
    technicalDescription: 'Cuadros de control con relés de sobreintensidad instantánea/temporizada (50/51), protección diferencial (87) y falta a tierra (64N) conectados a trafos de medida.',
    question: {
      prompt: 'En la simbología normalizada del esquema de protecciones, ¿a qué función corresponde el código ANSI 50/51?',
      options: [
        { id: 'a', text: 'Protección de sobreintensidad instantánea (50) y temporizada (51)', isCorrect: true, rationale: 'Correcto. La función 50 dispara instantáneamente ante cortocircuitos francos y la 51 actúa con curva inversa temporizada ante sobrecargas.' },
        { id: 'b', text: 'Protección de máxima y mínima tensión', isCorrect: false, rationale: 'Las tensiones son 27 (subtensión) y 59 (sobretensión).' },
        { id: 'c', text: 'Protección contra gases Buchholz del transformador', isCorrect: false, rationale: 'El relé de cuba Buchholz es el código 63.' },
        { id: 'd', text: 'Protección de distancia para líneas aéreas', isCorrect: false, rationale: 'La protección de distancia es la función 21.' },
      ],
      correctExplanation: 'La norma internacional ANSI y los esquemas unifilares de Paraninfo (Pág. 34, 151 y 171) codifican los relés de sobreintensidad como 50 (instantáneo) y 51 (temporizado).',
      bookFigureRef: 'Figura 2.34 (Pág. 35 y 171)',
    }
  },
];

// ==========================================
// RETO 4: PLANIFICACIÓN DE MONTAJE Y GANTT (U2)
// ==========================================
export const GANTT_TASKS_POOL: GanttTask[] = [
  {
    id: 'task_01_replanteo',
    code: 'ACT-01',
    name: 'Trabajos preliminares, replanteo topográfico y accesos provisionales',
    category: 'obra_civil',
    durationWeeks: 3,
    dependencies: [],
    correctOrderIndex: 1,
    isCriticalPath: true,
    resourceRequired: 'Topógrafo + Estación total + Desbrozadoras',
    safetyRisk: 'Tránsito de maquinaria en terreno virgen, interferencias arqueológicas',
    clmRegulationNote: 'Acta de replanteo previa y verificación de desbroce con agentes medioambientales de C-LM.',
  },
  {
    id: 'task_02_viales',
    code: 'ACT-02',
    name: 'Apertura de viales internos y plataformas de montaje (zahorra 95% Proctor)',
    category: 'obra_civil',
    durationWeeks: 5,
    dependencies: ['task_01_replanteo'],
    correctOrderIndex: 2,
    isCriticalPath: true,
    resourceRequired: 'Bulldozer + Motoniveladora + Rodillos compactadores',
    safetyRisk: 'Vuelco de maquinaria pesada en taludes, polvo y emisión de partículas',
    clmRegulationNote: 'Riego sistemático de caminos para evitar nubes de polvo sobre cultivos colindantes.',
  },
  {
    id: 'task_03_cimentaciones',
    code: 'ACT-03',
    name: 'Excavación, armado de ferralla y hormigonado de zapatas con virola',
    category: 'obra_civil',
    durationWeeks: 6,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 3,
    isCriticalPath: true,
    resourceRequired: 'Retroexcavadoras + Camiones hormigonera + Grúa auxiliar',
    safetyRisk: 'Caídas en pozos de excavación, atrapamientos en encofrados y desmoronamientos',
    clmRegulationNote: 'Control de probetas a 28 días (fck ≥ 25 MPa) y nivelación de virola < 1 mm/m antes de fraguado.',
  },
  {
    id: 'task_04_zanjas_tierras',
    code: 'ACT-04',
    name: 'Apertura de zanjas, tendido de cable de tierra y cables de MT (20 kV)',
    category: 'electromecanico',
    durationWeeks: 5,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 4,
    isCriticalPath: false,
    resourceRequired: 'Zanjadora + Camión grúa con bobinas + Cama de arena de río',
    safetyRisk: 'Tirones mecánicos en desenrollado de bobinas pesadas, manipulación de conductores',
    clmRegulationNote: 'Conductor de Cu desnudo de sección calculada en fondo y cinta señalizadora amarilla superior.',
  },
  {
    id: 'task_05_obra_subestacion',
    code: 'ACT-05',
    name: 'Obra civil de Subestación AT/MT y Edificio de Control',
    category: 'subestacion',
    durationWeeks: 7,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 5,
    isCriticalPath: false,
    resourceRequired: 'Encofradores + Albañilería + Hormigonado de bancadas trafo con foso de recogida de aceite',
    safetyRisk: 'Riesgos generales de construcción y cimentaciones de pórticos de alta tensión',
    clmRegulationNote: 'Foso estanco para recogida del 100% del aceite dieléctrico del transformador de 25 MVA.',
  },
  {
    id: 'task_06_montaje_torre',
    code: 'ACT-06',
    name: 'Transporte e izado por tramos de las torres tubulares de acero',
    category: 'electromecanico',
    durationWeeks: 4,
    dependencies: ['task_03_cimentaciones'],
    correctOrderIndex: 6,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal telescópica (500 t) + Llaves dinamométricas de alto par',
    safetyRisk: 'Trabajo en altura (>60-100 m), caída de objetos, balanceo de piezas por ráfagas de viento',
    clmRegulationNote: 'Prohibido izado con vientos superiores a 9-10 m/s o tormentas eléctricas (RD 1627/97).',
  },
  {
    id: 'task_07_montaje_gondola',
    code: 'ACT-07',
    name: 'Izado y posicionado de la góndola (nacelle), tren de potencia y transformador',
    category: 'electromecanico',
    durationWeeks: 3,
    dependencies: ['task_06_montaje_torre'],
    correctOrderIndex: 7,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal telescópica + Eslingas certificadas + Técnicos especialistas',
    safetyRisk: 'Sobrecargas dinámicas en gancho, atrapamiento en corona yaw, ajuste en altura',
    clmRegulationNote: 'Alineación de brida superior y apriete controlado por tensión hidráulica de pernos.',
  },
  {
    id: 'task_08_ensamblaje_rotor',
    code: 'ACT-08',
    name: 'Ensamblaje del rotor en suelo (buje + 3 palas) e izado conjunto con grúa y retenida',
    category: 'electromecanico',
    durationWeeks: 3,
    dependencies: ['task_07_montaje_gondola'],
    correctOrderIndex: 8,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal + Grúa de retenida en pala + Fajas de izado',
    safetyRisk: 'Paso crítico de horizontal a vertical del rotor, efecto vela sobre las palas de 60m',
    clmRegulationNote: 'Conexión del circuito hidráulico de pitch y acumuladores de nitrógeno a bandera inmediata.',
  },
  {
    id: 'task_09_aparellaje_subestacion',
    code: 'ACT-09',
    name: 'Montaje de aparellaje exterior de subestación, pórticos y celdas MT en base',
    category: 'subestacion',
    durationWeeks: 4,
    dependencies: ['task_05_obra_subestacion', 'task_04_zanjas_tierras'],
    correctOrderIndex: 9,
    isCriticalPath: false,
    resourceRequired: 'Montadores eléctricos de AT/MT + Camión pluma + Gas SF6',
    safetyRisk: 'Manejo de gas SF6, conexión de embarrados de 132 kV a cota superior',
    clmRegulationNote: 'Verificación de distancias de aislamiento en aire conforme a MIE-RAT 12.',
  },
  {
    id: 'task_10_linea_evacuacion_at',
    code: 'ACT-10',
    name: 'Tendido y tensado de línea aérea de evacuación de 132 kV a nudo de REE',
    category: 'subestacion',
    durationWeeks: 6,
    dependencies: ['task_05_obra_subestacion'],
    correctOrderIndex: 10,
    isCriticalPath: false,
    resourceRequired: 'Cabrestantes + Torres de celosía + Cable tierra-óptico OPGW + Salvapájaros',
    safetyRisk: 'Cruces sobre viales públicos, trabajo en altura sobre apoyos de celosía',
    clmRegulationNote: 'Obligatoriedad de espirales salvapájaros homologados por la Consejería de Desarrollo Sostenible.',
  },
  {
    id: 'task_11_pruebas_scada',
    code: 'ACT-11',
    name: 'Ensayos de rigidez dieléctrica, calibración SCADA, 5 Reglas de Oro y energización en blanco',
    category: 'evacuacion_pruebas',
    durationWeeks: 2,
    dependencies: ['task_08_ensamblaje_rotor', 'task_09_aparellaje_subestacion', 'task_10_linea_evacuacion_at'],
    correctOrderIndex: 11,
    isCriticalPath: true,
    resourceRequired: 'Maleta de inyección secundaria de relés + Medidor de aislamiento 5 kV + Pértigas 25 kV',
    safetyRisk: 'Riesgo eléctrico de alta tensión durante las primeras maniobras de energización',
    clmRegulationNote: 'Cumplimiento estricto del RD 614/2001 y consignación de circuitos con corte visible y PAT.',
  },
  {
    id: 'task_12_puesta_marcha',
    code: 'ACT-12',
    name: 'Puesta en marcha oficial, pruebas de red, recepción provisional y restauración vegetal',
    category: 'evacuacion_pruebas',
    durationWeeks: 2,
    dependencies: ['task_11_pruebas_scada'],
    correctOrderIndex: 12,
    isCriticalPath: true,
    resourceRequired: 'Ingeniero de puesta en marcha + Representante de REE + Coordinador ambiental',
    safetyRisk: 'Aparición de desequilibrios dinámicos de vibraciones o ruidos en primeros giros de palas',
    clmRegulationNote: 'Firma de Acta de Recepción Provisional y restitución de capas vegetales en acopios.',
  },
];
