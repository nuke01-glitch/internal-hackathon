const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: String,
  description: String,
  photo: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
fetch('/reports')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('report-container');
    data.forEach(report => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${report.location}</h3>
        <p>${report.description}</p>
        <small>${new Date(report.timestamp).toLocaleString()}</small>
      `;
      container.appendChild(card);
    });
  });
