import {readFile, readFileSync} from 'fs'
export function GetAvatarconfig(name1,name2,name3){
    let configPath = "./data/avatars/"+name1+".json"
    console.log("读取角色配置文件中："+configPath)
    let avatarjson = JSON.parse(readFileSync(configPath))
    console.log("读取完整，内容为："+avatarjson)
    var avatarconfig = new Array()
    avatarconfig[0]={
        "id":avatarjson.Id,
        "type":avatarjson.Type,
        "health":avatarjson.Health,
        "element":avatarjson.Element,
        "skillpoint":0,
        "attachedElement":null,
        "summon":null,
        "isfrozen":false,
        "onfight":false,
        "pingyiLevel": null
    }
    console.log("写入数组："+avatarconfig[0])
    configPath = "./data/avatars/"+name2+".json"
    console.log("读取角色配置文件中："+configPath)
    avatarjson = JSON.parse(readFileSync(configPath))
    console.log("读取完整，内容为："+avatarjson)
    avatarconfig[1]={
        "id":avatarjson.Id,
        "type":avatarjson.Type,
        "health":avatarjson.Health,
        "element":avatarjson.Element,
        "skillpoint":0,
        "attachedElement":null,
        "summon":null,
        "isfrozen":false,
        "onfight":false,
        "pingyiLevel": null
    }
    console.log("写入数组："+avatarconfig[1])
    configPath = "./data/avatars/"+name3+".json"
    console.log("读取角色配置文件中："+configPath)
    avatarjson = JSON.parse(readFileSync(configPath))
    console.log("读取完整，内容为："+avatarjson)
    avatarconfig[2]={
        "id":avatarjson.Id,
        "type":avatarjson.Type,
        "health":avatarjson.Health,
        "element":avatarjson.Element,
        "skillpoint":0,
        "attachedElement":null,
        "summon":null,
        "isfrozen":false,
        "onfight":false,
        "pingyiLevel": null
    }
    console.log("写入数组："+avatarconfig[2])
    if (name1 ="seino"){
        avatarconfig[0]["pingyiLevel"]=1
    } else if(name2="seino"){
        avatarconfig[1]["pingyiLevel"]=1
    } else if(name3="seino"){
        avatarconfig[2]["pingyiLevel"]=1
    }
    return avatarconfig
}
        //console.log("角色id："+avatarconfig["id"])
        //console.log("角色初始生命值："+avatarconfig["health"])
        //console.log("角色元素类型："+avatarConfig["element"])
        //console.log("角色初始附着元素："+avatarConfig["attachedElement"])
        //console.log("角色初始技能点数："+avatarConfig["skillpoint"])
        //console.log("角色初始附带召唤物："+avatarConfig["summon"])
        //console.log("角色初始冻结状态："+avatarConfig["prop"])
export function SetAvatarhealth(avatarconfig,avatarpos,decrement){
    var healthNow = avatarconfig[avatarpos]["health"]-decrement 
    avatarconfig[avatarpos]["health"]=healthNow
    return avatarconfig
}
export function SetAvatarProp(avatarconfig,avatarpos,method){
    switch(method){
        case 1:
            avatarconfig[avatarpos]["isfrozen"]=true
            break
        case 0:
            avatarconfig[avatarpos]["isfrozen"]=false
            break
    }
    return avatarconfig
}
export function SetAvatarOnFight(avatarconfig,avatarpos){
    avatarconfig[avatarpos]["onfight"]=true
    return avatarconfig
}
export function SetAvatarOffFight(avatarconfig,avatarpos){
    avatarconfig[avatarpos]["onfight"]=false
    return avatarconfig
}
export function GetAvatarElement(avatarconfig){
    for(let i=0;i<3;i++){
        switch(avatarconfig[i]["onfight"]){
            case true:
                var avatarElement=avatarconfig[i]["element"]
                return avatarElement
            case false:
                break
        }
    }
}