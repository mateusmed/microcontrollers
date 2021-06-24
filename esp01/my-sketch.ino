#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>


const char* ssid = "***";
const char* password = "***";


ESP8266WebServer server(80);


String webPage = "";
int pin = 0;

//setando ip fixo
IPAddress ip(192, 168, 1, 200);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);


void setup(){

    Serial.begin(115200);

    pinMode(pin, OUTPUT);
    pinMode(pin, LOW);

    Serial.print("Conectando a ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);
    WiFi.config(ip, gateway, subnet);

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("desconectado");

      String msg1 = " valor do WL_CONNECTED: ";
      String msg2 = msg1 + WL_CONNECTED;
      String msg3 = " wifi status: " ;
      String msg4 = msg3 + WiFi.status();
      String finalMsg = msg2 + msg4;
      Serial.println(finalMsg);
    }

    Serial.println("");
    Serial.println("WiFi conectado!");

    // Inicia o servidor WEB
    server.begin();
    Serial.println("Server iniciado");

    // Mostra o endereco IP
    Serial.println(WiFi.localIP());


    server.on("/on", [](){
        server.send(200, "application/json", "{'status':'ok'}");
        digitalWrite(pin, HIGH);
        delay(1000);
    });
}

void loop(){
    server.handleClient();
}