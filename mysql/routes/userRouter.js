/**
 * Au niveau des fichiers du dossier routes nous definissons des routes pour gerer des operations 
 * mentionnees au niveau des controllers
 * cela permet de diviser notre application en modules logiques et de mieux organiser notre code
 * 
 * req.body : Contient les données envoyées par le client dans le corps de la requête.
 * 
 * Utilise writeHead pour écrire les en-têtes de la réponse HTTP
        Le code de statut 200 indique que la requête a réussi
        Content-Type indique ici que le contenu de la reponse est une image png

    La réponse est envoyée avec un code de statut 404 (Not Found) et le message "Image not found
    Envoie une réponse HTTP avec le statut 201 (Created)

    res.end(image, 'binary');
     image est le contenu binaire de l'image récupérée de la base de données
    
*/

import express from 'express';
import { 
    getUtilisateurs, 
    getLogin, 
    updateUtilisateur, 
    getUtilisateurMdp, 
    getUtilisateurEmail, 
    register, 
    login 
} from '../controllers/userController.js';

const utilisateurRouter = express.Router();

// Route pour récupérer tous les utilisateurs
utilisateurRouter.get("/Utilisateurs", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const utilisateurs = await getUtilisateurs();
    res.send(utilisateurs);
});

// Route pour l'authentification des utilisateurs
utilisateurRouter.post('/auth', async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        const utilisateur = await getLogin(email, password);

        if (utilisateur) {
            if (utilisateur.isEstablishment === 1) {
                res.sendFile(path.join(__dirname, '../Front-end/guide-touristique/src/Pages/Home.jsx'));
            } else {
                res.sendFile(path.join(__dirname, '../Front-end/guide-touristique/src/Pages/Home.jsx'));
            }
        } else {
            res.send('Incorrect Email and/or Password!');
        }
    } else {
        res.send('Please enter Email and Password!');
    }
});

// Route pour récupérer le mot de passe d'un utilisateur par son ID
utilisateurRouter.get('/Password/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const userPassword = await getUtilisateurMdp(id);
        if (userPassword) {
            res.status(200).json(userPassword);
        } else {
            res.status(404).send('User not found');
        }
    } catch(error) {
        console.error('Error retrieving password:', error);
        res.status(500).send('Internal server error');
    }
});

// Route pour récupérer l'email d'un utilisateur par son ID
utilisateurRouter.get('/Email/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const userEmail = await getUtilisateurEmail(id);
        if (userEmail) {
            res.status(200).json(userEmail);
        } else {
            res.status(404).send('User not found');
        }
    } catch(error) {
        console.error('Error retrieving email:', error);
        res.status(500).send('Internal server error');//500 pour erreur
    }
});

// Route pour mettre à jour le mot de passe d'un utilisateur
utilisateurRouter.put("/Password/:id", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).send('New password is required');
    }

    try {
        const updated = await updateUtilisateur(req.params.id, { password: newPassword });
        if (updated) {
            res.status(200).send('Password updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Internal server error');
    }
});

// Routes pour l'inscription et la connexion
utilisateurRouter.post('/register', register);
utilisateurRouter.post('/login', login);

export { utilisateurRouter };
