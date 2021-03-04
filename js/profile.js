const PROFILE_KEY = 'profile';
const DATABASE_KEY = 'database2';

async function GetLocalStorageData(key) {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)))
        } else {
            reject("Error")
        }
    })
}
var userprofile;
async function setData() {
    await GetLocalStorageData(PROFILE_KEY).then(data => {
        userprofile = data
    })
}
setData()

function GetProfileData() {
    document.getElementById('name').innerHTML = userprofile.name
    document.getElementById('email').innerHTML = userprofile.email
    document.getElementById('dob').innerHTML = userprofile.dob
    document.getElementById('mobile').innerHTML = userprofile.mobile
}

function EditPage() {
    window.location.href = "../updateprofile.html"
}

function Getprofileupdate() {
    document.getElementById('userid').value = userprofile.id
    document.getElementById('name').value = userprofile.name
    document.getElementById('email').value = userprofile.email
    //document.getElementById('dob').value = userprofile.dob
    document.getElementById('mobile').value = userprofile.mobile
}


function profileupdate(userid, name, email, mobile) {

    GetLocalStorageData(DATABASE_KEY).then(data => {
        console.log(data);
        let Profile = data
        Profile = Profile.map(ele => {
            console.log(ele.id);
            if (ele.id == userid) {
                ele.name = name
                ele.email = email
                ele.mobile = mobile
            }
            return ele
        })
        console.log(Profile);
        setdata(DATABASE_KEY, Profile)
    })
}
function setdata(key, obj) {
    setTimeout(() => {
        localStorage.setItem(key, JSON.stringify(obj))
        alert("Profile update successfully..")
        localStorage.removeItem(PROFILE_KEY)
        window.location.href = "../index.html"
    }, 100);
}

