/*
Catch the fish

Long lost in the Viking village, you and 3 others are lost and looking for food. Lucky for you guys find a river that has plenty of fish. You gather around to catch and realize that everyone going together to catch is not an efficient way, since the fish moves downwards along with the flow of the river.
So you guys follow a pattern where every (Kth) fish is hit by the 2nd guy. Every (Lth) fish is hit by the 3rd guy, and every (Mth) fish gets hit by the 4th guy. Finally every (Nth) fish you hit it yourself.
So, your job is to find the efficiency of hitting fish, given the total number of fish and the pattern followed.
Write a function that takes k,l,m,n, total as input and returns how many fishes get hit by the above pattern.
Example:

K: 1, L: 2, M: 3, N: 4, Total: 12
Output: 12
- Explanation: every Kth fish got hit by the 1st guy (k=1), the fish was still hit by other patterns but k=1 was sufficient to hit all fishes, so the output is 12.
K: 2, L: 3, M: 4, N: 5, Total: 24
Output: 17
Explanation: 
According to the pattern, fish numbers 1, 7, 11, 13, 17, 19, and 23 escape without getting hit by either of the 4 people.

*/


function main(){
    let k = 2;
    let l = 3;
    let m = 4;
    let n = 5;
    let total = 24;
    fish_count(k,l,m,n,total)
}
function fish_count(k,l,m,n,total){
    let count = 0;
    for(let i=1;i<=total;i++){
        if(i%k==0||i%l==0||i%m==0||i%n==0){
            count++;
        }
    }
    console.log(count)
}

main()