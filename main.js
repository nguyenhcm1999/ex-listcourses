
var coursesApi = 'http://localhost:3000/courses'

function start(){
    getCourses(renderCourses)
    handleCreateForm()
}

start()
function testget(){
    fetch(coursesApi) // trả về 1 promise
    .then(function(response){ // response chính là 1 promise
        console.log(response)
        return response.json() //thằng respone.json() lại trả về 1 promise 
    })
    .then(function(data){console.log(data)})
}
testget()
console.log(fetch(coursesApi))
//1
function getCourses(callback){
    fetch(coursesApi)
    .then(function(response){
        return response.json()
    })
    .then(callback)
    // .then(function(response){

    // })
}

//4
function createCourses(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(coursesApi,options)
    .then(function(response){
        response.json()
    })
    .then(callback)
}

function updateCourse(id,data,callback){
    var options = {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi +'/'+ id, options)
    .then(function(response){
        response.json();
    })
    
    .then(callback)
    // .then(function(){getCourses(renderCourses)})
    
}

function resetCourse(){
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="description"]').value = '';
}


function handleUpdateCourse(id){
    document.querySelector('input[name="name"]').value = 
    document.querySelector('.course-name-' + id).textContent
	document.querySelector('input[name="description"]').value = 
    document.querySelector('.course-description-' + id).textContent

    
    document.querySelector('#create').style.display = 'none';
	document.querySelector('#update').style.display = 'inline-block';
    
    var updateBtn = document.querySelector('#update');
    updateBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };

        updateCourse(id, formData, function() {
            getCourses(renderCourses);
            resetCourse()
            });

        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="description"]').value = '';
        document.querySelector('#create').style.display = 'inline-block';
        document.querySelector('#update').style.display = 'none';
    }      
}


function handleDeleteCourses(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
      
    }
    
    fetch(coursesApi +'/' +id,options)
    .then(function(response){
       response.json()
    })
    .then(function(){
        // var courseItem = document.querySelector('.course-item-'+ id)
        // if(courseItem){
        //     courseItem.remove();
        // }
        getCourses(renderCourses)
    })
}

//2
function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses')
    var html = courses.map(function(course){
        return `
            <li>
                <p>${course.id}</p>
                <h4 class="course-name-${course.id}">${course.name}</h4>
                <p class="course-description-${course.id}"> ${course.description}</p>
                <button onclick="handleDeleteCourses(${course.id})">delete</button>
                <button onclick="handleUpdateCourse(${course.id})">edit</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML =html.join('')
}


//3
function handleCreateForm() {
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        //5
        var formData = {
            name : name,
            description :description
        }

        createCourses(formData,function(){
            getCourses(renderCourses)
            resetCourse()
        })
    }
}