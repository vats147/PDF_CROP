const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
//     disable my file input
    uploadFile(fileName);
  }
}


// clear my li tag 
function clearArea(){
       let areaChild = uploadedArea.children;
       for(let i = 0; i < areaChild.length; i++){
         areaChild[i].classList.add("selected");
         setTimeout(()=>{
           areaChild[areaChild.length-1].remove();
         }, 500);
       }
     }
function uploadFile(name){
  
       // on upload button click event listner
       // let uploadBtn = document.querySelector(".upload-btn");
       // uploadBtn.addEventListener("click", () => {

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:5000/");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    clearArea();
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
  xhr.onload = ()=>{
         if(xhr.readyState === XMLHttpRequest.DONE){
           if(xhr.status === 200){
             let data = xhr.response;
            //  browser.downloads.download({url: "pypdf-output2.pdf"})


            // var file=window.URL.createObjectURL(data);
            
       //accept pdf file as a  response and download it automatically
                
                    //  console.log("HELLO");
                       let blob = new Blob([data]);
                       console.log(blob);
                             let link = document.createElement('a');
                                   link.href = window.URL.createObjectURL(data);
                                  //  console.log(link.href);
                                   link.download = "pypdf-output2.pdf";
                                   console.log(link);
                                   link.click();
                       link.remove();
                
       // let download_href = data;


       //       let download_href =xhr.response;

       //      window.location.href = download_href;
       //      manualDownloadLink.href = download_href; 
             console.log(data);
           }
       }
}

// });
}



// remove old file content when new is uploaded



// download data 
const download = document.querySelector('.download-btn');
const countdown = document.querySelector('.countdown');
const pleaseWaitText = document.querySelector('.pleaseWait-text');
const manualDownloadText = document.querySelector('.manualDownload-text');
const manualDownloadLink = document.querySelector('.manualDownload-link');
// var timeLeft = 10;

download.addEventListener('click', () => {

//   download.style.display = "none";
//   countdown.innerHTML = `Download will begin automatically in <span>${timeLeft}</span> seconds`;
  
  

//       pleaseWaitText.style.display = "block";
      let download_href = "https://drive.google.com/uc?export=download&id=16rTAYacGftyvTG1q2Edxnr7fXlurJwGy";

      window.location.href = download_href;
            manualDownloadLink.href = download_href; 


     
    
  
});