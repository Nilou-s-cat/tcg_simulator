import { GetAvatarconfig, SetAvatarOnFight } from "./bin/avatar.js";
import { GetDice, GetDicename } from "./bin/dice.js";

var avatarlist=GetAvatarconfig(["kaeya","test2","test3"])
SetAvatarOnFight(avatarlist,0)
var dicelist=GetDice("qunyuge",8,avatarlist)
console.log(dicelist)
var dicenamelist= new Array(8)
for (let i=0;i<dicelist.length;i++){
    var dicename = GetDicename(dicelist,i+1)

    dicenamelist[i]=dicename
}
console.log(dicenamelist)