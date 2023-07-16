const { transform } = require('@svgr/core')
const jsx = require('@svgr/plugin-jsx')
const svgo = require('@svgr/plugin-svgo')
const prettier = require('@svgr/plugin-prettier')

module.exports = (req, res) => {
    if (!req.body) {
        res.status(204).send('')
        return
    }
    transform(req.body.code, {
        ...req.body.options,
        plugins: [svgo, jsx, prettier],
    })
        .then((result) => {
            res.status(200).json({ result })
        })
        .catch((error) => {
            res.status(400).json({ error: error.message })
        })
}