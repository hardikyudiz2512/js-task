const TASK_KEY = "task"
const PROFILE_KEY = 'profile';

async function GetLocalStorageData(key) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)))
        } else {
            reject("Error")
        }
    })
}
var userid;
var datatabel
async function setUserId() {
    await GetLocalStorageData(PROFILE_KEY).then(data => {
        userid = data.id
        console.log("user id >>", userid);
        GetUserTaskData(TASK_KEY).then(data => {
            datatabel = data
        })
    })
}
setUserId()

async function GetUserTaskData(key) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)).filter(ele => ele.u_id == userid))
        } else {
            reject("Task empty")
        }
    })
}

function getStatus(status) {
    if (status == 1) {
        return "Panding"
    }
    if (status == 2) {
        return "Complited"
    }
    if (status == 3) {
        return "Reject"
    }
}
function setTableFormate() {
    var pendingTask = datatabel.filter(ele => ele.status == 1)
    var ComplitedData = datatabel.filter(ele => ele.status == 2)
    let Complited = "<th>Title</th><th>Description</th><th>Action</th>"
    let pending = "<th>Title</th><th>Description</th><th>Action</th>"
     pendingTask.map(ele => {
        pending += `<tr>
                    <td>${ele.title}</td>
                    <td>${ele.desc}</td>
                    <td><button class='btnEdit' onclick='RedirectToUpdate(${ele.id})'>Edit</button><button class='btnDel' onclick='deleteTask(${ele.id})'>Delete</button></td>
                   </tr>`
    })
    ComplitedData.map(ele => {
        Complited += `<tr>
                    <td>${ele.title}</td>
                    <td>${ele.desc}</td>
                    <td><button class='btnEdit' onclick='RedirectToUpdate(${ele.id})'>Edit</button><button class='btnDel' onclick='deleteTask(${ele.id})'>Delete</button></td>
                   </tr>`
    })
    //datatabel += "</table>"
    document.getElementById('tablepanding').innerHTML = pending
    document.getElementById('tablecomplit').innerHTML = Complited
}
function LoginAuth() {
    if (localStorage.getItem(PROFILE_KEY)) {
        window.location.href = '../dashbord.html'
    } else {
        window.location.href = '../login.html'
    }
}

function deleteTask(id) {
    let index = datatabel.map(id => { return id.id }).indexOf(id);
    datatabel.splice(index, 1)
    console.log(datatabel);
    localStorage.setItem(TASK_KEY, JSON.stringify(datatabel))
    window.location.reload();
}


function logout() {
    localStorage.removeItem(PROFILE_KEY)
    LoginAuth()
}

function RedirectToUpdate(id){
    window.location.href = `../updatetask.html?id=${id}`
}