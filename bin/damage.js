import { readFileSync } from "fs"

export function SetDmgConfig(avatarconfig){
    var dmg =new Array(3)
    for(let i=0;i<3;i++){
        var avatarName=avatarconfig[i]["name"]
        var readpath='./data/avatars/'+avatarName+'.json'
        var avatarjson=JSON.parse(readFileSync(readpath))
    }
}
export function Zhengfa(avatarconfig,avatarpos,basedmg){
    var avatarpos = avatarpos - 1
    var avatarHealth = avatarconfig[avatarpos]["health"]
    var dmg = basedmg + 2
    if (avatarHealth<basedmg){
        avatarconfig[avatarpos]["health"]=0
        console.log("角色生命值归零")
    } else if (avatarHealth<dmg){
        avatarconfig[avatarpos]["health"]=0
        console.log("角色生命值归零")
    } else {
        var avatarHealthNow = avatarHealth - dmg
        avatarconfig[avatarpos]["health"]=avatarHealthNow
    }
    return avatarconfig
}
export function CauseDmg(avatarconfig,avatarpos,basedmg,dmgelement){
    var avatarpos = avatarpos - 1
    var avatarAttachedElement=avatarconfig[avatarpos]["attachedElement"]
    var avatarHealth = avatarconfig[avatarpos]["health"]
    if (basedmg>avatarHealth){
        console.log("角色死掉了")
        avatarconfig[avatarpos]["health"]=0
    } else {
        if (avatarAttachedElement==1)
        if (avatarAttachedElement==5){
            if (dmgelement==6){
                var dmg=basedmg+2
                if (dmg>avatarHealth){
                    console.log("角色死掉了")
                    avatarconfig[avatarpos]["health"]=0
                } else {
                    var avatarHealthNow = avatarHealth-dmg
                    avatarconfig[avatarpos]["health"]=avatarHealthNow
                }
            }
        }
    }
}