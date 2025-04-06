import express from 'express';
import Form from '../models/FormData.js';
import { sendFormSubmissionEmail } from '../utils/emailService.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, number, watsNumber, service, comments } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !service || !number) {
      return res.status(400).json({ 
        message: '❌ Missing required fields',
        required: ['firstName', 'lastName', 'email', 'service', 'number']
      });
    }

    const newForm = new Form({
      firstName,
      lastName,
      email,
      number,
      watsNumber,
      service,
      comments
    });

    // Save to MongoDB
    await newForm.save();
    
    // Send email notification
    await sendFormSubmissionEmail(req.body);

    res.status(201).json({ message: '✅ Form submitted successfully!' });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

// Route to get all submitted forms
router.get('/submissions', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

// Route to view submissions in browser
router.get('/view', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.send(`
      <html>
        <head>
          <title>Form Submissions</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Form Submissions</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>WhatsApp</th>
              <th>Service</th>
              <th>Comments</th>
              <th>Submitted At</th>
            </tr>
            ${forms.map(form => `
              <tr>
                <td>${form.firstName} ${form.lastName}</td>
                <td>${form.email}</td>
                <td>${form.number}</td>
                <td>${form.watsNumber || 'N/A'}</td>
                <td>${form.service}</td>
                <td>${form.comments || 'N/A'}</td>
                <td>${new Date(form.createdAt).toLocaleString()}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

export default router;
