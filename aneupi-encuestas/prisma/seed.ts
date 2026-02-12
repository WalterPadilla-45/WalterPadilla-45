import { PrismaClient, Rol, TipoPregunta, EstadoDonacion } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. USUARIOS (10 registros)
  const usuariosData = [
    { email: 'admin@empresa.com', nombre: 'Carlos Admin', rol: Rol.SUPER_USUARIO },
    { email: 'socio1@empresa.com', nombre: 'Ana Inversora', rol: Rol.ACCIONISTA },
    { email: 'socio2@empresa.com', nombre: 'Beatriz Accionista', rol: Rol.ACCIONISTA },
    { email: 'user1@test.com', nombre: 'Juan Perez', rol: Rol.PUBLICO },
    { email: 'user2@test.com', nombre: 'Maria Garcia', rol: Rol.PUBLICO },
    { email: 'user3@test.com', nombre: 'Pedro Lopez', rol: Rol.PUBLICO },
    { email: 'user4@test.com', nombre: 'Lucia Sanz', rol: Rol.PUBLICO },
    { email: 'user5@test.com', nombre: 'Roberto Diaz', rol: Rol.PUBLICO },
    { email: 'user6@test.com', nombre: 'Elena Mora', rol: Rol.PUBLICO },
    { email: 'user7@test.com', nombre: 'Marcos Ruiz', rol: Rol.PUBLICO },
  ];

  for (const u of usuariosData) {
    await prisma.usuario.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: 'password_hash_placeholder' }
    });
  }

  const usuarios = await prisma.usuario.findMany();
  const adminId = usuarios.find(u => u.rol === 'SUPER_USUARIO')?.id || usuarios[0].id;

  // 2. CAUSAS DE DONACION (5 registros)
  const causas = [];
  for (let i = 1; i <= 5; i++) {
    const causa = await prisma.causaDonacion.create({
      data: {
        titulo: `Causa Social ${i}`,
        descripcion: `Descripcion detallada para la causa numero ${i}`,
        activa: true,
        imagen: `https://picsum.photos/seed/causa${i}/400/300`
      }
    });
    causas.push(causa);
  }

  // 3. ENCUESTAS (5 registros)
  const encuestas = [];
  for (let i = 1; i <= 5; i++) {
    const encuesta = await prisma.encuesta.create({
      data: {
        titulo: `Encuesta de Satisfaccion ${i}`,
        descripcion: `Evaluacion del periodo numero ${i}`,
        slug: `encuesta-satisfaccion-${i}`,
        creadorId: adminId,
        activa: true,
      }
    });
    encuestas.push(encuesta);
  }

  // 4. PREGUNTAS Y OPCIONES (10 preguntas en total)
  for (const encuesta of encuestas) {
    await prisma.pregunta.create({
      data: {
        texto: "¿Como califica el servicio?",
        tipo: TipoPregunta.CALIFICACION,
        orden: 1,
        minValor: 1,
        maxValor: 5,
        encuestaId: encuesta.id
      }
    });

    const preguntaMultiple = await prisma.pregunta.create({
      data: {
        texto: "¿Cual es su categoria favorita?",
        tipo: TipoPregunta.OPCION_MULTIPLE,
        orden: 2,
        encuestaId: encuesta.id,
        opciones: {
          create: [
            { texto: "Tecnologia", orden: 1 },
            { texto: "Salud", orden: 2 },
            { texto: "Educacion", orden: 3 }
          ]
        }
      }
    });
  }

  // 5. DONACIONES (10 registros)
  const paises = ['Mexico', 'España', 'Argentina', 'Colombia', 'Chile'];
  for (let i = 1; i <= 10; i++) {
    await prisma.donacion.create({
      data: {
        causaId: causas[Math.floor(Math.random() * causas.length)].id,
        usuarioId: usuarios[Math.floor(Math.random() * usuarios.length)].id,
        monto: Math.floor(Math.random() * 100) + 10,
        moneda: "USD",
        estado: EstadoDonacion.COMPLETADA,
        pais: paises[Math.floor(Math.random() * paises.length)],
        nombreDonante: `Donante Anonimo ${i}`
      }
    });
  }

  // 6. VOTOS (10 registros)
  for (let i = 1; i <= 10; i++) {
    await prisma.voto.create({
      data: {
        encuestaId: encuestas[Math.floor(Math.random() * encuestas.length)].id,
        usuarioId: usuarios[Math.floor(Math.random() * usuarios.length)].id,
        fingerprint: `fp_raw_data_${i}_${Math.random()}`,
        ip: `192.168.1.${i}`,
        pais: "Mexico",
        respuestas: {
          pregunta_1: Math.floor(Math.random() * 5) + 1,
          pregunta_2: "Tecnologia"
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });