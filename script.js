// Cambia la scheda attiva
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  
  // Funzione di anteprima per la rimozione dello sfondo
  function showPreviewRemove() {
    const fileInput = document.getElementById('fileInputRemove').files[0];
    if (!fileInput) {
      document.getElementById('previewRemove').style.display = 'none';
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const previewImage = document.getElementById('previewImageRemove');
      previewImage.src = event.target.result;
      document.getElementById('previewRemove').style.display = 'block';
    };
    reader.readAsDataURL(fileInput);
  }
  
  // Funzione per rimuovere lo sfondo
  function removeBackground() {
    const fileInput = document.getElementById('fileInputRemove').files[0];
    if (!fileInput) {
      alert("Carica prima un'immagine.");
      return;
    }
  
    document.getElementById('loadingRemove').style.display = 'block';

    const formData = new FormData();
    formData.append('image_file', fileInput);
    formData.append('size', 'auto');
  
    fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'dSmQdsZ4MmcUmbQD2R8Wio1M', // Inserisci la tua API Key di remove.bg
      },
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const outputImage = document.getElementById('outputImageRemove');
      outputImage.src = url;
      const downloadLink = document.getElementById('downloadLinkRemove');
      downloadLink.href = url;
  
      document.getElementById('resultRemove').style.display = 'block';
      document.getElementById('loadingRemove').style.display = 'none';
    })
    .catch(error => {
      console.error('Errore:', error);
      alert('Si è verificato un errore durante la rimozione dello sfondo.');
      document.getElementById('loadingRemove').style.display = 'none';
    });
  }
  
  // Funzione di anteprima per la conversione del formato
  function showPreviewConvert() {
    const fileInput = document.getElementById('fileInputConvert').files[0];
    if (!fileInput) {
      document.getElementById('previewConvert').style.display = 'none';
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const previewImage = document.getElementById('previewImageConvert');
      previewImage.src = event.target.result;
      document.getElementById('previewConvert').style.display = 'block';
    };
    reader.readAsDataURL(fileInput);
  }
  
  // Funzione per convertire il formato dell'immagine
  function convertFile() {
    const fileInput = document.getElementById('fileInputConvert').files[0];
    if (!fileInput) {
      alert("Carica prima un file.");
      return;
    }
  
    const format = document.getElementById('formatSelect').value;
    document.getElementById('loadingConvert').style.display = 'block';
  
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
  
        const outputImage = document.getElementById('outputImageConvert');
        const downloadLink = document.getElementById('downloadLinkConvert');
        
        let mimeType;
        let extension;
  
        switch (format) {
          case 'jpeg':
            mimeType = 'image/jpeg';
            extension = 'jpg';
            break;
          case 'webp':
            mimeType = 'image/webp';
            extension = 'webp';
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            extension = 'bmp';
            break;
          case 'gif':
            mimeType = 'image/gif';
            extension = 'gif';
            break;
          default:
            mimeType = 'image/png';
            extension = 'png';
        }
  
        const dataUrl = canvas.toDataURL(mimeType);
        outputImage.src = dataUrl;
        downloadLink.href = dataUrl;
        downloadLink.download = `converted_image.${extension}`;
  
        document.getElementById('resultConvert').style.display = 'block';
        document.getElementById('loadingConvert').style.display = 'none';
      };
    };
    
    reader.readAsDataURL(fileInput);
  }
  
  // Funzione per eliminare l'immagine e resettare il caricamento
  function clearImage(type) {
    if (type === 'remove') {
      document.getElementById('fileInputRemove').value = '';
      document.getElementById('previewRemove').style.display = 'none';
      document.getElementById('resultRemove').style.display = 'none';
    } else if (type === 'convert') {
      document.getElementById('fileInputConvert').value = '';
      document.getElementById('previewConvert').style.display = 'none';
      document.getElementById('resultConvert').style.display = 'none';
    }
  }
  
  