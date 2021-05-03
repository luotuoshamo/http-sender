# 概述
* 可看成网页版的postman

* 应用场景：电脑装不了postman，chrome插件也装不了，网页版无法使用

* 目前仅支持发GET和POST请求

* 仅支持发标准的HTTP请求：get请求不带request body，post请求不带query string

# 使用

* 设置浏览器允许跨域

  1. 

  ![image-20210503170044253](readme.assets\image-20210503170044253.png)

  在**目标**的值后面加上  --disable-web-security --user-data-dir=D:\appData\chrome

  > dir：自定义一个存在的文件夹即可

  ![image-20210503170242591](readme.assets\image-20210503170242591.png)

2. 

![image-20210503170727827](readme.assets\image-20210503170727827.png)

> chrome://flags
>
> SameSite by default cookies

3. 发请求

   ![image-20210503171248325](readme.assets\image-20210503171248325.png)

  ![image-20210503171555422](readme.assets\image-20210503171555422.png)

![image-20210503171725188](readme.assets\image-20210503171725188.png)