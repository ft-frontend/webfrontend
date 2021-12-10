import api from "../../api/api";
import i18n from "i18next";




 function traverseFileTree(item, path,currentCloudPath) {


      return new Promise(resolve => {
          let files = [];

          path = path || "";
          if (item.isFile) {
              // Get file
              item.file(function(file) {

                  if(path.slice(0,-1).length===0) {
                      file.path = currentCloudPath;
                  }else{
                      file.path = currentCloudPath+"/"+path.slice(0,-1)
                  }

                  files.push(file);
                  resolve(files);

              });
          } else if (item.isDirectory) {
              // Get folder contents

              api.createCloudFolder((currentCloudPath+"/"+path).slice(0,-1),item.name).then(()=>{
                  let dirReader = item.createReader();
                    const subFilesAndFolders = [];

                  dirReader.readEntries(function(entries) {
                      for (let i=0; i<entries.length; i++) {
                          subFilesAndFolders.push(traverseFileTree(entries[i], path + item.name + "/",currentCloudPath))
                      }

                      Promise.all(subFilesAndFolders).then((results)=>{

                          results.forEach(collectedFiles=>{

                              files.push(...collectedFiles);
                          })

                          resolve(files);
                      })

                  });

              })


          }

      })


}

function uploadFiles(files){
    return new Promise(async (resolve) => {


        for (const file of files) {

            await api.uploadCloudFile(file.path, file);

        }

        resolve();

    })

}

const uploadHandler = {

    handleFileUpload: function (items,uploadPath) {
      return new Promise(resolve=>{
          let time = performance.now();
          window.onbeforeunload = function(){
              return i18n.t('uploadProcessing');
          };
          console.log("starting creating folder structure")
          for (let i=0; i<items.length; i++) {
              // webkitGetAsEntry is where the magic happens
              const item = items[i].webkitGetAsEntry();
              if (item) {
                  traverseFileTree(item,undefined,uploadPath).then((foundFiles)=>{
                      console.log((performance.now()-time))
                      console.log("done")
                      console.log(foundFiles)


                      console.log("start file upload")

                      uploadFiles(foundFiles).then(()=>{
                          console.log("fileUploading done")
                          window.onbeforeunload = undefined;
                          resolve();
                      })



                  });

              }
          }
      })
    }


};

export default uploadHandler;