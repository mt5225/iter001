'use strict'

###*
 # @ngdoc service
 # @name iter001App.verifyService
 # @description
 # # verifyService
 # Service in the iter001App.
###
angular.module 'iter001App'
  .service 'verifyService', ($log)->
    return {
      isPhone: (aPhone) ->
        bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone)
        if bValidate
          true
        else
          false

      isEmail: (aEmail) ->
        bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(aEmail)
        #escape email verification
        bValidate = true
        if bValidate
          true
        else
          false
          
      isIdCardNo :(num) ->
          num = num.toUpperCase()
          #身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。       
          if !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)
            return { status: false, msg: '身份证号长度不正确或不符合规定！'}
          #验证前2位，城市符合
          aCity = 
            11: '北京'
            12: '天津'
            13: '河北'
            14: '山西'
            15: '内蒙古'
            21: '辽宁'
            22: '吉林'
            23: '黑龙江 '
            31: '上海'
            32: '江苏'
            33: '浙江'
            34: '安徽'
            35: '福建'
            36: '江西'
            37: '山东'
            41: '河南'
            42: '湖北'
            43: '湖南'
            44: '广东'
            45: '广西'
            46: '海南'
            50: '重庆'
            51: '四川'
            52: '贵州'
            53: '云南'
            54: '西藏'
            61: '陕西'
            62: '甘肃'
            63: '青海'
            64: '宁夏'
            65: '新疆'
            71: '台湾'
            81: '香港'
            82: '澳门'
            91: '国外'
          if aCity[parseInt(num.substr(0, 2))] == null
            return { status: false, msg: '身份证号城市字段不正确或不符合规定！'}
          #下面分别分析出生日期和校验位
          len = undefined
          re = undefined
          len = num.length
          if len == 15
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
            arrSplit = num.match(re)
            #检查生日日期是否正确
            dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            bGoodDay = undefined
            bGoodDay = dtmBirth.getYear() == Number(arrSplit[2]) and dtmBirth.getMonth() + 1 == Number(arrSplit[3]) and dtmBirth.getDate() == Number(arrSplit[4])
            if !bGoodDay
              return { status: false, msg: '身份证号的出生日期不对'}
            else
              return {status: true}
          if len == 18
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
            arrSplit = num.match(re)
            #检查生日日期是否正确
            dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            bGoodDay = undefined
            bGoodDay = dtmBirth.getFullYear() == Number(arrSplit[2]) and dtmBirth.getMonth() + 1 == Number(arrSplit[3]) and dtmBirth.getDate() == Number(arrSplit[4])
            if !bGoodDay
              return { status: false, msg: '身份证号的出生日期不对'}
            else
              #检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
              valnum = undefined
              arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
              arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
              nTemp = 0
              i = undefined
              i = 0
              while i < 17
                nTemp += num.substr(i, 1) * arrInt[i]
                i++
              valnum = arrCh[nTemp % 11]
              if valnum != num.substr(17, 1)
                return { status: false, msg: '18位身份证号的校验码不正确！'}
              else
                return {status: true}
          return { status: false, msg: '身份证号格式不正确'}
    }
