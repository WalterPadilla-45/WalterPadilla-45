import {
    Encuesta,
    Pregunta,
    Opcion,
    Usuario,
    Voto,
    Donacion,
    CausaDonacion,
    Resultado,
    Rol,
    TipoPregunta,
    EstadoDonacion,
    EstadoEncuesta,
    CategoriaEncuesta
} from './types';

/**
 * Datos simulados coherentes con el schema de Prisma
 * SISTEMA EXCLUSIVO PARA ACCIONISTAS
 */

// ==================== USUARIOS ====================

export const mockUsuarios: Usuario[] = [
    {
        id: "usr-1",
        email: "accionista@example.com",
        emailVerified: new Date("2026-01-14"),
        password: null,
        nombre: "María Rodríguez",
        rol: Rol.ACCIONISTA,
        creadoEn: new Date("2026-01-05")
    },
    {
        id: "usr-2",
        email: "carlos.mendez@example.com",
        emailVerified: new Date("2025-12-10"),
        password: null,
        nombre: "Carlos Méndez",
        rol: Rol.ACCIONISTA,
        creadoEn: new Date("2025-12-01")
    },
    {
        id: "usr-3",
        email: "admin@aneupi.org",
        emailVerified: new Date("2025-11-01"),
        password: null,
        nombre: "Administrador Sistema",
        rol: Rol.SUPER_USUARIO,
        creadoEn: new Date("2025-11-01")
    }
];

// ==================== ENCUESTAS ====================

