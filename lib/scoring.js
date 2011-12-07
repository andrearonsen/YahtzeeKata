var YAHTZEE = this.YAHTZEE || {};

(function () {
  "use strict";
  
  var oneToSixMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5, Six: 6 };

  var oneToSixStrategy = {
    match: function (category) { 
      this.category = category;
      return oneToSixMap[category]? true : false 
    },
    calculate: function (roll) { 
      return addElementsOfKind(roll, oneToSixMap[this.category]); 
    }
  };

  var scoreStrategies = [
   oneToSixStrategy
  ];

  function add(a, b) {
    return a + b;
  }

  function addElementsOfKind(roll, kind) {
    return roll.filter(function (element) {
      return element === kind;
    }).reduce(add, 0);
  }

  function allElementsAreEqual(roll) {
    var firstElement = roll[0];
    return roll.every(function (element) {
      return element === firstElement;
    });
  }

  function rollEquals(roll1, roll2) {
    var len = roll1.length;
    if (len !== roll2.length) return false;

    var a = roll1.sort();
    var b = roll2.sort();

    for (var i = 0; i < len; i += 1) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  function calculateScore(roll, category) {
    if (oneToSixStrategy.match(category)) {
      return oneToSixStrategy.calculate(roll);
    } else if (category === "Yahtzee") {
      return allElementsAreEqual(roll)? 50 : 0;
    } else if (category === "Chance") {
      return roll.reduce(add, 0);
    } else if (category === "SmallStraight") {
      return rollEquals(roll, [1,2,3,4,5])? 15 : 0;
    }

    return undefined;  
  }

  YAHTZEE.scoring = {
    calculate: calculateScore
  };
}());

module.exports = YAHTZEE.scoring;
