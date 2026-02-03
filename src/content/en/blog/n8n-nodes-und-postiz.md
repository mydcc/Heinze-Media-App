---
title: "n8n, nodes und Postiz"
description: "Eine Anleitung zur Nutzung von Postiz in Kombination mit n8n für automatisierte Social-Media-Workflows."
date: "2025-11-27T13:32:20.000Z"
slug: "n8n-nodes-und-postiz"
type: "blog"
categories: ["Uncategorized"]
author: "Heinze Media Team"
tags: "n8n, Postiz, Automation"
published: true
---

# Einführung


[Postiz](https://postiz.com/) ist ein leistungsstarkes Social-Media-Planungstool, mit dem Sie Ihre Social-Media-Konten effizient verwalten können

Mit n8n können Sie Ihren Workflow automatisieren und gleichzeitig auf mehreren Social-Media-Plattformen posten.

Sie können Postiz selbst hosten oder unsere Cloud-Version nutzen . Beispiel: Nachrichten von Reddit laden >> Mit KI ein Video erstellen >> Auf Ihren Social-Media-Konten veröffentlichen.

Postiz unterstützt: X, LinkedIn, BlueSky, Instagram, Facebook, TikTok, YouTube, Pinterest, Dribbble, Telegram, Discord, Slack, Threads, Lemmy, Reddit, Mastodon, Warpcast, Nostr und VK.

Hier erfahren Sie, wie Sie Postiz + n8n nach der Installation verwenden: [https://youtu.be/c50u3K3xsCI](https://youtu.be/c50u3K3xsCI)

* * *

> Hinweis: Wenn Sie Postiz selbst auf Port 5000 hosten (Reverse-Proxy), muss Ihre Host-Adresse mit /api enden, z. B.: [http://yourdomain.com/api](http://yourdomain.com/api)

Alternativ können Sie das SDK mit curl verwenden; weitere Informationen finden Sie in der [Postiz-API-Dokumentation .](https://docs.postiz.com/public-api)

* * *

## Installation (Schnellinstallation)


* Klicken Sie auf Einstellungen
* Klicken Sie auf Community-Knoten
* Klicken Sie auf Installieren
* Fügen Sie "n8n-nodes-postiz" zu "npm-Paketname" hinzu
* Klicken Sie auf Installieren

<!-- Bild entfernt: Broken Link /uploads/2025/11/community-node.png nicht gefunden -->

* * *

## Installation (ohne Docker - manuelle Installation)


Gehen Sie zu Ihrem n8n-Installationsverzeichnis, das sich üblicherweise unter befindet `~/.n8n`. Prüfen Sie, ob der `custom`Ordner vorhanden ist. Falls nicht, erstellen Sie ihn und fügen Sie darin eine neue package.json-Datei hinzu.

mkdir -p ~ /.n8n/custom
npm init -y

Installieren Sie anschließend das Postiz-Node-Paket:

```
npm install n8n-nodes-postiz
```

## Für Docker-Benutzer (manuelle Installation)


Erstellen Sie auf Ihrem Host-Rechner einen neuen Ordner, beispielsweise `~/n8n-custom-nodes`, und erstellen Sie darin eine neue package.json-Datei:

mkdir -p ~ /n8n-custom-nodes
npm init -y

Installieren Sie das Postiz-Node-Paket:

68: npm install n8n-nodes-postiz

Wenn Sie den n8n-Docker-Container ausführen, binden Sie den benutzerdefinierten Nodes-Ordner in den container ein: Fügen Sie die folgende Umgebungsvariable zu Ihrem docker run-Befehl hinzu:

```
71: N8N_CUSTOM_EXTENSIONS="~/n8n-custom-nodes"
```

## Readme
