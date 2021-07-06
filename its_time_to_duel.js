class Card {
    constructor (name,cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name,cost);
        this.power = power;
        this.res = res;
    }
    attack(target) {
        if( target instanceof Unit ) {
            if (this.power >= target.res) {
                target.res = 0;
            } else {
                target.res = target.res - this.power;
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude){
        super(name,cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }
    play( target ) {
        if( target instanceof Unit ) {
            if (this.stat == "resilience") {
                target.res += this.magnitude;
                console.log(`${target.name} Mag: ${this.magnitude} Resilience: ${target.res}`)
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }    
}

//make an instance of red belt ninja
const rbNinja = new Unit("Red Belt Ninja",3,3,4);
console.log(rbNinja);
//make an instance of hard algo and play it on red belt ninja
const hardAlg = new Effect("Hard Algorithm",2,"increase target's resilience by 3","resilience",3)
hardAlg.play(rbNinja);
//make an instance of black belt ninja
const bbNinja = new Unit("Black Belt Ninja",4,5,4);
console.log(bbNinja);
//make an instance of unhandled promise rejection and play it on redbelt ninja
const upr = new Effect("Unhandled Promise Rejection",1,"reduce target's resilience by 2","resilience",-2)
upr.play(rbNinja);
//make an instance of pair programming and plaiy it on red belt ninja
const pp = new Effect("Pair Programming",3,"increase target's power by 2","power",2)
pp.play(rbNinja);
//red belt ninja uses attack method on black belt ninja
rbNinja.attack(bbNinja);
console.log(rbNinja)
console.log(bbNinja)

