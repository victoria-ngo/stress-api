import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// GET first 10 student stress records
router.get('/student_stress_levels', async (req, res) => {
  try {
    const records = await prisma.student_stress_levels.findMany({ take: 10 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// SEARCH by academic performance or stress level
router.get('/search', async (req, res) => {
  const { academicPerformance, stressLevel } = req.query;
  try {
    const records = await prisma.student_stress_levels.findMany({
      where: {
        ...(academicPerformance && { How_would_you_rate_you_academic_performance_____ : parseInt(academicPerformance) }),
        ...(stressLevel && { How_would_you_rate_your_stress_levels_ : parseInt(stressLevel) })
      },
      take: 10
    });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// POST new student stress record
router.post('/student_stress_levels', async (req, res) => {
  try {
    const newRecord = await prisma.student_stress_levels.create({
      data: req.body
    });
    res.json(newRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create record' });
  }
});

// RAW MongoDB query
router.get('/raw', async (req, res) => {
  try {
    const results = await prisma.student_stress_levels.aggregateRaw({
      pipeline: [{ $limit: 10 }]
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Raw query failed' });
  }
});

export default router;
