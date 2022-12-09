import { GetAvatarElement } from './avatar.js'

export function GetDice(card,num,avatarconfig){ /*获取骰子*/ //测试通过
    var dicelist=new Array(num)    
    switch(card){
        case "none":
            for (i=0;i<num;i++){
                var element=Math.floor(Math.random()*8)
                dicelist[i]=element
            }
            break
        case "qunyuge":
            //获取角色元素，根据元素先给数组添加两个初始骰子，然后再执行getdice(none,num-2)
            var avatar_element=GetAvatarElement(avatarconfig)
            dicelist[0]=avatar_element
            dicelist[1]=avatar_element
            for (let i=2;i<num;i++){
                var element=Math.floor(Math.random()*8)
                dicelist[i]=element
            }
            break
    }
    return dicelist
}

export function GetDicename(dicelist,dicepos){ /*获取骰子名称*/ //测试通过
    const typeMap=
    {
        0:"万能",
        1:"风",
        2:"岩",
        3:"雷",
        4:"草",
        5:"水",
        6:"火",
        7:"冰"
    }
    var dicename=typeMap[dicelist[dicepos-1]]
    return dicename
}

export function ChangeDiceElement(dicelist,dicenum,changenum,method){
    var dicenum = dicenum-1
    switch(method){
        case 1: //测试通过
            //var avatarelement=getavatarelement()
            //TO DO:完善角色部分再说
            var avatar_element=null
            var dice_changed_element
            switch(avatar_element){
                case "风":
                    dice_changed_element=1
                    break
                case "岩":
                    dice_changed_element=2
                    break
                case "雷":
                    dice_changed_element=3
                    break
                case "草":
                    dice_changed_element=4
                    break
                case "水":
                    dice_changed_element=5
                    break
                case "火":
                    dice_changed_element=6
                    break
                case "冰":
                    dice_changed_element=7
                    break
            }
            dicelist[dicenum]=dice_changed_element
            break
        case 2: //测试通过
            for (i=0;i<changenum;i++){
                j=dicenum+i
                dicelist[j]=0
            }
            break
    }
    return dicelist
}