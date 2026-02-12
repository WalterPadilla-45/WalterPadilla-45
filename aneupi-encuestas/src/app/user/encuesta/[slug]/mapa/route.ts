import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Agrupamos por ciudad (o provincia si añades el campo a tu modelo Voto)
    // Nota: Para que el mapa funcione perfecto, el nombre de la ciudad/provincia
    // en la BD debe coincidir con el del GeoJSON (ej: "Pichincha").
    const votos = await prisma.voto.groupBy({
      by: ["ciudad"],
      where: {
        encuesta: { slug: slug }
      },
      _count: {
        _all: true
      },
    });

    // Transformamos el array a un objeto simple: { "Quito": 10, "Guayaquil": 5 }
    // Asumiendo que el mapa espera nombres de provincias, aquí deberías mapear.
    // Si tu GeoJSON usa provincias, y tu DB ciudades, necesitarás un helper.
    // Por ahora, pasamos la data tal cual.
    const resultadosMap = votos.reduce((acc, curr) => {
      const location = curr.ciudad || "Desconocido";
      acc[location] = curr._count._all;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json(resultadosMap);

  } catch (error) {
    console.error("Error API Mapa:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}