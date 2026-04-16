import { connectDatabase } from '../../src/config/database.js';
import { updateReminderStatuses } from '../../src/jobs/reminderJobs.js';

export default async function handler(req, res) {
  // Security: Only allow POST requests
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional: Add authentication token
  const authToken = req.headers['x-cron-token'] || req.query.token;
  if (process.env.CRON_SECRET && authToken !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Connect to database
    await connectDatabase();

    // Update reminder statuses
    await updateReminderStatuses();

    return res.status(200).json({
      success: true,
      message: 'Reminder statuses updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
