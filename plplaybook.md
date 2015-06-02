Perfect Lift Playbook
=====================

# [1] the web 
the web is an angularjs powered single page app running in mobile browser. invoke by user clicks on wechat rich-text messages.

## deploayment details
* ipaddress
```
{
  "host" : "119.29.114.143",
  "username" : "ubuntu",
  "password" : "$Sh7evxc"
}
```

* domain_name: www.mt5225.cc
* web server: nginx
* listenning port: 9000
* url: http://www.mt5225.cc:9000/#/
* document root:  /home/ubuntu/var/www
* grunt task: upload-dist

***

# [2] the backend
backend service for perfectlife web, including booking record persistence, wechat integration with js-sdk.
_note_ js-sdk need domain name certification 

## running
* run on local:  grunt local-run
* run on remote:  
 * ` cd /home/ubuntu/srviter01/bin `
 * ` forever start -a main.js `

## testing
### sign service
` curl localhost:3000/api/sign?url=http%3A%2F%2Fwww.mt5225.cc%3A9000%2FsignTest.html `
` curl www.mt5225.cc:3000/api/sign `

### userinfo service
` curl localhost:3000/api/userinfo?user_openid=o82BBs8XqUSk84CNOA3hfQ0kNS90 `
` curl www.mt5225.cc:3000/api/userinfo?user_openid=o82BBs8XqUSk84CNOA3hfQ0kNS90 `

### query an order given the wechat id
` curl -X GET -H "Content-Type: application/json" localhost:3000/orders/o82BBs8XqUSk84CNOA3hfQ0kNS90 `

### create an new order
curl -X POST -H "Content-Type: application/json" -d '{"orderId": "1", "houseId": "2", "checkInDay":"3", "checkOutDay": "4", "numOfGuest": "5", "wechatOpenID": "6", "wechatNickName": "7"}' localhost:3000/orders
### 
curl -X GET -H "Content-Type: application/json" localhost:3000/orders/6

###mongodb operation
- return all records in collection:  db.orders.find()
- delete all records in collection:  db.orders.remove({})




***

# [3] the answer machine
response to user inputs in wechat windows, including menus and rich-text messages.

* app root: /home/ubuntu/perfectlife/bin/app/js
* app entrypoint: main.js
* running daemon [as root]: <br>
` sudo forever start -a  /home/ubuntu/perfectlife/bin/app/js/main.js > /dev/null 2>&1 & `
* listenning port: 80
## testing
* use wechat phone client

# wechat account
##account mt5225@outlook.com

### test env setting
name | value
-----|------
app id | wxe2bdce057501817d
app secret | c907a867dc3deebff5c0b2c392c77b90
user open id | o82BBs8XqUSk84CNOA3hfQ0kNS90

### production env setting
name | value
-----|------
app id | wxe2bdce057501817d
app secret | 5ebb59c8e11586344e695dc91c03d159 

#Misc
## pass user_openid manually
` http://localhost:9000/#/?user_openid=o82BBs8XqUSk84CNOA3hfQ0kNS90 `


#Notes about wechat JS-JDK singature
## domain:  www.mt5225.cc:9000
## sign with location.href.split('#')[0] , which ,is fixed in my scenario:  


## create new order
`
http://qa.aghchina.com.cn:3000/api/orders 
POST
{
  checkInDay: "17 June, 2015"
  checkOutDay: "27 June, 2015",
  houseId: "H001"numOfGuest: "3",
  orderId: "4b8a-4e50",
  req002: true,
  wechatNickName: "蒋庆",
  wechatOpenID: "o82BBs8XqUSk84CNOA3hfQ0kNS90"
}
`
