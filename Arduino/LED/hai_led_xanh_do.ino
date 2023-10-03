int ledxanh=8;
int leddo=9;
void setup()
{
  pinMode(ledxanh, OUTPUT);
  pinMode(leddo, OUTPUT);
}

void loop()
{
  digitalWrite(ledxanh, HIGH);
  digitalWrite(leddo, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(ledxanh, LOW);
  digitalWrite(leddo, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
}