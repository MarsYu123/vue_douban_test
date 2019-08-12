export default{
    install (Vue,options){
        Vue.prototype.verify_name = function (name) {
            var _name = name;
            var null_reg = /\s/;
            var is_name = new RegExp("[@#\$%\^&\*]+$");
            var state= ''
            if(null_reg.test(_name)){
                state = 'is_null'
            }else{
                if(is_name.test(_name)){
                    state = 'is_illegal'
                }else{
                    state = true
                }
            }
            return state
        }     
    }
}