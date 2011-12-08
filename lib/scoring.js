var YAHTZEE = this.YAHTZEE || {};

(function () {
  "use strict";

  var strategy = (function () {
    var strategies = [];
 
    function simpleNameMatcher(category) { 
      return function (matchCategory) {
        return category === matchCategory;
      };  
    }
          
    var strategy_if = {};

    var nullStrategy = {
      match: function (category) { return true; },
      calculate: function (roll) { return 0; }
    };

    strategy_if.add = function (name, spec) {
      var newStrategy = {
        name: name,
        calculate: spec.calculate,
        match: nullStrategy.match
      };
      
      if (spec.match) {
        newStrategy.match = spec.match;
      } else if (name) {
        newStrategy.match = simpleNameMatcher(name);
      }
      
      strategies.push(newStrategy);
    };

    strategy_if.find = function (category) {
      var matches = strategies.filter(function (s) {
        return s.match(category);
      });
      return matches.length > 0 ? matches[0] : nullStrategy;
    };

    strategy_if.oneToSixMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5, Six: 6 }; 
    
    return strategy_if;
  }());

  function add(a, b) {
    return a + b;
  }

  function sumElementsOfKind(roll, kind) {
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
    var a, b, i;

    if (len !== roll2.length) {
      return false;
    }

    a = roll1.sort();
    b = roll2.sort();

    for (i = 0; i < len; i += 1) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  function findRepeatedNumbers(roll, count) {
    return [6, 5, 4, 3, 2, 1].map(function (x) {
      return {
        dice: x,
        count: roll.filter(function (el) { return el === x; }).length
      };
    }).filter(function (c) { return c.count >= count; });
  }

  function findHighestRepeatedNumber(roll, count) {
    var repeated = findRepeatedNumbers(roll, count);
    return repeated.length >= 1 ? repeated[0].dice : 0; 
  }

  function findSumHighestRepeatedNumber(roll, count) {
    return findHighestRepeatedNumber(roll, count) * count;
  }

  function calculateScore(roll, category) {
    return strategy.find(category).calculate(roll);
  }

  strategy.add("One to Six", {
    match: function (category) { 
      this.category = category;
      return strategy.oneToSixMap[category] ? true : false; 
    },
    calculate: function (roll) { 
      return sumElementsOfKind(roll, strategy.oneToSixMap[this.category]); 
    }
  });

  strategy.add("Pair", {
    calculate: function (roll) { 
      return findSumHighestRepeatedNumber(roll, 2); 
    }
  });

  strategy.add("TwoPairs", {
    calculate: function (roll) { 
      var repnum = findRepeatedNumbers(roll, 2);
      if (repnum.length === 1 && repnum[0].count === 4) {
        return repnum[0].dice * 4;
      }
      return repnum.length === 2 ? repnum[0].dice * 2 + repnum[1].dice * 2 : 0; 
    }
  });

  strategy.add("ThreeOfAKind", {
    calculate: function (roll) { 
      return findSumHighestRepeatedNumber(roll, 3); 
    }
  });

  strategy.add("FourOfAKind", {
    calculate: function (roll) { 
      return findSumHighestRepeatedNumber(roll, 4); 
    }
  });

  strategy.add("SmallStraight", {
    calculate: function (roll) { 
      return rollEquals(roll, [1, 2, 3, 4, 5]) ? 15 : 0; 
    }
  });

  strategy.add("LargeStraight", {
    calculate: function (roll) { 
      return rollEquals(roll, [2, 3, 4, 5, 6]) ? 20 : 0; 
    }
  });

  strategy.add("FullHouse", {
    calculate: function (roll) { 
      var repnum2 = findRepeatedNumbers(roll, 2).filter(function (r) { return r.count === 2; });
      var repnum3 = findRepeatedNumbers(roll, 3).filter(function (r) { return r.count === 3; });
      if (repnum2.length !== 1 || repnum3.length !== 1 || repnum2[0].dice === repnum3[0].dice) {
        return 0;
      }
      
      return repnum2[0].dice * 2 + repnum3[0].dice * 3; 
    }
  });

  strategy.add("Yahtzee", {
    calculate: function (roll) { 
      return allElementsAreEqual(roll) ? 50 : 0; 
    }
  });
  
  strategy.add("Chance", {
    calculate: function (roll) { 
      return roll.reduce(add, 0); 
    }
  });

  YAHTZEE.scoring = {
    calculate: calculateScore
  };
}());

module.exports = YAHTZEE.scoring;
