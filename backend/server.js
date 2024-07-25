const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mariachicristiano.canticosalrey@gmail.com',
    pass: 'CanticosalreyOaxaca24'
  }
});

app.post('/send-email', (req, res) => {
  const { fullName, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'mariachicristiano.canticosalrey@gmail.com',
    subject: `Nuevo mensaje de ${fullName}`,
    text: `Has recibido un nuevo mensaje de: ${fullName}\n con número de Teléfono: ${phone}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Correo enviado con éxito');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
