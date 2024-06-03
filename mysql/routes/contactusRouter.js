import express from 'express';
import { getContactusAll, getContactus, createContactus } from '../controllers/contactusController.js';

const router = express.Router();

// Route pour obtenir tous les messages de contact
router.get('/contactus', async (req, res) => {
    try {
        const contacts = await getContactusAll();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un message de contact par ID
router.get('/contactus/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await getContactus(id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau message de contact
router.post('/contactus', async (req, res) => {
    const { nom, email, text } = req.body;
    try {
        const insertId = await createContactus(nom, email, text);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {contactusRouter}