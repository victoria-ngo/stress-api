import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST route to insert stress level data
router.post('/student_stress_levels', async (req, res) => {
  try {
    const data = req.body;

    // Convert all numeric fields from strings → integers
    const convertedData = {
      How_many_times_a_week_do_you_suffer_headaches___: parseInt(data.How_many_times_a_week_do_you_suffer_headaches___),
      How_many_times_a_week_you_practice_extracurricular_activities___: parseInt(data.How_many_times_a_week_you_practice_extracurricular_activities___),
      How_would_you_rate_you_academic_performance_____: parseInt(data.How_would_you_rate_you_academic_performance_____),
      How_would_you_rate_your_stress_levels_: parseInt(data.How_would_you_rate_your_stress_levels_),
      Kindly_Rate_your_Sleep_Quality__: parseInt(data.Kindly_Rate_your_Sleep_Quality__),
      how_would_you_rate_your_study_load_: parseInt(data.how_would_you_rate_your_study_load_),
      Timestamp: new Date().toISOString()

    };

    const newEntry = await prisma.student_stress_levels.create({
      data: convertedData
    });

    res.json({ success: true, data: newEntry });

  } catch (error) {
    console.error('❌ ERROR inserting student stress data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// GET route to fetch all entries
router.get('/student_stress_levels', async (req, res) => {
  try {
    const results = await prisma.student_stress_levels.findMany();
    res.json(results);
  } catch (error) {
    console.error('❌ ERROR fetching student stress data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;

