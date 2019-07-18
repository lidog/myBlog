/**
 * Created by lizhenhua on 2019/4/6.
 */
class BaseModel {
    constructor(data,message){
        if(typeof data === "string"){
            this.msg = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.msg = message
        }
    }
}

class SucModel extends BaseModel {
    constructor(data,message){
        super(data,message)
        this.httpCode = 200
    }
}

class ErrModel extends  BaseModel {
    constructor(message,httpCode){
        super(message)
        this.httpCode = httpCode || 405
    }
}

module.exports = {
    SucModel,
    ErrModel,
}