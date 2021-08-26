require('dotenv').config()
const amqp = require('amqplib')
const PlaylistsService = require('./PlaylistsService')
const MailSender = require('./MailSender')
const Listener = require('./listener');

(async () => {
    const playlistsService = new PlaylistsService()
    const mailSender = new MailSender()
    const listener = new Listener(playlistsService, mailSender)

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
    const channel = await connection.createChannel()

    await channel.assertQueue('export:playlistSongs', {
        durable: true
    })

    channel.consume('export:playlistSongs', listener.listen, { noAck: true })
})()
