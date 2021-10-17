
//使用XMLHttpRequest对象封装Ajax请求，实现效果仿照jQuery Ajax
const http = {
    /** 调用方法*/
    ajax:function(settings){
        //参数解析及校验
        var _s = Object.assign({
            type:'GET', //请求方式
            dataType:'json',    //期望返回数据类型
            url :'',
            async:true,
            data:null,
            headers:{},
            timeout:0,//默认不设置超时
            beforeSend:function(xhr){},
            success:function(result,status,xhr){},
            error:function(result,status,xhr){},
            complete:function(result,status,xhr){}
        },settings);

        if(!_s.type || !_s.url || !_s.dataType || _s.async===undefined){
            alert("参数错误"); return;
        };
        //创建request对象
        var xhr = new XMLHttpRequest();
        //相应状态监听
        xhr.addEventListener("loadstart",function(){
            _s.beforeSend(xhr);
        });
        xhr.addEventListener("load",function(){
            const status = xhr.status;
            var result;
            if((status >= 200 && status < 300) || status === 304){
                switch (xhr.responseType){
                    case "document":
                        result = xhr.responseXML;
                        break;
                    case "text":
                        result = xhr.responseText;
                        break;
                    default:
                        result = xhr.response;
                        break;
                }
                //状态码200表示请求发送城东，不表示业务处理成功
                _s.success(result,status,xhr);
            }else{
                _s.error(result,status,xhr);
            }
        });
        xhr.addEventListener("loadend",function(e){
            _s.complete(xhr,xhr.status);
        });
        xhr.addEventListener("error",function(e){
            _s.error(xhr,xhr.status,e);
        });
        //----超时监听
        xhr.addEventListener("timeout",function(e){
            _s.error(xhr,408,e);
        });

        //初始化请求，与服务器建立连接
        var useUrlParam = false;
        var sType = _s.type.toUpperCase();
        //如果是简单请求，将参数组装在url上
        if(_s.type=="GET" || _s.type=="DELETE"){
            useUrlParam = true;
            //拼接url参数
            _s.url += http.getUrlParam(_s.url,_s.data);
        }
        xhr.open(_s.type,_s.url,_s.async);
        xhr.responseType = _s.dataType;
        for(var key in _s.headers){
            xhr.setRequestHeader(key, _s.headers[key]);
        }
        if(_s.async && _s.timeout){
            xhr.timeout = _s.timeout;
        }

        //发送请求
        try{
            xhr.send(useUrlParam? null : http.getQueryData(_s.data));
        }catch (e){
            console.log("请求发送失败！");
        }
    },
    getUrlParam:function (url,data){
        if(!data) return;
        var paramStr = (typeof data =="object")? http.getQueryString(data) : data;
        return url.indexOf("?")!= -1? paramStr : "?"+paramStr;
    },
    /** 其他内部方法*/
    getQueryString:function(data){
        var paramsArr = [];
        if(data instanceof Object){
            Object.keys(data).forEach(function(key){
                var value = data[key];
                if(value instanceof Date){
                    //to deal with service api
                }
                paramsArr.push(encodeURIComponent(key) +'=' + encodeURIComponent(value));
            })
        }
        return paramsArr.join('%');
    },
    getQueryData:function(data){
        if(!data) return null;
        if(typeof data ==="string") return data;
        if(data instanceof FormData) return data;
        return http.getQueryString(data);
    },

    /**
     * 根据实际业务情况装饰 ajax 方法
     * 如:统一异常处理,添加http请求头,请求展示loading等
     * @param settings
     */
    request: function(settings) {
        // 统一异常处理函数
        var errorHandle = function(xhr, status) {
            console.log('request error...');
            if (status === 401) {
                console.log('request 没有权限...');
            }
            if (status === 408) {
                console.log('request timeout');
            }
        };
        // 使用before拦截参数的 beforeSend 回调函数
        settings.beforeSend = (settings.beforeSend || function () {
        }).before(function(xhr){
            console.log('request show loading...');
        });
        // 保存参数success回调函数
        var successFn = settings.success;
        // 覆盖参数success回调函数
        settings.success = function(result, status, xhr) {
            // todo 根据后台api判断是否请求成功
            if (result && result instanceof Object && result.code !== 1) {
                errorHandle(xhr, status);
            } else {
                console.log('request success');
                successFn && successFn(result, status, xhr);
            }
        };
        // 拦截参数的 error
        settings.error = (settings.error || function () {
        }).before(function(result, status, xhr) {
            errorHandle(xhr, status);
        });
        // 拦截参数的 complete
        settings.complete = (settings.complete || function () {
        }).after(function(xhr, status) {
            console.log('request hide loading...');
        });
        // 请求添加权限头,然后调用http.ajax方法
        (http.ajax.before(http.addAuthorizationHeader))(settings);
    },
    // 添加权限请求头
    addAuthorizationHeader: function(settings) {
        settings.headers = settings.headers || {};
        const headerKey = 'Authorization'; // todo 权限头名称
        // 判断是否已经存在权限header
        var hasAuthorization = Object.keys(settings.headers).some(function(key) {
            return key === headerKey;
        });
        if (!hasAuthorization) {
            settings.headers[headerKey] = 'test'; // todo 从缓存中获取headerKey的值
        }
    },

    get: function (url, data, successCallback, dataType) {
        http.request({
            url: url,
            type: 'GET',
            dataType: dataType||"json",
            data: data,
            success: successCallback
        });
    },
    delete2: function(url, data, successCallback, dataType) {
        http.request({
            url: url,
            type: 'DELETE',
            dataType: dataType||"json",
            data: data,
            success: successCallback
        });
    },
    // 调用此方法,参数data应为查询字符串或普通对象
    post: function(url, data, successCallback, dataType){
        http.request({
            url: url,
            type: 'POST',
            dataType: dataType||"json",
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            success: successCallback
        });
    },
    // 调用此方法,参数data应为json字符串
    postBody: function(url, data, successCallback, dataType) {
        http.request({
            url: url,
            type: 'POST',
            dataType: dataType||"json",
            data: data,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            success: successCallback
        });
    }
};

Function.prototype.before = function (beforeFn) { // eslint-disable-line
    var _self = this;
    return function () {
        beforeFn.apply(this, arguments);
        _self.apply(this, arguments);
    };
};

Function.prototype.after = function (afterFn) { // eslint-disable-line
    var _self = this;
    return function () {
        _self.apply(this, arguments);
        afterFn.apply(this, arguments);
    };
};

