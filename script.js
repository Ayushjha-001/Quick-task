const taskTitle=document.getElementById("title");
const deadlineDate= document.getElementById("deadline");
const priority= document.getElementById('priority');
const submitBtn= document.getElementById('submit-task')
const tasks= document.getElementsByClassName("tasks")[0]
const startBtn= document.getElementById("start-timer")
const stopBtn= document.getElementById("stop-timer")
const resetBtn= document.getElementById("reset-timer")
let timerId= null
let timeLeft= 25*60
const duration=document.getElementById("duration")
updateDisplay()
const DeadlineCheck=()=>{
    const now= new Date()
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); 
const day = String(now.getDate()).padStart(2, "0");
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const formattedTime= `${year}-${month}-${day}T${hours}:${minutes}`
deadlineDate.min=formattedTime
}
DeadlineCheck()
submitBtn.addEventListener("click",()=>{
    const now = new Date();
const selectedDate= new Date(deadlineDate.value)
if(taskTitle.value==""){
    alert("Please set the title of task")
    return
}
if(deadlineDate.value==""){
    alert("Please set a deadline date")
    return 
}
    if(selectedDate<now){
        alert("Deadline can't be in the past")
    }
if(priority.value=="Select Priority"){
    alert("Please set a priority")
    return
}
const outDateTime=selectedDate.toLocaleString("en-IN",{
    day:"2-digit",
    month:"2-digit",
    year:"numeric",
    hour: "2-digit",
  minute: "2-digit",
  hour12: true
}).toUpperCase()
const listItem= document.createElement("li")
const nameElement= document.createElement("label")
const deadlineElement= document.createElement("span")
const priorityElement= document.createElement("span")
const deleteElment=document.createElement("span")
tasks.append(listItem)
if(priority.value=="Important"){
    listItem.classList.add("important-list")
}
else{listItem.classList.add("list")}
listItem.append(nameElement)
listItem.append(deadlineElement)
listItem.append(priorityElement)
listItem.append(deleteElment)
nameElement.classList.add("task-name")
deadlineElement.classList.add("task-deadline")
priorityElement.classList.add("task-priority")
deleteElment.classList.add("delete-btn")
if(priority.value=="Important"){
    nameElement.style.color="white"
    deadlineElement.style.color="white"
    priorityElement.style.color="white"
    deleteElment.style.color="white"
}
nameElement.innerHTML = `<input type="checkbox" class="checkbox"> ${taskTitle.value}`;
deadlineElement.textContent= outDateTime
priorityElement.textContent=priority.value
deleteElment.innerHTML=`<i class="fa-solid fa-trash"></i>`
const checkbox=document.querySelectorAll(".checkbox")
const lastCheckbox= checkbox[checkbox.length-1]
if(priority.value=="Important"){
    lastCheckbox.classList.add("checkbox-imp")
}
lastCheckbox.addEventListener("change",()=>{
    if(lastCheckbox.checked){
        deleteElment.style.display="inline"
        nameElement.style.textDecoration="line-through"
    }
else{
    deleteElment.style.display="none"
    nameElement.style.textDecoration="none"
}
deleteElment.addEventListener("click",()=>{
    listItem.remove()
})
})
taskTitle.value=""
deadlineDate.value=""
priority.value="Select Priority"
})
startBtn.addEventListener("click",()=>{
    if(timerId)return;
    timerId=setInterval(()=>{
        if(timeLeft <=0){
            clearInterval(timerId);
      timerId = null;
      alert("Focus session complete!");
        }
      else{
        timeLeft--
        updateDisplay()
      }  
    },1000)
})
stopBtn.addEventListener("click",()=>{
    clearInterval(timerId)
    timerId=null
})
resetBtn.addEventListener("click",()=>{
    clearInterval(timerId)
    timerId=null
    timeLeft=25*60
    updateDisplay()
})
function updateDisplay(){
const min=Math.floor(timeLeft/60)
const sec= timeLeft%60
duration.innerText=`${String(min).padStart(2,0)}:${String(sec).padStart(2,0)}`
}