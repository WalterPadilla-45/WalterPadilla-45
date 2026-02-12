// src/lib/geo.ts

/**
 * Interfaz para definir qué datos nos devuelve la geolocalización
 */
export interface GeoData {
  ip: string;
  country: string;
  city: string;
  device?: string; // Lo llenaremos luego
}

/**
 * Función principal para obtener datos geográficos
 */
export async function getGeoByIp(ip: string): Promise<GeoData> {
  
  // 1. MODO DESARROLLO (LOCALHOST)
  // Si estamos trabajando en local, la IP suele ser '::1' o '127.0.0.1'.
  // Las APIs reales no funcionan con estas IPs, así que devolvemos datos falsos de prueba.
  if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.')) {
    console.log('📍 Detectado Localhost: Usando datos falsos de Riobamba');
    return {
      ip: ip,
      country: 'Ecuador',
      city: 'Riobamba (Localhost)',
    };
  }

  // 2. MODO PRODUCCIÓN
  // Usamos una API gratuita llamada 'ip-api.com'. 
  // Es gratis hasta 45 peticiones por minuto (suficiente para pruebas y demos).
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        ip: ip,
        country: data.country || 'Desconocido',
        city: data.city || 'Desconocido',
      };
    } else {
      // Si la API falla, devolvemos genérico
      return { ip, country: 'Desconocido', city: 'Desconocido' };
    }
  } catch (error) {
    console.error('Error obteniendo geo:', error);
    return { ip, country: 'Error', city: 'Error' };
  }
}