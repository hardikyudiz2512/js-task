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
function ResetPassword(email, password) {
    GetLocalStorageData(DATABASE_KEY).then(data => {
        console.log(data);
        let Profile = data
        Profile = Profile.map(ele => {
            console.log(ele.email);
            if (ele.email == email) {
                ele.pass = password
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
        alert("Password reset..")
        window.location.href = "../index.html"
    }, 100);
}
