/*
Greater than and less than in a matrix

Detect values in a matrix that is greater than or equal to every element in its row and less than or equal to every element in its column.
So say you have a matrix-like so:
    1  2  3
  |---------
1 | 7  8  7
2 | 5  4  2    value at column 1, row 2, with 5 (Ans)
3 | 8  6  7
A matrix may have zero or more values like these which are greater than or equal and less than or equal.
Your code should be able to provide a list of all the values for any given matrix. If no values are found it should return an empty list.
The matrix can have a different number of rows and columns (Non-square matrix).

*/


function matrix_values(matrix,n,m){
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            let max = matrix[i][j];
            let greater_equal = true;
            for(let k=0;k<m;k++){
               if(j == k){
                   continue;
               }
               if(max<matrix[i][k]){
                   greater_equal = false;
                   break
               }
            }
            let min = matrix[i][j];
            let lesser_equal = true;
            let string = ""
            for(let l=0;l<n;l++){
                if(l==i){
                    continue
                }
                if(min>matrix[l][j]){
                    lesser_equal = false;
                    break;
                }
            }
            console.log(greater_equal,lesser_equal)
        }
    }
}
let matrix = [[7,8,7],[5,4,2],[8,6,7]]
matrix_values(matrix,3,3)