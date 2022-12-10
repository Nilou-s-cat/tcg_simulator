import { CauseDmg } from "./bin/damage.js";

import { GetAvatarconfig, SetAvatarEquipment, SetAvatarOnFight, SetAvatarWeapon } from "./bin/avatar.js";
import { GetDice, GetDicename } from "./bin/dice.js";

var avatarlist=GetAvatarconfig(["kaeya","test2","test3"])
/*SetAvatarOnFight(avatarlist,0)
var dicelist=GetDice("none",8,avatarlist)
console.log(dicelist)
var dicenamelist= new Array(8)
for (let i=0;i<dicelist.length;i++){
    var dicename = GetDicename(dicelist,i+1)

    dicenamelist[i]=dicename
}
console.log(dicenamelist)
SetAvatarEquipment(avatarlist,3,501)
console.log(avatarlist)
SetAvatarEquipment(avatarlist,2,501)
console.log(avatarlist)
SetAvatarEquipment(avatarlist,1,501)
console.log(avatarlist)
SetAvatarWeapon(avatarlist,2,10031)
console.log(avatarlist)
avatarlist[0]["attachedElement"]=5
CauseDmg(avatarlist,1,9,6)
console.log(avatarlist)*/
console.log(avatarlist)
console.log("----------")
avatarlist[1]["attachedElement"]=3
console.log(avatarlist)
console.log("----------")
CauseDmg(avatarlist,2,3,1)
console.log(avatarlist)