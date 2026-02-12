"use client"

import React, { useState, useMemo } from 'react';
import geoDataRaw from "@/data/ecuador.geo.json";

const geoData = geoDataRaw as any;

const COLORES = {
  base: "#e5e7eb",
  bajo: "#A8C5D6",
  medio: "#5A8FA8",
  alto: "#0F3D5E",
  destacado: "#D4AF37",
  borde: "#ffffff"
};

interface MapaProps {
  resultados?: Record<string, number>;
}

export function MapaEcuador({ resultados = {} }: MapaProps) {

  const [hovered, setHovered] = useState<string | null>(null);

  const { minLon, maxLon, minLat, maxLat } = useMemo(() => {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;

    if (geoData && geoData.features) {
      geoData.features.forEach((feature: any) => {
        const extractCoords = (geometry: any) => {
          let points: number[][] = [];
          if (geometry.type === 'Polygon') {
            points = geometry.coordinates[0];
          } else if (geometry.type === 'MultiPolygon') {
            geometry.coordinates.forEach((poly: any) => {
              points = points.concat(poly[0]);
            });
          }
          return points;
        };

        const points = extractCoords(feature.geometry);
        points.forEach((p: number[]) => {
          const [lon, lat] = p;
          if (lon < minLon) minLon = lon;
          if (lon > maxLon) maxLon = lon;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        });
      });
    }

    if (minLon === Infinity) return { minLon: -81, maxLon: -75, minLat: -5, maxLat: 2 };

    return { minLon, maxLon, minLat, maxLat };
  }, []);

  const width = 800;
  const height = 600;
  const padding = 20;

  const project = (lon: number, lat: number) => {
    const x = ((lon - minLon) / (maxLon - minLon)) * (width - 2 * padding) + padding;
    const y = height - (((lat - minLat) / (maxLat - minLat)) * (height - 2 * padding) + padding);
    return [x, y];
  };

  const generatePath = (geometry: any) => {
    if (geometry.type === 'Polygon') {
      return renderPolygon(geometry.coordinates[0]);
    } else if (geometry.type === 'MultiPolygon') {
      return geometry.coordinates.map((poly: any) => renderPolygon(poly[0])).join(" ");
    }
    return "";
  };

  const renderPolygon = (coords: number[][]) => {
    return coords.map((p, i) => {
      const [x, y] = project(p[0], p[1]);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(" ") + " Z";
  };

  // Highlighted provinces: Pichincha, Guayas, Azuay
  const highlightedProvinces = ['Pichincha', 'Guayas', 'Azuay'];

  const getColor = (nombreProvincia: string) => {
    const safeResultados = resultados || {};
    const votos = safeResultados[nombreProvincia] || 0;

    // If specific results are provided, use them
    if (votos > 0) {
      if (votos > 100) return COLORES.destacado;
      if (votos > 50) return COLORES.alto;
      if (votos > 10) return COLORES.medio;
      return COLORES.bajo;
    }

    // Default: highlight key provinces
    if (nombreProvincia === 'Pichincha') return COLORES.destacado;
    if (nombreProvincia === 'Guayas') return COLORES.alto;
    if (nombreProvincia === 'Azuay') return COLORES.medio;
    return COLORES.base;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl relative p-4 overflow-hidden card-shadow">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[400px] filter drop-shadow-lg">
        {geoData && geoData.features && geoData.features.map((feature: any) => {
          const nombre = feature.properties.nombre;
          const pathD = generatePath(feature.geometry);

          return (
            <path
              key={nombre}
              d={pathD}
              fill={getColor(nombre)}
              stroke={COLORES.borde}
              strokeWidth="1"
              className="transition-all duration-300 hover:brightness-110 cursor-pointer"
              onMouseEnter={() => setHovered(nombre)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 text-center pointer-events-none z-20">
          <p className="text-[#0F3D5E] font-bold text-sm">{hovered}</p>
          <p className="text-[#D4AF37] font-extrabold text-lg">
            {(resultados && resultados[hovered]) ? resultados[hovered] : 0}
            <span className="text-xs text-gray-500 ml-1">votos</span>
          </p>
        </div>
      )}

      <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-lg text-xs shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span> +100 votos
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0F3D5E]"></span> +50 votos
        </div>
      </div>
    </div>
  );
}