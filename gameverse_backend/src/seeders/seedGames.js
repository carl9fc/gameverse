// ...existing code...
const sequelize = require('../config/db');
const { Game } = require('../models');

const games = [
  {
    title: 'RPG: Leyenda Oscura',
    genre: 'RPG',
    platform: 'PC',
    description: 'Una épica aventura en un mundo oscuro y mágico.',
    developer: 'Dark Studios',
    releaseDate: new Date('2023-05-15'),
    coverUrl: 'https://images.unsplash.com/photo-1538481143235-5d440e7b0c1b?w=800&h=600&fit=crop'
  },
  {
    title: 'Puzzle Mente',
    genre: 'Puzzle',
    platform: 'Switch',
    description: 'Desafía tu mente con puzzles innovadores.',
    developer: 'Puzzle Games Inc',
    releaseDate: new Date('2023-08-20'),
    coverUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop'
  },
  {
    title: 'Estrategia Medieval',
    genre: 'Estrategia',
    platform: 'PC',
    description: 'Conquista reinos en este juego de estrategia épico.',
    developer: 'Medieval Games',
    releaseDate: new Date('2023-10-10'),
    coverUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop'
  },
  {
    title: 'Carrera Turbo X',
    genre: 'Carreras',
    platform: 'PS5',
    description: 'Carreras de velocidad a máxima emoción.',
    developer: 'Speed Racing Co',
    releaseDate: new Date('2023-12-01'),
    coverUrl: 'https://images.unsplash.com/photo-1552105954-5fefe8c9ef14?w=800&h=600&fit=crop'
  },
  {
    title: 'Aventura Estelar',
    genre: 'Aventura',
    platform: 'PC',
    description: 'Explora el universo en una aventura sin fin.',
    developer: 'Space Adventures',
    releaseDate: new Date('2024-01-15'),
    coverUrl: 'https://images.unsplash.com/photo-1556156653-af4f1ec6e49e?w=800&h=600&fit=crop'
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB conectada');

    // Trunca reviews y games en una sola operación para evitar error por FK
    await sequelize.query('TRUNCATE TABLE "reviews", "games" RESTART IDENTITY CASCADE;');
    console.log('🧹 Tables truncated (reviews, games)');

    // Inserta los juegos
    await Game.bulkCreate(games);
    console.log('✅ Games seeded');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
}

seed();