export const mockEncuestas: Encuesta[] = [
    {
        id: "enc-1",
        titulo: "Evaluación de Servicios Financieros 2026",
        descripcion: "Encuesta clave para evaluar la satisfacción de los accionistas con nuestros servicios financieros durante el último trimestre.",
        slug: "evaluacion-servicios-2026",
        activa: true,
        categoria: CategoriaEncuesta.FINANCIERA,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-02-01"),
        fechaFin: new Date("2026-03-31"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-01-25"),
        actualizadoEn: new Date("2026-02-01"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-2",
        titulo: "Estrategia Empresarial 2026-2027",
        descripcion: "Participa en la definición de prioridades estratégicas para el próximo bienio. Tu opinión es fundamental.",
        slug: "estrategia-2026-2027",
        activa: true,
        categoria: CategoriaEncuesta.ESTRATEGIA,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-02-05"),
        fechaFin: new Date("2026-03-15"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-02-03"),
        actualizadoEn: new Date("2026-02-05"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-3",
        titulo: "Gobierno Corporativo y Transparencia",
        descripcion: "Encuesta anual sobre prácticas de gobierno corporativo y transparencia en la gestión institucional.",
        slug: "gobierno-corporativo-2026",
        activa: true,
        categoria: CategoriaEncuesta.GOBIERNO_CORPORATIVO,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-01-20"),
        fechaFin: new Date("2026-02-28"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-01-15"),
        actualizadoEn: new Date("2026-01-20"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-4",
        titulo: "Evaluación de Desempeño Operativo Q1",
        descripcion: "Revisión trimestral de indicadores operativos clave y propuestas de mejora continua.",
        slug: "desempeno-operativo-q1",
        activa: true,
        categoria: CategoriaEncuesta.OPERACIONES,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-02-08"),
        fechaFin: new Date("2026-02-25"),
        creadorId: "usr-1",
        creadoEn: new Date("2026-02-05"),
        actualizadoEn: new Date("2026-02-08"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-5",
        titulo: "Políticas de Recursos Humanos 2026",
        descripcion: "Consulta sobre nuevas políticas de talento humano y desarrollo organizacional.",
        slug: "politicas-rrhh-2026",
        activa: false,
        categoria: CategoriaEncuesta.RRHH,
        estado: EstadoEncuesta.CERRADA,
        fechaInicio: new Date("2026-01-10"),
        fechaFin: new Date("2026-01-31"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-01-05"),
        actualizadoEn: new Date("2026-01-31"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-6",
        titulo: "Plan de Inversiones 2026",
        descripcion: "Definición de prioridades de inversión para el presente año fiscal.",
        slug: "plan-inversiones-2026",
        activa: false,
        categoria: CategoriaEncuesta.FINANCIERA,
        estado: EstadoEncuesta.PROXIMA,
        fechaInicio: new Date("2026-03-01"),
        fechaFin: new Date("2026-03-31"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-02-01"),
        actualizadoEn: new Date("2026-02-09"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-7",
        titulo: "Sostenibilidad y Responsabilidad Social",
        descripcion: "Encuesta sobre compromisos ambientales y de responsabilidad social corporativa.",
        slug: "sostenibilidad-2026",
        activa: true,
        categoria: CategoriaEncuesta.ESTRATEGIA,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-02-01"),
        fechaFin: new Date("2026-02-28"),
        creadorId: "usr-2",
        creadoEn: new Date("2026-01-28"),
        actualizadoEn: new Date("2026-02-01"),
        preguntas: [],
        votos: [],
        resultados: []
    },
    {
        id: "enc-8",
        titulo: "Evaluación de Riesgos Corporativos",
        descripcion: "Identificación y evaluación de principales riesgos que enfrenta la organización.",
        slug: "riesgos-corporativos-2026",
        activa: true,
        categoria: CategoriaEncuesta.GOBIERNO_CORPORATIVO,
        estado: EstadoEncuesta.ACTIVA,
        fechaInicio: new Date("2026-02-10"),
        fechaFin: new Date("2026-03-10"),
        creadorId: "usr-3",
        creadoEn: new Date("2026-02-07"),
        actualizadoEn: new Date("2026-02-10"),
        preguntas: [],
        votos: [],
        resultados: []
    }
];

// ==================== PREGUNTAS ====================

export const mockPreguntas: Pregunta[] = [
    // Preguntas para Encuesta 1
    {
        id: "preg-1",
        texto: "¿Qué tan satisfecho está con nuestros servicios financieros?",
        tipo: TipoPregunta.OPCION_MULTIPLE,
        orden: 1,
        obligatoria: true,
        minValor: null,
        maxValor: null,
        encuestaId: "enc-1",
        opciones: []
    },
    {
        id: "preg-2",
        texto: "¿Qué podemos mejorar en nuestros servicios?",
        tipo: TipoPregunta.TEXTO_ABIERTO,
        orden: 2,
        obligatoria: false,
        minValor: null,
        maxValor: null,
        encuestaId: "enc-1",
        opciones: []
    },
    {
        id: "preg-3",
        texto: "Califique la atención al cliente (1-10)",
        tipo: TipoPregunta.CALIFICACION,
        orden: 3,
        obligatoria: true,
        minValor: 1,
        maxValor: 10,
        encuestaId: "enc-1",
        opciones: []
    },
    // Preguntas para Encuesta 2
    {
        id: "preg-4",
        texto: "¿Cuál es su producto de inversión preferido?",
        tipo: TipoPregunta.OPCION_MULTIPLE,
        orden: 1,
        obligatoria: true,
        minValor: null,
        maxValor: null,
        encuestaId: "enc-2",
        opciones: []
    },
    {
        id: "preg-5",
        texto: "Califique el rendimiento de su inversión (1-5)",
        tipo: TipoPregunta.CALIFICACION,
        orden: 2,
        obligatoria: true,
        minValor: 1,
        maxValor: 5,
        encuestaId: "enc-2",
        opciones: []
    },
    // Preguntas para Encuesta 3
    {
        id: "preg-6",
        texto: "¿Considera que la empresa opera con transparencia?",
        tipo: TipoPregunta.OPCION_MULTIPLE,
        orden: 1,
        obligatoria: true,
        minValor: null,
        maxValor: null,
        encuestaId: "enc-3",
        opciones: []
    }
];

// ==================== OPCIONES ====================

export const mockOpciones: Opcion[] = [
    // Opciones para pregunta 1
    { id: "opc-1", texto: "Muy satisfecho", orden: 1, preguntaId: "preg-1" },
    { id: "opc-2", texto: "Satisfecho", orden: 2, preguntaId: "preg-1" },
    { id: "opc-3", texto: "Neutral", orden: 3, preguntaId: "preg-1" },
    { id: "opc-4", texto: "Insatisfecho", orden: 4, preguntaId: "preg-1" },
    { id: "opc-5", texto: "Muy insatisfecho", orden: 5, preguntaId: "preg-1" },
    // Opciones para pregunta 4
    { id: "opc-6", texto: "Fondos de inversión", orden: 1, preguntaId: "preg-4" },
    { id: "opc-7", texto: "Acciones", orden: 2, preguntaId: "preg-4" },
    { id: "opc-8", texto: "Bonos", orden: 3, preguntaId: "preg-4" },
    { id: "opc-9", texto: "Cuentas de ahorro", orden: 4, preguntaId: "preg-4" },
    // Opciones para pregunta 6
    { id: "opc-10", texto: "Sí, completamente", orden: 1, preguntaId: "preg-6" },
    { id: "opc-11", texto: "En su mayoría", orden: 2, preguntaId: "preg-6" },
    { id: "opc-12", texto: "Parcialmente", orden: 3, preguntaId: "preg-6" },
    { id: "opc-13", texto: "No", orden: 4, preguntaId: "preg-6" }
];

// Enlazar opciones a preguntas
mockPreguntas.forEach(pregunta => {
    pregunta.opciones = mockOpciones.filter(o => o.preguntaId === pregunta.id);
});

// Enlazar preguntas a encuestas
mockEncuestas.forEach(encuesta => {
    encuesta.preguntas = mockPreguntas.filter(p => p.encuestaId === encuesta.id);
});

// ==================== VOTOS ====================

export const mockVotos: Voto[] = [
    {
        id: "voto-1",
        encuestaId: "enc-1",
        usuarioId: "usr-1",
        fingerprint: "fp-user1-enc1",
        ip: "192.168.1.100",
        pais: "Colombia",
        ciudad: "Bogotá",
        dispositivo: "Desktop",
        respuestas: {
            "preg-1": "opc-2",
            "preg-2": "Mejorar los tiempos de respuesta",
            "preg-3": 8
        },
        creadoEn: new Date("2026-02-08")
    },
    {
        id: "voto-2",
        encuestaId: "enc-2",
        usuarioId: null,
        fingerprint: "fp-anon-1",
        ip: "192.168.1.50",
        pais: "Colombia",
        ciudad: "Medellín",
        dispositivo: "Mobile",
        respuestas: {
            "preg-4": "opc-7",
            "preg-5": 4
        },
        creadoEn: new Date("2026-02-09")
    }
];

// ==================== RESULTADOS ====================

export const mockResultados: Resultado[] = [
    // Resultados para encuesta 1, pregunta 1
    { id: "res-1", encuestaId: "enc-1", preguntaId: "preg-1", opcionId: "opc-1", total: 45 },
    { id: "res-2", encuestaId: "enc-1", preguntaId: "preg-1", opcionId: "opc-2", total: 78 },
    { id: "res-3", encuestaId: "enc-1", preguntaId: "preg-1", opcionId: "opc-3", total: 23 },
    { id: "res-4", encuestaId: "enc-1", preguntaId: "preg-1", opcionId: "opc-4", total: 12 },
    { id: "res-5", encuestaId: "enc-1", preguntaId: "preg-1", opcionId: "opc-5", total: 5 },
    // Resultados para encuesta 2, pregunta 4
    { id: "res-6", encuestaId: "enc-2", preguntaId: "preg-4", opcionId: "opc-6", total: 34 },
    { id: "res-7", encuestaId: "enc-2", preguntaId: "preg-4", opcionId: "opc-7", total: 56 },
    { id: "res-8", encuestaId: "enc-2", preguntaId: "preg-4", opcionId: "opc-8", total: 28 },
    { id: "res-9", encuestaId: "enc-2", preguntaId: "preg-4", opcionId: "opc-9", total: 19 }
];

// ==================== DONACIONES ====================

export const mockCausas: CausaDonacion[] = [
    {
        id: "causa-1",
        titulo: "Fondo de Educación Financiera",
        descripcion: "Programa de educación financiera para comunidades vulnerables",
        imagen: null,
        activa: true,
        creadoEn: new Date("2026-01-01")
    },
    {
        id: "causa-2",
        titulo: "Apoyo a Emprendedores",
        descripcion: "Financiamiento de micro-emprendimientos en zonas rurales",
        imagen: null,
        activa: true,
        creadoEn: new Date("2026-01-05")
    }
];

export const mockDonaciones: Donacion[] = [
    {
        id: "don-1",
        causaId: "causa-1",
        usuarioId: "usr-1",
        monto: 50.00,
        moneda: "USD",
        estado: EstadoDonacion.COMPLETADA,
        nombreDonante: "Usuario Público",
        emailDonante: "publico@example.com",
        ip: "192.168.1.100",
        pais: "Colombia",
        ciudad: "Bogotá",
        creadoEn: new Date("2026-02-05"),
        causa: mockCausas[0]
    },
    {
        id: "don-2",
        causaId: "causa-2",
        usuarioId: "usr-1",
        monto: 100.00,
        moneda: "USD",
        estado: EstadoDonacion.COMPLETADA,
        nombreDonante: "Usuario Público",
        emailDonante: "publico@example.com",
        ip: "192.168.1.100",
        pais: "Colombia",
        ciudad: "Bogotá",
        creadoEn: new Date("2026-01-20"),
        causa: mockCausas[1]
    }
];

// ==================== FUNCIONES HELPER ====================

export function getEncuestaBySlug(slug: string): Encuesta | undefined {
    return mockEncuestas.find(e => e.slug === slug);
}

export function getEncuestasActivas(): Encuesta[] {
    return mockEncuestas.filter(e => e.activa);
}

export function getVotosByUsuario(usuarioId: string): Voto[] {
    return mockVotos.filter(v => v.usuarioId === usuarioId);
}

export function getDonacionesByUsuario(usuarioId: string): Donacion[] {
    return mockDonaciones.filter(d => d.usuarioId === usuarioId);
}

export function getResultadosByEncuesta(encuestaId: string): Resultado[] {
    return mockResultados.filter(r => r.encuestaId === encuestaId);
}
