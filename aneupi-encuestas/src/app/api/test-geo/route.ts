// src/app/api/test-geo/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getGeoByIp } from '@/lib/geo'; // Importamos tu función nueva

export async function GET() {
  // 1. Obtener la IP real del usuario desde las cabeceras
  const headersList = await headers(); // IMPORTANTE: en Next 15+ headers() es asíncrono, usa await
  
  // 'x-forwarded-for' es el estándar para ver la IP real detrás de proxys
  let ip = headersList.get('x-forwarded-for') || '127.0.0.1';
  
  // A veces x-forwarded-for viene con varias IPs (ej: "192.168.1.1, 10.0.0.1")
  // Tomamos la primera que es la del cliente real.
  if (ip.includes(',')) {
    ip = ip.split(',')[0];
  }

  // 2. Llamar a tu función de magia
  const geoInfo = await getGeoByIp(ip);

  // 3. Responder en formato JSON
  return NextResponse.json({
    mensaje: "Prueba de Geolocalización",
    datos_detectados: geoInfo
  });
}