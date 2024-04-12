const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const hostname = "0.0.0.0";

app.use(bodyParser.json());

// Basic Bootstrap HTML template
function bootstrapTemplate(bodyContent) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>hall booking</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            ${bodyContent}
        </div>
    </body>
    </html>
    `;
}

// Create a room
app.post('/rooms', (req, res) => {
    const room = req.body;
    rooms.push(room);
    res.status(201).send(room);
});

// Book a room
app.post('/bookings', (req, res) => {
    const booking = req.body;
    bookings.push(booking);
    res.status(201).send(booking);
});

// List all rooms with bookings
app.get('/rooms', (req, res) => {
    const roomsWithBookings = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId === room.id);
        return { ...room, bookings: roomBookings };
    });
    const roomList = roomsWithBookings.map(room => `<div class="card"><div class="card-body">${room.name} - Bookings: ${room.bookings.length}</div></div>`).join('');
    res.send(bootstrapTemplate(roomList));
});

// List all customers with bookings
app.get('/customers', (req, res) => {
    const customers = {};
    bookings.forEach(booking => {
        if (!customers[booking.name]) {
            customers[booking.name] = [];
        }
        customers[booking.name].push(booking);
    });
    const customerList = Object.keys(customers).map(customer => `<div class="card"><div class="card-body">${customer} - Bookings: ${customers[customer].length}</div></div>`).join('');
    res.send(bootstrapTemplate(customerList));
});

// List booking history for a customer
app.get('/customers/:name', (req, res) => {
    const customerName = req.params.name;
    const customerBookings = bookings.filter(booking => booking.customerName === customerName);
    const bookingList = customerBookings.map(booking => `<div class="card"><div class="card-body">${booking.roomId} - ${booking.date}</div></div>`).join('');
    res.send(bootstrapTemplate(bookingList));
});

app.listen(PORT, hostname, () => {
    console.log(`Server is running on port ${PORT}`);
});
