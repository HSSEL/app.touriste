import express from 'express'
import { getUtilisateurs, getLogin, updateUtilisateur, getUtilisateurMdp, getUtilisateurEmail ,register,login} from '../controllers/userController.js'

const utilisateurRouter = express.Router()

utilisateurRouter.get("/Utilisateurs", async (_req, res) => {
    const utilisateurs = await getUtilisateurs()
    res.send(utilisateurs)
})

utilisateurRouter.post('/auth', async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email && password) {
        const utilisateur = await getLogin(email, password)

        if (utilisateur) {
            if (utilisateur.isEstablishment === true) {
                res.sendFile(path.join(__dirname, '../Front-end\guide-touristique/src/Pages/Home.jsx'));
            } else if (utilisateur.isEstablishment === false) {
                res.sendFile(path.join(__dirname, '../Front-end\guide-touristique/src/Pages/Home.jsx'));
            }
        } else {
            res.send('Incorrect Email and/or Password!')
        }
    } else {
        res.send('Please enter Email and Password!')
    }
})

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
        res.status(500).send('Internal server error');
    }
});


utilisateurRouter.put("/Password/:id", async (req, res) => {
    const {newPassword} = req.body.password;

    if (!newPassword) {
        return res.status(400).send('New password is requires');

    }

    try {
        const updated = await updateUtilisateur(utilisateur_id, newPassword)
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


utilisateurRouter.post('/register', register);
utilisateurRouter.post('/login', login);

export { utilisateurRouter }
