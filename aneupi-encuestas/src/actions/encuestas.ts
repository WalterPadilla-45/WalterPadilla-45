// src/actions/encuestas.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Tipos de datos que vienen del formulario
interface OpcionInput {
  texto: string;
}

interface PreguntaInput {
  texto: string;
  tipo: 'OPCION_MULTIPLE' | 'TEXTO_ABIERTO' | 'CALIFICACION';
  opciones: OpcionInput[];
}

interface EncuestaInput {
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  preguntas: PreguntaInput[];
}

export async function guardarEncuestaAction(data: EncuestaInput) {
  try {
    // 1. Buscamos automáticamente al Admin para asignarle la encuesta
    // (Como corriste el seed, seguro existe uno)
    const admin = await prisma.usuario.findFirst({
        where: { rol: 'SUPER_USUARIO' }
    });

    if (!admin) {
        return { success: false, message: "No hay Super Usuario en la Base de Datos. Corre el seed primero." };
    }

    // 2. Guardamos la encuesta en la BD
    await prisma.encuesta.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        slug: data.titulo.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
        creadorId: admin.id,
        
        // Creamos preguntas y opciones anidadas
        preguntas: {
          create: data.preguntas.map((pregunta, indexPregunta) => ({
            texto: pregunta.texto,
            tipo: pregunta.tipo,
            orden: indexPregunta + 1,
            opciones: {
              create: pregunta.opciones.map((opcion, indexOpcion) => ({
                texto: opcion.texto,
                orden: indexOpcion + 1
              }))
            }
          }))
        }
      }
    });

    // 3. Actualizamos el dashboard para que salga la nueva encuesta
    revalidatePath('/admin/dashboard');
    
    return { success: true, message: "Encuesta creada correctamente" };

  } catch (error) {
    console.error("Error al guardar:", error);
    return { success: false, message: "Error interno del servidor" };
  }
}