var ones = {
    ar: {
      _0: "صفر",
      _1: "واحد",
      _2: "ٱثنين",
      _3: "ثلاثة",
      _4: "أربعة",
      _5: "خمسة",
      _6: "ستة",
      _7: "سبعة",
      _8: "ثمانية",
      _9: "تسعة"
    },
  
    en: {
      _0: "zero",
      _1: "one",
      _2: "two",
      _3: "three",
      _4: "for",
      _5: "five",
      _6: "six",
      _7: "seven",
      _8: "eight",
      _9: "nine"
    }
  };
  
  var teens = {
    ar: {
      _11: "أحد عشر",
      _12: "أثني عشر",
      _13: "ثلاثة عشر",
      _14: "أربعة عشر",
      _15: "خمسة عشر",
      _16: "ستة عشر",
      _17: "سبعة عشر",
      _18: "ثمانية عشر",
      _19: "تسعة عشر"
    },
  
    en: {
      _11: "eleven",
      _12: "twelve",
      _13: "thirteen",
      _14: "fourteen",
      _15: "fifteen",
      _16: "sixteen",
      _17: "seventeen",
      _18: "eighteen",
      _19: "nineteen"
    }
  };
  
  var tens = {
    ar: {
      _10: "عشرة",
      _20: "عشرون",
      _30: "ثلاثون",
      _40: "أربعون",
      _50: "خمسون",
      _60: "ستون",
      _70: "سبعون",
      _80: "ثمانون",
      _90: "تسعون"
    },
  
    en: {
      _10: "ten",
      _20: "twenty",
      _30: "thirty",
      _40: "forty",
      _50: "fifty",
      _60: "sixty",
      _70: "seventy",
      _80: "eighty",
      _90: "ninety"
    }
  };
  
  var hundreds = {
    ar: {
      _100: "مائة",
      _200: "مائتين",
      _300: "ثلاثمائة",
      _400: "أربعمائة",
      _500: "خمسمائة",
      _600: "ستمائة",
      _700: "سبعمائة",
      _800: "ثمانمائة",
      _900: "تسعمائة"
    },
  
    en: {
      _100: " hundred",
      _200: "Two hundred",
      _300: "Three hundred",
      _400: "Four hundred",
      _500: "Five hundred",
      _600: "Six hundred",
      _700: "Seven hundred",
      _800: "Eight hundred",
      _900: "Nine hundred"
    }
  };
  
  var thousands = {
    ar: {
      singular: "ألف",
      binary: "ألفين",
      plural: "الاف"
    },
  
    en: {
      singular: " thousand",
      binary: "two thousand",
      plural: "thousands"
    }
  };
  
  var milions = {
    ar: {
      singular: " مليون ",
      binary: "مليونين",
      plural: "ملايين"
    },
    en: {
      singular: " million",
      binary: "two million",
      plural: "millions"
    }
  };
  
  var bilions = {
    ar: {
      singular: "مليار",
      binary: "مليارين",
      plural: "مليارات"
    },
  
    en: {
      singular: "one billion",
      binary: "Two billion",
      plural: "Billions"
    }
  };
  
  var trilions = {
    ar: {
      singular: "ترليون",
      binary: "ترليونين",
      plural: "ترليونات"
    },
  
    en: {
      singular: "trillion",
      binary: "Two trillion",
      plural: "Trillions"
    }
  };
  var columns = ["trilions", "bilions", "milions", "thousands"];
  
  var _digit;
  var prefix;
  var suffix;
  var _lang;
  var and;
  
  function NumberToText() {
    "use strict";
 
  
  }
  
  NumberToText.prototype.settings = function(data) {
    "use strict";
    this.singular = data.currency ? data.currency : "";
    this.decimals = data.decimals ? data.decimals : 2;
    prefix = data.prefix ? data.prefix + " " : "";
    suffix = data.suffix ? " " + data.suffix : "";
  };
  
  NumberToText.prototype.parse = function(number, lang) {
    _digit = number;
    this.digit = number;
    _lang = lang;
    if (lang == "ar") {
      and = " و";
    } else {
      and = " ";
    }
  
    var serialized = [];
    var tmp = [];
    var inc = 1;
    var count = length();
    var column = getColumnIndex();
    if (count >= 16) {
      console.error("Number out of range!");
      return;
    }
    //Sperate the number into columns
    Array.from(this.digit.toString())
      .reverse()
      .forEach(function(d, i) {
        tmp.push(d);
        if (inc == 3) {
          serialized.unshift(tmp);
          tmp = [];
          inc = 0;
        }
        if (inc == 0 && count - (i + 1) < 3 && count - (i + 1) != 0) {
          serialized.unshift(tmp);
        }
        inc++;
      });
  
    // Generate concatenation array
    var concats = [];
    for (i = getColumnIndex(); i < columns.length; i++) {
      concats[i] = and;
    }
  
    //We do not need some "و"s check last column if 000 drill down until otherwise
    if (this.digit > 999) {
      if (parseInt(Array.from(serialized[serialized.length - 1]).join("")) == 0) {
        concats[parseInt(concats.length - 1)] = "";
        for (i = serialized.length - 1; i >= 1; i--) {
          if (parseInt(Array.from(serialized[i]).join("")) == 0) {
            concats[i] = "";
          } else {
            break;
          }
        }
      }
    }
  
    var str = "";
    str += prefix;
  
    if (length() >= 1 && length() <= 3) {
      str += read(this.digit);
    } else {
      for (var i = 0; i < serialized.length; i++) {
        var joinedNumber = parseInt(serialized[i].reverse().join(""));
        if (joinedNumber == 0) {
          column++;
          continue;
        }
        if (column == null || column + 1 > columns.length) {
          str += read(joinedNumber);
        } else {
          str += addSuffixPrefix(serialized[i], column) + concats[column];
        }
        column++;
      }
    }
  
    if (this.currency != "") {
      if (this.digit >= 3 && this.digit <= 10) {
        str += " " + this.singular;
      } else {
        str += " " + this.singular;
      }
  
    }
  
    str += suffix;
    return str;
  };
  
  var addSuffixPrefix = function(arr, column) {
    if (arr.length == 1) {
      if (parseInt(arr[0]) == 1) {
        return eval(columns[column])[_lang].singular;
      }
      if (parseInt(arr[0]) == 2) {
        return eval(columns[column])[_lang].binary;
      }
      if (parseInt(arr[0]) > 2 && parseInt(arr[0]) <= 9) {
        return (
          readOnes(parseInt(arr[0])) + " " + eval(columns[column])[_lang].plural
        );
      }
    } else {
      var joinedNumber = parseInt(arr.join(""));
      if (joinedNumber > 1) {
        return read(joinedNumber) + " " + eval(columns[column])[_lang].singular;
      } else {
        return eval(columns[column])[_lang].singular;
      }
    }
  };
  
  var read = function(d) {
    var str = "";
  
    var len = Array.from(d.toString()).length;
    if (len == 1) {
      str += readOnes(d);
    } else if (len == 2) {
      str += readTens(d);
    } else if (len == 3) {
      str += readHundreds(d);
    }
    return str;
  };
  
  var readOnes = function(d) {
    return ones[_lang]["_" + d.toString()];
  };
  
  var readTens = function(d) {
    if (Array.from(d.toString())[1] === "0") {
      return tens[_lang]["_" + d.toString()];
    }
    if (d > 10 && d < 20) {
      return teens[_lang]["_" + d.toString()];
    }
    if (d > 19 && d < 100 && Array.from(d.toString())[1] !== "0") {
      if (_lang == "ar") {
        return (
          readOnes(Array.from(d.toString())[1]) +
          and +
          tens[_lang]["_" + Array.from(d.toString())[0] + "0"]
        );
      } else {
        return (
          tens[_lang]["_" + Array.from(d.toString())[0] + "0"] +
          and +
          readOnes(Array.from(d.toString())[1])
        );
      }
    }
  };
  
  var readHundreds = function(d) {
    var str = "";
    str += hundreds[_lang]["_" + Array.from(d.toString())[0] + "00"];
  
    if (
      Array.from(d.toString())[1] === "0" &&
      Array.from(d.toString())[2] !== "0"
    ) {
      str += and + readOnes(Array.from(d.toString())[2]);
    }
  
    if (Array.from(d.toString())[1] !== "0") {
      str +=
        and +
        readTens(
          (Array.from(d.toString())[1] + Array.from(d.toString())[2]).toString()
        );
    }
    return str;
  };
  
  var length = function() {
    return Array.from(_digit.toString()).length;
  };
  
  var getColumnIndex = function() {
    var column = null;
    if (length() > 12) {
      column = 0;
    } else if (length() <= 12 && length() > 9) {
      column = 1;
    } else if (length() <= 9 && length() > 6) {
      column = 2;
    } else if (length() <= 6 && length() >= 4) {
      column = 3;
    }
    return column;
  };
  
  module.exports = NumberToText;
