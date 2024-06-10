/* 
Ce composant représente un formulaire de contact.
Il permet à l'utilisateur d'envoyer un message en remplissant les champs de nom, email et message.
*/

import React, { useState } from 'react'; // Import des modules React nécessaires
import axios from 'axios'; // Import du module Axios pour effectuer des requêtes HTTP
import './ContactForm.css'; // Import du fichier CSS pour le style du formulaire

const ContactForm = () => {
  // Déclaration des états pour stocker les valeurs des champs et les messages de succès/erreur
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    try {
      // Envoi de la requête POST avec les données du formulaire vers l'URL spécifiée
      const response = await axios.post('http://localhost:8080/con', { name, email, message });
      setSuccessMessage('Contact form submitted successfully!'); // Mise à jour du message de succès
      setName(''); // Réinitialisation du champ nom
      setEmail(''); // Réinitialisation du champ email
      setMessage(''); // Réinitialisation du champ message
    } catch (error) {
      setErrorMessage('Failed to submit the contact form.'); // Mise à jour du message d'erreur en cas d'échec de la soumission
      console.error('Contact form submission error:', error); // Affichage de l'erreur dans la console
    }
  };

  // Rendu JSX du formulaire de contact
  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Gestionnaire d'événement pour mettre à jour le champ nom
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Gestionnaire d'événement pour mettre à jour le champ email
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Gestionnaire d'événement pour mettre à jour le champ message
            required
          ></textarea>
        </div>
        <button className='button_submit' type="submit">Submit</button> {/* Bouton de soumission du formulaire */}
      </form>
      {/* Affichage du message de succès s'il y en a un */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {/* Affichage du message d'erreur s'il y en a un */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ContactForm; // Export du composant ContactForm
