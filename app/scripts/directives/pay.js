(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:pay
    * @description
    * # pay
   */
  angular.module('iter001App').directive('pay', function($log, API_ENDPOINT, WEB_ENDPOINT) {
    return {
      restrict: 'AE',
      scope: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        return scope.$watch((function() {
          return scope.activatePayDirective;
        }), function(status) {
          var div, msg, msgStr;
          $log.debug("activate pay status changed to " + status + ", " + scope.openid + ", " + scope.totalPrice + ", " + scope.orderId);
          $log.debug(scope.orderDetails);
          msg = {};
          msg.touser = scope.openid;
          msg.template_name = "book_success";
          msg.url = WEB_ENDPOINT + "/static/map.html?tribe=" + scope.orderDetails.house.tribe;
          msg.data = {
            first: {
              value: "恭喜您预订" + scope.orderDetails.houseName + "成功，订单号为" + scope.orderDetails.orderId + ", 欢迎来" + scope.orderDetails.houseName
            },
            hotelName: {
              value: "" + scope.orderDetails.house.tribe
            },
            roomName: {
              value: "" + scope.orderDetails.house.name
            },
            pay: {
              value: "" + scope.orderDetails.totalPrice
            },
            date: {
              value: "" + scope.orderDetails.checkInDay
            },
            remark: {
              value: "漫生活管家联系方式 0571-64668358, 点击本消息查看驾车路线"
            }
          };
          msgStr = JSON.stringify(msg);
          $log.debug(msgStr);
          if (status) {
            div = angular.element("<div>");
            div.html("<script>\n  //todo: mark as pay in progress\n  //channel_type:  1. wx_pub  2. alipay_wap 3. alipay\n  $.ajax({\n    url: \"" + API_ENDPOINT + "/api/pingplus?channel_type=wx_pub&user_openid=" + scope.openid + "&total_price=" + scope.totalPrice + "&order_number=" + scope.orderId + "\"\n  }).then(function(data) {\n    console.log(data);\n    charge = data;\n    pingpp.createPayment(charge, function(result, error){\n      if (result == \"success\") {                     \n          alert (\"您已成功支付" + scope.totalPrice + "元，请通过服务号[客服] -> [订单查询]查看订单状态\");\n           $.ajax({\n              url: \"" + API_ENDPOINT + "/api/orders/" + scope.orderId + "\",\n              type: \"POST\",\n              data: JSON.stringify({ status: '预订成功'}),\n              contentType: \"application/json; charset=utf-8\",\n              dataType: \"json\"\n            }).then(function(data){\n              window.location.href = \"/#/close\";\n            }); \n      } else if (result == \"fail\") {                     \n          alert (\"支付失败, 请通过服务号[客服] -> [订单查询]继续完成支付或联系客服 010-88888888\");\n          $.ajax({\n              url: \"" + API_ENDPOINT + "/api/orders/" + scope.orderId + "\",\n              type: \"POST\",\n              //data: JSON.stringify({ status: '支付失败'}),\n              data: JSON.stringify({ status: '预订成功'}),\n              contentType: \"application/json; charset=utf-8\",\n              dataType: \"json\"\n            }).then(function(data){\n              window.location.href = \"/#/close\";\n            }); \n          $('#PayCtrl').scope().notifyUser('" + msgStr + "');\n      } else if (result == \"cancel\") {                     \n          alert (\"支付已取消! 请通过服务号[客服] -> [订单查询]继续完成支付或联系客服 010-88888888\");\n           $.ajax({\n              url: \"" + API_ENDPOINT + "/api/orders/" + scope.orderId + "\",\n              type: \"POST\",\n              data: JSON.stringify({ status: '支付被取消'}),\n              contentType: \"application/json; charset=utf-8\",\n              dataType: \"json\"\n            }).then(function(data){\n              window.location.href = \"/#/close\";\n            });\n      }\n    });\n  });\n</script>");
            return element.append(div);
          }
        });
      }
    };
  });

}).call(this);
