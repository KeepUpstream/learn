var bt = document.getElementById("bt1");
bt.onclick = function(){
    console.log(this);
    console.log(arguments);

    //请求
    http.ajax({
        url: "www.baidu.com",
        type: 'POST',
        data: {name: '哈哈', age: 12}, //或 data: 'name=哈哈&age=12',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        beforeSend: function(xhr)  {
            console.log('request show loading...');
        },
        success: function (result, status, xhr) {
            console.log('request success...');
        },
        error: function(xhr, status, error) {
            console.log('request error...');
        },
        complete: function(xhr, status) {
            console.log('request hide loading...');
        }
    });

    http.request({
        url: "www.baidu.com" + '?name=哈哈哈哈&age=1212',
        success: function (result, status, xhr) {
            console.log('进行业务操作');
        }
    });

};
