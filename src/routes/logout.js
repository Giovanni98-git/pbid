module.exports = (app) =>{
    app.get("/api/logout", (req, res) => {
        res.clearCookie('usertoken')
        res.send("fin de connexion")
    })
}