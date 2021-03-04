const PROFILE_KEY = 'profile';
const DATABASE_KEY = 'database2';


function LoginAuth() {
    if (localStorage.getItem(PROFILE_KEY)) {
        window.location.href = '../dashbord.html'
    } else {
        window.location.href = '../login.html'
    }
}
function saveDataToStore(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
async function GetDataBase() {
    return await new Promise((resolve, reject) => {
        if (localStorage.getItem(DATABASE_KEY)) {
            resolve(JSON.parse(localStorage.getItem(DATABASE_KEY)))
        } else {
            reject("Database can not define")
        }
    })
}


function signup(name, email, mobile, gender, dob, pass) {
    let obj = {
        name: name,
        email: email,
        mobile: mobile,
        gender: 1,
        dob: dob,
        pass: pass
    }
    let DATABASE = []
    GetDataBase()
        .then((data) => {
            console.log(data);
            DATABASE = data
            if (data.some(ele => (ele.email == obj.email &&  ele.mobile == obj.mobile))) {
                alert("Email  or mobile already exist ");
            } else {
                obj.id = DATABASE.length
                DATABASE.push(obj)
                localStorage.setItem(DATABASE_KEY, JSON.stringify(DATABASE))
                window.location.href = '../login.html'
            }
        }).catch(err => {
            obj.id = DATABASE.length
            DATABASE.push(obj)
            localStorage.setItem(DATABASE_KEY, JSON.stringify(DATABASE))
            window.location.href = '../login.html'
        })
}



function userLogin(email, password) {
    console.log(email, password);
    GetDataBase()
        .then(result => {
            console.log(result);
            let data = result.filter(ele => (ele.email == email && ele.pass == password))
            if (data.length == 1) {
                saveDataToStore(PROFILE_KEY, data[0])
                LoginAuth()
                alert("sucessfully login")
            } else {
                alert('Somthing went wrong');
            }
        })
}

function setMassage(msg) {
    document.getElementById('msg').innerHTML = msg
}





