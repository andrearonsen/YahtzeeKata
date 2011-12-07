"use strict";

var buster = require("buster");
var scoring = require("../lib/scoring");

(function (S) {
  
  buster.assertions.add("score", {
    assert: function (roll, category, expected) {
      this.actual = S.calculate(roll, category);
      return buster.assertions.deepEqual(this.actual, expected);
    },

    assertMessage: "Scoring failed: Expected the roll ${0} placed on category ${1} to yield score ${2}, but was ${actual}."
  });

  buster.testCase('Scoring One - Six', {
    "should calculate score 5 for roll [1,1,1,1,2] placed on One]": function () {
      assert.score([1,1,1,1,2], "One", 4);
    }, 
    
    "should calculate score 10 for roll [2,2,2,2,3] placed on Two": function () {
      assert.score([2,2,2,2,3], "Two", 8);  
    },

    "should calculate score 2 for roll [1,1,2,3,4] placed on One]": function () {
      assert.score([1,1,2,3,4], "One", 2); 
    },

    "should calculate score 4 for roll [2,2,3,4,5] placed on Two": function () {
      assert.score([2,2,3,4,5], "Two" , 4); 
    },

    "should calculate score 9 for roll [3,3,3,4,5] placed on Three": function () {
      assert.score([3,3,3,4,5], "Three", 9); 
    },

    "should calculate score 4 for roll [4,1,2,3,5] placed on Four": function () {
      assert.score([4,1,2,3,5], "Four", 4);
    },
 
    "should calculate score 15 for roll [5,5,1,2,3] placed on Five": function () {
      assert.score([5,5,1,2,3], "Five", 10);
    },

    "should calculate score 12 for roll [1,6,1,6,1] placed on Six": function () {
      assert.score([1,6,1,6,1], "Six", 12);
    },

    "should calculate score 0 for roll [1,2,3,4,4] placed on Five": function () {
      assert.score([1,2,3,4,4], "Five", 0);
    }
  });

  buster.testCase("Scoring Yahtzee", {
    "should calculate score 50 for roll [1,1,1,1,1] placed on Yahtzee]": function () {
      assert.score([1,1,1,1,1], "Yahtzee", 50);
    },

    "should calculate score 0 for roll [1,2,3,4,5] placed on Yahtzee": function () {
      assert.score([1,2,3,4,5], "Yahtzee", 0);  
    }
  });

  buster.testCase("Scoring Chance", {
    "should calculate score 30 for roll [6,6,6,6,6] placed on Chance": function () {
      assert.score([6,6,6,6,6], "Chance", 30);
    },

    "should calculate score 15 for roll [1,2,3,4,5] placed on Chance": function () {
      assert.score([1,2,3,4,5], "Chance", 15);
    }
  });

  buster.testCase("Scoring SmallStraight", {
    "should calculate score 15 for small straight placed on SmallStraight": function () {
      assert.score([1,2,3,4,5], "SmallStraight", 15); 
    },

    "should calculate score 0 when not small straight placed on SmallStraight": function () {
      assert.score([1,2,3,4,4], "SmallStraight", 0);  
    } 
  });

}(scoring));



