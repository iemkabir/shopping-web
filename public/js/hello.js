// complete the function
function solution(string) {
 let str = "";
  let newArr = string.split("");
  //console.log(newArr)
  for(let x = 0; x < newArr.length; x++){
    if(newArr[x] === newArr[x].toUpperCase()){
     // console.log(newArr[x])
      str = str + newArr.splice(0, x).join("") + " "
      //console.log(newArr.join(""),"hello",str)
      x = 0;
    }
  }
  console.log(str.trim() + " " + newArr.join(""))
}
solution("verbsKnowFew");
