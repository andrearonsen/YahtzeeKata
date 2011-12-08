var buster = require("buster");
var scoring = require("../lib/scoring");

(function (S) {
  "use strict"; 

  buster.assertions.add("score", {
    assert: function (roll, category, expected) {
      this.actual = S.calculate(roll, category);
      return buster.assertions.deepEqual(this.actual, expected);
    },

    assertMessage: "Scoring failed: Expected the roll ${0} placed on category ${1} to yield score ${2}, but was ${actual}."
  });

  buster.testCase('Scoring One - Six', {
    "should calculate score 5 for roll [1,1,1,1,2]]": function () {
      assert.score([1, 1, 1, 1, 2], "One", 4);
    }, 
    
    "should calculate score 10 for roll [2,2,2,2,3]": function () {
      assert.score([2, 2, 2, 2, 3], "Two", 8);  
    },

    "should calculate score 2 for roll [1,1,2,3,4]]": function () {
      assert.score([1, 1, 2, 3, 4], "One", 2); 
    },

    "should calculate score 4 for roll [2,2,3,4,5]": function () {
      assert.score([2, 2, 3, 4, 5], "Two", 4); 
    },

    "should calculate score 9 for roll [3,3,3,4,5]": function () {
      assert.score([3, 3, 3, 4, 5], "Three", 9); 
    },

    "should calculate score 4 for roll [4,1,2,3,5]": function () {
      assert.score([4, 1, 2, 3, 5], "Four", 4);
    },
 
    "should calculate score 15 for roll [5,5,1,2,3]": function () {
      assert.score([5, 5, 1, 2, 3], "Five", 10);
    },

    "should calculate score 12 for roll [1,6,1,6,1]": function () {
      assert.score([1, 6, 1, 6, 1], "Six", 12);
    },

    "should calculate score 0 for roll [1,2,3,4,4]": function () {
      assert.score([1, 2, 3, 4, 4], "Five", 0);
    }
  });

  buster.testCase("Scoring Yahtzee", {
    "should calculate score 50 for roll [1,1,1,1,1]]": function () {
      assert.score([1, 1, 1, 1, 1], "Yahtzee", 50);
    },

    "should calculate score 0 for roll [1,2,3,4,5]": function () {
      assert.score([1, 2, 3, 4, 5], "Yahtzee", 0);  
    }
  });

  buster.testCase("Scoring Chance", {
    "should calculate score 30 for roll [6,6,6,6,6]": function () {
      assert.score([6, 6, 6, 6, 6], "Chance", 30);
    },

    "should calculate score 15 for roll [1,2,3,4,5]": function () {
      assert.score([1, 2, 3, 4, 5], "Chance", 15);
    }
  });

  buster.testCase("Scoring SmallStraight", {
    "should calculate score 15 for small straight": function () {
      assert.score([1, 2, 3, 4, 5], "SmallStraight", 15); 
    },

    "should calculate score 0 when not small straight": function () {
      assert.score([1, 2, 3, 4, 4], "SmallStraight", 0);  
    } 
  });

  buster.testCase("Scoring LargeStraight", {
    "should calculate score 20 for large straight": function () {
      assert.score([2, 3, 4, 5, 6], "LargeStraight", 20);
    },

    "should calculate score 0 when not large straight": function () {
      assert.score([2, 3, 4, 5, 1], "LargeStraight", 0); 
    }
  });

  buster.testCase("Scoring FourOfAKind", {
    "should calculate score 4 for roll [1,1,1,1,x]": function () {
      assert.score([1, 1, 1, 1, 6], "FourOfAKind", 4);
    },

    "should calculate score 8 for roll [2,2,2,2,x]": function () {
      assert.score([2, 2, 2, 2, 6], "FourOfAKind", 8);
    },

    "should calculate score 24 for roll [6,6,6,6,x]": function () {
      assert.score([6, 6, 6, 6, 1], "FourOfAKind", 24);
    },
    
    "should calculate score 0 for not 4 of a kind": function () {
      assert.score([2, 2, 2, 1, 1], "FourOfAKind", 0);
    }
  });

  buster.testCase("Scoring Pair", {
    "should calculate score 2 when roll [1,1,2,3,4]": function () {
      assert.score([1, 1, 2, 3, 4], "Pair", 2); 
    },

    "should calculate score 12 when two pairs with highest pair of 6": function () {
      assert.score([1, 1, 6, 6, 2], "Pair", 12); 
    },

    "should calculate score 12 when four of a kind (6)": function () {
      assert.score([6, 6, 6, 6, 1], "Pair", 12);  
    },

    "should calculate score 0 when no pair": function () {
      assert.score([1, 2, 3, 4, 5], "Pair", 0); 
    }
  });

  buster.testCase("Scoring ThreeOfAKind", {
    "should calculate score 3 for roll [1,1,1,x,x]]": function () {
      assert.score([1, 1, 1, 2, 3], "ThreeOfAKind", 3);
    },

    "should calculate score 18 for roll [6,6,6,x,x]]": function () {
      assert.score([6, 6, 6, 2, 3], "ThreeOfAKind", 18);
    },
    
    "should calculate score 6 for 5 2's]": function () {
      assert.score([2, 2, 2, 2, 2], "ThreeOfAKind", 6);
    },

    "should calculate score 0 for roll without three of a kind]": function () {
      assert.score([1, 1, 2, 3, 4], "ThreeOfAKind", 0);
    }
  });

  buster.testCase("Scoring TwoPairs", {
    "should calculate score 6 for roll [1,1,2,2,6]": function () {
      assert.score([1, 1, 2, 2, 6], "TwoPairs", 6);
    },

    "should calculate score 22 for roll [6,6,5,5,1]": function () {
      assert.score([6, 6, 5, 5, 1], "TwoPairs", 22);  
    },

    "should calculate score 24 for four 6's": function () {
      assert.score([6, 6, 6, 6, 1], "TwoPairs", 24);  
    }          
  });

  buster.testCase("Scoring FullHouse", {
    "should calculate score 8 for roll [1,1,2,2,2]": function () {
      assert.score([1, 1, 2, 2, 2], "FullHouse", 8); 
    },

    "should calculate score 28 for roll [5,5,6,6,6]": function () {
      assert.score([5, 5, 6, 6, 6], "FullHouse", 28); 
    },

    "should calculate score 27 for roll [6,6,5,5,5]": function () {
      assert.score([6, 6, 5, 5, 5], "FullHouse", 27); 
    },

    "should calculate score 0 for yahtzee": function () {
      assert.score([6, 6, 6, 6, 6], "FullHouse", 0); 
    },

    "should calculate score 0 for nothing": function () {
      assert.score([1, 1, 2, 3, 4], "FullHouse", 0); 
    }
  });

}(scoring));



