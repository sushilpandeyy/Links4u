//import fetch from 'node-fetch';
url =[]
activetab="links"                                           //tag for storage
let cin=url.length;
let n=0
openn=0

if(localStorage.getItem('links')){                          //IF URL LIST IS ALREADY SAVED
        localStorage.getItem('links')
        const storedBlogs = JSON.parse(localStorage.getItem('links'))
        for(a=0; a<storedBlogs.length; a++){
            url[a]=storedBlogs[a]
        }
        cin=url.length
    Show()
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){     //GETTING VALUE IN VARIABLE
     link.value=tabs[0].url
}) 

const inputBtn = document.getElementById("input-btn")                      //CREATING BUTTON VALUE FOR INPUT
const delbtn = document.getElementById("del-btn")                          //CREATING BUTTON VALYE FOR DELETE
const dellinkbtn = document.getElementById("del-btn-fin")                   //CREATING BUTTON FOR SPECIFIC LINKS


inputBtn.addEventListener("click", function sav(){                         //FUNCTION SAVE AND SHOWING ERROR
    if(document.getElementById("link").value==""){
        document.getElementById('aa').className = "myclass";
    }
    else{
        save()
        document.getElementById('aa').className = "visually-hidden";           
    }
   
})

delbtn.addEventListener("click",function del(){                               //DELETING VALUE
    if(openn==0){
        delbtn.innerText="Close"
    document.getElementById("delboxs").style.display="inline"
    openn=1
    }
    else{
        delbtn.innerText="Delete"
        document.getElementById("delboxs").style.display="none"
        
        openn=0
    }
})

function save(){                                                            //SAVING AND SHOWING 
url[cin]=document.getElementById("link").value;
link.value=""
localStorage.setItem('links', JSON.stringify(url));
cin++
Show()
}

function Show(){                                                           //SHOWING LINKS
    let listItems = ""
        for (let i = 0; i < url.length; i++) 
        {
            if(url[i]=="" || url[i]=="undefined" || url[i]=="null" || url[i]==null){
                continue
            }
            else{
       listItems += `
        <li class="list-group-item">
            <a target='_blank' href='${url[i]}'>
                ${url[i]}
            </a>
        </li>
    `   
        }
        }
        list.innerHTML = listItems
        addlist()
    }

function addlist(){
    let lis=""
    for(let i=0; i<url.length; i++){
        if(url[i]==null){
            continue
        }
        else{
            let newOption = new Option(url[i],url[i]);    //FIRST IS TEXT AND SECOND IS VALUE
        const select = document.querySelector('#select1'); 
        select.add(newOption,undefined);
        }
        
    }
     }
    dellinkbtn.addEventListener("click", function droplink(){              //WHEN OPTION IS CLICKED AND ELEMENT IS REQUESTED TO  REMOVE
        let n=0;
        selectElement = document.querySelector('#select1')
        output = selectElement.value
        console.log(output)
        if(output=='ALL'){
            localStorage.clear('links')
    list.innerHTML = ""
    window.close();
        }
        else{
            const index = url.indexOf(output);
            if (index > -1) {
              url.splice(index, 1);
            }
            save2()
            console.log(url);
            
    }
     })
function save2(){                                                            //WHEN YOU WANT SAVE ARRAY WITHOUT INPUT FIELD
    localStorage.setItem('links', JSON.stringify(url));
    Show()
}

fetch('https://api.airtable.com/v0/app9ffmpPI9qmknJu/tblIfLMswUgTicilF/CE', {
    method: 'PATCH',
    headers: {
        'Authorization': 'Bearer patVMXpQJiaHb9oS9.44ca086d7d3a4c2804721daf3acb6a71d594cb86389cbc019c7e163def02e895',
        'Content-Type': 'application/json'
    },
    // body: '{\n    "fields": {\n      "Address": "1 Ferry Building",\n      "Name": "Ferry Building",\n      "Visited": true\n    }\n  }',
    body: JSON.stringify({
        'fields': {
            'Address': '1 Ferry Building',
            'Name': 'Ferry Building',
            'Visited': true
        }
    })
});