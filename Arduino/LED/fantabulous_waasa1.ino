int led=8;
void setup()
{
  pinMode(led, OUTPUT);
}

void loop()
{
  digitalWrite(led, HIGH);
  delay(2000); // Wait for 1000 millisecond(s)
  digitalWrite(led, LOW);
  delay(500); // Wait for 1000 millisecond(s)
}
