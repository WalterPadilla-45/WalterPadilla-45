'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Share2, ThumbsUp, Star, Download
} from 'lucide-react';
import { getDashboardData } from '@/actions/dashboard/get-data';

import { KPICardModern } from '@/componentes/user/dashboard/KPICardModern';
import { ChartSection } from '@/componentes/user/dashboard/ChartSection';
import { DonutSection } from '@/componentes/user/dashboard/DonutSection';
import { WaveChartSection } from '@/componentes/user/dashboard/WaveChartSection';
import { MapaEcuador } from '@/componentes/user/dashboard/MapaEcuador';
import { ProvinceStats } from '@/componentes/user/dashboard/ProvinceStats';
import { DateRangePicker } from '@/componentes/user/dashboard/DateRangePicker';
import { RecentVotesTable, VoteRecord } from '@/componentes/user/dashboard/RecentVotesTable';
import { CompletedSurveysSection } from '@/componentes/user/dashboard/CompletedSurveysSection';
import { QuestionResultCard } from '@/componentes/user/dashboard/QuestionResultCard';

// ── Dummy Data ──────────────────────────────────────────────────────

const DUMMY_HIGHLIGHTS = [
  {
    questionNumber: 'Q1',
    questionText: '¿Aprueba la distribución de dividendos del Q4 propuesto por la junta?',
    type: 'distribution' as const,
    data: [
      { label: 'A Favor', votes: 900, percentage: 75.0, color: '#0F3D5E' },
      { label: 'En Contra', votes: 180, percentage: 15.0, color: '#D4AF37' },
      { label: 'Abstención', votes: 120, percentage: 10.0, color: '#9ca3af' },
    ],
  },
  {
    questionNumber: 'Q2',
    questionText: 'Elección de Miembros de la Junta Directiva (Siguiente Período)',
    type: 'columns' as const,
    data: [
      { label: 'Opción A', votes: 100, percentage: 20, color: '#9ca3af' },
      { label: 'Opción B', votes: 200, percentage: 46, color: '#D4AF37' },
      { label: 'Opción C', votes: 80, percentage: 20, color: '#9ca3af' },
    ],
  },
];

const DUMMY_VOTES: VoteRecord[] = [
  {
    id: '1',
    shareholderId: '#ACC-8982',
    date: '2023-10-31T14:22:10',
    status: 'valid',
    ipAddress: '192.168.1.1',
  },
  {
    id: '2',
    shareholderId: '#ACC-1245',
    date: '2023-10-31T14:18:05',
    status: 'valid',
    ipAddress: '187.42.101.5',
  },
  {
    id: '3',
    shareholderId: '#ACC-6832',
    date: '2023-10-31T14:10:50',
    status: 'rejected',
    ipAddress: '152.12.89.2',
  },
];

// ── Interfaces ──────────────────────────────────────────────────────

interface DashboardData {
  metrics: {
    totalVotos: number;
    encuestasActivas: number;
    participacion?: number;
    npsScore?: number;
  };
  encuestas: any[];
  latestVotes: VoteRecord[];
  highlights: any[];
}

// ── Page ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getDashboardData();
        if (res.success && res.metrics) {
          setData({
            metrics: res.metrics,
            encuestas: res.encuestas || [],
            latestVotes: res.latestVotes || [],
            highlights: res.highlights || [],
          } as DashboardData);
        }
      } catch (error) {
        console.error('Error loading dashboard data', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-[#0F3D5E]">
        Cargando Dashboard...
      </div>
    );

  // Use real highlights if available, otherwise fall back to dummy
  const highlights =
    data?.highlights && data.highlights.length > 0 ? data.highlights : DUMMY_HIGHLIGHTS;
  const votes =
    data?.latestVotes && data.latestVotes.length > 0 ? data.latestVotes : DUMMY_VOTES;

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans">

      {/* ── DASHBOARD CONTENT ─────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto p-6 lg:p-8">

        {/* HEADER LOCAL: Título + Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F3D5E]">Dashboard Accionistas</h1>
            <p className="text-sm text-gray-500">
              Reporte ejecutivo de participación y métricas
            </p>
          </div>

        </div>

        {/* ── FILA 1: KPIs ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICardModern
            title="Votos Totales"
            value={data?.metrics?.totalVotos || 18542}
            icon={Users}
            variant="dark"
            subtitle="En período seleccionado"
          />
          <KPICardModern
            title="Encuestas Activas"
            value={data?.metrics?.encuestasActivas || 5}
            icon={Share2}
            variant="light"
            trend="+12%"
          />
          <KPICardModern
            title="Participación"
            value="1,259"
            icon={ThumbsUp}
            variant="light"
            progressBar={{ percentage: 68, color: '#D4AF37' }}
          />
          <KPICardModern
            title="NPS Score"
            value="78"
            icon={Star}
            variant="light"
            subtitle="Nivel: Excelente"
            showStar
          />
        </div>

        {/* ── FILA 2: VOTACIONES EN CURSO (Q1 & Q2) ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {highlights.map((item: any, index: number) => (
            <div key={index} className="h-[380px]">
              <QuestionResultCard
                questionNumber={item.questionNumber}
                questionText={item.questionText}
                type={item.type}
                data={item.data}
              />
            </div>
          ))}
        </div>

        {/* ── FILA 3: AUDITORÍA – TABLA ÚLTIMOS VOTOS ──────────── */}
        <div className="mb-6">
          <RecentVotesTable votes={votes} />
        </div>

        {/* ── FILA 4: GEOGRAFÍA (MAPA + PROVINCIAS) ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 h-[400px]">
            <MapaEcuador />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <ProvinceStats />
          </div>
        </div>

        {/* ── FILA 5: ANALÍTICA (BAR + DONUT) ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 h-[400px]">
            <ChartSection title="Resultados de Votación Global" />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <DonutSection percentage={68} title="Quórum Alcanzado" />
          </div>
        </div>

        {/* ── FILA 6: TENDENCIAS + TOP ENCUESTAS ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 h-[400px]">
            <WaveChartSection title="Tendencia de Votos" />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <CompletedSurveysSection />
          </div>
        </div>

      </div>
    </div>
  );
}