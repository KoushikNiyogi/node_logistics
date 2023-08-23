/*
Am I Perfect?

Write a function that tells if a given number is perfect or not. A number is called perfect if the sum of the factors of a number (excluding the number itself) is the number itself.
Output
Return “Perfect” if the number is perfect
if the sum of factors is greater than the input return “Abundant”
if the sum of factors is lesser than the input return “Deficient”.
Example:

1) 6 -> factors(1,2,3) -> sum (1+2+3) = 6 (perfect number)
2) 12 -> factors(1,2,3,4,6) -> sum(1+2+3+4+6) = 16 > 12 (Abundant)
3) 8 -> factors(1,2,4) -> sum(1+2+4) = 7 < 8 (Deficient)

*/



function main(number){
    return perfect_number(number)
} 
function perfect_number(number){
    let array = []
    for(let i=1;i<number;i++){
        if(number%i==0){
            array.push(i)
        }
    }
    let sum = 0;
    for(let i=0;i<array.length;i++){
        sum+=array[i]
    }
    if(sum>number){
       return "Abundant"
    }else if(number>sum){
       return "Deficient" 
    }else{
       return "Perfect Number"
    }
}
let number1 = main(6);
console.log(number1)
let number2 = main(12);
console.log(number2)
let number3 = main(8)
console.log(number3)
