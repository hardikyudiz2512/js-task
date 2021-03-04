const TASK_KEY = "task"
const PROFILE_KEY = 'profile';
async function GetLocalStorageData(key, id) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)).filter(ele => ele.id == id))
        } else {
            reject("Error")
        }
    })
}
var postid;
function setUserId() {
    console.log(window.location.href);
    var url = new URL(window.location.href);
    postid = url.searchParams.get("id");
    console.log("postid > ", postid);
    setTimeout(() => {
        GetDataByid()
    }, 200);
}
setUserId()
async function GetDataByid() {
    await GetLocalStorageData(TASK_KEY, postid).then(data => {
        console.log(data);
        const post = data[0]
        document.getElementById('title').value = post.title
        document.getElementById('desc').value = post.desc
        document.getElementById('status').value = post.status
        document.getElementById('userid').value = post.u_id
    })
}
function update(userid, title, desc, status) {
    let obj = {
        id: parseInt(postid),
        u_id: userid,
        title: title,
        desc: desc,
        status: parseInt(status)
    }

    let Task = JSON.parse(localStorage.getItem(TASK_KEY))
    Task = Task.map(ele => {
        console.log(ele.id);
        if (ele.id == postid) {
            ele = obj
            console.log(ele);
        }
        return ele
    })
    console.log(Task);
    setdata(Task)
}

function setdata(Task) {
    setTimeout(() => {
        localStorage.setItem(TASK_KEY, JSON.stringify(Task))
        window.location.href = "../dashbord.html"
    }, 100);
}

