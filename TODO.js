const ul = document.getElementById("ToDo")

const select = document.querySelectorAll("select")
let selected_color = ""

select[0].addEventListener("change", function select_color() {
    selected_color = event.target.value
})
select[1].addEventListener("change", function filter() {
    let display_state = "none"
    if (select[1].value === "filter") {
        display_state = "block"
    }
    for (let i=0; i < ul.childElementCount; i++) {
        if (ul.children[i].children[1].className !== select[1].value) {
            ul.children[i].style.display = display_state
        } else {
            ul.children[i].style.display = "block"
        }

    }
})
let values = []
let deleted_values = []
let done = []

select[2].addEventListener("change", function sort() {
    values.sort()
    if (select[2].value === "A-Å") {
        edit_list()
    }
    if (select[2].value === "Å-A") {
        values.reverse()
        
        edit_list()
        

    }
    if (select[2].value === "Antall dager til sluttdatoen") {
        const now = new Date()
        let sorted_values = []
        
        for (let i=0; i < values.length; i++) {
            if (values[i][3] !== "") {
                const date = values[i][3].split(".")
                let end_date = new Date(date[1], date[0], date[2])
                var time_difference = now.getTime() - end_date.getTime()
                var day_difference = time_difference / (1000 * 3600 * 24)
                values[i][4] = Math.round(day_difference)
                sorted_values.push(Math.round(day_difference))
            } else {
                sorted_values.push("")
            }
            
        }
        
        sorted_values.sort(function sort_values(a, b) {
            if (a==="") {
                return 1
            } else if (b==="") {
                return -1
            } else if (a===b) {
                return 0
            } else if (b > a) {
                return 1
            } else if (a > b) {
                return -1
            }
        })
        
    
        for (let i=0; i < sorted_values.length; i++) {
            
            for (let j=0; j < values.length; j++) {
                if(sorted_values[i] === values[j][4] || values[j][3] === sorted_values[i]) {
                    if (sorted_values.includes(values[j])=== false) {
                        sorted_values[i] = values[j]
                    }
                    
                } 

            }
            
            
        }
        values = sorted_values
        edit_list()
    }
        
})

function edit_list() {
    for (let i=0; i < ul.childElementCount; i++) {
        ul.children[i].children[0].innerText = values[i][0]
        ul.children[i].children[1].style.backgroundColor = values[i][2]
        ul.children[i].children[3].innerText = values[i][1]
        ul.children[i].children[4].innerText = "Sluttdato: " + values[i][3]
    }
}
function add() {
    let Bruker_input = document.querySelectorAll("input");
    let Legg_til = true
    console.log(selected_color)
    if (Bruker_input[0].value === "") {
        alert("Mangler overskrift")
    } else {
        let choosen_values = []
        
        
        for (let i=0; i < values.length; i++) {
            if (values[i][0] === Bruker_input[0].value) {
                alert("Du har allerede brukt denne overskriften")
                Legg_til = false
                break;
            }
        }
        choosen_values[0] = Bruker_input[0].value
        choosen_values[1] = Bruker_input[1].value
        choosen_values[2] = selected_color
        choosen_values[3] = Bruker_input[2].value
        if(Legg_til) {
            values.push(choosen_values)
            Append(choosen_values[0], choosen_values[1], choosen_values[2], choosen_values[3])
        }
        
        for (let j=0; j < Bruker_input.length; j++) {
            Bruker_input[j].value = ""
            
        }

    }
    
}



function Append(a, b, c, d) {
    const li = document.createElement("li")
        
    li.id = "li"
    li.setAttribute("onclick", "Open()")

    const description = document.createElement("p")
    description.id = "title"
    description.innerText = a
    li.appendChild(description)

    

    const color_code = document.createElement("div");
    color_code.id = "color_code"
    
    color_code.setAttribute("class", selected_color)
    color_code.style.backgroundColor = c
    
    if (select[1].value !== color_code && select[1].value !== "Filter") {
        li.style.display = "none"
    } else {
        li.style.display = "block"
    }

    li.appendChild(color_code)

    const button = document.createElement("button")
    button.innerText = "DONE"
    button.setAttribute("onclick", "remove()")
    button.style.display = "none"
    button.id = "remove"
    li.appendChild(button)

    

    const description2 = document.createElement("p")
    description2.id = "description"
    description2.innerText = b
    
    description2.style.display = "none"
    li.appendChild(description2)

    const end = document.createElement("p")
    end.id = "sluttdato"
    
    end.innerText = "Sluttdato: "+ d
    end.style.display = "none"
    li.appendChild(end)
    
  
    ul.appendChild(li)
    

    
}

