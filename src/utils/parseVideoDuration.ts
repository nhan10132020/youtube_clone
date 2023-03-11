export const parseVideoDuration = (duration: string): string => {
  var parsed = ["","",""]
  var temp = duration.indexOf("H")
  var temp2 = duration.indexOf("M")
  for(var i=2;i<duration.length-1;i++){
      if(temp==-1){
          parsed[0]="0"
      } 
      if(temp2==-1){
          parsed[1]="0"
      }
      if(duration[duration.length-1]!="S"){
          parsed[2]="0"
      }
      if(i<temp){
           parsed[0]+=duration[i]
      }else if(i<temp2&&i>temp ){
          parsed[1]+=duration[i]
      }else if(i!=temp && i!= temp2){
          parsed[2]+=duration[i]   
      }
  }
  if(parseInt(parsed[0])==0){
      if(parseInt(parsed[1])==0){
         return (`0:${parseInt(parsed[2])<=9?`0${parsed[2]}`:parsed[2]}`)
      }else{
         return (`${parseInt(parsed[1])<=9?`0${parsed[1]}`:parsed[1]}:${parseInt(parsed[2])<=9?`0${parsed[2]}`:parsed[2]}`)
      }
  }else{
     return (`${parseInt(parsed[0])}:${parseInt(parsed[1])<=9?`0${parsed[1]}`:parsed[1]}:${parseInt(parsed[2])<=9?`0${parsed[2]}`:parsed[2]}`)
  }
  };