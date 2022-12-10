import { readFileSync } from "fs"

export function SetDmgConfig(avatarconfig){
    var dmg =new Array(3)
    for(let i=0;i<3;i++){
        var avatarName=avatarconfig[i]["name"]
        var readpath='./data/avatars/'+avatarName+'.json'
        var avatarjson=JSON.parse(readFileSync(readpath))
    }
}
function Swirl(avatarconfig,mainavatarpos,basedmg){
    var extradmg = 1 //设置额外攻击值
    switch(mainavatarpos){ //判断主要受击角色是哪个位置的
        case 1: //输入1号位，数组位置为0
            var avatarpos = mainavatarpos - 1 //初始化数组位置0
            var extraAttackPos = [1,2]  //初始化额外攻击位置数组
            break
        case 2:
            var avatarpos = mainavatarpos - 1//初始化数组位置1
            var extraAttackPos = [0,2]//初始化额外攻击位置数组
            break
        case 3:
            var avatarpos = mainavatarpos - 1//初始化数组位置2
            var extraAttackPos = [0,1]//初始化额外攻击位置数组
            break
    }
    if (avatarconfig[avatarpos]["attachedElement"]!=null){//判断主要受击角色附着元素是否为null
        var attackElement=avatarconfig[avatarpos]["attachedElement"]//声明被扩散的元素
        //有元素残留，先判断元素残留种类
        switch(avatarconfig[avatarpos]["attachedElement"]){//根据主要受击角色的附着元素判断是否扩散
            case 3: case 5: case 6: case 7://雷水火冰元素触发扩散
                //水火雷冰元素残留，先判断主要受击角色血量是否高于basedmg，高于就直接减，若低于就直接赋值0,随后给附着元素赋值null，并给次要受击角色附加对应元素并扣1血
                if (avatarconfig[avatarpos]["health"]>basedmg){//判断主要受击角色生命值是否高于基础攻击值
                    avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg //若高于，直接扣血
                }
                else{
                    avatarconfig[avatarpos]["health"]=0 //若低于或等于，直接设置角色死亡
                }
                avatarconfig[avatarpos]["attachedElement"]=null  //清除附着元素
                //判断次要受击角色血量是否大于1，小于等于直接赋值0，大于就扣血+赋元素附着，最后检查一下是否反应
                for (let i = 0 ; i<extraAttackPos.length;i++){//循环遍历extraAttackPos数组
                    var attackpos=extraAttackPos[i]//初始化次要受击角色数组位置
                    console.log("_______________________________")
                    console.log(attackpos)
                    console.log("_______________________________")
                    var avatarhealth=avatarconfig[attackpos]["health"]//读取次要受击角色生命值
                    if (avatarhealth>1){//判断次要受击角色生命值是否大于1
                        if(avatarconfig[attackpos]["attachedElement"]!=null){//判断次要受击角色有没有元素附着 //副反应大概是完善了，但是没完全完善，case里面的函数还得继续写啊 //以及，不是11种，是他妈的12种
                            switch(avatarconfig[attackpos]["attachedElement"]){//这部分没写好，先不做测试
                                case 3:
                                    switch(attackElement){
                                        case 5:
                                            ElectroCharged(avatarconfig,attackpos,extradmg)
                                            break
                                        case 6:
                                            Overloaded(avatarconfig,attackpos,extradmg)
                                            break
                                        case 7:
                                            Superconduct(avatarconfig,attackpos,extradmg)
                                            break
                                    }
                                    break
                                case 5:
                                    switch(attackElement){
                                        case 3:
                                            ElectroCharged(avatarconfig,attackpos,extradmg)
                                            break
                                        case 6:
                                            Vaporize(avatarconfig,attackpos,extradmg)
                                            break
                                        case 7:
                                            Melt(avatarconfig,attackpos,extradmg)
                                            break
                                    }
                                    break
                                case 6:
                                    switch(attackElement){
                                        case 3:
                                            Overloaded(avatarconfig,attackpos,extradmg)
                                            break
                                        case 5:
                                            Vaporize(avatarconfig,attackpos,extradmg)
                                            break
                                        case 7:
                                            Frozen(avatarconfig,attackpos)
                                            break
                                    }
                                    break
                                case 7:
                                    switch(attackElement){
                                        case 3:
                                            Superconduct(avatarconfig,attackpos,extradmg)
                                            break
                                        case 5:
                                            Melt(avatarconfig,attackpos,extradmg)
                                            break
                                        case 6:
                                            Frozen(avatarconfig,attackpos)
                                            break
                                    }
                                    break
                            }
                        } else {//次要受击角色没有元素附着
                            avatarconfig[attackpos]["health"]=avatarconfig[attackpos]["health"]-extradmg //扣血
                            avatarconfig[attackpos]["attachedElement"]=attackElement//添加元素附着
                        }
                    } else {//次要受击角色血量小于等于1
                        avatarhealth=0//设置角色死亡
                        avatarconfig[attackpos]["attachedElement"]=null//清除角色附着元素
                    }
                }
                break;
            case 4:
                //草附着，直接判断血量然后扣血就好，元素附着不需要清除
                if (avatarconfig[avatarpos]["health"]>basedmg){
                    avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg //扣血
                }
                else{
                    avatarconfig[avatarpos]["health"]=0 //扣血
                    avatarconfig[avatarpos]["attachedElement"]=null
                }
                break
        } 
    } else{
        if (avatarconfig[avatarpos]["health"]>basedmg){
            avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg //扣血
        }
        else{
            avatarconfig[avatarpos]["health"]=0 //扣血
            avatarconfig[avatarpos]["attachedElement"]=null
        }
    }
}
function Zhengfa(avatarconfig,avatarpos,basedmg){
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
    //var avatarpos = avatarpos - 1
    var i = avatarpos-1
    var avatarAttachedElement=avatarconfig[i]["attachedElement"]
    //根据dmgelement和avatarattachedelement判断反应
    switch(dmgelement){
        case 1:
            switch(avatarAttachedElement){
                case 3: 
                    Swirl(avatarconfig,avatarpos,basedmg)
                    break
                case 5:
                    Swirl(avatarconfig,avatarpos,basedmg)
                    break
                case 1,2,4://测试
                    if (avatarconfig[avatarpos]["health"]<basedmg){
                        avatarconfig[avatarpos]["health"]=0
                    } else {
                        avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg
                    }
                    break
            }
        break
    }
    return avatarconfig
}