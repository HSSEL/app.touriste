import express from 'express'
import { getUtilisateurs, getLogin } from '../controllers/connexionRouter'

const utilisateurRouter = express.Router()

utilisateurRouter.get("/Utilisateurs", async (req, res) => {
    const utilisateurs = await getUtilisateurs()
    res.send(utilisateurs)
})

utilisateurRouter.post('/auth', async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email && password) {
        const utilisateur = await getLogin(email, password)

        if (utilisateur) {
            if (utilisateur.type === 'touriste') {
                res.sendFile(path.join(__dirname, '../chemin/vers/Home.jsx'));
            } else if (utilisateur.type === 'etablissement') {
                res.sendFile(path.join(__dirname, '../chemin/vers/interface_etablissement.html'));
            }
        } else {
            res.send('Incorrect Email and/or Password!')
        }
    } else {
        res.send('Please enter Email and Password!')
    }
})

export { utilisateurRouter }
