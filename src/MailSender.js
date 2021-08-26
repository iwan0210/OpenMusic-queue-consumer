const nodemailer = require('nodemailer')

class MailSender {
    constructor () {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            post: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }

    sendEmail (targetEmail, content) {
        const message = {
            from: 'OpenMusic',
            to: targetEmail,
            subject: 'Export Playlist Lagu',
            text: 'Terlampir hasil dari ekspor playlist lagu',
            attachments: [
                {
                    filename: 'PlaylistSongs.json',
                    content
                }
            ]
        }

        return this._transporter.sendMail(message)
    }
}

module.exports = MailSender
