import { readFileSync } from "fs"

export function SetDmgConfig(avatarconfig){
    var dmg =new Array(3)
    for(let i=0;i<3;i++){
        var avatarName=avatarconfig[i]["name"]
        var readpath='./data/avatars/'+avatarName+'.json'
        var avatarjson=JSON.parse(readFileSync(readpath))
    }
}
function kuosan(avatarconfig,mainavatarpos,basedmg){
    var extradmg = 1
    switch(mainavatarpos){
        case 1:
            var avatarpos = mainavatarpos-1
            var extraAttackPos = [1,2]
            //判断是否有元素附着
            if (avatarconfig[avatarpos]["attachedElement"]!=null){
                var avatarElement=avatarconfig[avatarpos]["attachedElement"]
                //有元素残留，先判断元素残留种类
                switch(avatarconfig[avatarpos]["attachedElement"]){
                    case 3,5,6,7:
                        //水火雷冰元素残留，先判断主要受击角色血量是否高于basedmg，高于就直接减，若低于就直接赋值0,随后给附着元素赋值null，并给次要受击角色附加对应元素并扣1血
                        if (avatarconfig[avatarpos]["health"]>basedmg){
                            avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg //扣血
                        }
                        else{
                            avatarconfig[avatarpos]["health"]=0 //扣血
                        }
                        avatarconfig[avatarpos]["attachedElement"]=null  //清除元素
                        //判断次要受击角色血量是否大于1，小于等于直接赋值0，大于就扣血+赋元素附着
                        for (let i = 0 ; i<extraAttackPos.length;i++){
                            var attackpos=extraAttackPos[i]
                            var avatarhealth=avatarconfig[attackpos]["health"]
                            if (avatarhealth>1){
                                avatarhealth=avatarhealth-1
                                /*if(avatarconfig[attackpos]["attachedElement"]!=null){ //此处新增扩散完以后的副反应逻辑，没猜错的话又有11种
                                    switch(avatarconfig[attackpos]["attachedElement"]){
                                        case 1:
                                    }
                                }*/
                                avatarconfig[attackpos]["attachedElement"]=avatarElement
                            } else {
                                avatarhealth=0
                            }
                        }
                    case 4:
                        //草附着，直接判断血量然后扣血就好，元素附着不需要清除
                        if (avatarconfig[avatarpos]["health"]>basedmg){
                            avatarconfig[avatarpos]["health"]=avatarconfig[avatarpos]["health"]-basedmg //扣血
                        }
                        else{
                            avatarconfig[avatarpos]["health"]=0 //扣血
                        }

                }
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
    var avatarpos = avatarpos - 1
    var avatarAttachedElement=avatarconfig[avatarpos]["attachedElement"]
    var avatarHealth = avatarconfig[avatarpos]["health"]
    /*if (basedmg>avatarHealth){
        console.log("角色死掉了")
        avatarconfig[avatarpos]["health"]=0
    } else {
        */if (avatarAttachedElement==1){
            if (avatarAttachedElement!=null){
                switch(avatarAttachedElement){
                    case 3,5,6,7:
                        console.log("扩散")
                        switch(avatarpos){
                            case 0:
                                avatarconfig[avatarpos]["health"]=avatarHealth-basedmg
                                if (avatarconfig[avatarpos]["health"]<=0){
                                    console.log("角色死掉了")
                                    avatarconfig[avatarpos]["health"]=0
                                } else {
                                    avatarconfig[avatarpos]["attachedElement"]=null
                                }
                                avatarconfig[avatarpos+1]["attachedElement"]=avatarAttachedElement
                                avatarconfig[avatarpos+1]["health"]=avatarconfig[avatarpos+1]["health"]-1
                                if (avatarconfig[avatarpos+1]["health"]<=0){
                                    console.log("角色死掉了")
                                    avatarconfig[avatarpos+1]["health"]=0
                                } else {
                                    avatarconfig[avatarpos]["attachedElement"]=null
                                }
                                avatarconfig[avatarpos+2]["attachedElement"]=avatarAttachedElement
                                avatarconfig[avatarpos+2]["health"]=avatarconfig[avatarpos+2]["health"]-1
                                if (avatarconfig[avatarpos+2]["health"]<=0){
                                    console.log("角色死掉了")
                                    avatarconfig[avatarpos+2]["health"]=0
                                } else {
                                    avatarconfig[avatarpos]["attachedElement"]=null
                                }
                        }

                }
            }
        }
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