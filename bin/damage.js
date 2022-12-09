import { readFileSync } from "fs"

export function SetDmgConfig(avatarconfig){
    var dmg =new Array(3)
    for(let i=0;i<3;i++){
        var avatarName=avatarconfig[i]["name"]
        var readpath='./data/avatars/'+avatarName+'.json'
        var avatarjson=JSON.parse(readFileSync(readpath))
        dmg[i]=
    }
}
