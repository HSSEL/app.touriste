import nodemailer from 'nodemailer';

// Fonction pour envoyer l'e-mail de réinitialisation
async function sendResetEmail(email, resetToken) {
  // Créer un transporteur SMTP réutilisable à l'aide des informations SMTP de votre fournisseur de messagerie
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
      user: 'hafssaelmouddne150@gmail.com', // Votre adresse e-mail SMTP
      pass: 'hafssa2002' // Votre mot de passe SMTP
    }
  });

  // Options de l'e-mail
  let mailOptions = {
    from: '"SARINI" <hafssaelmouddne150@gmail.com>', // Adresse e-mail de l'expéditeur
    to: email, // Adresse e-mail du destinataire
    subject: 'Password Reset Request', // Sujet de l'e-mail
    text: `To reset your password, click the following link: http://localhost:3000/reset?token=${resetToken}`, // Corps du message en texte brut
    html: `<p>To reset your password, click the following link: <a href="http://localhost:3000/reset?token=${resetToken}">Reset Password</a></p>` // Corps du message au format HTML
  };

  // Envoyer l'e-mail avec l'objet de transport défini
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

export default sendResetEmail;
