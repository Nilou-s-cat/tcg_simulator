let fs = require('fs')
function getdice(num){ /*获取骰子*/
    var dicelist=new Array(num)
    for (i=0;i<num;i++){
        var element=Math.floor(Math.random()*8)
        dicelist[i]=element
    }
    return dicelist
}
function getdicename(dicenum){ /*获取骰子名称*/
    var dicename
    switch(dicenum*1){
        case 0:
            dicename="万能"
            break;
        case 1:
            dicename="风"
            break;
        case 2:
            dicename="岩"
            break;
        case 3:
            dicename="雷"
            break;
        case 4:
            dicename="草"
            break;
        case 5:
            dicename="水"
            break;
        case 6:
            dicename="火"
            break;
        case 7:
            dicename="冰"
            break;
    }
    return dicename
}
