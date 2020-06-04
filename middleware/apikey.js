const apikey = (req, res, next) => {
    let apikey = req.query.apikey;
    if (!apikey) return res.status(400).json({ msg: 'API key required.' });
    if (apikey != process.env.API_KEY) return res.status(400).json({ msg: 'API key invalid.' });
    next();
}

module.exports = apikey;