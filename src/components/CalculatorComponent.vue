<template>
  <div id="calculator-component">
    <ResultDisplayBar
      :input-history="inputHistoryDisplay"
      :calculated-result="calculatedResult"
    />
    <div id="calculator-component-button-container">
      <div id="calculator-component-number-button-group">
        <NumberButton
          displayValue="1"
          :numberValue="1"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="2"
          :numberValue="2"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="3"
          :numberValue="3"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="4"
          :numberValue="4"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="5"
          :numberValue="5"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="6"
          :numberValue="6"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="7"
          :numberValue="7"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="8"
          :numberValue="8"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="9"
          :numberValue="9"
          @child-event="calculate"
        />
        <NumberButton
          displayValue="0"
          :numberValue="0"
          @child-event="calculate"
        />
      </div>

      <div id="calculator-component-operation-button-group">
        <OperationButton
          displayValue="+"
          operationValue="+"
          @child-event="calculate"
        />
        <OperationButton
          displayValue="-"
          operationValue="-"
          @child-event="calculate"
        />
        <OperationButton
          displayValue="*"
          operationValue="*"
          @child-event="calculate"
        />
        <OperationButton
          displayValue="/"
          operationValue="/"
          @child-event="calculate"
        />
        <OperationButton
          displayValue="C"
          operationValue="C"
          @child-event="calculate"
        />

        <OperationButton
          displayValue="."
          operationValue="."
          @child-event="calculate"
        />
        <OperationButton
          displayValue="B"
          operationValue="B"
          @child-event="calculate"
        />
        <OperationButton
          displayValue="="
          operationValue="="
          @child-event="calculate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NumberButton from "./NumberButton.vue";
import OperationButton from "./OperationButton.vue";
import ResultDisplayBar from "./ResultDisplayBar.vue";
import BigDecimal from "js-big-decimal";

