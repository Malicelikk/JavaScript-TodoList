
const form = document.querySelector("#todo-form");
const todo = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    
    form.addEventListener("submit",addTodo); // form submit edilince çalıştır
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos); // arama input una değer girildiğinde çalıştır
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(){
    if (confirm("Tümünü silmek istediğinize emin misiniz?")){
        
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    
    const filterValue = e.target.value.toLowerCase();  // girilen değeri al
    const listItems = document.querySelectorAll(".list-group-item"); // tüm todoları al

    listItems.forEach(function(list){
        const text = list.textContent.toLowerCase(); // todoların text değeri
        if(text.indexOf(filterValue) === -1){   // girilen filterla aynı değilse
            list.setAttribute("style","display:none !important"); // gösterme
        }
        else{
            list.setAttribute("style","display:block");
        }
    });
}

function deleteTodo(e){
    if (e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success","Başarıyla silindi");
    }
}

function addTodo(e){

    const newTodo = todo.value.trim();  // girilen değeri newTodo sabitine at

    if(newTodo===""){
        showAlert("danger","Lütfen bir todo girin.."); // alert oluştur type ve message gönderiyoruz
    }
    else{
        addTodoToUI(newTodo); // newTodo yu UI a gönder
        addTodoToStorage(newTodo); // newTodo yu Storage a gönder
        showAlert("success","Başarıyla eklendi!")
    }

    e.preventDefault();
}

function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){alert.remove();},2000);  // 2 saniye sonra yok et
}



function addTodoToUI(newTodo){ // arayüze ekle

  /*  <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>
      </li>  */
// önce oluştur sonra ekle
const listItem = document.createElement("li");
const link = document.createElement("a");

link.href ="#";
link.className ="delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";
listItem.className = "list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(newTodo));

listItem.appendChild(link);
todoList.appendChild(listItem);
todo.value="";
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = []; // yoksa boş bi şekilde başlat
    }else {
        todos = JSON.parse(localStorage.getItem("todos")); // stringi arraye çevir
    }

    return todos;
}

function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();

   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}

