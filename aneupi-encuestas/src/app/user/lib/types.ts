/**
 * Tipos TypeScript basados en el schema de Prisma
 * Estos tipos deben coincidir exactamente con la base de datos
 */

// ==================== ENUMS ====================

export enum Rol {
    SUPER_USUARIO = "SUPER_USUARIO",
    ACCIONISTA = "ACCIONISTA"
}

export enum TipoPregunta {
    OPCION_MULTIPLE = "OPCION_MULTIPLE",
    TEXTO_ABIERTO = "TEXTO_ABIERTO",
    CALIFICACION = "CALIFICACION"
}

export enum EstadoDonacion {
    PENDIENTE = "PENDIENTE",
    COMPLETADA = "COMPLETADA",
    FALLIDA = "FALLIDA"
}

export enum EstadoEncuesta {
    ACTIVA = "ACTIVA",
    CERRADA = "CERRADA",
    PROXIMA = "PROXIMA"
}

export enum CategoriaEncuesta {
    GOBIERNO_CORPORATIVO = "GOBIERNO_CORPORATIVO",
    FINANCIERA = "FINANCIERA",
    ESTRATEGIA = "ESTRATEGIA",
    OPERACIONES = "OPERACIONES",
    RRHH = "RRHH",
    OTRA = "OTRA"
}

// ==================== MODELOS ====================

export interface Usuario {
    id: string;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    nombre: string | null;
    rol: Rol;
    creadoEn: Date;
}

export interface Encuesta {
    id: string;
    titulo: string;
    descripcion: string | null;
    slug: string;
    activa: boolean;
    categoria: CategoriaEncuesta;
    estado: EstadoEncuesta;
    fechaInicio: Date;
    fechaFin: Date | null;
    creadorId: string;
    creadoEn: Date;
    actualizadoEn: Date;
    preguntas?: Pregunta[];
    votos?: Voto[];
    resultados?: Resultado[];
}

export interface Pregunta {
    id: string;
    texto: string;
    tipo: TipoPregunta;
    orden: number;
    obligatoria: boolean;
    minValor: number | null;
    maxValor: number | null;
    encuestaId: string;
    opciones?: Opcion[];
}

export interface Opcion {
    id: string;
    texto: string;
    orden: number;
    preguntaId: string;
}

export interface Voto {
    id: string;
    encuestaId: string;
    usuarioId: string | null;
    fingerprint: string;
    ip: string | null;
    pais: string | null;
    ciudad: string | null;
    dispositivo: string | null;
    respuestas: Record<string, any>; // JSON
    creadoEn: Date;
}

export interface Resultado {
    id: string;
    encuestaId: string;
    preguntaId: string;
    opcionId: string | null;
    total: number;
}

export interface CausaDonacion {
    id: string;
    titulo: string;
    descripcion: string | null;
    imagen: string | null;
    activa: boolean;
    creadoEn: Date;
}

export interface Donacion {
    id: string;
    causaId: string;
    usuarioId: string | null;
    monto: number;
    moneda: string;
    estado: EstadoDonacion;
    nombreDonante: string | null;
    emailDonante: string | null;
    ip: string | null;
    pais: string | null;
    ciudad: string | null;
    creadoEn: Date;
    causa?: CausaDonacion;
}

// ==================== TIPOS AUXILIARES ====================

export interface RespuestaEncuesta {
    preguntaId: string;
    valor: string | number;
}

export interface FormularioVoto {
    encuestaId: string;
    respuestas: RespuestaEncuesta[];
    fingerprint: string;
}
