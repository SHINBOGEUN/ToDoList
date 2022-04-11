//유저가 값을 입력한다.
// + 버튼을 클릭하면 , 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1 check버튼을 클릭하는 순간 true false
// 2 true이면 끝난걸로 간주하고 밑줄 보여주기
// 3 false이면 안 끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중만 나온다.
// 전체탭을 누르면 전체 아이템으로 돌아옴




let taskInput = document.getElementById("task-input");
let addButton = document.getElementById('add-button');
let taskList =[];
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div")
let mode ='';
let selectedMenu = "tab-all";
let filteredList =[]


tabs.forEach(menu=> menu.addEventListener('click', (e)=> horizontalIndicator(e)))



function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
  
}






for (let i =1; i<tabs.length; i++) {
    tabs[i].addEventListener("click",function(event) {filter(event)})
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
    if (window.event.keyCode === 13) {
      addTask(event);
    }
  });

function addTask() {
  if (taskInput.value == "") {
    alert("Error");
    return;
  }
    let task = {
        id: randomIDGenerate(),
        taskContent :taskInput.value,
        isComplete:false
    };
    taskList.push(task);
    console.log(taskList);
    taskInput.value =null;
    render();
}


function render() {
    let resultHTML ='';
    list =[]
    
    if (selectedMenu === "tab-all") {
        list = taskList;
      } else {
        list = filteredList;
      }

    
    for(let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task task-back">
        <span class="task-done">${list[i].taskContent}</span>
      <div class="button-box">
        <button class="check-btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`
        }
        else {
        resultHTML += `<div class="task">
        <span>${list[i].taskContent}</span>
      <div class="button-box">
        <button onclick="toggleComplete('${list[i].id}')"<i class="fa-solid fa-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`
    }
}


    document.getElementById("task-board").innerHTML = resultHTML;
}


//check를 했을때!!! 실행되는 함수
function toggleComplete(id) {
    for (let i =0; i <taskList.length; i++){
        if (taskList[i].id == id) {
            //반대값을 넣어줄때 ! 쓰임
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}
function deleteTask(id){
    for (let i =0; i <taskList.length; i++) {
        if (taskList[i].id  == id){
            taskList.pop(i);
        }

    }
    render();
    
}

function filter(event) {
  
    filteredList =[]
    selectedMenu = event.target.id
    if (selectedMenu === "tab-not-done") {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].isComplete == false) {
            filteredList.push(taskList[i]);
          }
        }
      } else if (selectedMenu === "tab-done") {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].isComplete) {
            filteredList.push(taskList[i]);
          }
        }
      }
      render();
    
}


//task라는 객체에 랜덤으로 id를 지정해줌
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}




