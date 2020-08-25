var callback = function (results) {
    // ToDo: Do something with the image urls (found in results[0])
    var dict = {};
    for(var i = 0; i<results[0].length; i++){
        dict["url" + i] = results[0][i];
    }
    console.log(dict);


    
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/steganalysis/detect/",
        data: dict,
        success: function(msg){
          console.log(msg);
          alert("Scraping Complete!");
          //alert(msg['Creation Time']);
          //alert(alert['Contrast']);
          //var exif = JSON.stringify(msg);
          document.getElementById("orignal_user_image").removeAttribute('src');
          document.getElementById("orignal_user_image").style.visibility = "hidden";
          document.getElementById("exif_data").innerHTML = '';

          document.getElementById("images").innerHTML = '';


          const keys = [];
          for (var key in msg) {
            if (msg.hasOwnProperty(key)) {
                //console.log(key+exif[key]);
                keys.push(key);
            }
          }
          
          for(var i = 0; i<results[0].length; i++){
            //dict["url" + i] = results[0][i];
            var img = document.createElement( 'img' );
            img.style.width = "30%";
            img.style.height = "30%";
            img.setAttribute( 'src', results[0][i] );
            document.getElementById("images").appendChild( img );
            
            var text = document.createElement( 'p' );
            text.style.fontWeight = "bold";
            text.innerHTML = '<pre>' + JSON.stringify(msg[keys[i]], null, 2) + '</pre>';
            document.getElementById("images").appendChild( text );
            //text.innerHTML = '<pre>' + JSON.stringify(Object.values(msg), null, 2) + '</pre>';
          }
          
        },
        error: function(){
          console.log("Error Occured!");
        }
    });
    //$.post("http://127.0.0.1:8000/steganalysis/detect/",
    //{myJSON},
    //function(data,status){
      //alert("Success");
    //});
    
};
//WEB SCRAPE
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("scraper").addEventListener("click", handler);
  });

function handler() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'Array.prototype.map.call(document.images, function (i) { return i.src; });'
        }, callback);
    });
  }

//USER IMAGES
document.addEventListener('change', (event) => {
  document.getElementById('file-selector');
  const fileList = event.target.files;
  console.log(fileList[0]);

  var fd = new FormData();
  fd.append('image', fileList[0])
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/steganalysis/detect/",
    data: fd,
    processData: false,
    contentType: false,
    success: function(msg){
        console.log(msg);
        //alert(msg['Creation Time']);
        //alert(alert['Contrast']);
        //var exif = JSON.stringify(msg, null, 2);
        document.getElementById("images").innerHTML = '';
        document.getElementById("orignal_user_image").style.visibility = "visible";


        document.getElementById("exif_data").innerHTML = '<pre>' + JSON.stringify(msg, null, 2) + '</pre>';

        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('orignal_user_image');
          output.src = dataURL;
        };
        reader.readAsDataURL(fileList[0]);
        //document.getElementById("test").src = data;
   },
   error: function(){
        console.log("Error Occured!");
   }
 });

  //var reader = new FileReader();
  //reader.onload = function(){
    //var hello = reader.result;
    //console.log(hello);
  //};
  //reader.readAsDataURL(event.target.files[0]);
});




document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("view_btn").addEventListener("click", myFunction);
});
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

}


