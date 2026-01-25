<?php
// WICHTIG: API-Schlüssel sollten in einer Produktivumgebung NIEMALS direkt im Code stehen,
// wenn die Datei über das Web zugänglich ist. Besser sind Umgebungsvariablen,
// die auf dem Server konfiguriert werden, oder eine Konfigurationsdatei AUSSERHALB des Web-Roots.
// Für Testzwecke oder wenn die Datei absolut sicher ist und nicht direkt aufgerufen werden kann:
$apiKey = 'AIzaSyB0uogzbkKUeZ5DVIfcwoEnZqnO7cYUnFI'; // API-Schlüssel direkt zugewiesen

// Überprüfen, ob der API-Schlüssel vorhanden ist (sollte jetzt immer der Fall sein)
if (empty($apiKey)) { // empty() prüft auf null, false, leeren String, 0 etc.
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'API key not configured on server.']); // Angepasste Fehlermeldung
    exit;
}

// Daten von der Client-Anfrage (JavaScript) erhalten
$requestData = json_decode(file_get_contents('php://input'), true);
$prompt = $requestData['prompt'] ?? null; // Den Prompt aus der Anfrage holen

if (!$prompt) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Kein Prompt übermittelt.']);
    exit;
}

// URL für die Gemini API
$geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . $apiKey;

// Daten für die Gemini API vorbereiten
$data = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ]
];
$jsonData = json_encode($data);

// cURL-Anfrage an die Gemini API initialisieren
$ch = curl_init($geminiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Antwort als String zurückgeben
curl_setopt($ch, CURLOPT_POST, true);           // POST-Anfrage
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData); // JSON-Daten senden
curl_setopt($ch, CURLOPT_HTTPHEADER, [          // Notwendige Header
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);
// Optional: Timeout setzen
// curl_setopt($ch, CURLOPT_TIMEOUT, 30); // 30 Sekunden Timeout

// cURL-Anfrage ausführen
$apiResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // HTTP-Statuscode der API-Antwort

// Fehlerbehandlung für die cURL-Anfrage
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}
curl_close($ch);

// API-Antwort verarbeiten
$responseData = json_decode($apiResponse, true);

if ($httpCode === 200 && isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
    $tip = $responseData['candidates'][0]['content']['parts'][0]['text'];
    header('Content-Type: application/json');
    // Je nachdem, was Ihr JavaScript erwartet (z.B. 'text' oder 'tip')
    echo json_encode(['text' => $tip]); 
} else {
    http_response_code(500);
    // Detailliertere Fehlermeldung von der API, falls vorhanden
    $apiError = $responseData['error']['message'] ?? 'Unbekannter Fehler von der Gemini API oder unerwartete Antwortstruktur.';
    if (isset($responseData['promptFeedback']['blockReason'])) {
        $apiError .= ' Blocked: ' . $responseData['promptFeedback']['blockReason'];
    }
    echo json_encode(['error' => $apiError, 'details' => $responseData]);
}
?>