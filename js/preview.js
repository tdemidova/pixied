// Самый надежный вариант - Google Model Viewer
window.preview3DModel = function(modelUrl) {
  const previewWindow = window.open('', '_blank', 'width=1000,height=700');
  
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>3D Model Preview</title>
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <style>
        body { 
          margin: 0; 
          background: #0f0f0f; 
          color: white; 
          font-family: Arial;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .header {
          padding: 20px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }
        .viewer-container {
          flex: 1;
          display: flex;
        }
        .info {
          margin: 10px 0;
          color: #ccc;
          text-align: center;
        }
        .download-btn { 
          background: #059669; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 10px; 
          display: inline-block;
        }
        model-viewer {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>3D Model Preview</h2>
        <div class="info">Model: ${modelUrl.split('/').pop()}</div>
        <div>
          <a href="${modelUrl}" class="download-btn" download="model.glb">📥 Download GLB</a>

        </div>
      </div>
      
      <div class="viewer-container">
        <model-viewer 
          src="${modelUrl}"
          alt="3D Model"
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style="width: 100%; height: 100%"
        >
          <div slot="progress-bar"></div>
        </model-viewer>
      </div>
    </body>
    </html>
  `);
  previewWindow.document.close();
};