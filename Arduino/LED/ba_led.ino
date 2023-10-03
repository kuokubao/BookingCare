int ledxanh=8;
int leddo=9;
int ledvang=10;
void setup()
{
  pinMode(ledxanh, OUTPUT);
  pinMode(leddo, OUTPUT);
  pinMode(ledvang, OUTPUT);
  
  digitalWrite(ledxanh, HIGH);
  digitalWrite(leddo, HIGH);
  digitalWrite(ledvang, HIGH);
}

void loop()
{ delay(2000);
  digitalWrite(ledxanh, LOW);
  delay(500);
  digitalWrite(leddo, LOW);
  delay(500); // Wait f
  digitalWrite(ledvang, LOW);

  delay(500); 
  digitalWrite(ledxanh, HIGH);
  digitalWrite(leddo, HIGH);
  digitalWrite(ledvang, HIGH);
  delay(500);
  
}
