
const deleted_point = document.getElementById("deleted")
const open = document.getElementById("deleted_back")
const div = document.getElementById("list")
const buttons = document.querySelectorAll(".buttons")
let choosen = " "
let choosen_list = []
function deleted_list() {
    deleted_point.innerText = " "
    const header = document.getElementById("header")
    open.style.display = "block"
    div.style.marginTop = "210px"
    
    if (event.target.parentNode.id === "deleted_button") {
        header.innerText = "DELETED ITEMS"
        open.style.backgroundColor = "rgb(211, 161, 138)"
        choosen = "delete"
        choosen_list = deleted_values
        const now = new Date().getDate()+(new Date().getMonth()+1)+new Date().getFullYear()
        for (let i=0; i < deleted_values.length; i++) {
            if(deleted_values[i][4]===now) {
                deleted_values.splice(deleted_values[i], 1)
            }
        }

        for (let i=0; i < deleted_values.length; i++) {
            create_deleted(deleted_values[i][0])
        }

    }
    if (event.target.parentNode.id === "see_done") {
        header.innerText = "FINISHED"
        open.style.backgroundColor = "green"
        choosen = "done"
        choosen_list = done
        for (let i=0; i < done.length; i++) {
            
            create_deleted(done[i][0])
        }

    }
    
}

function create_deleted(a) {
    const del_li = document.createElement("li")

    const del_text = document.createElement("p")
    del_text.style.margin = "0px"
    del_text.innerText = a
    del_li.appendChild(del_text)

    const restore = document.createElement("button")
    restore.innerText = "restore"
    restore.id = "restore"
    restore.setAttribute("onclick", "Restore()")
    del_li.appendChild(restore)

    deleted_point.appendChild(del_li)

}
function RestoreAll() {
    deleted_point.innerText = " "
    for (let i=0; i < choosen_list.length; i++) {
        values.push(choosen_list[i])
        Append(choosen_list[i][0], choosen_list[i][1], choosen_list[i][2], choosen_list[i][3])
        
    }
    if (choosen === "delete") {
        deleted_values = []
    }
    if (choosen === "done") {
        done = []
    }

}
function DeleteAll() {
    deleted_point.innerText = " "

    if (choosen === "delete") {
        deleted_values = []
    }
    if (choosen === "done") {
        done = []
    }

}

function Close() {
    open.style.display ="none"
    div.style.marginTop = "10px"
    
}
function Restore() {
    event.target.parentNode.value = true
    for (let i=0; i<deleted_point.childElementCount; i++) {
        
        if (deleted_point.children[i].value === 1) {
            deleted_point.removeChild(deleted_point.children[i])
            values.push(choosen_list[i])
            
            Append(choosen_list[i][0], choosen_list[i][1], choosen_list[i][2], choosen_list[i][3])
            if (choosen === "done") {
                done.splice(i, 1)
                
            }
            if (choosen === "delete") {
                deleted_values.splice(i, 1)
                
            }
            

            
        }
    }
}