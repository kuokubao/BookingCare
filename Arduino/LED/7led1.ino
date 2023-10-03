void setup()
{
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  
  //dùng vòng lặp for để thiết lập các led sáng khi khởi động
  for(int i=2;i<9;i++)
  {
    digitalWrite(i,HIGH);
  }
}

void loop()
{
  //tắt từ 1 đến 7
  for(int i=2;i<9;i++)
  {
    digitalWrite(i,LOW);
    delay(500);//dừng 1 giây rồi tắt đèn tiếp theo
  }
  //Sáng từ 7 đến 1
  for(int i=8;i>1;i--)
  {
    digitalWrite(i,HIGH);
    delay(500);
  }
  //Chẵn sáng lẻ tắt lặp lại 5 lần
  int lanlap=1;
  while(lanlap<6){
    for(int i=2;i<9;i++){
      if((i-1)%2!=0){digitalWrite(i,LOW);}
      if((i-1)%2==0){digitalWrite(i,HIGH);}
      
    }
    delay(500);
    lanlap++;
    for(int i=2;i<9;i++){
      if((i-1)%2!=0){digitalWrite(i,HIGH);}
      if((i-1)%2==0){digitalWrite(i,LOW);}
      
    }
    delay(500);
  }
  for(int i=2;i<9;i++)
  {
    digitalWrite(i,HIGH);
  }
  delay(500);
}