function remove() {
    
    for (let i=0; i < ul.childElementCount; i++) {
        
        if (ul.children[i].children[0].innerText === event.target.parentNode.children[0].innerText && event.target.parentNode.nodeName !== "UL" || ul.children[i].children[0] === event.target.children[0]) {
            ul.children[i].style.height = "10px"
            ul.removeChild(ul.children[i])
            
            var thirty_days = new Date(new Date().setDate(new Date().getDate()+30))
            values[i][4] = thirty_days.getDate()+":"+(thirty_days.getMonth()+1)+":"+thirty_days.getUTCFullYear()

            if (event.target.id !== "remove") {
                deleted_values.push(values[i])
            
            } else {
                done.push(values[i])
            }
            values.splice(i, 1)
            
        }
    }
    

}

document.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        add()
    }
})

document.addEventListener("mouseover", function change() {
    const edit = document.createElement("img")
    edit.src = "Edit/bleistift.png"
    edit.id = "Edit_icon"
    edit.setAttribute("onclick", "Open()")

    for (let i=0; i < ul.childElementCount; i++) {
        
        if (ul.children[i].innerText === event.target.innerText || ul.children[i].innerText === event.target.parentNode.innerText) {
            ul.children[i].style.boxShadow = "10px 5px 5px grey"
            if (ul.children[i].children[0].id !== "Edit_icon") {
                ul.children[i].insertBefore(edit, ul.children[i].children[0])
            }
            choosen_element = values[i]
            
 
        } else if (ul.children[i].children[0].id === "Edit_icon" && ul.children[i].innerText !== event.target.innerText|| ul.children[i].children[0].id === "Edit_icon" && ul.children[i].innerText !== event.target.parentNode.innerText) {
            
            if (event.target.id !== "Edit_icon") {
                ul.children[i].removeChild(ul.children[i].children[0])
            }
            
            
        } else {
            ul.children[i].style.boxShadow = "none"
        }
        
    }
    
    
})

function Open() {
    for (let i=0; i < ul.childElementCount; i++) {
        var child = ul.children[i].children
        if (ul.children[i].innerText === event.target.innerText) {
            if (event.target.id === "title") {
                event.target.parentNode.style.height = "130px"
            } else {
                event.target.style.height = "130px"

            }
            
            for (let j= 0; j < child.length; j++) {
                child[j].style.display = "block"
                
            }

        } else {
            ul.children[i].style.height = "10px"
            for (let j= 2; j < child.length; j++) {
                child[j].style.display = "none"
                
            }
            
        }
    }
    
}

var count = 0

function remove_marked() {
    event.target.src = "minus.png"
    count += 1

    const container = document.getElementById("innhold");
    for (let i=0; i < container.childElementCount; i++) {
        
        if (container.children[i].id !== "remove_marked") {
            
            if (count === 1) {
                container.children[i].disabled = true
                ul.setAttribute("onclick", "remove()")
                
            } else {
                container.children[i].disabled = false
                event.target.src = "kreuzkreis.png"
                ul.setAttribute("onclick", " ")
                count = 0
               
            }
            
        }
    }
    
}

function lagre() {
    localStorage.setItem("punkt", JSON.stringify(values))
    localStorage.setItem("slettet", JSON.stringify(deleted_values))
    localStorage.setItem("gjort", JSON.stringify(done))
}
window.onload = function last_inn() {
    const lokall_lengde = localStorage.length
    
    if (lokall_lengde > 0) {
        values = JSON.parse(localStorage.getItem("punkt"))
        deleted_values = JSON.parse(localStorage.getItem("slettet"))
        done = JSON.parse(localStorage.getItem("gjort"))
        for (let j=0; j < values.length; j++) {
            Append(values[j][0], values[j][1], values[j][2], values[j][3])
        }
    }
}




