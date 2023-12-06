# ToDoExpress

# JS todoApp express 
Todo app / javascript + mysql Gruppe 5 

# Install/Requirements:
Im root Verzeichnis folgendes ausführen!
 ```
npm install express mysql2
```

# Datenbank vorbereiten unter Bash
 Navigiere in das Verzeichnis sql_scripts
 ```
cd sql_scripts
```
Bereite bzw. erstelle die Datenbank mit folgenden Befehl
```
mysql -u root -p < setup_db.sql
```
Erstelle die Tabellen für die Datenbank
```
mysql -u root -p < setup_table.sql
```
Füge die ersten Beispiel-Datensätze in unsere beiden Tabellen ein
```
mysql -u root -p < insert_data.sql
```
## Hinweis: Falls die Datenbank fehlerhaft ist, versuche die Datenbank mit folgenden Befehl zunächst einmal zu löschen. Starte danach wieder ab Punkt "Datenbank vorbereiten"
```
mysql -u root -p < cleanup_db.sql
```

# Datenbank vorbereiten unter Powershell
 Navigiere in das Verzeichnis sql_scripts
 ```
cd sql_scripts
```
Bereite bzw. erstelle die Datenbank mit folgenden Befehl
```
Get-Content setup_db.sql | mysql -u root -p
```
Erstelle die Tabellen für die Datenbank
```
Get-Content setup_table.sql | mysql -u root -p
```
Füge die ersten Beispiel-Datensätze in unsere beiden Tabellen ein
```
Get-Content insert_data.sql | mysql -u root -p
```
## Hinweis: Falls die Datenbank fehlerhaft ist, versuche die Datenbank mit folgenden Befehl zunächst einmal zu löschen. Starte danach wieder ab Punkt "Datenbank vorbereiten"
```
Get-Content cleanup_db.sql | mysql -u root -p
```

# Starten der Anwendung 
Navigiere zurück ins Verzeichnis
```
cd todo-express
```
Wir starten die Anwendung mit folgenden Befehl
```
node main.js
```