export default {
  name: "CalculatorComponent",
  components: {
    NumberButton,
    OperationButton,
    ResultDisplayBar,
  },
  data() {
    return {
      inputHistoryDisplay: "",
      inputHistoryList: [],
      calculatedResult: 0,
    };
  },
  methods: {
    calculate(val) {
      // TODO, handle first input is operator case
      // TODO, handle dobule click operator button case
      // TODO, handle input decimal case
      if (val === "C") {
        this.inputHistoryList = [];
        this.inputHistoryDisplay = "";
        this.calculatedResult = 0;
        return;
      }

      if (val === "B") {
        this.back();
        return;
      }

      if (val === "=") {
        // loop all inputHistoryList
        // find first * or /
        // find left and right value, until find any order operator
        // parse the left value and right value found, make the calculation
        // use the result to replace such 3 value position in inputHistoryList
        // start from first position of inputHistoryList repeat until no more * or /
        // start from first loop all inputHistoryList
        // find first + or -
        // find left and right value, until find any order operator
        // parse the left value and right value found, make the calculation
        // use the result to replace such 3 value position in inputHistoryList
        // until only 1 value left in calculatedResult
        // update result value to inputHistoryDisplay that sum the result to that
        // clear inputHistoryList

        // inputHistoryList is proxy, we need raw array to cal
        const result = this.executeOperatorCalculation(
          this.inputHistoryList.map((e) => e)
        );
        // this.inputHistoryList = [];
        // this.inputHistoryList = [result];
        this.calculatedResult = result;
        return;
      }
      this.updateDisplayHistory(val);
      console.log(this.inputHistoryDisplay);
      console.log(this.inputHistoryList);
    },
    executeOperatorCalculation(actionList) {
      console.log("executeOperatorCalculation");
      const mutiOrDivResult = this.executeMutiOrDivCalculation(actionList);
      console.log("mutiOrDivResult: " + mutiOrDivResult);
      const sumOrMinuResult =
        this.executeSumOrMinusCalculation(mutiOrDivResult);
      console.log("sumOrMinuResult: " + sumOrMinuResult);
      // console.log(new BigDecimal(sumOrMinuResult[0]).round(2));
      return sumOrMinuResult[0];
    },
    executeMutiOrDivCalculation(actionList) {
      return this.divideAndConquer(["*", "/"], actionList);
    },
    executeSumOrMinusCalculation(actionList) {
      return this.divideAndConquer(["+", "-"], actionList);
    },
    divideAndConquer(operatorArray, actionList) {
      const actionListLength = actionList.length;
      if (!this.isContainAnyOperator(operatorArray, actionList)) {
        return actionList;
      }

      var fistOperatorPosition = 0;
      var currentOperator = "";
      for (var i = 0; i < actionListLength; i++) {
        if (this.isOperatorByType(actionList[i], operatorArray)) {
          fistOperatorPosition = i;
          currentOperator = actionList[i];
          break;
        }
      }
      const leftPart = actionList.slice(0, fistOperatorPosition);
      const rightPart = actionList.slice(
        fistOperatorPosition + 1,
        actionListLength
      );
      console.log("leftPart: " + leftPart);
      console.log("rightPart: " + rightPart);
      // reverse that left part start from right to left, as for loop start from left
      const leftPartNumberArray = this.extractNumberPartUntilOperator(
        leftPart.map((x) => x).reverse()
      ).reverse();
      const rightPartNumberArray =
        this.extractNumberPartUntilOperator(rightPart);
      console.log("leftPartNumberArray: " + leftPartNumberArray);
      console.log("rightPartNumberArray: " + rightPartNumberArray);
      const leftPartNumberArrayLength = leftPartNumberArray.length;
      const rightPartNumberArrayLength = rightPartNumberArray.length;
      const leftPartNumberArrayNumber = Number.parseFloat(
        leftPartNumberArray.join("")
      );
      const rightPartNumberArrayNumber = Number.parseFloat(
        rightPartNumberArray.join("")
      );
      console.log("leftPartNumberArrayNumber: " + leftPartNumberArrayNumber);
      console.log("rightPartNumberArrayNumber: " + rightPartNumberArrayNumber);
      const resultNumber = this.parseAndExecuteOperatorCalculation(
        leftPartNumberArrayNumber,
        rightPartNumberArrayNumber,
        currentOperator
      );
      console.log("resultNumber: " + resultNumber);
      // clean the consumed left and right number and return new array

      // clean left number
      console.log("leftPartNumberArrayLength: " + leftPartNumberArrayLength);
      const newLeftPart = leftPart.slice(
        0,
        leftPart.length - leftPartNumberArrayLength
      );
      console.log("newLeftPart: " + newLeftPart);
      // clean right number
      console.log("rightPartNumberArrayLength: " + rightPartNumberArrayLength);
      const newRightPart = rightPart.slice(
        rightPartNumberArrayLength,
        rightPart.length
      );
      console.log("newRightPart: " + newRightPart);
      newLeftPart.push(resultNumber);
      const finalArray = newLeftPart.concat(newRightPart);
      console.log("finalArray" + finalArray);
      return this.divideAndConquer(operatorArray, finalArray);
    },
    extractNumberPartUntilOperator(array) {
      var resultArray = [];
      const arrayLength = array.length;
      if (arrayLength === 1) {
        return array;
      }
      for (var i = 0; i < arrayLength; i++) {
        const needle = array[i];
        if (this.isOperator(needle)) {
          break;
        } else {
          resultArray.push(needle);
        }
      }

      return resultArray;
    },
    isOperator(needle) {
      if (
        this.isMutiOrDivOperator(needle) ||
        this.isSumOrMinusOperator(needle)
      ) {
        return true;
      }
      return false;
    },
    isOperatorByType(needle, operatorArrayToTest) {
      return operatorArrayToTest.includes(needle);
    },
    isMutiOrDivOperator(needle) {
      if (needle === "*" || needle === "/") {
        return true;
      }
      return false;
    },
    isSumOrMinusOperator(needle) {
      if (needle === "+" || needle === "-") {
        return true;
      }
      return false;
    },
    isContainAnyOperator(operatorToTest, actionList) {
      var testResult = false;
      for (var i = 0; i < operatorToTest.length; i++) {
        if (actionList.includes(operatorToTest[i])) {
          testResult = true;
          break;
        }
      }
      return testResult;
    },
    parseAndExecuteOperatorCalculation(numberOne, numberTwo, operator) {
      const bigDecimalNumberOne = new BigDecimal(numberOne);
      const bigDecimalNumberTwo = new BigDecimal(numberTwo);
      var result = 0;
      if (operator === "+") {
        result = bigDecimalNumberOne.add(bigDecimalNumberTwo);
      } else if (operator === "-") {
        result = bigDecimalNumberOne.subtract(bigDecimalNumberTwo);
      } else if (operator === "*") {
        result = bigDecimalNumberOne.multiply(bigDecimalNumberTwo);
      } else if (operator === "/") {
        result = bigDecimalNumberOne.divide(bigDecimalNumberTwo);
      }
      return result.getValue();
    },
    back() {
      this.inputHistoryList.pop();
      this.inputHistoryDisplay = this.inputHistoryList.join("");
      console.log("back: " + this.inputHistoryList);
      console.log("inputHistoryDisplay: " + this.inputHistoryDisplay);
    },
    updateDisplayHistory(value) {
      if (this.inputHistoryDisplay !== "") {
        this.inputHistoryDisplay = this.inputHistoryDisplay + " " + value;
      } else {
        this.inputHistoryDisplay = value;
      }
      this.inputHistoryList.push(value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#calculator-component {
  width: 600px;
  height: 600px;
  border: solid;
}

#calculator-component-number-button-group {
  width: 350px;
  height: 500px;
  border: solid;
}

#calculator-component-operation-button-group {
  width: 250px;
  height: 500px;
  border: solid;
}

#calculator-component-button-container {
  display: flex;
}
</style>
