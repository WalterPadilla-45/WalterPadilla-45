// src/app/user/encuesta/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/componentes/user/ui/Card';
import { Button } from '@/componentes/user/ui/Button';
import { Spinner } from '@/componentes/user/ui/Spinner';
import { PreguntaRenderer } from '@/componentes/user/encuesta/PreguntaRenderer';
import { getEncuestaBySlug } from '../../lib/mocks';
import { generateFingerprint, hasVoted, recordVote, getAuthUser } from '../../lib/utils';
import { Encuesta } from '../../lib/types';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function EncuestaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [encuesta, setEncuesta] = useState<Encuesta | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});
  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    const enc = getEncuestaBySlug(slug);
    setEncuesta(enc || null);

    if (enc) {
      const fp = generateFingerprint();
      setFingerprint(fp);

      const voted = hasVoted(enc.id, fp);
      setAlreadyVoted(voted);
    }

    setLoading(false);
  }, [slug]);

  const handleRespuestaChange = (preguntaId: string, valor: any) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }));

    if (errores[preguntaId]) {
      setErrores((prev) => ({ ...prev, [preguntaId]: '' }));
    }
  };

  // Valida con soporte para respuestas tipo array (checkbox) si las tienes
  const validateForm = (): { ok: boolean; firstErrorId?: string } => {
    const newErrores: Record<string, string> = {};

    encuesta?.preguntas?.forEach((pregunta) => {
      if (!pregunta.obligatoria) return;

      const r = respuestas[pregunta.id];
      const empty =
        r === '' || r === null || r === undefined || (Array.isArray(r) && r.length === 0);

      if (empty) newErrores[pregunta.id] = 'Esta pregunta requiere una respuesta.';
    });

    setErrores(newErrores);
    const firstErrorId = Object.keys(newErrores)[0];
    return { ok: Object.keys(newErrores).length === 0, firstErrorId };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ok, firstErrorId } = validateForm();
    if (!ok) {
      if (firstErrorId) {
        document
          .getElementById(`pregunta-${firstErrorId}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      if (encuesta) {
        recordVote(encuesta.id, fingerprint);
        setSubmitted(true);
      }
      setSubmitting(false);
    }, 900);
  };

  // =========================
  // ESTADOS
  // =========================
  if (loading) {
    return (
      <div className="container py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!encuesta) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto mb-4 text-[var(--color-error)]" size={48} />
            <h2 className="text-2xl font-semibold text-[var(--color-gray-900)] mb-2">
              Encuesta no encontrada
            </h2>
            <p className="text-[var(--color-gray-600)] mb-6">
              La encuesta que buscas no existe o ha sido eliminada.
            </p>
            <Button onClick={() => router.push('/user')}>Volver al inicio</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (alreadyVoted) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto mb-4 text-[var(--color-success)]" size={48} />
            <h2 className="text-2xl font-semibold text-[var(--color-gray-900)] mb-2">
              Ya has respondido esta encuesta
            </h2>
            <p className="text-[var(--color-gray-600)] mb-6">
              Detectamos que ya has participado en esta encuesta. Gracias por tu colaboración.
            </p>
            <Button onClick={() => router.push('/user')}>Ver otras encuestas</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto mb-4 text-[var(--color-success)]" size={48} />
            <h2 className="text-2xl font-semibold text-[var(--color-gray-900)] mb-2">
              ¡Gracias por tu participación!
            </h2>
            <p className="text-[var(--color-gray-600)] mb-6">
              Tus respuestas han sido registradas exitosamente. Tu opinión es muy valiosa para nosotros.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => router.push('/user')}>
                Ver otras encuestas
              </Button>
              {getAuthUser() ? (
                <Button onClick={() => router.push('/user/panel')}>Ir a mi panel</Button>
              ) : (
                <Button onClick={() => router.push('/user/registro')}>Crear una cuenta</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =========================
  // UI PRINCIPAL
  // =========================
  const isActiva = encuesta.activa && (!encuesta.fechaFin || new Date(encuesta.fechaFin) > new Date());
  const subtitulo = (encuesta as any)?.subtitulo as string | undefined;

  return (
    <div className="py-10">
      <div className="mx-auto w-full max-w-3xl px-4">
        {/* CONTENEDOR TIPO CAPTURA */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white shadow-sm">
          {/* FRANJA SUPERIOR (neutra) */}
          <div className="h-6 bg-[var(--color-gray-100)]" />

          {/* HEADER (usa color institucional, no negro) */}
          <div className="bg-[var(--color-bankBlue)] px-8 py-6">
            <p className="text-white text-xl font-semibold">{encuesta.titulo}</p>
            {subtitulo && <p className="text-white/80 mt-1 text-sm">{subtitulo}</p>}
          </div>

          {/* BODY */}
          <div className="px-8 py-10">
            {/* TITULAR GRANDE */}
            <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[var(--color-bankBlue)]">
              ¡Tu opinión es clave para nosotros!
            </h1>

            {/* DESCRIPCIÓN (solo si existe, sin inventar texto) */}
            {encuesta.descripcion && (
              <p className="mt-6 text-center text-base md:text-lg text-[var(--color-gray-700)] leading-relaxed max-w-2xl mx-auto">
                {encuesta.descripcion}
              </p>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-10">
              {encuesta.preguntas?.map((pregunta) => (
                <div
                  key={pregunta.id}
                  id={`pregunta-${pregunta.id}`}
                  className="pt-2 pb-8 border-b border-[var(--border-color)] last:border-0"
                >
                  <PreguntaRenderer
                    pregunta={pregunta}
                    value={respuestas[pregunta.id]}
                    onChange={(valor) => handleRespuestaChange(pregunta.id, valor)}
                    error={errores[pregunta.id]}
                  />
                </div>
              ))}

              {/* BOTÓN centrado */}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="min-w-[110px] px-10"
                  disabled={submitting || !isActiva}
                >
                  {submitting ? 'Enviando…' : 'Enviar'}
                </Button>
              </div>

              {!isActiva && (
                <p className="text-sm text-center text-[var(--color-error)] font-semibold">
                  Esta encuesta ya no está activa
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
