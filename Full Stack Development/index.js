let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let fighting;
let monsterHealth;
let inventory = ["stick", "dagger", "sword"]

const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]

const monster = [

    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }

]

const locations = [
    
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says 'store'."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 Gold)", "Go to the square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the store." 
    },
    {
        name: "cave",
        "button text": ["Fight slim", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You entered the Enter. You see some monsters" 
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monsters" 
    },
    {
        name: "kill moster",
        "button text": ["Go to town square", "Go town square", "Go to town square"],
        "button functions": [goTown, goTown, eaasterEgg],
        text: 'The mosters screams "Arg!" as it dies. You gain experience points and find gold.' 
    },
    {
        name: "lose",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "You die" 
    },
    {
        name: "win",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME!" 
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. if the number you choose matches one of the random numbers, you win" 
    }  


]
// Initialize Buttons

button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(locations ) {
    monsterStats.style.display = "none"
    button1.textContent = locations["button text"][0]
    button2.textContent = locations["button text"][1]
    button3.textContent = locations["button text"][2]
    button1.onclick = locations["button function"][1]
    button2.onclick = locations["button function"][2]
    button3.onclick = locations["button function"][0]
    text.textContent = locations["text"]
   
    
}

function goTown (){
    update(locations[0])
    
}

function goStore () {
   update(locations[1])
}

function goCave () {
    update(locations[2])    
}
function buyHealth (){  
    if ( gold >= 10) {
        
        gold -= 10
        health += 10
        goldText.textContent = gold
        Headers.textContent = health
    } else {
        text.textContent = "You do not have enough gold to buy health."
    }
    
}

function buyWeapon (){
    if (currentWeapon < weapons.length - 1 ) {

        if (gold >= 30) {

            gold -= 30
            currentWeapon++
            goldText.textContent = gold
            let newWeapon = weapons[currentWeapon].name
            text.textContent = "You now have a" + newWeapon +"."
            inventory.push(newWeapon)
            text.textContent += "In your inventory you have: " + inventory
        
        } else {
            text.textContent = "You do not have enough gold to buy a weapon."
        } 
    } else {
        text.textContent = "Yoi already have the most powerful weapon!"
        button2.textContent = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon
    }
   
}

function sellWeapon() {
    if (inventory.length > 1 ) {
        gold += 15
        goldText.textContent = gold
        let currentWeapon = inventory.shift()
        text.textContent = "You sold a" + currentWeapon + "."
        text.textContent += "In your inventory you have: " + inventory
    } else {
       text.textContent = "Don't sell your only weapon!" 
    }

}

function fightSlime() {
    fighting = 0
    goFight()

}

function fightBeast() {
    fighting = 1
    goFight()   

}

function fightDragon () {
    fighting = 2
    goFight()
    
}

function goFight() {
    update(locations[3])
    monsterHealth = monster[fighting].health
    monsterStats.style.display = "block"
    monsterNameText.textContent = monster[fighting].name
    monsterHealth.textContent = monsterHealth

}

function attack() {
    text.textContent = "The" + monster[fighting].name + "attacks." 
    text.textContent += "You attact it with your" + weapons[currentWeapon].name + "."
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monster[fighting].level)
    } else {
        text.textContent += "You miss."
    }

    health -= getMonsterAttackValue(monster[fighting].level)
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
    health.textContent = health
    monsterHealthText.textContent = monsterHealth
    if (health <= 0) {
        lose()
    } else if ( monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster()
        

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.textContent += "Your" + inventory.pop() + "breaks."
        currentWeapon--
    }
    }

}

function getMonsterAttackValue() {
    let hit = (level * 5) - (Math.floor(Math.random() * xp))
    console.log(hit)
    return hit

}

function isMonsterHit() {
    return Math.random() > .2 || health < 20
 
}

function dodge() {
    text.textContent = "You dodge the attack from the" + monster[fighting].name + "."
}

function defeatMonster() {
    gold += Math.floor(monster[fighting]).level * 6.7
    xp += monster[fighting].level
    goldText.textContent = gold
    xpText.textContent = xp
    update(locations[4])

}

function lose() {
    update(locations[5])

}

function winGame() {
    update(locations[6])
}


function restart() {
    xp = 0
    health = 100
    gold = 50
    currentWeapon = 0
    inventory = ["stick"]
    goldText.textContent = gold
    healthText.textContent = health
    xpText.textContent = xp
    goTown()


}

function eaasterEgg() {
    update(locations[7])
}

function pickTwo() {
    pick(2)

}

function pickEight() {
    pick(8)
}

function pick(guess) {
    let numbers = []
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11))
    }

    text.textContent = "You picked " + guess + ". Here are the random numbers: \n"
    for(let i = 0; i < 10; i ++) {
         text.textContent += numbers[i] + "\n"
    }

    if (numbers.indexOf(guess) !== -1 ) {
        text.textContent += "Right! You win 20 gold!"
        gold += 20;
        goldText.textContent = gold

    } else {
        text.textContent += "You lose 10 health!"
        health -= 10
        healthText.textContent = health
        if (health <= 0) {
            lose()
        }
    }
}