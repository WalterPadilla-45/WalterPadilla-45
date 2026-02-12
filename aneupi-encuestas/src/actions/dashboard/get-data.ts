'use server'

import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  try {
    // 1. Obtener contadores generales
    const totalEncuestas = await prisma.encuesta.count();
    const totalVotos = await prisma.voto.count();
    const encuestasActivas = await prisma.encuesta.count({
      where: { activa: true }
    });
    const votosPorCiudad = await prisma.voto.groupBy({
      by: ['ciudad'],
      _count: { _all: true }
    });
    // 2. Obtener lista de encuestas con sus preguntas y opciones
    const encuestas = await prisma.encuesta.findMany({
      orderBy: { creadoEn: 'desc' },
      include: {
        preguntas: {
          orderBy: { orden: 'asc' },
          include: {
            opciones: {
              orderBy: { orden: 'asc' }
            }
          }
        }
      }
    });
    // Convertir array de Prisma a Objeto para el Mapa
    const mapaData = votosPorCiudad.reduce((acc, curr) => {
      if (curr.ciudad) acc[curr.ciudad] = curr._count._all;
      return acc;
    }, {} as Record<string, number>);
    // 3. Obtener resultados agrupados (Para los gráficos)
    const resultadosRaw = await prisma.resultado.findMany();

    return {
      success: true,
      metrics: {
        totalEncuestas,
        totalVotos,
        encuestasActivas,
        mapaData,
      },
      encuestas,
      resultados: resultadosRaw,
      latestVotes: (await prisma.voto.findMany({
        take: 10,
        orderBy: { creadoEn: 'desc' },
        select: {
          id: true,
          creadoEn: true,
          ip: true,
          usuarioId: true,
          fingerprint: true
        }
      })).map(v => ({
        id: v.id,
        shareholderId: v.usuarioId || v.fingerprint || 'Anónimo',
        date: v.creadoEn.toISOString(),
        status: 'valid' as const,
        ipAddress: v.ip || 'N/A'
      })),
      highlights: [
        {
          questionNumber: 'Q1',
          questionText: '¿Aprueba la distribución de dividendos del Q4 propuesto por la junta?',
          type: 'distribution',
          data: [
            { label: 'A Favor', votes: 930, percentage: 75.0, color: '#004563' },
            { label: 'En Contra', votes: 186, percentage: 15.0, color: '#eab356' },
            { label: 'Abstención', votes: 124, percentage: 10.0, color: '#9ca3af' }
          ]
        },
        {
          questionNumber: 'Q2',
          questionText: 'Elección de Miembros de la Junta Directiva (Siguiente Periodo)',
          type: 'columns',
          data: [
            { label: 'Opción A', votes: 450, percentage: 45, color: '#e5e7eb' },
            { label: 'Opción B', votes: 800, percentage: 80, color: '#eab356' },
            { label: 'Opción C', votes: 200, percentage: 20, color: '#e5e7eb' }
          ]
        }
      ]
    };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, error: "Error al cargar datos" };
  }
}